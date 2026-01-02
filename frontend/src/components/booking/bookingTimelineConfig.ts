import { MasterStatus } from "../../types/booking";
import { palette, timeline } from "../../constants/colors";

// Timeline step definition
export interface TimelineStep {
  status: MasterStatus;
  label: string;
  description: string;
  icon: string;
  primaryCTA: {
    label: string;
    action: string;
  } | null;
  secondaryCTA?: {
    label: string;
    action: string;
  };
}

// Semantic color getters for timeline steps
// Completed steps use success green, active uses info blue, inactive uses neutral
export const timelineColors = {
  // Completed step (green checkmark) - semantic success
  completedIndicator: timeline.completedStepIndicator,
  completedBg: timeline.completedStepBg,
  completedText: timeline.completedStepText,
  completedIcon: timeline.completedStepIcon,
  // Current/Active step (blue) - brand primary or info
  activeIndicator: timeline.currentStepIndicator,
  activeBg: timeline.activeStepBg,
  activeText: timeline.activeStepText,
  // Inactive/upcoming step (neutral grey)
  inactiveIndicator: timeline.inactiveStepIcon,
  inactiveBg: timeline.inactiveStepBg,
  inactiveTitle: timeline.inactiveStepTitle,
  // Step titles
  currentTitle: timeline.currentStepTitle,
  // Descriptions
  description: palette.text.body,
  inactiveDescription: palette.brand.secondary,
} as const;

// Define the 6-step journey (excluding terminal states)
// Note: Individual step colors removed - use semantic timelineColors instead
export const TIMELINE_STEPS: Record<MasterStatus, TimelineStep | null> = {
  interest_expressed: {
    status: "interest_expressed",
    label: "Interest Expressed",
    description: "Client has shown interest in this property",
    icon: "MessageSquare",
    primaryCTA: {
      label: "Mark Client Contacted",
      action: "markClientContacted",
    },
    secondaryCTA: {
      label: "Add Notes",
      action: "addNotes",
    },
  },

  agent_contact: {
    status: "agent_contact",
    label: "Agent Contact",
    description: "Broker and client have spoken",
    icon: "Phone",
    primaryCTA: {
      label: "Mark Site Visit Completed",
      action: "markSiteVisitCompleted",
    },
    secondaryCTA: {
      label: "Schedule Site Visit",
      action: "scheduleVisit",
    },
  },

  site_visit: {
    status: "site_visit",
    label: "Site Visit",
    description: "Client has visited the property",
    icon: "MapPin",
    primaryCTA: {
      label: "Reserve Unit",
      action: "createOffer",
    },
    secondaryCTA: {
      label: "Add Notes",
      action: "addNotes",
    },
  },

  offer_reservation: {
    status: "offer_reservation",
    label: "Offer & Reservation",
    description: "Unit reserved, offer terms discussed",
    icon: "FileText",
    primaryCTA: {
      label: "Move to Finalisation",
      action: "moveFinalisation",
    },
    secondaryCTA: {
      label: "Add Notes",
      action: "addNotes",
    },
  },

  awaiting_finalisation: {
    status: "awaiting_finalisation",
    label: "Awaiting Finalisation",
    description: "Paperwork, payment, and approvals pending",
    icon: "Clock",
    primaryCTA: {
      label: "Complete Handover",
      action: "completeHandover",
    },
    secondaryCTA: {
      label: "Add Notes",
      action: "addNotes",
    },
  },

  handover: {
    status: "handover",
    label: "Handover",
    description: "Booking complete, possession transferred",
    icon: "CheckCircle",
    primaryCTA: null,
    secondaryCTA: {
      label: "View Details",
      action: "viewDetails",
    },
  },

  // Terminal states - no transitions
  lost: null,
  cancelled: null,
  cold: null,
};

// Get the timeline steps in order (active journey)
export const getTimelineSteps = (): TimelineStep[] => {
  return [
    TIMELINE_STEPS["interest_expressed"]!,
    TIMELINE_STEPS["agent_contact"]!,
    TIMELINE_STEPS["site_visit"]!,
    TIMELINE_STEPS["offer_reservation"]!,
    TIMELINE_STEPS["awaiting_finalisation"]!,
    TIMELINE_STEPS["handover"]!,
  ];
};

// Get the index of current status in the timeline
export const getCurrentStepIndex = (status: MasterStatus): number => {
  const steps = getTimelineSteps();
  return steps.findIndex((step) => step.status === status);
};

// Check if a booking is in the active journey
export const isActiveJourney = (status: MasterStatus): boolean => {
  return TIMELINE_STEPS[status] !== null;
};

// Check if a booking is in a terminal state
export const isTerminalState = (status: MasterStatus): boolean => {
  return ["lost", "cancelled", "handover"].includes(status);
};
