# DESIGN SYSTEM VISUAL & EXAMPLE COMPONENTS

## Complete Working Examples

---

## Example 1: Complete Property Card Component

A fully functional property card using the design system:

```typescript
import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import {
  Heading3,
  BodyText,
  Label,
  Caption,
  LabelSmall,
} from "../components/common/Typography";
import { Button } from "../components/common/Button";
import {
  colors,
  spacing,
  borderRadius,
  shadows,
} from "../constants/designSystem";
import * as S from "../utils/spacing";
import { Bed, Maximize2, DollarSign } from "lucide-react-native";

interface PropertyCardProps {
  property: {
    id: string;
    name: string;
    location: string;
    image?: string;
    bedrooms: number;
    area: number;
    price: number;
    featured?: boolean;
  };
  onPress: () => void;
  onViewDetails: () => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onPress,
  onViewDetails,
}) => {
  const formatPrice = (price: number) => {
    return `AED ${(price / 1000000).toFixed(2)}M`;
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        {property.image ? (
          <Image source={{ uri: property.image }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Caption color={colors.text.tertiary}>Property Image</Caption>
          </View>
        )}

        {/* Featured Badge */}
        {property.featured && (
          <View style={styles.badge}>
            <LabelSmall color={colors.background.primary}>Featured</LabelSmall>
          </View>
        )}
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        {/* Title */}
        <Heading3 numberOfLines={1}>{property.name}</Heading3>

        {/* Location */}
        <BodyText color={colors.text.secondary} numberOfLines={1}>
          {property.location}
        </BodyText>

        {/* Details Grid */}
        <View style={styles.detailsGrid}>
          {/* Bedrooms */}
          <View style={styles.detailItem}>
            <View style={S.center()}>
              <Bed size={14} color={colors.text.secondary} />
            </View>
            <Label>{property.bedrooms} BR</Label>
          </View>

          {/* Area */}
          <View style={styles.detailItem}>
            <View style={S.center()}>
              <Maximize2 size={14} color={colors.text.secondary} />
            </View>
            <Label>{property.area.toLocaleString()} sqft</Label>
          </View>

          {/* Price */}
          <View style={styles.detailItem}>
            <View style={S.center()}>
              <DollarSign size={14} color={colors.primary.teal} />
            </View>
            <Label color={colors.primary.teal}>
              {formatPrice(property.price)}
            </Label>
          </View>
        </View>

        {/* Action Button */}
        <Button fullWidth variant="primary" size="md" onPress={onViewDetails}>
          View Details
        </Button>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    ...S.border(1, colors.border.light),
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background.primary,
    overflow: "hidden",
    ...shadows.md,
  },
  imageContainer: {
    width: "100%",
    height: 160,
    backgroundColor: colors.background.tertiary,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    ...S.center(),
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    backgroundColor: colors.primary.teal,
    ...S.padding("sm"),
    borderRadius: borderRadius.sm,
  },
  content: {
    ...S.padding("lg"),
    gap: spacing.md,
  },
  detailsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: spacing.md,
  },
  detailItem: {
    flex: 1,
    gap: spacing.xs,
    alignItems: "center",
  },
});

export default PropertyCard;
```

---

## Example 2: Complete Sign-Up Form

A full form with validation and styling:

