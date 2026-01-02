// Unified Booking Architecture Types

// Master Status - Unified Booking Journey Steps
export type MasterStatus =
  | "interest_expressed"
  | "agent_contact"
  | "site_visit"
  | "offer_reservation"
  | "awaiting_finalisation"
  | "handover"
  | "lost"
  | "cancelled"
  | "cold"; // Auto-detected after 30+ days inactivity

// Sub-Section Types - Polymorphic events
export type SubSectionType =
  | "visit"
  | "offer"
  | "reservation"
  | "interaction"
  | "document";

// Visit Event
export type VisitStatus =
  | "scheduled"
  | "rescheduled"
  | "completed"
  | "no_show"
  | "cancelled";
export type VisitType = "virtual" | "site_visit" | "showroom";

export interface VisitEvent {
  status: VisitStatus;
  visitType: VisitType;
  dateTime: Date;
  location?: string;
  agentName: string;
  notes?: string;
}

// Offer Event
export type OfferStatus =
  | "draft"
  | "sent"
  | "accepted"
  | "rejected"
  | "revised";

export interface OfferEvent {
  status: OfferStatus;
  unitPrice: number;
  paymentPlan: string;
  conditions?: string;
  sentAt?: Date;
}

// Reservation Event
export type ReservationStatus =
  | "link_generated"
  | "pending"
  | "partial"
  | "paid"
  | "refunded";

export type PaymentType = "token" | "down_payment";

export interface ReservationEvent {
  status: ReservationStatus;
  paymentType: PaymentType;
  amount: number;
  transactionId?: string;
  receiptUrl?: string;
}

// Interaction Log
export type InteractionType = "call" | "whatsapp" | "email" | "note";

export interface InteractionLog {
  type: InteractionType;
  summary: string;
  timestamp: Date;
}

// Broker Note (Universal Action)
export interface BrokerNote {
  id: string;
  content: string;
  createdBy: string;
  createdAt: Date;
  stepStatus: MasterStatus; // Which step this note was added at
}

// Document Event
export type DocumentStatus = "requested" | "uploaded" | "verified" | "rejected";

export type DocumentType =
  | "emirates_id"
  | "passport"
  | "visa"
  | "preapproval"
  | "other";

export interface DocumentEvent {
  status: DocumentStatus;
  documentType: DocumentType;
  fileUrl?: string;
  uploadedAt?: Date;
  expiryDate?: Date;
}

// Sub-Section (Polymorphic)
export interface SubSection {
  id: string;
  type: SubSectionType;
  createdAt: Date;
  data:
    | VisitEvent
    | OfferEvent
    | ReservationEvent
    | InteractionLog
    | DocumentEvent;
}

// Next Action
export interface NextAction {
  type: string;
  label: string;
  urgent: boolean;
  dueDate?: Date;
}

// ImageSource can be a URL string or a local require() result (number)
export type BookingImageSource = string | number;

// Unified Booking
export interface UnifiedBooking {
  id: string;
  masterStatus: MasterStatus;
  priorityScore?: number; // 0-100, auto-calculated
  client: {
    name: string;
    phone: string;
    email: string;
    avatar?: string;
  };
  property: {
    id: string;
    name: string;
    unitNumber?: string;
    price: number;
    image?: BookingImageSource;
  };
  assignedBroker?: string;
  source?: "self_created" | "lead_import" | "web_form"; // Track booking origin
  createdAt: Date;
  lastActivityAt: Date; // For "Cold" detection
  subSections: SubSection[];
  brokerNotes: BrokerNote[]; // Universal notes across all timeline steps
  nextAction?: NextAction;
}

// Quick Filter Types
export type QuickFilterType =
  | "payment_pending"
  | "upcoming_visits"
  | "visit_followup"
  | "new_inquiries"
  | "hot_deals"
  | "cold_leads"
  | "offers_out"
  | "reserved";

export interface QuickFilter {
  id: QuickFilterType;
  label: string;
  icon: string;
  count: number;
}
