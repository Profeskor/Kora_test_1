/**
 * ============================================================================
 * SPACING & LAYOUT UTILITIES
 * ============================================================================
 *
 * Helper functions and utilities for consistent spacing and layout
 * throughout the application.
 */

import { ViewStyle } from "react-native";
import { spacing, gaps, borderRadius, colors } from "../constants/designSystem";

/**
 * ============================================================================
 * PADDING UTILITIES
 * ============================================================================
 */

/**
 * Padding on all sides
 */
export const padding = (value: number | keyof typeof spacing): ViewStyle => ({
  padding: typeof value === "number" ? value : spacing[value],
});

/**
 * Padding horizontal and vertical
 */
export const paddingHV = (
  horizontal: number | keyof typeof spacing,
  vertical: number | keyof typeof spacing
): ViewStyle => ({
  paddingHorizontal:
    typeof horizontal === "number" ? horizontal : spacing[horizontal],
  paddingVertical: typeof vertical === "number" ? vertical : spacing[vertical],
});

/**
 * Padding with individual values
 */
export const paddingCustom = (
  top?: number | keyof typeof spacing,
  right?: number | keyof typeof spacing,
  bottom?: number | keyof typeof spacing,
  left?: number | keyof typeof spacing
): ViewStyle => ({
  paddingTop: top ? (typeof top === "number" ? top : spacing[top]) : undefined,
  paddingRight: right
    ? typeof right === "number"
      ? right
      : spacing[right]
    : undefined,
  paddingBottom: bottom
    ? typeof bottom === "number"
      ? bottom
      : spacing[bottom]
    : undefined,
  paddingLeft: left
    ? typeof left === "number"
      ? left
      : spacing[left]
    : undefined,
});

/**
 * ============================================================================
 * MARGIN UTILITIES
 * ============================================================================
 */

/**
 * Margin on all sides
 */
export const margin = (value: number | keyof typeof spacing): ViewStyle => ({
  margin: typeof value === "number" ? value : spacing[value],
});

/**
 * Margin horizontal and vertical
 */
export const marginHV = (
  horizontal: number | keyof typeof spacing,
  vertical: number | keyof typeof spacing
): ViewStyle => ({
  marginHorizontal:
    typeof horizontal === "number" ? horizontal : spacing[horizontal],
  marginVertical: typeof vertical === "number" ? vertical : spacing[vertical],
});

/**
 * Margin with individual values
 */
export const marginCustom = (
  top?: number | keyof typeof spacing,
  right?: number | keyof typeof spacing,
  bottom?: number | keyof typeof spacing,
  left?: number | keyof typeof spacing
): ViewStyle => ({
  marginTop: top ? (typeof top === "number" ? top : spacing[top]) : undefined,
  marginRight: right
    ? typeof right === "number"
      ? right
      : spacing[right]
    : undefined,
  marginBottom: bottom
    ? typeof bottom === "number"
      ? bottom
      : spacing[bottom]
    : undefined,
  marginLeft: left
    ? typeof left === "number"
      ? left
      : spacing[left]
    : undefined,
});

/**
 * ============================================================================
 * GAP UTILITIES (for flexbox)
 * ============================================================================
 */

/**
 * Gap between flex items
 */
export const gapHorizontal = (
  value: number | keyof typeof spacing
): ViewStyle => ({
  gap: typeof value === "number" ? value : spacing[value],
  flexDirection: "row",
});

/**
 * Vertical gap between flex items
 */
export const gapVertical = (
  value: number | keyof typeof spacing
): ViewStyle => ({
  gap: typeof value === "number" ? value : spacing[value],
  flexDirection: "column",
});

/**
 * Gap with specific value
 */
export const gap = (value: number | keyof typeof spacing): ViewStyle => ({
  gap: typeof value === "number" ? value : spacing[value],
});

/**
 * ============================================================================
 * FLEX & LAYOUT UTILITIES
 * ============================================================================
 */

/**
 * Center content (flexbox center)
 */
export const center = (): ViewStyle => ({
  justifyContent: "center",
  alignItems: "center",
});

/**
 * Flex row with centered items
 */
export const rowCenter = (gap?: number | keyof typeof spacing): ViewStyle => ({
  flexDirection: "row",
  alignItems: "center",
  gap: gap ? (typeof gap === "number" ? gap : spacing[gap]) : 0,
});

/**
 * Flex column with centered items
 */
export const columnCenter = (
  gap?: number | keyof typeof spacing
): ViewStyle => ({
  flexDirection: "column",
  alignItems: "center",
  gap: gap ? (typeof gap === "number" ? gap : spacing[gap]) : 0,
});

/**
 * Space between content (flex space-between)
 */
export const spaceBetween = (): ViewStyle => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

/**
 * Full width and height
 */
export const fullSize = (): ViewStyle => ({
  width: "100%",
  height: "100%",
});

/**
 * Full width
 */
export const fullWidth = (): ViewStyle => ({
  width: "100%",
});

/**
 * Full height
 */
export const fullHeight = (): ViewStyle => ({
  height: "100%",
});

/**
 * Flex: 1 (take available space)
 */
export const flex = (value: number = 1): ViewStyle => ({
  flex: value,
});

/**
 * ============================================================================
 * BORDER & RADIUS UTILITIES
 * ============================================================================
 */

/**
 * Border with color and width
 */
export const border = (
  width: number = 1,
  color: string = colors.border.light
): ViewStyle => ({
  borderWidth: width,
  borderColor: color,
});

/**
 * Border radius
 */