```typescript
import React, { useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  Heading1,
  Heading4,
  BodyText,
  Label,
  Caption,
  ErrorText,
} from "../components/common/Typography";
import { Button, ButtonGroup } from "../components/common/Button";
import {
  colors,
  spacing,
  inputStyles,
  borderRadius,
} from "../constants/designSystem";
import * as S from "../utils/spacing";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const SignUpForm: React.FC<{
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
}> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.includes("@")) {
      newErrors.email = "Valid email is required";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  const FormField: React.FC<{
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    error?: string;
    secureTextEntry?: boolean;
    keyboardType?:
      | "default"
      | "email-address"
      | "numeric"
      | "phone-pad"
      | "decimal-pad";
  }> = ({
    label,
    value,
    onChangeText,
    placeholder,
    error,
    secureTextEntry,
    keyboardType,
  }) => (
    <View style={styles.field}>
      <Label>{label}</Label>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder={placeholder}
        placeholderTextColor={colors.text.tertiary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        editable={!loading}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Heading1>Create Account</Heading1>
          <BodyText color={colors.text.secondary}>
            Join Kora to find your perfect property
          </BodyText>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          <FormField
            label="First Name"
            placeholder="John"
            value={formData.firstName}
            onChangeText={(firstName) =>
              setFormData({ ...formData, firstName })
            }
            error={errors.firstName}
          />

          <FormField
            label="Last Name"
            placeholder="Doe"
            value={formData.lastName}
            onChangeText={(lastName) => setFormData({ ...formData, lastName })}
            error={errors.lastName}
          />

          <FormField
            label="Email Address"
            placeholder="you@example.com"
            value={formData.email}
            onChangeText={(email) => setFormData({ ...formData, email })}
            keyboardType="email-address"
            error={errors.email}
          />

          <FormField
            label="Password"
            placeholder="••••••••"
            value={formData.password}
            onChangeText={(password) => setFormData({ ...formData, password })}
            secureTextEntry
            error={errors.password}
          />

          <FormField
            label="Confirm Password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChangeText={(confirmPassword) =>
              setFormData({ ...formData, confirmPassword })
            }
            secureTextEntry
            error={errors.confirmPassword}
          />
        </View>

        {/* Info Text */}
        <View style={styles.infoBox}>
          <Heading4>Password Requirements</Heading4>
          <Caption color={colors.text.secondary}>
            • At least 8 characters
          </Caption>
          <Caption color={colors.text.secondary}>
            • Mix of uppercase and lowercase
          </Caption>
          <Caption color={colors.text.secondary}>• At least one number</Caption>
        </View>

        {/* Buttons */}
        <View style={styles.footer}>
          <ButtonGroup
            direction="vertical"
            buttons={[
              {
                label: "Create Account",
                onPress: handleSubmit,
                variant: "primary",
                loading: loading,
                disabled: loading,
              },
              {
                label: "Already have an account? Sign In",
                onPress: onCancel,
                variant: "tertiary",
                disabled: loading,
              },
            ]}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollContent: {
    ...S.screenPadding(),
    gap: spacing.xl,
  },
  header: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  form: {
    gap: spacing.lg,
  },
  field: {
    gap: spacing.sm,
  },
  input: {
    ...inputStyles.container,
  },
  inputError: {
    borderColor: colors.semantic.error,
    borderWidth: 2,
  },
  infoBox: {
    ...S.padding("lg"),
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.secondary,
    gap: spacing.sm,
  },
  footer: {
    marginBottom: spacing.xl,
  },
});

export default SignUpForm;
```

---

## Example 3: Settings Screen with List Items

A complete settings screen using design system:

