import { MasterStatus, NextAction, UnifiedBooking } from "../types/booking";
import { badges } from "../constants/colors";

/**
 * Get the next action for a booking based on its current status.
 * This dynamically generates what the broker should do next.
 */
export const getNextActionForStatus = (
  status: MasterStatus,
  booking?: UnifiedBooking
): NextAction | null => {
  // Define next actions for each status
  const nextActions: Record<MasterStatus, NextAction | null> = {
    interest_expressed: {
      type: "contact",
      label: "Contact client to discuss requirements",
      urgent: true,
      dueDate: new Date(),
    },
    agent_contact: {
      type: "schedule",
      label: "Schedule property site visit",
      urgent: false,
      dueDate: addDays(new Date(), 2),
    },
    site_visit: {
      type: "followup",
      label: "Follow up and prepare offer",
      urgent: true,
      dueDate: addDays(new Date(), 1),
    },
    offer_reservation: {
      type: "documents",
      label: "Collect documents and process reservation",
      urgent: false,
      dueDate: addDays(new Date(), 3),
    },
    awaiting_finalisation: {
      type: "finalise",
      label: "Complete paperwork and payment",
      urgent: true,
      dueDate: addDays(new Date(), 5),
    },
    handover: {
      type: "completed",
      label: "Booking completed - Sold",
      urgent: false,
    },
    lost: {
      type: "closed",
      label: "Deal lost",
      urgent: false,
    },
    cancelled: {
      type: "closed",
      label: "Booking cancelled",
      urgent: false,
    },
    cold: {
      type: "reactivate",
      label: "Re-engage cold lead",
      urgent: false,
    },
  };

  return nextActions[status] || null;
};

/**
 * Get the display label for a status
 */
export const getStatusDisplayLabel = (status: MasterStatus): string => {
  const labels: Record<MasterStatus, string> = {
    interest_expressed: "Interest Expressed",
    agent_contact: "Agent Contact",
    site_visit: "Site Visit",
    offer_reservation: "Offer / Reservation",
    awaiting_finalisation: "Awaiting Finalisation",
    handover: "Sold",
    lost: "Lost",
    cancelled: "Cancelled",
    cold: "Cold",
  };

  return labels[status] || status;
};

/**
 * Get status color scheme using semantic badge colors
 * - Info (blue): Active inquiry/contact stages
 * - Warning (amber): In-progress actions required
 * - Success (green): Completed/Sold
 * - Error (red): Lost/Cancelled
 * - Neutral: Cold leads
 */
export const getStatusColor = (
  status: MasterStatus
): { bg: string; text: string } => {
  const colors: Record<MasterStatus, { bg: string; text: string }> = {
    // Info stages (blue) - Active engagement
    interest_expressed: { bg: badges.infoBg, text: badges.infoText },
    agent_contact: { bg: badges.infoBg, text: badges.infoText },
    // Warning stages (amber) - Action required
    site_visit: { bg: badges.warningBg, text: badges.warningText },
    offer_reservation: { bg: badges.warningBg, text: badges.warningText },
    awaiting_finalisation: { bg: badges.warningBg, text: badges.warningText },
    // Success (green) - Completed
    handover: { bg: badges.successBg, text: badges.successText },
    // Error (red) - Lost/Cancelled
    lost: { bg: badges.errorBg, text: badges.errorText },
    cancelled: { bg: badges.errorBg, text: badges.errorText },
    // Neutral - Cold leads
    cold: { bg: badges.background, text: badges.text },
  };

  return colors[status] || { bg: badges.background, text: badges.text };
};

/**
 * Calculate priority score based on booking data
 */
export const calculatePriorityScore = (booking: UnifiedBooking): number => {
  let score = 50; // Base score

  // Status-based scoring
  const statusScores: Record<MasterStatus, number> = {
    interest_expressed: 40,
    agent_contact: 55,
    site_visit: 70,
    offer_reservation: 85,
    awaiting_finalisation: 95,
    handover: 100,
    lost: 0,
    cancelled: 0,
    cold: 20,
  };

  score = statusScores[booking.masterStatus] || score;

  // Recency bonus (activity in last 24 hours)
  const hoursSinceActivity =
    (Date.now() - booking.lastActivityAt.getTime()) / (1000 * 60 * 60);
  if (hoursSinceActivity < 24) {
    score = Math.min(100, score + 10);
  }

  // Has scheduled visit bonus
  const hasUpcomingVisit = booking.subSections.some(
    (sub) =>
      sub.type === "visit" &&
      (sub.data as any).status === "scheduled" &&
      new Date((sub.data as any).dateTime) > new Date()
  );
  if (hasUpcomingVisit) {
    score = Math.min(100, score + 5);
  }

  return score;
};

/**
 * Check if a booking should be marked as "cold" (no activity for 30+ days)
 */
export const shouldMarkAsCold = (booking: UnifiedBooking): boolean => {
  if (
    ["handover", "lost", "cancelled", "cold"].includes(booking.masterStatus)
  ) {
    return false;
  }

  const daysSinceActivity =
    (Date.now() - booking.lastActivityAt.getTime()) / (1000 * 60 * 60 * 24);
  return daysSinceActivity >= 30;
};

/**
 * Get the next status in the journey
 */
export const getNextStatus = (
  currentStatus: MasterStatus
): MasterStatus | null => {
  const journey: MasterStatus[] = [
    "interest_expressed",
    "agent_contact",
    "site_visit",
    "offer_reservation",
    "awaiting_finalisation",
    "handover",
  ];

  const currentIndex = journey.indexOf(currentStatus);
  if (currentIndex === -1 || currentIndex >= journey.length - 1) {
    return null;
  }

  return journey[currentIndex + 1];
};

/**
 * Check if transition from current to new status is valid
 */
export const isValidTransition = (
  currentStatus: MasterStatus,
  newStatus: MasterStatus
): boolean => {
  const journey: MasterStatus[] = [
    "interest_expressed",
    "agent_contact",
    "site_visit",
    "offer_reservation",
    "awaiting_finalisation",
    "handover",
  ];

  const currentIndex = journey.indexOf(currentStatus);
  const newIndex = journey.indexOf(newStatus);

  // Allow forward transitions
  if (newIndex > currentIndex) return true;

  // Always allow marking as lost
  if (newStatus === "lost") return true;

  return false;
};

// Helper function to add days to a date
function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
