import React from "react";
import { Text as RNText, TextProps, StyleSheet, TextStyle } from "react-native";
import { typography, colors } from "../../constants/designSystem";

/**
 * ============================================================================
 * TYPOGRAPHY COMPONENTS
 * ============================================================================
 *
 * Reusable text components that enforce consistent typography throughout
 * the application. These components ensure that all headings, body text,
 * labels, and captions follow the design system.
 *
 * Usage:
 * <Heading1>Welcome</Heading1>
 * <BodyText>This is body text</BodyText>
 * <Label>Field Label</Label>
 */

export type FontWeight =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

interface TypographyProps extends TextProps {
  /**
   * Text content
   */
  children: React.ReactNode;

  /**
   * Color override
   */
  color?: string;

  /**
   * Additional custom styles
   */
  style?: TextStyle | TextStyle[];

  /**
   * Text alignment
   */
  align?: "auto" | "left" | "right" | "center" | "justify";

  /**
   * Number of lines to show
   */
  numberOfLines?: number;

  /**
   * Font weight override
   */
  fontWeight?: FontWeight;
}

/**
 * ============================================================================
 * HEADING COMPONENTS
 * ============================================================================
 */

/**
 * H1 - 32px, semibold, for major page titles
 */
export const Heading1: React.FC<TypographyProps> = ({
  children,
  color = colors.text.primary,
  style,
  align = "left",
  ...props
}) => (
  <RNText
    {...props}
    style={[
      {
        ...typography.heading.h1,
        color,
        textAlign: align,
      },
      style,
    ]}
  >
    {children}
  </RNText>
);

/**
 * H2 - 24px, semibold, for section titles
 */
export const Heading2: React.FC<TypographyProps> = ({
  children,
  color = colors.text.primary,
  style,
  align = "left",
  ...props
}) => (
  <RNText
    {...props}
    style={[
      {
        ...typography.heading.h2,
        color,
        textAlign: align,
      },
      style,
    ]}
  >
    {children}
  </RNText>
);

/**
 * H3 - 18px, bold, for subsection titles
 */
export const Heading3: React.FC<TypographyProps> = ({
  children,
  color = colors.text.primary,
  style,
  align = "left",
  ...props
}) => (
  <RNText
    {...props}
    style={[
      {
        ...typography.heading.h3,
        color,
        textAlign: align,
      },
      style,
    ]}
  >
    {children}
  </RNText>
);

/**
 * H4 - 16px, semibold, for card titles and smaller headings
 */
export const Heading4: React.FC<TypographyProps> = ({
  children,
  color = colors.text.primary,
  style,
  align = "left",
  ...props
}) => (
  <RNText
    {...props}
    style={[
      {
        ...typography.heading.h4,
        color,
        textAlign: align,
      },
      style,
    ]}
  >
    {children}
  </RNText>
);

/**
 * ============================================================================
 * BODY TEXT COMPONENTS
 * ============================================================================
 */

/**
 * BodyLarge - 16px, regular, for large body text
 */
export const BodyLarge: React.FC<TypographyProps> = ({
  children,
  color = colors.text.primary,
  style,
  align = "left",
  ...props
}) => (
  <RNText
    {...props}
    style={[
      {
        ...typography.body.large,
        color,
        textAlign: align,
      },
      style,
    ]}
  >
    {children}
  </RNText>
);

/**
 * BodyText (Regular) - 14px, regular, standard body text
 */
export const BodyText: React.FC<TypographyProps> = ({
  children,
  color = colors.text.primary,
  style,
  align = "left",
  ...props
}) => (
  <RNText
    {...props}
    style={[
      {
        ...typography.body.regular,
        color,
        textAlign: align,
      },
      style,
    ]}
  >
    {children}
  </RNText>
);

/**
 * Alias for BodyText - common naming convention
 */
export const Body: React.FC<TypographyProps> = BodyText;

/**
 * BodySmall - 12px, regular, for secondary body text
 */
export const BodySmall: React.FC<TypographyProps> = ({
  children,
  color = colors.text.secondary,
  style,
  align = "left",
  ...props
}) => (
  <RNText
    {...props}
    style={[
      {
        ...typography.body.small,
        color,
        textAlign: align,
      },
      style,
    ]}
  >
    {children}
  </RNText>
);

/**
 * ============================================================================
 * LABEL COMPONENTS
 * ============================================================================
 */

/**
 * LabelLarge - 14px, semibold, for important labels
 */
export const LabelLarge: React.FC<TypographyProps> = ({
  children,
  color = colors.text.primary,
  style,
  align = "left",
  ...props
}) => (
  <RNText
    {...props}
    style={[
      {
        ...typography.label.large,
        color,
        textAlign: align,
      },
      style,
    ]}
  >
    {children}
  </RNText>
);

/**
 * Label (Regular) - 13px, semibold, standard form labels
 */