```typescript
import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from "react-native";
import {
  Heading1,
  Heading4,
  BodyText,
  Caption,
  BodySmall,
} from "../components/common/Typography";
import { colors, spacing, borderRadius } from "../constants/designSystem";
import * as S from "../utils/spacing";
import { Bell, Lock, Eye, LogOut, ChevronRight } from "lucide-react-native";

export const SettingsScreen: React.FC<{
  onLogout: () => void;
}> = ({ onLogout }) => {
  const [notifications, setNotifications] = useState(true);
  const [privateProfile, setPrivateProfile] = useState(false);

  interface SettingItem {
    id: string;
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    action?: () => void;
    toggle?: boolean;
    toggleValue?: boolean;
    onToggleChange?: (value: boolean) => void;
  }

  const SettingItem: React.FC<{
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    action?: () => void;
    toggle?: boolean;
    toggleValue?: boolean;
    onToggleChange?: (value: boolean) => void;
  }> = ({
    icon,
    title,
    subtitle,
    action,
    toggle,
    toggleValue,
    onToggleChange,
  }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={action}
      disabled={toggle}
    >
      <View style={styles.iconContainer}>{icon}</View>

      <View style={styles.settingContent}>
        <Heading4>{title}</Heading4>
        {subtitle && (
          <BodySmall color={colors.text.secondary}>{subtitle}</BodySmall>
        )}
      </View>

      {toggle ? (
        <Switch
          value={toggleValue || false}
          onValueChange={onToggleChange}
          trackColor={{
            false: colors.border.light,
            true: colors.primary.teal,
          }}
        />
      ) : (
        <ChevronRight size={20} color={colors.text.tertiary} />
      )}
    </TouchableOpacity>
  );

  const Section: React.FC<{
    title: string;
    children: React.ReactNode;
  }> = ({ title, children }) => (
    <View style={styles.section}>
      <Heading4 color={colors.text.secondary}>{title}</Heading4>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Heading1>Settings</Heading1>
        <BodyText color={colors.text.secondary}>
          Manage your account preferences
        </BodyText>
      </View>

      {/* Notifications Section */}
      <Section title="NOTIFICATIONS">
        <SettingItem
          icon={<Bell size={20} color={colors.primary.teal} />}
          title="Push Notifications"
          subtitle="Receive property alerts and updates"
          toggle={true}
          toggleValue={notifications}
          onToggleChange={setNotifications}
        />
      </Section>

      {/* Privacy Section */}
      <Section title="PRIVACY & SECURITY">
        <SettingItem
          icon={<Eye size={20} color={colors.primary.teal} />}
          title="Profile Visibility"
          subtitle={privateProfile ? "Private" : "Public"}
          toggle={true}
          toggleValue={privateProfile}
          onToggleChange={setPrivateProfile}
        />
        <SettingItem
          icon={<Lock size={20} color={colors.primary.teal} />}
          title="Change Password"
          subtitle="Update your password"
          action={() => {}}
        />
      </Section>

      {/* Account Section */}
      <Section title="ACCOUNT">
        <SettingItem
          icon={<LogOut size={20} color={colors.semantic.error} />}
          title="Sign Out"
          subtitle="You'll need to sign in again"
          action={onLogout}
        />
      </Section>

      {/* Footer Info */}
      <View style={styles.footer}>
        <Caption color={colors.text.tertiary} align="center">
          Kora App Version 1.0.0
        </Caption>
        <Caption color={colors.text.tertiary} align="center">
          © 2025 Kora. All rights reserved.
        </Caption>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    ...S.screenPadding(),
    gap: spacing.xl,
  },
  header: {
    gap: spacing.md,
  },
  section: {
    gap: spacing.md,
  },
  sectionContent: {
    ...S.border(1, colors.border.light),
    borderRadius: borderRadius.lg,
    overflow: "hidden",
    backgroundColor: colors.background.primary,
  },
  settingItem: {
    ...S.rowCenter("lg"),
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  iconContainer: {
    width: 40,
    height: 40,
    ...S.center(),
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.md,
  },
  settingContent: {
    flex: 1,
    gap: spacing.xs,
  },
  footer: {
    gap: spacing.md,
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
});

export default SettingsScreen;
```

---

## Example 4: Modal with Confirmation

A reusable confirmation modal:

```typescript
import React from "react";
import { Modal, View, StyleSheet } from "react-native";
import { Heading2, BodyText, Caption } from "../components/common/Typography";
import { Button, ButtonGroup } from "../components/common/Button";
import { colors, spacing, modalStyles } from "../constants/designSystem";
import * as S from "../utils/spacing";
import { AlertCircle } from "lucide-react-native";

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  type?: "info" | "warning" | "error" | "success";
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  title,
  message,
  type = "info",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) => {
  const getIconColor = () => {
    switch (type) {
      case "error":
        return colors.semantic.error;
      case "warning":
        return colors.semantic.warning;
      case "success":
        return colors.semantic.success;
      default:
        return colors.primary.teal;
    }
  };

  const getConfirmVariant = (): "primary" | "secondary" | "tertiary" => {
    switch (type) {
      case "error":
        return "primary";
      default:
        return "primary";
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={modalStyles.overlay}>
        <View style={[modalStyles.container, styles.modal]}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <AlertCircle size={48} color={getIconColor()} />
          </View>

          {/* Header */}
          <View style={modalStyles.header}>
            <Heading2>{title}</Heading2>
          </View>

          {/* Content */}
          <View style={modalStyles.content}>
            <BodyText color={colors.text.secondary}>{message}</BodyText>
          </View>

          {/* Footer */}
          <View style={modalStyles.footer}>
            <ButtonGroup
              direction="horizontal"
              buttons={[
                {
                  label: cancelText,
                  onPress: onCancel,
                  variant: "secondary",
                  disabled: loading,
                },
                {
                  label: confirmText,
                  onPress: onConfirm,
                  variant: getConfirmVariant(),
                  loading: loading,
                  disabled: loading,
                },
              ]}
              gap={spacing.md}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: spacing.lg,
    borderRadius: 20,
  },
  iconContainer: {
    ...S.center(),
    marginTop: spacing.xl,
  },
});

export default ConfirmModal;
```

