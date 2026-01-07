import { UnifiedBooking } from "../types/booking";
import { calculatePriorityScore } from "../utils/bookingUtils";

// Helper to create dates
const daysAgo = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

const hoursAgo = (hours: number): Date => {
  const date = new Date();
  date.setHours(date.getHours() - hours);
  return date;
};

const futureDate = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

// ============================================
// BROKER BOOKINGS - 3 variations showing pipeline stages
// ============================================
export const brokerBookings: UnifiedBooking[] = [
  // 1. Early Stage - Site Visit Completed, Follow-up needed
  {
    id: "broker-1",
    masterStatus: "site_visit",
    priorityScore: 75,
    client: {
      name: "Ahmed Al Mansouri",
      phone: "+971 50 123 4567",
      email: "ahmed.m@email.com",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    property: {
      id: "PROP-001",
      name: "IL Vento By Kora Properties",
      unitNumber: "2 Bedroom - Type A",
      price: 4004000,
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    },
    assignedBroker: "Sarah Johnson",
    createdAt: daysAgo(10),
    lastActivityAt: hoursAgo(4),
    subSections: [
      {
        id: "sub-1",
        type: "interaction",
        createdAt: daysAgo(10),
        data: {
          type: "call",
          summary: "Initial inquiry - Interested in 2BR Canal View at IL Vento",
          timestamp: daysAgo(10),
        },
      },
      {
        id: "sub-2",
        type: "visit",
        createdAt: daysAgo(5),
        data: {
          status: "completed",
          visitType: "site_visit",
          dateTime: daysAgo(5),
          location: "IL Vento, Dubai Maritime City",
          agentName: "Sarah Johnson",
          notes: "Client loved the canal view. Very interested in Unit 501.",
        },
      },
      {
        id: "sub-3",
        type: "interaction",
        createdAt: hoursAgo(4),
        data: {
          type: "whatsapp",
          summary:
            "Follow-up message sent - Awaiting feedback on payment plans",
          timestamp: hoursAgo(4),
        },
      },
    ],
    brokerNotes: [
      {
        id: "note-1",
        content:
          "Client very interested in 2BR with canal views. Discussing 50/50 payment plan.",
        createdBy: "Sarah Johnson",
        createdAt: daysAgo(5),
        stepStatus: "site_visit",
      },
    ],
    nextAction: {
      type: "followup",
      label: "Review and Accept the offer",
      urgent: true,
      dueDate: futureDate(2),
    },
  },

  // 2. Mid Stage - Offer Sent, Awaiting Response
  {
    id: "broker-2",
    masterStatus: "offer_reservation",
    priorityScore: 88,
    client: {
      name: "Fatima Al Zahra",
      phone: "+971 55 987 6543",
      email: "fatima.z@email.com",
      avatar: "https://i.pravatar.cc/150?img=47",
    },
    property: {
      id: "PROP-003",
      name: "La Marina Heights",
      unitNumber: "Unit 901",
      price: 2513727,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    },
    assignedBroker: "Mohammed Ali",
    createdAt: daysAgo(18),
    lastActivityAt: daysAgo(1),
    subSections: [
      {
        id: "sub-4",
        type: "visit",
        createdAt: daysAgo(15),
        data: {
          status: "completed",
          visitType: "site_visit",
          dateTime: daysAgo(15),
          location: "La Marina Heights, Dubai Marina Walk",
          agentName: "Mohammed Ali",
          notes: "Impressed with Marina Walk location and city views.",
        },
      },
      {
        id: "sub-5",
        type: "offer",
        createdAt: daysAgo(3),
        data: {
          status: "sent",
          unitPrice: 2513727,
          paymentPlan: "5-year payment plan",
          conditions: "10% down payment, 5% on handover",
          sentAt: daysAgo(3),
        },
      },
      {
        id: "sub-6",
        type: "interaction",
        createdAt: daysAgo(1),
        data: {
          type: "call",
          summary:
            "Client reviewing offer with family - will respond within week",
          timestamp: daysAgo(1),
        },
      },
    ],
    brokerNotes: [],
    nextAction: {
      type: "offer_response",
      label: "Awaiting Offer Response",
      urgent: false,
      dueDate: futureDate(5),
    },
  },

  // 3. Final Stage - Payment Done, Awaiting Handover
  {
    id: "broker-3",
    masterStatus: "handover",
    priorityScore: 100,
    client: {
      name: "David Miller",
      phone: "+971 52 456 7890",
      email: "david.m@email.com",
      avatar: "https://i.pravatar.cc/150?img=33",
    },
    property: {
      id: "PROP-005",
      name: "Azure Bay Residences",
      unitNumber: "Unit 708",
      price: 2969967,
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    },
    assignedBroker: "Ahmed Al Mansouri",
    createdAt: daysAgo(45),
    lastActivityAt: daysAgo(3),
    subSections: [
      {
        id: "sub-7",
        type: "visit",
        createdAt: daysAgo(40),
        data: {
          status: "completed",
          visitType: "site_visit",
          dateTime: daysAgo(40),
          location: "Azure Bay Residences, Downtown Dubai",
          agentName: "Ahmed Al Mansouri",
          notes: "Client impressed with Burj Khalifa views.",
        },
      },
      {
        id: "sub-8",
        type: "reservation",
        createdAt: daysAgo(20),
        data: {
          status: "paid",
          paymentType: "down_payment",
          amount: 296996,
          transactionId: "TXN-98765",
          receiptUrl: "https://example.com/receipt.pdf",
        },
      },
      {
        id: "sub-9",
        type: "document",
        createdAt: daysAgo(3),
        data: {
          status: "verified",
          documentType: "spa_signed",
          uploadedAt: daysAgo(5),
        },
      },
    ],
    brokerNotes: [],
    nextAction: {
      type: "handover",
      label: "SPA Signed - Awaiting Handover Q4 2026",
      urgent: false,
      dueDate: futureDate(365),
    },
  },
];

// ============================================
// HOMEOWNER BOOKINGS - 3 variations showing ownership stages
// ============================================
export const homeownerBookings: UnifiedBooking[] = [
  // 1. Recently Purchased - Payment in Progress
  {
    id: "homeowner-1",
    masterStatus: "awaiting_finalisation",
    priorityScore: 90,
    client: {
      name: "You",
      phone: "+971 50 111 2222",
      email: "homeowner@email.com",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    property: {
      id: "PROP-002",
      name: "Vento Harbour Views",
      unitNumber: "Unit 2404",
      price: 1653874,
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    },
    assignedBroker: "Sarah Johnson",
    createdAt: daysAgo(30),
    lastActivityAt: daysAgo(2),
    subSections: [
      {
        id: "sub-h1",
        type: "reservation",
        createdAt: daysAgo(25),
        data: {
          status: "paid",
          paymentType: "down_payment",
          amount: 165387,
          transactionId: "TXN-HOME-001",
          receiptUrl: "https://example.com/receipt1.pdf",
        },
      },
      {
        id: "sub-h2",
        type: "document",
        createdAt: daysAgo(10),
        data: {
          status: "verified",
          documentType: "emirates_id",
          uploadedAt: daysAgo(12),
        },
      },
      {
        id: "sub-h3",
        type: "interaction",
        createdAt: daysAgo(2),
        data: {
          type: "note",
          summary: "2nd installment due in 30 days",
          timestamp: daysAgo(2),
        },
      },
    ],
    brokerNotes: [],
    nextAction: {
      type: "payment",
      label: "Next Payment: AED 165,387 due in 30 days",
      urgent: false,
      dueDate: futureDate(30),
    },
  },

  // 2. Under Construction - Awaiting Handover
  {
    id: "homeowner-2",
    masterStatus: "handover",
    priorityScore: 85,
    client: {
      name: "You",
      phone: "+971 50 111 2222",
      email: "homeowner@email.com",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    property: {
      id: "PROP-004",
      name: "Marina Crest Residences",
      unitNumber: "Unit 3408",
      price: 1264032,
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    },
    assignedBroker: "Mohammed Ali",
    createdAt: daysAgo(180),
    lastActivityAt: daysAgo(15),
    subSections: [
      {
        id: "sub-h4",
        type: "reservation",
        createdAt: daysAgo(175),
        data: {
          status: "paid",
          paymentType: "full_payment",
          amount: 1264032,
          transactionId: "TXN-HOME-002",
          receiptUrl: "https://example.com/receipt2.pdf",
        },
      },
      {
        id: "sub-h5",
        type: "document",
        createdAt: daysAgo(160),
        data: {
          status: "verified",
          documentType: "spa_signed",
          uploadedAt: daysAgo(165),
        },
      },
      {
        id: "sub-h6",
        type: "interaction",
        createdAt: daysAgo(15),
        data: {
          type: "note",
          summary: "Construction 65% complete - on track for Q1 2027 handover",
          timestamp: daysAgo(15),
        },
      },
    ],
    brokerNotes: [],
    nextAction: {
      type: "handover",
      label: "Expected Handover: Q1 2027",
      urgent: false,
      dueDate: futureDate(400),
    },
  },

  // 3. Handed Over - Completed Purchase
  {
    id: "homeowner-3",
    masterStatus: "handover",
    priorityScore: 100,
    client: {
      name: "You",
      phone: "+971 50 111 2222",
      email: "homeowner@email.com",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    property: {
      id: "PROP-001",
      name: "IL Vento By Kora Properties",
      unitNumber: "3 Bedroom - Type A",
      price: 7513000,
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    },
    assignedBroker: "Ahmed Al Mansouri",
    createdAt: daysAgo(365),
    lastActivityAt: daysAgo(30),
    subSections: [
      {
        id: "sub-h7",
        type: "reservation",
        createdAt: daysAgo(360),
        data: {
          status: "paid",
          paymentType: "full_payment",
          amount: 2452824,
          transactionId: "TXN-HOME-003",
          receiptUrl: "https://example.com/receipt3.pdf",
        },
      },
      {
        id: "sub-h8",
        type: "document",
        createdAt: daysAgo(60),
        data: {
          status: "verified",
          documentType: "title_deed",
          uploadedAt: daysAgo(65),
        },
      },
      {
        id: "sub-h9",
        type: "interaction",
        createdAt: daysAgo(30),
        data: {
          type: "note",
          summary: "Keys collected - Welcome to your new home!",
          timestamp: daysAgo(30),
        },
      },
    ],
    brokerNotes: [],
    nextAction: {
      type: "completed",
      label: "Handover Complete",
      urgent: false,
    },
  },
];

// Combined for backward compatibility
export const mockBookings: UnifiedBooking[] = [
  ...brokerBookings,
  ...homeownerBookings,
];

// Helper functions for filtering
export const getBookingsByStatus = (
  bookings: UnifiedBooking[],
  status: UnifiedBooking["masterStatus"]
): UnifiedBooking[] => {
  return bookings.filter((b) => b.masterStatus === status);
};

export const getBookingsByPipeline = (
  bookings: UnifiedBooking[],
  pipeline: "active" | "closed"
): UnifiedBooking[] => {
  switch (pipeline) {
    case "active":
      return bookings.filter(
        (b) =>
          !["handover", "lost", "cancelled", "cold"].includes(b.masterStatus)
      );
    case "closed":
      return bookings.filter((b) =>
        ["handover", "lost", "cancelled"].includes(b.masterStatus)
      );
    default:
      return bookings;
  }
};

export const getQuickFilterCounts = (
  bookings: UnifiedBooking[]
): Record<string, number> => {
  const counts: Record<string, number> = {
    payment_pending: 0,
    upcoming_visits: 0,
    visit_followup: 0,
    new_inquiries: 0,
    hot_deals: 0,
    cold_leads: 0,
    offers_out: 0,
    reserved: 0,
  };

  bookings.forEach((booking) => {
    const hasPendingPayment = booking.subSections.some(
      (sub) =>
        sub.type === "reservation" && (sub.data as any).status === "pending"
    );
    if (hasPendingPayment) counts.payment_pending++;

    const hasUpcomingVisit = booking.subSections.some(
      (sub) =>
        sub.type === "visit" &&
        (sub.data as any).status === "scheduled" &&
        new Date((sub.data as any).dateTime) > new Date()
    );
    if (hasUpcomingVisit) counts.upcoming_visits++;

    if (
      booking.masterStatus === "site_visit" &&
      booking.subSections.some(
        (sub) =>
          sub.type === "visit" && (sub.data as any).status === "completed"
      )
    )
      counts.visit_followup++;

    if (booking.masterStatus === "interest_expressed") counts.new_inquiries++;
    if (calculatePriorityScore(booking) >= 70) counts.hot_deals++;
    if (booking.masterStatus === "cold") counts.cold_leads++;
    if (booking.masterStatus === "offer_reservation") counts.offers_out++;
    if (booking.masterStatus === "awaiting_finalisation") counts.reserved++;
  });

  return counts;
};
