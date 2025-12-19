# DESIGN SYSTEM IMPLEMENTATION GUIDE

## Step-by-Step Instructions for Using the New Design System

---

## Quick Start

### 1. Import Design Tokens

```typescript
// At the top of your component file
import {
  colors,
  spacing,
  typography,
  borderRadius,
  buttonStyles,
} from "../constants/designSystem";
```

### 2. Use Typography Components

```typescript
import {
  Heading1,
  Heading2,
  BodyText,
  Label
} from '../components/common/Typography';

// Instead of:
<Text style={{ fontSize: 24, fontWeight: '600' }}>Title</Text>

// Do this:
<Heading2>Title</Heading2>
```

### 3. Use Button Component

```typescript
import { Button } from '../components/common/Button';

// Instead of:
<TouchableOpacity style={{ backgroundColor: '#005B78', padding: 14 }}>
  <Text>Click Me</Text>
</TouchableOpacity>

// Do this:
<Button variant="primary" onPress={() => handleClick()}>
  Click Me
</Button>
```

### 4. Use Spacing Utilities

```typescript
import * as S from "../utils/spacing";

// Instead of:
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
});

// Do this:
const styles = StyleSheet.create({
  container: {
    ...S.paddingHV("lg", "md"),
    gap: spacing.md,
  },
});
```

---

## Common Patterns

### Pattern 1: Simple Card with Title and Body

```typescript
import React from "react";
import { View, StyleSheet } from "react-native";
import { Heading3, BodyText } from "../components/common/Typography";
import { colors, spacing, borderRadius } from "../constants/designSystem";
import * as S from "../utils/spacing";

const SimpleCard = ({ title, description }) => {
  return (
    <View style={styles.card}>
      <Heading3>{title}</Heading3>
      <BodyText color={colors.text.secondary}>{description}</BodyText>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    ...S.border(1, colors.border.light),
    borderRadius: borderRadius.lg,
    ...S.padding("lg"),
    backgroundColor: colors.background.primary,
    gap: spacing.md,
  },
});

export default SimpleCard;
```

### Pattern 2: Form Field with Label and Input

```typescript
import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Label, Caption } from "../components/common/Typography";
import { colors, spacing, inputStyles } from "../constants/designSystem";
import * as S from "../utils/spacing";

const FormField = ({ label, placeholder, error, onChangeText }) => {
  return (
    <View style={styles.field}>
      <Label>{label}</Label>
      <TextInput
        placeholder={placeholder}
        style={[styles.input, error && styles.inputError]}
        onChangeText={onChangeText}
      />
      {error && <Caption color={colors.semantic.error}>{error}</Caption>}
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  input: {
    ...inputStyles.container,
  },
  inputError: {
    borderColor: colors.semantic.error,
    borderWidth: 2,
  },
});

export default FormField;
```

### Pattern 3: Button Group (Save/Cancel)

```typescript
import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "../components/common/Button";
import { spacing } from "../constants/designSystem";

const FormFooter = ({ onCancel, onSave, saveDisabled, savingLoading }) => {
  return (
    <View style={styles.footer}>
      <Button variant="secondary" onPress={onCancel} fullWidth>
        Cancel
      </Button>
      <Button
        variant="primary"
        onPress={onSave}
        loading={savingLoading}
        disabled={saveDisabled}
        fullWidth
      >
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
});

export default FormFooter;
```

### Pattern 4: List Item with Icon and Details

```typescript
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Heading4, BodySmall } from "../components/common/Typography";
import { colors, spacing } from "../constants/designSystem";
import * as S from "../utils/spacing";

const ListItem = ({ icon, title, subtitle, onPress }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.icon}>{icon}</View>
      <View style={styles.content}>
        <Heading4>{title}</Heading4>
        <BodySmall color={colors.text.secondary}>{subtitle}</BodySmall>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    ...S.rowCenter("lg"),
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  icon: {
    width: 40,
    height: 40,
    ...S.center(),
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
});

export default ListItem;
```

### Pattern 5: Section with Header and Content

