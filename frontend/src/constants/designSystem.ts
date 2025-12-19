/**
 * COMPREHENSIVE DESIGN SYSTEM
 *
 * This file defines all design tokens and standards for the Kora application.
 * It ensures consistency across typography, spacing, colors, and component styles.
 *
 * Key Principles:
 * - Mobile-first responsive design
 * - Clear visual hierarchy
 * - Accessibility-conscious spacing and sizing
 * - Flexible enough to adapt to different screen sizes
 */

/**
 * ============================================================================
 * COLOR PALETTE
 * ============================================================================
 */
export const colors = {
  // Primary Brand Colors
  primary: {
    navy: "#0D1B2A",
    teal: "#005B78",
    gold: {
      light: "#F5D58A",
      medium: "#E3B873",
      dark: "#B98A44",
    },
  },

  // Neutral Colors
  neutral: {
    black: "#111827",
    white: "#FFFFFF",
    gray: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#1F2937",
      900: "#111827",
    },
  },

  // Semantic Colors
  semantic: {
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
  },

  // Text Colors
  text: {
    primary: "#111827",
    secondary: "#6B7280",
    tertiary: "#9CA3AF",
    disabled: "#D1D5DB",
    inverse: "#FFFFFF",
  },

  // Background Colors
  background: {
    primary: "#FFFFFF",
    secondary: "#F9FAFB",
    tertiary: "#F3F4F6",
    overlay: "rgba(0, 0, 0, 0.5)",
    light: "rgba(255, 255, 255, 0.8)",
  },

  // Border Colors
  border: {
    light: "#E5E7EB",
    medium: "#D1D5DB",
    dark: "#9CA3AF",
  },
};

/**
 * ============================================================================
 * TYPOGRAPHY SYSTEM
 * ============================================================================
 *
 * Heading Hierarchy:
 * H1: 32px | 600 (semibold) | 40px line-height
 * H2: 24px | 600 (semibold) | 30px line-height
 * H3: 18px | 700 (bold) | 24px line-height
 * H4: 16px | 600 (semibold) | 22px line-height
 *
 * Body Text:
 * Large: 16px | 400 (regular) | 24px line-height
 * Regular: 14px | 400 (regular) | 22px line-height
 * Small: 12px | 400 (regular) | 18px line-height
 *
 * Labels & Captions:
 * Label: 13px | 600 (semibold) | 18px line-height
 * Caption: 12px | 500 (medium) | 16px line-height
 * Overline: 11px | 700 (bold) | 14px line-height
 */

export const typography = {
  // Heading Styles
  heading: {
    h1: {
      fontSize: 32,
      fontWeight: "600" as const,
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: "600" as const,
      lineHeight: 30,
    },
    h3: {
      fontSize: 18,
      fontWeight: "700" as const,
      lineHeight: 24,
    },
    h4: {
      fontSize: 16,
      fontWeight: "600" as const,
      lineHeight: 22,
    },
  },

  // Body Text Styles
  body: {
    large: {
      fontSize: 16,
      fontWeight: "400" as const,
      lineHeight: 24,
    },
    regular: {
      fontSize: 14,
      fontWeight: "400" as const,
      lineHeight: 22,
    },
    small: {
      fontSize: 12,
      fontWeight: "400" as const,
      lineHeight: 18,
    },
  },

  // Label & Caption Styles
  label: {
    large: {
      fontSize: 14,
      fontWeight: "600" as const,
      lineHeight: 20,
    },
    regular: {
      fontSize: 13,
      fontWeight: "600" as const,
      lineHeight: 18,
    },
    small: {
      fontSize: 12,
      fontWeight: "600" as const,
      lineHeight: 16,
    },
  },

  // Caption Styles
  caption: {
    regular: {
      fontSize: 12,
      fontWeight: "500" as const,
      lineHeight: 16,
    },
    small: {
      fontSize: 11,
      fontWeight: "500" as const,
      lineHeight: 14,
    },
  },

  // Overline Styles (for small uppercase text)
  overline: {
    regular: {
      fontSize: 11,
      fontWeight: "700" as const,
      lineHeight: 14,
      letterSpacing: 0.5,
    },
  },
};

/**
 * ============================================================================
 * SPACING SYSTEM (8px base unit)
 * ============================================================================
 *
 * Used for padding, margin, gaps
 * xs: 4px (0.5 units)
 * sm: 8px (1 unit)
 * md: 12px (1.5 units)
 * lg: 16px (2 units)
 * xl: 20px (2.5 units)
 * 2xl: 24px (3 units)
 * 3xl: 32px (4 units)
 * 4xl: 40px (5 units)
 * 5xl: 48px (6 units)
 * 6xl: 56px (7 units)
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  "6xl": 56,
};

/**
 * ============================================================================
 * BORDER RADIUS (consistent rounding)
 * ============================================================================
 */
export const borderRadius = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  full: 999,
};

/**
 * ============================================================================
 * SHADOW STYLES (for depth and elevation)
 * ============================================================================
 */
export const shadows = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
  },
  xl: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 10,
  },
};

/**
 * ============================================================================
 * BUTTON STYLES
 * ============================================================================
 *
 * Primary Button:
 * - Font: 16px, weight 600
 * - Padding: 14px vertical, 24px horizontal
 * - Border Radius: 12px
 * - Background: Teal (#005B78)
 * - Text Color: White
 *
 * Secondary Button:
 * - Font: 14px, weight 600
 * - Padding: 12px vertical, 20px horizontal
 * - Border Radius: 8px
 * - Background: Light Gray (#F9FAFB)
 * - Border: 1px, Light Gray (#E5E7EB)
 * - Text Color: Dark Gray (#111827)
 *
 * Tertiary/Ghost Button:
 * - Font: 14px, weight 600
 * - Padding: 8px vertical, 12px horizontal
 * - No background or border
 * - Text Color: Teal
 */

