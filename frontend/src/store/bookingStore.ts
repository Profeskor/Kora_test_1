import { create } from "zustand";
import {
  UnifiedBooking,
  SubSection,
  MasterStatus,
  BrokerNote,
  DocumentEvent,
} from "../types/booking";
import { mockBookings } from "../data/mockBookings";
import { Property } from "../types";
import { useUserStore } from "./userStore";
import { useNotificationStore } from "./notificationStore";

// Document file info type (from FileUpload component)
interface DocumentFileInfo {
  uri: string;
  name: string;
  size: number;
  type: string;
}

// Client documents type
interface ClientDocuments {
  emiratesId: DocumentFileInfo;
  passport: DocumentFileInfo;
}

interface BookingStore {
  bookings: UnifiedBooking[];
  addBooking: (
    property: Property,
    unitId?: string,
    userInfo?: {
      name?: string;
      email?: string;
      phone?: string;
      mobile?: string;
    },
    assignedBroker?: string,
    documents?: ClientDocuments
  ) => UnifiedBooking;
  updateBooking: (
    id: string,
    updates: Partial<UnifiedBooking>
  ) => UnifiedBooking | undefined;
  getBookingById: (id: string) => UnifiedBooking | undefined;

  // Timeline Transition Actions
  transitionBookingStatus: (
    id: string,
    newStatus: MasterStatus
  ) => UnifiedBooking | undefined;
  addBrokerNote: (id: string, content: string) => UnifiedBooking | undefined;
  markBookingAsLost: (id: string) => UnifiedBooking | undefined;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  bookings: [...mockBookings],

  addBooking: (
    property: Property,
    unitId?: string,
    userInfo?: {
      name?: string;
      email?: string;
      phone?: string;
      mobile?: string;
    },
    assignedBroker?: string,
    documents?: ClientDocuments
  ) => {
    const unit = unitId
      ? property.units?.find((u) => u.id === unitId)
      : property.units?.[0];

    // Create initial subsections array with the inquiry note
    const initialSubSections: SubSection[] = [
      {
        id: `sub-${Date.now()}`,
        type: "interaction",
        createdAt: new Date(),
        data: {
          type: "note",
          summary: "Inquiry received via property detail page",
          timestamp: new Date(),
        },
      },
    ];

    // Add document subsections if documents are provided
    if (documents) {
      // Add Emirates ID document event
      const emiratesIdSubSection: SubSection = {
        id: `doc-emirates-${Date.now()}`,
        type: "document",
        createdAt: new Date(),
        data: {
          status: "uploaded",
          documentType: "emirates_id",
          fileUrl: documents.emiratesId.uri,
          uploadedAt: new Date(),
        } as DocumentEvent,
      };
      initialSubSections.push(emiratesIdSubSection);

      // Add Passport document event
      const passportSubSection: SubSection = {
        id: `doc-passport-${Date.now() + 1}`,
        type: "document",
        createdAt: new Date(),
        data: {
          status: "uploaded",
          documentType: "passport",
          fileUrl: documents.passport.uri,
          uploadedAt: new Date(),
        } as DocumentEvent,
      };
      initialSubSections.push(passportSubSection);
    }

    const newBooking: UnifiedBooking = {
      id: `booking-${Date.now()}`,
      masterStatus: "interest_expressed",
      priorityScore: 45,
      client: {
        name: userInfo?.name || useUserStore.getState().user?.name || "You",
        phone:
          userInfo?.mobile ||
          userInfo?.phone ||
          useUserStore.getState().user?.mobile ||
          useUserStore.getState().user?.phone ||
          "+971 50 000 0000",
        email:
          userInfo?.email ||
          useUserStore.getState().user?.email ||
          "user@example.com",
      },
      property: {
        id: property.id,
        name: property.name,
        unitNumber: unit?.label || undefined,
        price: unit?.price || property.price,
        image: property.images?.[0],
      },
      assignedBroker: assignedBroker,
      createdAt: new Date(),
      lastActivityAt: new Date(),
      subSections: initialSubSections,
      brokerNotes: [],
      nextAction: {
        type: "contact",
        label: "Awaiting agent contact",
        urgent: true,
        dueDate: new Date(),
      },
    };

    set((state) => ({
      bookings: [newBooking, ...state.bookings],
    }));

    // Push a notification for brokers about the new interest
    useNotificationStore
      .getState()
      .addNotification(
        "New Lead Assigned",
        `${newBooking.client.name} is interested in ${property.name}${
          unit?.label ? ` ${unit.label}` : ""
        }`,
        "lead"
      );

    return newBooking;
  },

  getBookingById: (id: string) => {
    return get().bookings.find((b) => b.id === id);
  },

  updateBooking: (id: string, updates: Partial<UnifiedBooking>) => {
    let updatedBooking: UnifiedBooking | undefined;

    set((state) => ({
      bookings: state.bookings.map((booking) => {
        if (booking.id === id) {
          updatedBooking = {
            ...booking,
            ...updates,
            lastActivityAt: new Date(),
          };
          return updatedBooking;
        }
        return booking;
      }),
    }));

    return updatedBooking;
  },

  // Timeline Transition - moves booking forward one step
  transitionBookingStatus: (id: string, newStatus: MasterStatus) => {
    return get().updateBooking(id, {
      masterStatus: newStatus,
      lastActivityAt: new Date(),
    });
  },

  // Universal Action - Add broker notes
  addBrokerNote: (id: string, content: string) => {
    const booking = get().getBookingById(id);
    if (!booking) return undefined;

    const newNote: BrokerNote = {
      id: `note-${Date.now()}`,
      content,
      createdBy: useUserStore.getState().user?.name || "Broker",
      createdAt: new Date(),
      stepStatus: booking.masterStatus, // Capture the step where note was added
    };

    return get().updateBooking(id, {
      brokerNotes: [...(booking.brokerNotes || []), newNote],
    });
  },

  // Universal Action - Mark booking as lost (terminal state)
  markBookingAsLost: (id: string) => {
    return get().updateBooking(id, {
      masterStatus: "lost",
      lastActivityAt: new Date(),
    });
  },
}));
