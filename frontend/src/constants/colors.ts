/**
 * KORA COLOR SYSTEM - SINGLE SOURCE OF TRUTH
 * ============================================
 *
 * ⚠️ LOCKED PALETTE - Do not add new colors unless absolutely required
 * ❌ No raw hex usage in components
 * ✅ Every color must map to a semantic role
 *
 * Last Updated: December 2024
 */

// ============================================================================
// APPROVED BASE PALETTE (7 tokens only)
// ============================================================================
export const palette = {
  brand: {
    primary: "#194B75", // Primary brand, dark surfaces, dark mode background
    secondary: "#64748B", // Secondary actions, interactive icons, subtle emphasis
  },
  base: {
    white: "#FFFFFF", // Light background, text on dark
  },
  text: {
    heading: "#1E293B", // Primary titles on light background
    body: "#475569", // Body text
  },
  ui: {
    border: "#E2E8F0", // Borders, dividers, input outlines
    shadow: "rgba(0,0,0,0.15)", // Elevation only
  },
  status: {
    // Success states
    success: "#10B981",
    successLight: "#D1FAE5",
    successDark: "#065F46",
    // Error states
    error: "#EF4444",
    errorLight: "#FEE2E2",
    errorDark: "#991B1B",
    // Warning states
    warning: "#F59E0B",
    warningLight: "#FEF3C7",
    warningDark: "#92400E",
    // Info states
    info: "#3B82F6",
    infoLight: "#DBEAFE",
    infoDark: "#1E40AF",
  },
} as const;

// ============================================================================
// SEMANTIC COLOR ROLES
// ============================================================================

/**
 * Background Colors
 * Use these for all background needs
 */
export const backgrounds = {
  // App / Screen backgrounds
  screenLight: palette.base.white,
  screenDark: palette.brand.primary,

  // Cards, sheets, modals
  card: palette.base.white,

  // Footer, dark sections
  footerDark: palette.brand.primary,

  // Subtle backgrounds (for input fields, inactive states)
  subtle: "#F8FAFC", // Very light gray derived from border
} as const;

/**
 * Text Colors
 * Use these for all text needs
 */
export const textColors = {
  // Primary heading text (on light backgrounds)
  heading: palette.text.heading,

  // Body text
  body: palette.text.body,

  // Text on dark backgrounds
  onDark: palette.base.white,

  // Secondary / muted text
  secondary: palette.brand.secondary,

  // Disabled text
  disabled: `${palette.brand.secondary}66`, // 40% opacity
} as const;

/**
 * Border & Divider Colors
 * Use these for all borders, dividers, input outlines
 */
export const borders = {
  default: palette.ui.border,
  divider: palette.ui.border,
  inputOutline: palette.ui.border,
} as const;

/**
 * Interactive Element Colors
 * Use these for buttons, icons, interactive states
 */
export const interactive = {
  // Primary button
  primaryBg: palette.brand.primary,
  primaryText: palette.base.white,

  // Secondary button / icons
  secondaryBg: palette.brand.secondary,
  secondaryText: palette.brand.secondary,

  // Disabled state (40-50% opacity)
  disabledBg: `${palette.brand.secondary}66`,
  disabledText: `${palette.brand.secondary}80`,
} as const;

/**
 * Elevation / Shadow
 * Use for cards, modals, bottom sheets
 */
export const elevation = {
  shadow: palette.ui.shadow,
  shadowColor: "#000000",
} as const;

// ============================================================================
// TIMELINE-SPECIFIC ROLES (for Booking Timeline UI)
// ============================================================================