```typescript
import React from "react";
import { View, StyleSheet } from "react-native";
import { Heading2, BodyText } from "../components/common/Typography";
import { spacing } from "../constants/designSystem";
import * as S from "../utils/spacing";

const Section = ({ title, children }) => {
  return (
    <View style={styles.section}>
      <Heading2>{title}</Heading2>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    ...S.sectionContainer("lg"),
    marginVertical: spacing.xl,
  },
});

export default Section;
```

---

## Migration Guide: Converting Old Code

### Old Code (Without Design System)

```typescript
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#005B78",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

<View style={styles.container}>
  <Text style={styles.title}>Welcome</Text>
  <Text style={styles.description}>Enter your details below</Text>
  <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>Submit</Text>
  </TouchableOpacity>
</View>;
```

### New Code (With Design System)

```typescript
import { Heading2, BodyText } from "../components/common/Typography";
import { Button } from "../components/common/Button";
import { colors, spacing } from "../constants/designSystem";
import * as S from "../utils/spacing";

const styles = StyleSheet.create({
  container: {
    ...S.paddingHV("lg", "lg"),
    backgroundColor: colors.background.primary,
    gap: spacing.lg,
  },
});

<View style={styles.container}>
  <Heading2>Welcome</Heading2>
  <BodyText color={colors.text.secondary}>Enter your details below</BodyText>
  <Button variant="primary" onPress={handleSubmit}>
    Submit
  </Button>
</View>;
```

### Benefits of the New Approach

1. **Less code** - No need to define styles for typography
2. **Consistency** - All H2 headings look identical
3. **Maintainability** - Change heading style once in designSystem.ts
4. **Scalability** - Easy to support new screen sizes
5. **Accessibility** - Built-in proper contrast and sizing

---

## Common Issues & Solutions

### Issue 1: Text Overflowing in Button

**Problem**: Button text is cut off or overflowing

**Solution 1: Use numberOfLines**

```typescript
<Button style={{ width: "80%" }}>View All Details</Button>
```

**Solution 2: Reduce font size with custom style**

```typescript
<Button size="sm" textStyle={{ fontSize: 14 }}>
  View All Details
</Button>
```

### Issue 2: Inconsistent Spacing Between Sections

**Problem**: Gaps between sections don't match the design system

**Solution**: Use spacing tokens consistently

```typescript
// Good
const gap = spacing.xl; // 20px between sections

// Avoid mixing spacing values
marginBottom: 15; // Don't hardcode values
marginTop: 18;
```

### Issue 3: Colors Don't Match Brand

**Problem**: Colors in the app don't match the brand guidelines

**Solution**: Always use the colors object

```typescript
// Good
color: colors.primary.teal;
color: colors.text.secondary;

// Avoid hardcoding hex values
color: "#005B78";
color: "#6B7280";
```

### Issue 4: Different Font Sizes in Same Type of Element

**Problem**: H2 headings have different sizes in different places

**Solution**: Use typography components consistently

```typescript
// Always use Heading2 for H2
<Heading2>Section Title</Heading2>

// Never do this
<Text style={{ fontSize: 24 }}>Section Title</Text>
<Text style={{ fontSize: 22 }}>Another Section</Text>
```

### Issue 5: Button Padding/Size Inconsistent

**Problem**: Buttons in different screens have different sizes

**Solution**: Use the Button component with size prop

```typescript
// Standard button (14px × 24px padding)
<Button variant="primary">Action</Button>

// Small button (10px × 16px padding)
<Button variant="primary" size="sm">OK</Button>

// Large button (16px × 28px padding)
<Button variant="primary" size="lg">Get Started</Button>
```

---

## Performance Considerations

### 1. Extract Styles to Prevent Recreation

**Good** - Styles defined once at bottom

```typescript
const MyComponent = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: { padding: spacing.lg },
});
```

**Avoid** - Styles created on every render

```typescript
const MyComponent = () => {
  return <View style={{ padding: spacing.lg }} />;
};
```

### 2. Use Memoization for Complex Components

```typescript
import React, { memo } from "react";

const PropertyCard = memo(({ property, onPress }) => {
  // Component implementation
});

export default PropertyCard;
```

### 3. Batch Style Changes

```typescript
// Good - One style object
<View style={[styles.base, condition && styles.variant]} />

// Avoid - Multiple conditional styles
<View style={{
  padding: spacing.lg,
  ...(condition && { backgroundColor: colors.primary.teal }),
}} />
```

