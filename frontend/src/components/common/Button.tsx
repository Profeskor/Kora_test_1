import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from "react-native";
import {
  buttonStyles,
  colors,
  spacing,
  borderRadius,
} from "../../constants/designSystem";

/**
 * ============================================================================
 * BUTTON COMPONENT
 * ============================================================================
 *
 * A flexible, reusable button component that supports multiple variants,
 * sizes, and states (loading, disabled).
 *
 * Usage:
 * <Button variant="primary" size="lg" onPress={() => {}}>
 *   Click Me
 * </Button>
 */

interface ButtonProps {
  /**
   * The button variant determines its visual style
   * - 'primary': High emphasis (solid teal background)
   * - 'secondary': Medium emphasis (light background with border)
   * - 'tertiary': Low emphasis (transparent, text only)
   */
  variant?: "primary" | "secondary" | "tertiary";

  /**
   * The size of the button
   * - 'sm': Compact button for tight spaces
   * - 'md': Standard button (default)
   * - 'lg': Large button for main CTAs
   */
  size?: "sm" | "md" | "lg";

  /**
   * The label/text displayed in the button
   */
  children: string;

  /**
   * Callback function when button is pressed
   */
  onPress: () => void;

  /**
   * Whether the button is disabled
   */
  disabled?: boolean;

  /**
   * Show loading indicator and disable interaction
   */
  loading?: boolean;

  /**
   * Additional custom styles for the button container
   */
  style?: ViewStyle;

  /**
   * Additional custom styles for the button text
   */
  textStyle?: TextStyle;

  /**
   * Custom color for the button (overrides variant)
   */
  color?: string;

  /**
   * Full width button
   */
  fullWidth?: boolean;

  /**
   * Custom active opacity
   */
  activeOpacity?: number;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
  color,
  fullWidth = false,
  activeOpacity = 0.7,
}) => {
  const isInteractionDisabled = disabled || loading;

  // Determine button style based on variant and size
  const getButtonStyle = (): ViewStyle => {
    let variantStyle = buttonStyles.primary;

    if (variant === "secondary") {
      variantStyle = buttonStyles.secondary;
    } else if (variant === "tertiary") {
      variantStyle = buttonStyles.tertiary;
    }

    let sizeStyle: ViewStyle = {};
    if (size === "sm") {
      sizeStyle = {
        paddingVertical: 10,
        paddingHorizontal: 16,
      };
    } else if (size === "lg") {
      sizeStyle = {
        paddingVertical: 16,
        paddingHorizontal: 28,
      };
    }

    const backgroundColor = color || variantStyle.backgroundColor;

    return {
      ...variantStyle,
      ...sizeStyle,
      backgroundColor: isInteractionDisabled
        ? colors.neutral.gray[300]
        : backgroundColor,
      width: fullWidth ? "100%" : "auto",
      opacity: isInteractionDisabled ? colors.opacity?.disabled || 0.5 : 1,
    };
  };

  const getTextStyle = (): TextStyle => {
    const variantStyle = buttonStyles[variant] || buttonStyles.primary;

    let textColor = variantStyle.text?.color || colors.text.inverse;

    // Override text color for disabled state
    if (isInteractionDisabled) {
      textColor = colors.text.secondary;
    }

    return {
      ...variantStyle.text,
      color: textColor,
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={isInteractionDisabled}
      activeOpacity={activeOpacity}
    >
      {loading ? (
        <ActivityIndicator
          color={getTextStyle().color || colors.text.inverse}
          size="small"
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

/**
 * ============================================================================
 * ICON BUTTON COMPONENT
 * ============================================================================
 *
 * A compact button for icons with optional label
 *
 * Usage:
 * <IconButton icon={<IconComponent />} onPress={() => {}} />
 */

interface IconButtonProps {
  /**
   * Icon component to render
   */
  icon: React.ReactNode;

  /**
   * Optional text label
   */
  label?: string;

  /**
   * Callback when pressed
   */
  onPress: () => void;

  /**
   * Button variant
   */
  variant?: "primary" | "secondary" | "tertiary";

  /**
   * Size of the button
   */
  size?: "sm" | "md" | "lg";

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Additional styles
   */
  style?: ViewStyle;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  onPress,
  variant = "secondary",
  size = "md",
  disabled = false,
  style,
}) => {
  const getIconButtonStyle = (): ViewStyle => {
    let paddingValue = spacing.md;

    if (size === "sm") {
      paddingValue = spacing.sm;
    } else if (size === "lg") {
      paddingValue = spacing.lg;
    }

    const variantStyle =
      variant === "primary"
        ? { backgroundColor: colors.primary.teal }
        : variant === "secondary"
        ? {
            backgroundColor: colors.background.secondary,
            borderWidth: 1,
            borderColor: colors.border.light,
          }
        : { backgroundColor: "transparent" };

    return {
      width: 40 + paddingValue,
      height: 40 + paddingValue,
      borderRadius: borderRadius.md,
      justifyContent: "center" as const,
      alignItems: "center" as const,
      ...variantStyle,
      opacity: disabled ? 0.5 : 1,
    };
  };

  const button = (
    <TouchableOpacity
      style={[getIconButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {icon}
    </TouchableOpacity>
  );

  if (label) {
    return (
      <View style={{ alignItems: "center", gap: spacing.xs }}>
        {button}
        <Text
          style={{
            fontSize: 12,
            fontWeight: "600" as const,
            color: colors.text.primary,
          }}
        >
          {label}
        </Text>
      </View>
    );
  }

  return button;
};

/**
 * ============================================================================
 * BUTTON GROUP COMPONENT
 * ============================================================================
 *
 * Renders a group of buttons (horizontal or vertical)
 *
 * Usage:
 * <ButtonGroup
 *   direction="horizontal"
 *   buttons={[
 *     { label: 'Cancel', onPress: () => {}, variant: 'secondary' },
 *     { label: 'Save', onPress: () => {}, variant: 'primary' },
 *   ]}
 * />
 */

interface ButtonGroupButton {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
}

interface ButtonGroupProps {
  /**
   * Array of button configurations
   */
  buttons: ButtonGroupButton[];

  /**
   * Direction of button layout
   */
  direction?: "horizontal" | "vertical";

  /**
   * Gap between buttons
   */
  gap?: number;

  /**
   * Style for the container
   */
  style?: ViewStyle;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  buttons,
  direction = "horizontal",
  gap = spacing.md,
  style,
}) => {
  return (
    <View
      style={[
        {
          flexDirection: direction === "horizontal" ? "row" : "column",
          gap: gap,
        },
        style,
      ]}
    >
      {buttons.map((btn, index) => (
        <Button
          key={index}
          variant={btn.variant}
          size={btn.size}
          onPress={btn.onPress}
          disabled={btn.disabled}
          loading={btn.loading}
          fullWidth={direction === "vertical"}
        >
          {btn.label}
        </Button>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
});

export default Button;