export const timeline = {
  // Container
  containerBg: palette.base.white,
  stepDivider: palette.ui.border,

  // Current / Active step
  currentStepTitle: palette.text.heading,
  currentStepIndicator: palette.brand.primary,
  activeStepBg: palette.status.infoLight,
  activeStepText: palette.status.infoDark,

  // Completed step (semantic success)
  completedStepIndicator: palette.status.success,
  completedStepBg: palette.status.successLight,
  completedStepText: palette.status.successDark,
  completedStepIcon: palette.status.success,

  // Upcoming / Inactive step
  inactiveStepTitle: palette.brand.secondary,
  inactiveStepIcon: palette.brand.secondary,
  inactiveStepBg: backgrounds.subtle,

  // CTA Button
  ctaBg: palette.brand.primary,
  ctaText: palette.base.white,
  ctaShadow: palette.ui.shadow,

  // Notes section
  noteText: palette.text.body,
  noteTimestamp: palette.brand.secondary,
  noteDivider: palette.ui.border,

  // Read-only / Handover state
  readOnlyText: palette.brand.secondary,
} as const;

// ============================================================================
// STATUS BADGE ROLES (Pills / Chips / Tags)
// ✅ Semantic color for status representation
// ============================================================================

export const badges = {
  // Default / Neutral badge
  background: palette.base.white,
  border: palette.ui.border,
  text: palette.brand.secondary,

  // Success status (Completed, Sold, Approved)
  successBg: palette.status.successLight,
  successText: palette.status.successDark,
  successBorder: palette.status.success,

  // Warning status (Pending, Awaiting, In Progress)
  warningBg: palette.status.warningLight,
  warningText: palette.status.warningDark,
  warningBorder: palette.status.warning,

  // Error status (Failed, Lost, Cancelled)
  errorBg: palette.status.errorLight,
  errorText: palette.status.errorDark,
  errorBorder: palette.status.error,

  // Info status (Informational, Neutral-active)
  infoBg: palette.status.infoLight,
  infoText: palette.status.infoDark,
  infoBorder: palette.status.info,
} as const;

// ============================================================================
// ROLE BADGES (User type identification)
// ============================================================================

export const roleBadges = {
  // Broker role - muted teal/blue
  broker: {
    background: palette.status.infoLight,
    text: palette.status.infoDark,
    border: palette.status.info,
  },
  // Homeowner role - success green
  homeowner: {
    background: palette.status.successLight,
    text: palette.status.successDark,
    border: palette.status.success,
  },
  // Admin / System role - neutral
  admin: {
    background: backgrounds.subtle,
    text: palette.brand.secondary,
    border: palette.ui.border,
  },
} as const;

// ============================================================================
// MODAL / CONFIRMATION DIALOG ROLES
// ============================================================================

export const modal = {
  background: palette.base.white,
  title: palette.text.heading,
  bodyText: palette.text.body,
  primaryAction: palette.brand.primary,
  secondaryAction: palette.brand.secondary,
  overlay: "rgba(0,0,0,0.5)",
} as const;

// ============================================================================
// COMPONENT SHADOW PRESET
// ============================================================================

export const shadows = {
  card: {
    shadowColor: elevation.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  modal: {
    shadowColor: elevation.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  button: {
    shadowColor: elevation.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  sm: {
    shadowColor: elevation.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  md: {
    shadowColor: elevation.shadowColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: elevation.shadowColor,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;

// ============================================================================
// LEGACY COMPATIBILITY (to help with migration)
// Maps old color names to new semantic roles
// ============================================================================

export const legacyMapping = {
  // Old → New mapping for gradual migration
  "#111827": palette.text.heading,
  "#1F2937": palette.text.heading,
  "#374151": palette.text.body,
  "#6B7280": palette.brand.secondary,
  "#9CA3AF": palette.brand.secondary,
  "#E5E7EB": palette.ui.border,
  "#F3F4F6": backgrounds.subtle,
  "#F9FAFB": backgrounds.subtle,
  "#005B78": palette.brand.primary,
  "#0D1B2A": palette.brand.primary,
} as const;

// ============================================================================
// EXPORT ALL AS SINGLE OBJECT FOR CONVENIENCE
// ============================================================================

export const colors = {
  palette,
  backgrounds,
  text: textColors,
  borders,
  interactive,
  elevation,
  timeline,
  badges,
  roleBadges,
  modal,
  shadows,
} as const;

export default colors;