---

## Accessibility Best Practices

### 1. Sufficient Color Contrast

All text uses colors with sufficient contrast:

- Primary text (#111827) on white background
- Secondary text (#6B7280) on light backgrounds
- Error text (#EF4444) visible on all backgrounds

### 2. Readable Font Sizes

Minimum font size is 12px for body text, 14px for regular content.

### 3. Touch Targets

All touch targets are at least 44px in height/width for accessibility.

### 4. Clear Focus States

Buttons have clear focus states (activeOpacity) for keyboard navigation.

---

## Testing Your Design System Implementation

### Checklist for New Screens

- [ ] All headings use typography components (Heading1-4)
- [ ] All body text uses BodyText, BodySmall, or BodyLarge
- [ ] All labels use Label component
- [ ] All buttons use Button component
- [ ] All spacing uses spacing tokens
- [ ] All colors use colors object
- [ ] Border radius uses borderRadius tokens
- [ ] No hardcoded hex colors or pixel values for spacing
- [ ] Text doesn't overflow in any container
- [ ] Touch targets are at least 44px
- [ ] Works on multiple screen sizes

### Quick Test: Replace Hardcoded Values

```typescript
// Find and replace patterns
// Search: ": [0-9]{2}[,}] (for spacing)
// Search: "color: "#[0-9A-F]{6}" (for colors)
// Search: fontSize: [0-9]{2} (for typography)

// Replace with design system tokens
```

---

## Extending the Design System

### Adding a New Button Variant

Edit `designSystem.ts`:

```typescript
export const buttonStyles = {
  // ... existing variants

  // New variant
  success: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.semantic.success,
    text: {
      fontSize: 16,
      fontWeight: "600" as const,
      color: colors.text.inverse,
    },
  },
};
```

Update Button.tsx:

```typescript
type ButtonVariant = "primary" | "secondary" | "tertiary" | "success";

const getButtonStyle = (variant: ButtonVariant) => {
  // ... handle new variant
};
```

### Adding a New Typography Style

Edit `designSystem.ts`:

```typescript
export const typography = {
  // ... existing styles

  heading: {
    // ... existing headings
    h5: {
      fontSize: 14,
      fontWeight: "600" as const,
      lineHeight: 20,
    },
  },
};
```

Add component to Typography.tsx:

```typescript
export const Heading5: React.FC<TypographyProps> = ({
  children,
  color = colors.text.primary,
  style,
  align = "left",
  ...props
}) => (
  <Text
    {...props}
    style={[
      {
        ...typography.heading.h5,
        color,
        textAlign: align,
      },
      style,
    ]}
  >
    {children}
  </Text>
);
```

---

## FAQ

**Q: Can I override the design system styles?**
A: Yes, for specific edge cases, you can pass additional styles. But try to stick to the system first.

```typescript
<Button style={{ backgroundColor: colors.semantic.warning }}>
  Warning Action
</Button>
```

**Q: How do I handle dark mode?**
A: The current design system is light mode only. To support dark mode, duplicate the colors object with dark variants.

**Q: What if the design system is missing something?**
A: Add it to designSystem.ts and create/update the corresponding component. Keep everything in one place.

**Q: Can components use multiple design system files?**
A: Yes, import from designSystem.ts, Button.tsx, Typography.tsx, and spacing.ts as needed.

**Q: How do I handle very long text in buttons?**
A: Either use a smaller size, reduce padding, or make the button wider. Never let text overflow.

---

## Resources

- **Main Design System**: `/src/constants/designSystem.ts`
- **Button Component**: `/src/components/common/Button.tsx`
- **Typography Component**: `/src/components/common/Typography.tsx`
- **Spacing Utilities**: `/src/utils/spacing.ts`
- **Full Documentation**: `/DESIGN_SYSTEM.md`

---

## Support

For questions or issues with the design system:

1. Check this guide first
2. Review the DESIGN_SYSTEM.md for detailed documentation
3. Look at example components in the codebase
4. Check the component source files for inline documentation

---

**Version**: 1.0.0
**Last Updated**: December 18, 2025