export const Label: React.FC<TypographyProps> = ({
  children,
  color = colors.text.primary,
  style,
  align = "left",
  ...props
}) => (
  <RNText
    {...props}
    style={[
      {
        ...typography.label.regular,
        color,
        textAlign: align,
      },
      style,
    ]}
  >
    {children}
  </RNText>
);

/**
 * LabelSmall - 12px, semibold, for small labels and badges
 */
export const LabelSmall: React.FC<TypographyProps> = ({
  children,
  color = colors.text.secondary,
  style,
  align = "left",
  ...props
}) => (
  <RNText
    {...props}
    style={[
      {
        ...typography.label.small,
        color,
        textAlign: align,
      },
      style,
    ]}
  >
    {children}
  </RNText>
);

/**
 * ============================================================================
 * CAPTION COMPONENTS
 * ============================================================================
 */

/**
 * Caption - 12px, medium, for supplementary text
 */
export const Caption: React.FC<TypographyProps> = ({
  children,
  color = colors.text.secondary,
  style,
  align = "left",
  ...props
}) => (
  <RNText
    {...props}
    style={[
      {
        ...typography.caption.regular,
        color,
        textAlign: align,
      },
      style,
    ]}
  >
    {children}
  </RNText>
);

/**
 * CaptionSmall - 11px, medium, for small supplementary text
 */
export const CaptionSmall: React.FC<TypographyProps> = ({
  children,
  color = colors.text.tertiary,
  style,
  align = "left",
  ...props
}) => (
  <RNText
    {...props}
    style={[
      {
        ...typography.caption.small,
        color,
        textAlign: align,
      },
      style,
    ]}
  >
    {children}
  </RNText>
);

/**
 * ============================================================================
 * OVERLINE COMPONENT
 * ============================================================================
 */

/**
 * Overline - 11px, bold, for uppercase section labels
 */
export const Overline: React.FC<TypographyProps> = ({
  children,
  color = colors.text.secondary,
  style,
  align = "left",
  ...props
}) => (
  <RNText
    {...props}
    style={[
      {
        ...typography.overline.regular,
        color,
        textAlign: align,
        textTransform: "uppercase" as any,
      },
      style,
    ]}
  >
    {children}
  </RNText>
);

/**
 * ============================================================================
 * SEMANTIC TEXT COMPONENTS
 * ============================================================================
 */

/**
 * Error text - red color, body text size
 */
export const ErrorText: React.FC<TypographyProps> = ({
  children,
  style,
  ...props
}) => (
  <BodySmall color={colors.semantic.error} style={style} {...props}>
    {children}
  </BodySmall>
);

/**
 * Success text - green color
 */
export const SuccessText: React.FC<TypographyProps> = ({
  children,
  style,
  ...props
}) => (
  <BodySmall color={colors.semantic.success} style={style} {...props}>
    {children}
  </BodySmall>
);

/**
 * Warning text - orange color
 */
export const WarningText: React.FC<TypographyProps> = ({
  children,
  style,
  ...props
}) => (
  <BodySmall color={colors.semantic.warning} style={style} {...props}>
    {children}
  </BodySmall>
);

/**
 * Info text - blue color
 */
export const InfoText: React.FC<TypographyProps> = ({
  children,
  style,
  ...props
}) => (
  <BodySmall color={colors.semantic.info} style={style} {...props}>
    {children}
  </BodySmall>
);

/**
 * Muted text - gray secondary color
 */
export const MutedText: React.FC<TypographyProps> = ({
  children,
  style,
  ...props
}) => (
  <BodySmall color={colors.text.tertiary} style={style} {...props}>
    {children}
  </BodySmall>
);

/**
 * ============================================================================
 * GENERIC TEXT COMPONENT (FALLBACK)
 * ============================================================================
 *
 * Use this as a fallback when none of the above components fit your needs
 */

interface GenericTextProps extends TypographyProps {
  /**
   * Font size in pixels
   */
  fontSize?: number;

  /**
   * Font weight
   */
  fontWeight?:
    | "normal"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
    | "bold";

  /**
   * Line height
   */
  lineHeight?: number;
}

export const GenericText: React.FC<GenericTextProps> = ({
  children,
  fontSize = 14,
  fontWeight = "400",
  color = colors.text.primary,
  lineHeight,
  style,
  align = "left",
  ...props
}) => (
  <RNText
    {...props}
    style={[
      {
        fontSize,
        fontWeight,
        color,
        lineHeight: lineHeight || fontSize * 1.5,
        textAlign: align,
      },
      style,
    ]}
  >
    {children}
  </RNText>
);

const styles = StyleSheet.create({
  // Can be used for common text styles if needed
  baseText: {
    color: colors.text.primary,
  },
});

export default {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  BodyLarge,
  BodyText,
  Body,
  BodySmall,
  LabelLarge,
  Label,
  LabelSmall,
  Caption,
  CaptionSmall,
  Overline,
  ErrorText,
  SuccessText,
  WarningText,
  InfoText,
  MutedText,
  Text,
};