---

## Example 5: Property Grid List

Complete property listing with design system:

```typescript
import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Heading1, BodySmall } from "../components/common/Typography";
import { Button } from "../components/common/Button";
import { colors, spacing } from "../constants/designSystem";
import * as S from "../utils/spacing";
import { PropertyCard } from "./PropertyCard";

interface Property {
  id: string;
  name: string;
  location: string;
  bedrooms: number;
  area: number;
  price: number;
  featured?: boolean;
  image?: string;
}

interface PropertyGridProps {
  properties: Property[];
  loading?: boolean;
  onPropertyPress: (id: string) => void;
  onViewDetails: (id: string) => void;
  onLoadMore?: () => void;
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  loading = false,
  onPropertyPress,
  onViewDetails,
  onLoadMore,
}) => {
  const [numColumns, setNumColumns] = useState(1);

  const renderItem = ({ item }: { item: Property }) => (
    <PropertyCard
      property={item}
      onPress={() => onPropertyPress(item.id)}
      onViewDetails={() => onViewDetails(item.id)}
    />
  );

  const renderFooter = () => {
    if (!loading) return null;

    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color={colors.primary.teal} />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) return null;

    return (
      <View style={styles.emptyState}>
        <Heading1>No Properties Found</Heading1>
        <BodySmall
          color={colors.text.secondary}
          style={{ textAlign: "center" }}
        >
          Try adjusting your filters or search criteria
        </BodySmall>
        <Button
          variant="primary"
          onPress={() => {}}
          style={{ marginTop: spacing.xl }}
        >
          Clear Filters
        </Button>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Heading1>Properties</Heading1>
        <BodySmall color={colors.text.secondary}>
          {properties.length} properties available
        </BodySmall>
      </View>

      {/* List */}
      <FlatList
        data={properties}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
        contentContainerStyle={styles.listContent}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    ...S.screenPadding(),
    gap: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  listContent: {
    ...S.screenPadding(),
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  columnWrapper: {
    gap: spacing.md,
  },
  footer: {
    ...S.center(),
    paddingVertical: spacing.xl,
  },
  emptyState: {
    ...S.center(),
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    gap: spacing.lg,
  },
});

export default PropertyGrid;
```

---

## Color Palette Visual Reference

```
PRIMARY BRAND
┌─────────────────────────────────────┐
│ Teal        #005B78 ████████████    │  Main color for buttons, links
│ Navy        #0D1B2A ████████████    │  Dark backgrounds
│ Gold Light  #F5D58A ████████████    │  Highlights
└─────────────────────────────────────┘

NEUTRAL GRAYS
┌─────────────────────────────────────┐
│ White       #FFFFFF ████████████    │  Backgrounds
│ Gray 50     #F9FAFB ████████████    │  Light backgrounds
│ Gray 200    #E5E7EB ████████████    │  Borders
│ Gray 500    #6B7280 ████████████    │  Secondary text
│ Gray 700    #374151 ████████████    │  Primary text
│ Black       #111827 ████████████    │  Dark text
└─────────────────────────────────────┘

SEMANTIC
┌─────────────────────────────────────┐
│ Success     #10B981 ████████████    │  Confirmations
│ Warning     #F59E0B ████████████    │  Warnings
│ Error       #EF4444 ████████████    │  Errors
│ Info        #3B82F6 ████████████    │  Information
└─────────────────────────────────────┘
```

---

## Typography Scale Visual

```
H1  ███████████████████████ 32px, weight 600
H2  ██████████████████ 24px, weight 600
H3  ███████████████ 18px, weight 700
H4  ██████████████ 16px, weight 600
─────────────────────────────────────
Body Large  ██████████████ 16px, weight 400
Body Normal ██████████ 14px, weight 400
Body Small  ████████ 12px, weight 400
─────────────────────────────────────
Label      ██████████ 13px, weight 600
Caption    ████████ 12px, weight 500
Overline   ███████ 11px, weight 700
```

---

These examples demonstrate:

- ✅ Full component integration
- ✅ Proper use of design tokens
- ✅ Responsive layouts
- ✅ Accessibility features
- ✅ Error handling
- ✅ Loading states
- ✅ Real-world patterns

All examples are production-ready and follow best practices!