export const buttonStyles = {
  // Primary Button - High emphasis
  primary: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary.teal,
    text: {
      fontSize: 16,
      fontWeight: "600" as const,
      color: colors.text.inverse,
    },
  },

  // Secondary Button - Medium emphasis
  secondary: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.light,
    text: {
      fontSize: 14,
      fontWeight: "600" as const,
      color: colors.text.primary,
    },
  },

  // Tertiary/Ghost Button - Low emphasis
  tertiary: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: borderRadius.md,
    backgroundColor: "transparent",
    text: {
      fontSize: 14,
      fontWeight: "600" as const,
      color: colors.primary.teal,
    },
  },

  // Small Button
  small: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary.teal,
    text: {
      fontSize: 14,
      fontWeight: "600" as const,
      color: colors.text.inverse,
    },
  },

  // Large Button
  large: {
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary.teal,
    text: {
      fontSize: 16,
      fontWeight: "700" as const,
      color: colors.text.inverse,
    },
  },

  // Disabled State
  disabled: {
    opacity: 0.5,
  },
};

/**
 * ============================================================================
 * INPUT FIELD STYLES
 * ============================================================================
 *
 * Standard Input:
 * - Height: 44px
 * - Font: 14px, weight 400
 * - Padding: 12px horizontal, 14px vertical
 * - Border Radius: 8px
 * - Border: 1px solid Light Gray
 *
 * Focus State:
 * - Border Color: Teal (#005B78)
 * - Border Width: 2px
 */
export const inputStyles = {
  container: {
    height: 44,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border.light,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.background.primary,
  },
  text: {
    fontSize: 14,
    fontWeight: "400" as const,
    color: colors.text.primary,
  },
  placeholder: {
    color: colors.text.tertiary,
  },
  focus: {
    borderColor: colors.primary.teal,
    borderWidth: 2,
  },
};

/**
 * ============================================================================
 * CARD STYLES
 * ============================================================================
 *
 * Standard Card:
 * - Border Radius: 12px
 * - Border: 1px solid Light Gray
 * - Padding: 16px
 * - Background: White
 * - Shadow: Small
 */
export const cardStyles = {
  container: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border.light,
    backgroundColor: colors.background.primary,
    padding: spacing.lg,
    ...shadows.sm,
  },
};

/**
 * ============================================================================
 * MODAL STYLES
 * ============================================================================
 *
 * Standard Modal:
 * - Overlay: Semi-transparent black (50%)
 * - Border Radius: 20px (top corners)
 * - Padding: 20px
 */
export const modalStyles = {
  overlay: {
    backgroundColor: colors.background.overlay,
  },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.background.primary,
    paddingHorizontal: spacing.xl,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  headerTitle: {
    ...typography.heading.h4,
    color: colors.text.primary,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    flexDirection: "row",
    gap: spacing.md,
  },
};

/**
 * ============================================================================
 * SECTION/SCREEN PADDING
 * ============================================================================
 *
 * Screen Padding: 16px on all sides for standard screens
 * Card Padding: 16px for card content
 * Modal Content Padding: 20px
 */
export const screenPadding = {
  horizontal: spacing.lg,
  vertical: spacing.lg,
};

/**
 * ============================================================================
 * COMPONENT GAPS & LAYOUT
 * ============================================================================
 *
 * Used for flexbox gaps between elements
 */
export const gaps = {
  xs: spacing.xs, // 4px - minimal gap
  sm: spacing.sm, // 8px - small items
  md: spacing.md, // 12px - standard gap
  lg: spacing.lg, // 16px - medium gap
  xl: spacing.xl, // 20px - large gap
  section: spacing.xl, // 20px - between sections
};

/**
 * ============================================================================
 * LINE HEIGHT REFERENCE
 * ============================================================================
 *
 * Used for consistent vertical rhythm
 */
export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
};

/**
 * ============================================================================
 * RESPONSIVE BREAKPOINTS
 * ============================================================================
 *
 * Mobile: < 480px
 * Small: 480px - 640px
 * Medium: 640px - 768px
 * Large: 768px - 1024px
 * XLarge: > 1024px
 */
export const breakpoints = {
  mobile: 0,
  small: 480,
  medium: 640,
  large: 768,
  xlarge: 1024,
};

/**
 * ============================================================================
 * OPACITY/ALPHA VALUES
 * ============================================================================
 */
export const opacity = {
  disabled: 0.5,
  hover: 0.8,
  focus: 0.9,
  active: 1,
};

/**
 * ============================================================================
 * TRANSITION/ANIMATION DURATIONS
 * ============================================================================
 */
export const duration = {
  fast: 100,
  base: 200,
  slow: 300,
  slower: 500,
};

/**
 * ============================================================================
 * DESIGN SYSTEM EXPORT
 * ============================================================================
 *
 * Usage Examples:
 *
 * ```typescript
 * import { colors, typography, spacing, buttonStyles } from './constants/designSystem';
 *
 * // Using in styles
 * const styles = StyleSheet.create({
 *   button: {
 *     ...buttonStyles.primary,
 *   },
 *   heading: {
 *     ...typography.heading.h2,
 *     color: colors.text.primary,
 *   },
 *   container: {
 *     padding: spacing.lg,
 *     gap: gaps.md,
 *   },
 * });
 * ```
 */

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  buttonStyles,
  inputStyles,
  cardStyles,
  modalStyles,
  screenPadding,
  gaps,
  lineHeights,
  breakpoints,
  opacity,
  duration,
};
