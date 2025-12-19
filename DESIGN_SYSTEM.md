# KORA DESIGN SYSTEM

## Comprehensive Design Standards & Guidelines

---

## Table of Contents

1. [Overview](#overview)
2. [Color Palette](#color-palette)
3. [Typography System](#typography-system)
4. [Spacing & Layout](#spacing--layout)
5. [Button Styles](#button-styles)
6. [Form Elements](#form-elements)
7. [Cards & Containers](#cards--containers)
8. [Modals & Overlays](#modals--overlays)
9. [Component Usage Guide](#component-usage-guide)
10. [Best Practices](#best-practices)
11. [Responsive Design](#responsive-design)
12. [Examples & Patterns](#examples--patterns)

---

## Overview

The Kora Design System is a comprehensive set of design tokens, UI components, and guidelines that ensure consistency across the application. This system addresses typography, layout, spacing, and component styling to maintain a cohesive user experience.

### Key Principles

- **Consistency**: Every element follows the same rules for sizing, spacing, and styling
- **Hierarchy**: Clear visual hierarchy using typography and spacing
- **Accessibility**: Proper contrast, spacing, and sizing for readability
- **Flexibility**: Adaptable to different screen sizes and use cases
- **Simplicity**: Easy-to-use components and utilities

### Files & Structure

```
frontend/src/
├── constants/
│   └── designSystem.ts       # All design tokens (colors, typography, spacing)
├── components/
│   └── common/
│       ├── Button.tsx         # Button components (primary, secondary, etc.)
│       ├── Typography.tsx      # Text components (H1, Body, Label, etc.)
│       └── ...
└── utils/
    └── spacing.ts            # Spacing and layout utilities
```

---

## Color Palette

### Primary Brand Colors

| Color       | Hex       | Usage                          |
| ----------- | --------- | ------------------------------ |
| Navy        | `#0D1B2A` | Primary dark backgrounds       |
| Teal        | `#005B78` | Primary action, buttons, links |
| Gold Light  | `#F5D58A` | Highlights, accents            |
| Gold Medium | `#E3B873` | Secondary highlights           |
| Gold Dark   | `#B98A44` | Tertiary accents, icons        |

### Neutral Colors

| Level    | Hex       | Usage              |
| -------- | --------- | ------------------ |
| White    | `#FFFFFF` | Backgrounds, cards |
| Gray 50  | `#F9FAFB` | Light backgrounds  |
| Gray 100 | `#F3F4F6` | Subtle backgrounds |
| Gray 200 | `#E5E7EB` | Borders, dividers  |
| Gray 300 | `#D1D5DB` | Secondary borders  |
| Gray 400 | `#9CA3AF` | Disabled text      |
| Gray 500 | `#6B7280` | Secondary text     |
| Gray 600 | `#4B5563` | Tertiary text      |
| Gray 700 | `#374151` | Primary text       |
| Gray 800 | `#1F2937` | Dark text          |
| Gray 900 | `#111827` | Darkest text       |

### Semantic Colors

| Type    | Hex       | Usage                           |
| ------- | --------- | ------------------------------- |
| Success | `#10B981` | Success messages, confirmations |
| Warning | `#F59E0B` | Warnings, cautions              |
| Error   | `#EF4444` | Errors, destructive actions     |
| Info    | `#3B82F6` | Informational messages          |

### Using Colors in Code

```typescript
import { colors } from "../constants/designSystem";

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary.teal,
    color: colors.text.inverse,
  },
  text: {
    color: colors.text.primary,
  },
  border: {
    borderColor: colors.border.light,
  },
});
```

---

## Typography System

### Heading Hierarchy

Create clear visual hierarchy with consistent heading sizes and weights.

#### H1 - Page/Section Titles

- **Size**: 32px
- **Weight**: 600 (Semibold)
- **Line Height**: 40px
- **Use Cases**: Main page titles, hero sections

```typescript
import { Heading1 } from "../components/common/Typography";

<Heading1>Welcome to Kora</Heading1>;
```

#### H2 - Section Titles

- **Size**: 24px
- **Weight**: 600 (Semibold)
- **Line Height**: 30px
- **Use Cases**: Section headers, modal titles

```typescript
import { Heading2 } from "../components/common/Typography";

<Heading2>Find Your Property</Heading2>;
```

#### H3 - Subsection Titles

- **Size**: 18px
- **Weight**: 700 (Bold)
- **Line Height**: 24px
- **Use Cases**: Card titles, list section headers

```typescript
import { Heading3 } from "../components/common/Typography";

<Heading3>Available Units</Heading3>;
```

#### H4 - Minor Headings

- **Size**: 16px
- **Weight**: 600 (Semibold)
- **Line Height**: 22px
- **Use Cases**: Form labels, small component titles

```typescript
import { Heading4 } from "../components/common/Typography";

<Heading4>Contact Information</Heading4>;
```

### Body Text

#### Large Body

- **Size**: 16px
- **Weight**: 400 (Regular)
- **Line Height**: 24px
- **Use Cases**: Intro text, important information

```typescript
import { BodyLarge } from "../components/common/Typography";

<BodyLarge>This is important information displayed prominently.</BodyLarge>;
```

#### Regular Body (Standard)

- **Size**: 14px
- **Weight**: 400 (Regular)
- **Line Height**: 22px
- **Use Cases**: Main content, descriptions, paragraphs

```typescript
import { BodyText, Body } from '../components/common/Typography';

<BodyText>Standard body text for regular paragraphs.</BodyText>
<Body>Alias for BodyText - same styling.</Body>
```

#### Small Body

- **Size**: 12px
- **Weight**: 400 (Regular)
- **Line Height**: 18px
- **Use Cases**: Secondary information, helper text, metadata

```typescript
import { BodySmall } from "../components/common/Typography";

<BodySmall color={colors.text.secondary}>Last updated 2 hours ago</BodySmall>;
```

### Labels & Captions

#### Large Label

- **Size**: 14px
- **Weight**: 600 (Semibold)
- **Use Cases**: Important field labels, prominent badges

```typescript
import { LabelLarge } from "../components/common/Typography";

<LabelLarge>Primary Contact</LabelLarge>;
```

#### Label (Standard)

- **Size**: 13px
- **Weight**: 600 (Semibold)
- **Use Cases**: Form field labels, table headers

```typescript
import { Label } from "../components/common/Typography";

<Label>Email Address</Label>;
```

#### Small Label

- **Size**: 12px
- **Weight**: 600 (Semibold)
- **Use Cases**: Small badges, inline labels

```typescript
import { LabelSmall } from "../components/common/Typography";

<LabelSmall>In Stock</LabelSmall>;
```

### Captions

#### Caption (Regular)

- **Size**: 12px
- **Weight**: 500 (Medium)
- **Use Cases**: Supplementary information, footnotes

```typescript
import { Caption } from "../components/common/Typography";

<Caption>View full details</Caption>;
```

#### Caption (Small)

- **Size**: 11px
- **Weight**: 500 (Medium)
- **Use Cases**: Tiny supplementary text, timestamps

```typescript
import { CaptionSmall } from "../components/common/Typography";

<CaptionSmall>Just now</CaptionSmall>;
```

### Overline (Uppercase Labels)

- **Size**: 11px
- **Weight**: 700 (Bold)
- **Letter Spacing**: 0.5px
- **Transform**: Uppercase
- **Use Cases**: Section labels, category tags

```typescript
import { Overline } from "../components/common/Typography";

<Overline>Featured Properties</Overline>;
```

### Semantic Text Colors

Use semantic text components for colored messages:

```typescript
import {
  ErrorText,
  SuccessText,
  WarningText,
  InfoText,
  MutedText
} from '../components/common/Typography';

<ErrorText>This field is required</ErrorText>
<SuccessText>Changes saved successfully</SuccessText>
<WarningText>This action cannot be undone</WarningText>
<InfoText>New features available</InfoText>
<MutedText>Optional field</MutedText>
```

---

## Spacing & Layout

### Spacing Scale (8px Base Unit)

| Token | Size | Common Uses                         |
| ----- | ---- | ----------------------------------- |
| xs    | 4px  | Minimal spacing between tight items |
| sm    | 8px  | Small component spacing             |
| md    | 12px | Standard spacing, section gaps      |
| lg    | 16px | Default padding, larger gaps        |
| xl    | 20px | Large sections, modals              |
| 2xl   | 24px | Extra large spacing                 |
| 3xl   | 32px | Between major sections              |
| 4xl   | 40px | Large screen sections               |
| 5xl   | 48px | Extra large spacing                 |
| 6xl   | 56px | Maximum spacing                     |

### Using Spacing in Code

```typescript
import { spacing } from "../constants/designSystem";
import * as S from "../utils/spacing";

// Using constants
const styles = StyleSheet.create({
  container: {
    padding: spacing.lg, // 16px
    marginBottom: spacing.xl, // 20px
    gap: spacing.md, // 12px
  },
});

// Using utilities
const containerStyle = {
  ...S.padding("lg"), // padding: 16px
  ...S.marginHV("lg", "md"), // marginHorizontal: 16px, marginVertical: 12px
  ...S.rowCenter("md"), // flexRow with centered items, gap: 12px
};
```

### Common Layout Utilities

#### Flexbox Helpers

```typescript
import * as S from '../utils/spacing';

// Center content
{ ...S.center() }                    // justify-content & align-items: center

// Row with centered items
{ ...S.rowCenter('md') }             // flex-row, aligned center, gap: 12px

// Column with centered items
{ ...S.columnCenter('lg') }          // flex-column, aligned center, gap: 16px

// Space between
{ ...S.spaceBetween() }              // justify-content: space-between

// Full width/height
{ ...S.fullWidth() }
{ ...S.fullHeight() }
{ ...S.fullSize() }
```

#### Padding & Margin Helpers

```typescript
// Uniform padding
{ ...S.padding('lg') }               // padding: 16px

// Horizontal & vertical
{ ...S.paddingHV('lg', 'md') }      // paddingH: 16px, paddingV: 12px

// Custom (top, right, bottom, left)
{ ...S.paddingCustom('lg', 'md') }

// Margin utilities (same pattern)
{ ...S.margin('lg') }
{ ...S.marginHV('lg', 'md') }
{ ...S.marginCustom('lg', 'md') }
```

#### Screen Padding

```typescript
// Standard screen padding (16px horizontal & vertical)
{ ...S.screenPadding() }

// Card content padding (16px all)
{ ...S.cardPadding() }

// Section container
{ ...S.sectionContainer('md') }  // horizontal padding + gap
```

---

## Button Styles

### Button Variants

All buttons support three variants: `primary`, `secondary`, and `tertiary`.

#### Primary Button

- **Use**: Main CTAs, confirm actions
- **Style**: Solid teal background, white text
- **Padding**: 14px vertical × 24px horizontal
- **Size**: 16px font, weight 600
- **Border Radius**: 12px

```typescript
import { Button } from "../components/common/Button";

<Button variant="primary" onPress={() => handleSave()}>
  Save Changes
</Button>;
```

#### Secondary Button

- **Use**: Alternative actions, less emphasis
- **Style**: Light gray background, 1px border, dark text
- **Padding**: 12px vertical × 20px horizontal
- **Size**: 14px font, weight 600
- **Border Radius**: 8px

```typescript
<Button variant="secondary" onPress={() => handleCancel()}>
  Cancel
</Button>
```

#### Tertiary Button

- **Use**: Lowest emphasis, text-only actions
- **Style**: Transparent background, teal text
- **Padding**: 8px vertical × 12px horizontal
- **Size**: 14px font, weight 600

```typescript
<Button variant="tertiary" onPress={() => handleSkip()}>
  Skip for now
</Button>
```

### Button Sizes

```typescript
// Small button
<Button size="sm" variant="primary">
  OK
</Button>

// Medium button (default)
<Button size="md" variant="primary">
  Continue
</Button>

// Large button
<Button size="lg" variant="primary">
  Get Started
</Button>
```

### Button States

#### Loading State

Shows a spinner instead of text, disables interaction.

```typescript
<Button loading={isLoading} onPress={() => handleSubmit()}>
  Submit Form
</Button>
```

#### Disabled State

Reduces opacity, prevents interaction.

```typescript
<Button disabled={!formIsValid} onPress={() => handleSubmit()}>
  Submit
</Button>
```

#### Full Width

Button expands to fill available width.

```typescript
<Button fullWidth variant="primary" onPress={() => handleAction()}>
  Full Width Button
</Button>
```

### Icon Button

For icon-only buttons with optional labels:

```typescript
import { IconButton } from "../components/common/Button";
import { Heart } from "lucide-react-native";

<IconButton
  icon={<Heart size={24} color="#005B78" />}
  label="Save"
  onPress={() => handleSave()}
  variant="secondary"
/>;
```

### Button Groups

Multiple buttons displayed together:

```typescript
import { ButtonGroup } from "../components/common/Button";

<ButtonGroup
  direction="horizontal"
  gap={12}
  buttons={[
    { label: "Cancel", onPress: () => onCancel(), variant: "secondary" },
    { label: "Save", onPress: () => onSave(), variant: "primary" },
  ]}
/>;
```

---

## Form Elements

### Input Fields

#### Standard Input

- **Height**: 44px
- **Font**: 14px, weight 400
- **Padding**: 12px horizontal × 10px vertical
- **Border**: 1px solid light gray
- **Border Radius**: 8px
- **Focus State**: 2px teal border

```typescript
import { colors, inputStyles } from "../constants/designSystem";

const styles = StyleSheet.create({
  input: {
    ...inputStyles.container,
  },
  inputText: {
    ...inputStyles.text,
  },
});
```

#### Input with Label

```typescript
<View>
  <Label>Full Name</Label>
  <TextInput
    placeholder="Enter your name"
    style={[styles.input, styles.inputText]}
  />
</View>
```

---

## Cards & Containers

### Card Styling

Standard cards maintain consistent padding, borders, and shadows.

- **Border Radius**: 12px
- **Border**: 1px solid light gray
- **Padding**: 16px
- **Background**: White
- **Shadow**: Small (subtle shadow for depth)

```typescript
import { cardStyles } from "../constants/designSystem";

const styles = StyleSheet.create({
  card: {
    ...cardStyles.container,
  },
});

<View style={styles.card}>
  <Heading3>Card Title</Heading3>
  <BodyText>Card content goes here</BodyText>
</View>;
```

---

## Modals & Overlays

### Modal Container

- **Overlay**: Semi-transparent black (50% opacity)
- **Border Radius**: 20px (top corners rounded)
- **Padding**: 20px
- **Header**: With title and close button

```typescript
import { modalStyles } from "../constants/designSystem";

<Modal transparent visible={isVisible}>
  <View style={modalStyles.overlay}>
    <View style={modalStyles.container}>
      <View style={modalStyles.header}>
        <Text style={modalStyles.headerTitle}>Confirm Action</Text>
      </View>

      <View style={modalStyles.content}>{/* Modal content */}</View>

      <View style={modalStyles.footer}>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Confirm</Button>
      </View>
    </View>
  </View>
</Modal>;
```

---

## Component Usage Guide

### Importing Components

```typescript
// Design tokens
import {
  colors,
  typography,
  spacing,
  buttonStyles,
} from "../constants/designSystem";

// Typography components
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  BodyText,
  BodySmall,
  BodyLarge,
  Label,
  LabelSmall,
  Caption,
  CaptionSmall,
  ErrorText,
  SuccessText,
} from "../components/common/Typography";

// Button components
import { Button, IconButton, ButtonGroup } from "../components/common/Button";

// Layout utilities
import * as S from "../utils/spacing";
```

### Complete Example: Property Card

```typescript
import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Heading3,
  BodyText,
  Label,
  Caption,
} from "../components/common/Typography";
import { Button } from "../components/common/Button";
import { colors, spacing, borderRadius } from "../constants/designSystem";
import * as S from "../utils/spacing";

export const PropertyCard = ({ property, onViewDetails }) => {
  return (
    <View style={styles.card}>
      {/* Image Placeholder */}
      <View style={styles.imagePlaceholder}>
        <Caption>Property Image</Caption>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Heading3>{property.name}</Heading3>

        <BodyText color={colors.text.secondary}>{property.location}</BodyText>

        {/* Details Grid */}
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Label>Bedrooms</Label>
            <BodyText>{property.bedrooms}</BodyText>
          </View>
          <View style={styles.detailItem}>
            <Label>Area</Label>
            <BodyText>{property.area} sqft</BodyText>
          </View>
          <View style={styles.detailItem}>
            <Label>Price</Label>
            <BodyText color={colors.primary.teal}>
              AED {property.price}
            </BodyText>
          </View>
        </View>

        {/* Action Button */}
        <Button fullWidth variant="primary" onPress={onViewDetails}>
          View Details
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    ...S.border(1, colors.border.light),
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background.primary,
    overflow: "hidden",
  },
  imagePlaceholder: {
    height: 200,
    backgroundColor: colors.background.tertiary,
    justifyContent: "center",
    alignItems: "center",
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
    gap: spacing.xs,
  },
});
```

---

## Best Practices

### 1. Use Design System Components

**✅ Good**

```typescript
import { Button, Heading2, BodyText } from '../components/common';

<Heading2>Welcome</Heading2>
<BodyText>Enter your details below</BodyText>
<Button variant="primary" onPress={onSubmit}>Submit</Button>
```

**❌ Avoid**

```typescript
<Text style={{ fontSize: 24, fontWeight: '600' }}>Welcome</Text>
<Text style={{ fontSize: 14 }}>Enter your details below</Text>
<TouchableOpacity style={{ backgroundColor: '#005B78', padding: 14 }}>
  <Text>Submit</Text>
</TouchableOpacity>
```

### 2. Use Spacing Tokens

**✅ Good**

```typescript
import { spacing } from "../constants/designSystem";

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.md,
  },
});
```

**❌ Avoid**

```typescript
const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
});
```

### 3. Use Color Tokens

**✅ Good**

```typescript
import { colors } from '../constants/designSystem';

style={{ color: colors.text.primary, borderColor: colors.border.light }}
```

**❌ Avoid**

```typescript
style={{ color: '#111827', borderColor: '#E5E7EB' }}
```

### 4. Maintain Heading Hierarchy

**✅ Good**

```typescript
<Heading1>Main Title</Heading1>
<Heading2>Section Title</Heading2>
<Heading3>Card Title</Heading3>
<BodyText>Regular content</BodyText>
```

**❌ Avoid**

```typescript
<Text style={{ fontSize: 32 }}>Main Title</Text>
<Text style={{ fontSize: 28 }}>Section Title</Text>
<Text style={{ fontSize: 18 }}>Card Title</Text>
<Text>Regular content</Text>
```

### 5. Consistent Padding & Margins

**✅ Good**

```typescript
<View style={{ padding: spacing.lg, gap: spacing.md }}>
  <Heading3>Title</Heading3>
  <BodyText>Content</BodyText>
</View>
```

**❌ Avoid**

```typescript
<View style={{ padding: 15, gap: 14 }}>
  <Heading3>Title</Heading3>
  <BodyText>Content</BodyText>
</View>
```

### 6. Use Layout Utilities

**✅ Good**

```typescript
import * as S from "../utils/spacing";

<View style={S.rowCenter("lg")}>
  <Icon />
  <Text>Centered content</Text>
</View>;
```

**❌ Avoid**

```typescript
<View
  style={{
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    justifyContent: "center",
  }}
>
  <Icon />
  <Text>Centered content</Text>
</View>
```

### 7. Test Text Overflow

Always check that text doesn't overflow in buttons, modals, or containers.

```typescript
// Use numberOfLines to truncate if needed
<BodyText numberOfLines={1}>Long text content...</BodyText>

// Or adjust container width
<View style={{ width: '85%' }}>
  <Heading4>Card Title That Might Be Long</Heading4>
</View>
```

---

## Responsive Design

### Breakpoints

The design system supports responsive layouts across different screen sizes:

| Breakpoint | Width          | Device            |
| ---------- | -------------- | ----------------- |
| Mobile     | < 480px        | Small phones      |
| Small      | 480px - 640px  | Standard phones   |
| Medium     | 640px - 768px  | Large phones      |
| Large      | 768px - 1024px | Tablets           |
| XLarge     | > 1024px       | Tablets, desktops |

### Responsive Padding

```typescript
import { useWindowDimensions } from "react-native";
import * as S from "../utils/spacing";

export const ResponsiveScreen = () => {
  const { width } = useWindowDimensions();
  const padding = S.responsivePadding(width);

  return <View style={padding}>{/* Content scales with screen size */}</View>;
};
```

### Responsive Font Sizes

```typescript
import { responsiveFontSize } from "../utils/spacing";

const fontSize = responsiveFontSize(
  screenWidth,
  14, // mobile size
  16, // tablet size
  18 // desktop size
);
```

---

## Examples & Patterns

### Sign-In Form

```typescript
import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import {
  Heading1,
  Label,
  Caption,
  BodyText,
} from "../components/common/Typography";
import { Button } from "../components/common/Button";
import {
  colors,
  spacing,
  inputStyles,
  borderRadius,
} from "../constants/designSystem";
import * as S from "../utils/spacing";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    // API call
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Heading1>Welcome Back</Heading1>
      <Caption color={colors.text.secondary}>
        Sign in to your account to continue
      </Caption>

      {/* Email Field */}
      <View style={S.formField("sm")}>
        <Label>Email Address</Label>
        <TextInput
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          style={[styles.input, styles.inputText]}
          keyboardType="email-address"
        />
      </View>

      {/* Password Field */}
      <View style={S.formField("sm")}>
        <Label>Password</Label>
        <TextInput
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          style={[styles.input, styles.inputText]}
          secureTextEntry
        />
      </View>

      {/* Sign In Button */}
      <Button
        fullWidth
        loading={loading}
        variant="primary"
        onPress={handleSignIn}
        style={{ marginBottom: spacing.md }}
      >
        Sign In
      </Button>

      {/* Forgot Password Link */}
      <View style={S.center()}>
        <Button variant="tertiary">Forgot Password?</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...S.padding("xl"),
    gap: spacing.md,
  },
  input: {
    ...inputStyles.container,
  },
  inputText: {
    ...inputStyles.text,
  },
});
```

### Property Grid

```typescript
import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { PropertyCard } from "./PropertyCard";
import { spacing } from "../constants/designSystem";
import * as S from "../utils/spacing";

export const PropertyGrid = ({ properties, onViewProperty }) => {
  const renderItem = ({ item }) => (
    <PropertyCard
      property={item}
      onViewDetails={() => onViewProperty(item.id)}
    />
  );

  return (
    <FlatList
      data={properties}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.content}
      scrollEnabled={true}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    ...S.paddingHV("lg", "lg"),
  },
  row: {
    gap: spacing.md,
  },
});
```

### Modal with Actions

```typescript
import React from "react";
import { Modal, View, StyleSheet } from "react-native";
import { Heading2, BodyText } from "../components/common/Typography";
import { Button, ButtonGroup } from "../components/common/Button";
import { colors, spacing, modalStyles } from "../constants/designSystem";
import * as S from "../utils/spacing";

export const ConfirmModal = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={modalStyles.overlay}>
        <View style={[modalStyles.container, { marginTop: "50%" }]}>
          {/* Header */}
          <View style={modalStyles.header}>
            <Heading2>{title}</Heading2>
          </View>

          {/* Content */}
          <View style={modalStyles.content}>
            <BodyText>{message}</BodyText>
          </View>

          {/* Footer with Actions */}
          <View style={modalStyles.footer}>
            <ButtonGroup
              direction="horizontal"
              buttons={[
                {
                  label: cancelText,
                  onPress: onCancel,
                  variant: "secondary",
                },
                {
                  label: confirmText,
                  onPress: onConfirm,
                  variant: "primary",
                },
              ]}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
```

---

## Quick Reference Checklist

When building new screens or components, verify:

- [ ] All text uses typography components (Heading, Body, Label, etc.)
- [ ] Spacing uses the `spacing` tokens (xs, sm, md, lg, xl, 2xl, etc.)
- [ ] Colors use the `colors` object (not hardcoded hex values)
- [ ] Buttons use the Button component with proper variants
- [ ] Form inputs use consistent height (44px) and styling
- [ ] Cards use the cardStyles from the design system
- [ ] Text alignment and overflow are handled properly
- [ ] Focus/disabled states are defined
- [ ] Mobile, tablet, and desktop layouts are considered
- [ ] Accessibility and readability are maintained
- [ ] No inconsistent spacing or sizing exists

---

## Support & Updates

For questions or suggestions about the design system, please refer to this documentation or check the source files in:

- `/src/constants/designSystem.ts` - Design tokens
- `/src/components/common/Button.tsx` - Button components
- `/src/components/common/Typography.tsx` - Text components
- `/src/utils/spacing.ts` - Layout utilities

---

**Last Updated**: December 18, 2025
**Version**: 1.0.0