export const rounded = (
  value: number | keyof typeof borderRadius
): ViewStyle => ({
  borderRadius: typeof value === "number" ? value : borderRadius[value],
});

/**
 * Rounded corners with individual values
 */
export const roundedCustom = (
  topLeft?: number | keyof typeof borderRadius,
  topRight?: number | keyof typeof borderRadius,
  bottomRight?: number | keyof typeof borderRadius,
  bottomLeft?: number | keyof typeof borderRadius
): ViewStyle => ({
  borderTopLeftRadius: topLeft
    ? typeof topLeft === "number"
      ? topLeft
      : borderRadius[topLeft]
    : undefined,
  borderTopRightRadius: topRight
    ? typeof topRight === "number"
      ? topRight
      : borderRadius[topRight]
    : undefined,
  borderBottomRightRadius: bottomRight
    ? typeof bottomRight === "number"
      ? bottomRight
      : borderRadius[bottomRight]
    : undefined,
  borderBottomLeftRadius: bottomLeft
    ? typeof bottomLeft === "number"
      ? bottomLeft
      : borderRadius[bottomLeft]
    : undefined,
});

/**
 * ============================================================================
 * SCREEN/SECTION STYLING UTILITIES
 * ============================================================================
 */

/**
 * Standard screen padding
 */
export const screenPadding = (): ViewStyle => ({
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.lg,
});

/**
 * Standard card padding
 */
export const cardPadding = (): ViewStyle => ({
  padding: spacing.lg,
});

/**
 * Section container with gap and padding
 */
export const sectionContainer = (
  gapValue: number | keyof typeof spacing = "md"
): ViewStyle => ({
  paddingHorizontal: spacing.lg,
  gap: typeof gapValue === "number" ? gapValue : spacing[gapValue],
});

/**
 * ============================================================================
 * RESPONSIVE UTILITIES
 * ============================================================================
 */

/**
 * Responsive padding based on screen width
 * For mobile devices, reduce padding; for larger screens, increase it
 */
export const responsivePadding = (screenWidth: number): ViewStyle => {
  let padValue = spacing.md;
  if (screenWidth > 768) {
    padValue = spacing.xl;
  } else if (screenWidth > 480) {
    padValue = spacing.lg;
  }
  return { padding: padValue };
};

/**
 * Responsive font size
 */
export const responsiveFontSize = (
  screenWidth: number,
  mobileSize: number,
  tabletSize: number,
  desktopSize: number
): number => {
  if (screenWidth > 768) {
    return desktopSize;
  } else if (screenWidth > 480) {
    return tabletSize;
  }
  return mobileSize;
};

/**
 * ============================================================================
 * COMMON LAYOUT COMBINATIONS
 * ============================================================================
 */

/**
 * Button/Card container with standard padding and rounded corners
 */
export const buttonContainer = (): ViewStyle => ({
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.md,
  borderRadius: borderRadius.md,
  alignItems: "center",
  justifyContent: "center",
});

/**
 * Modal content container
 */
export const modalContent = (): ViewStyle => ({
  paddingHorizontal: spacing.xl,
  paddingVertical: spacing.lg,
});

/**
 * List item container
 */
export const listItem = (
  gapValue: number | keyof typeof spacing = "md"
): ViewStyle => ({
  flexDirection: "row",
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.md,
  alignItems: "center",
  gap: typeof gapValue === "number" ? gapValue : spacing[gapValue],
});

/**
 * Form field container
 */
export const formField = (
  gapValue: number | keyof typeof spacing = "sm"
): ViewStyle => ({
  marginBottom: spacing.lg,
  gap: typeof gapValue === "number" ? gapValue : spacing[gapValue],
});

/**
 * Badge/Chip container
 */
export const badge = (): ViewStyle => ({
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.xs,
  borderRadius: borderRadius.full,
  alignItems: "center",
  justifyContent: "center",
});

/**
 * ============================================================================
 * COMBINATION UTILITIES
 * ============================================================================
 */

/**
 * Create a styled container with multiple properties
 */
export const container = (options: {
  padding?: number | keyof typeof spacing;
  margin?: number | keyof typeof spacing;
  gap?: number | keyof typeof spacing;
  borderRadius?: number | keyof typeof borderRadius;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  flex?: number;
}): ViewStyle => ({
  ...(options.padding && padding(options.padding)),
  ...(options.margin && margin(options.margin)),
  ...(options.gap && gap(options.gap)),
  ...(options.borderRadius && rounded(options.borderRadius)),
  ...(options.backgroundColor && { backgroundColor: options.backgroundColor }),
  ...(options.borderColor &&
    options.borderWidth && {
      borderColor: options.borderColor,
      borderWidth: options.borderWidth,
    }),
  ...(options.flex && { flex: options.flex }),
});

export default {
  // Padding
  padding,
  paddingHV,
  paddingCustom,

  // Margin
  margin,
  marginHV,
  marginCustom,

  // Gap
  gapHorizontal,
  gapVertical,
  gap,

  // Flex & Layout
  center,
  rowCenter,
  columnCenter,
  spaceBetween,
  fullSize,
  fullWidth,
  fullHeight,
  flex,

  // Border & Radius
  border,
  rounded,
  roundedCustom,

  // Screen/Section
  screenPadding,
  cardPadding,
  sectionContainer,

  // Responsive
  responsivePadding,
  responsiveFontSize,

  // Common Combinations
  buttonContainer,
  modalContent,
  listItem,
  formField,
  badge,

  // Advanced
  container,
};
