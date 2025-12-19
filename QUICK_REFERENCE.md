# DESIGN SYSTEM QUICK REFERENCE

## Cheat Sheet for Daily Development

---

## Color Quick Reference

### Brand Colors

```
Primary Teal: #005B78      (buttons, links, active states)
Navy:         #0D1B2A      (dark backgrounds)
Gold Light:   #F5D58A      (highlights)
Gold Medium:  #E3B873      (secondary highlights)
```

### Neutral Colors

```
White:        #FFFFFF      (backgrounds)
Gray 50:      #F9FAFB      (light backgrounds)
Gray 200:     #E5E7EB      (borders, dividers)
Gray 500:     #6B7280      (secondary text)
Gray 700:     #374151      (primary text)
Black:        #111827      (darkest text)
```

### Semantic

```
Success:      #10B981      (confirmations)
Warning:      #F59E0B      (warnings)
Error:        #EF4444      (errors)
Info:         #3B82F6      (information)
```

---

## Spacing Quick Reference

```
xs:   4px
sm:   8px
md:   12px
lg:   16px       ← Most common
xl:   20px
2xl:  24px
3xl:  32px
4xl:  40px
5xl:  48px
6xl:  56px
```

---

## Typography Quick Reference

### Headings

```
H1: 32px, weight 600, line-height 40px  (Page titles)
H2: 24px, weight 600, line-height 30px  (Section titles)
H3: 18px, weight 700, line-height 24px  (Card titles)
H4: 16px, weight 600, line-height 22px  (Minor headings)
```

### Body

```
Large:  16px, weight 400, line-height 24px
Normal: 14px, weight 400, line-height 22px  ← Most common
Small:  12px, weight 400, line-height 18px
```

### Labels

```
Large:  14px, weight 600
Normal: 13px, weight 600  ← Most common
Small:  12px, weight 600
```

---

## Component Usage Cheat Sheet

### Import All Common Items

```typescript
import { colors, spacing, borderRadius } from "../constants/designSystem";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  BodyText,
  Label,
} from "../components/common/Typography";
import { Button, IconButton } from "../components/common/Button";
import * as S from "../utils/spacing";
```

### Typography

```typescript
<Heading1>Main Title</Heading1>
<Heading2>Section</Heading2>
<Heading3>Card Title</Heading3>
<Heading4>Label</Heading4>
<BodyText>Regular text</BodyText>
<BodySmall color={colors.text.secondary}>Secondary</BodySmall>
<Label>Field Label</Label>
<Caption>Extra small text</Caption>
```

### Buttons

```typescript
<Button variant="primary">Main Action</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>

<Button size="sm">Small</Button>
<Button size="md">Medium</Button>  ← Default
<Button size="lg">Large</Button>

<Button fullWidth>Full Width</Button>
<Button loading={isLoading}>Submit</Button>
<Button disabled={!isValid}>Save</Button>
```

### Spacing Utilities

```typescript
{...S.padding('lg')}              // all sides
{...S.paddingHV('lg', 'md')}     // horizontal, vertical
{...S.margin('lg')}
{...S.marginHV('lg', 'md')}
{...S.gap('md')}                  // flex gap
{...S.rowCenter('md')}            // flex row centered
{...S.columnCenter('lg')}         // flex column centered
{...S.center()}                   // center all
{...S.spaceBetween()}             // space-between
```

---

## Common Patterns

### Screen Container

```typescript
const styles = StyleSheet.create({
  container: {
    ...S.screenPadding(),
    backgroundColor: colors.background.primary,
  },
});
```

### Card Container

```typescript
const styles = StyleSheet.create({
  card: {
    ...S.border(1, colors.border.light),
    borderRadius: borderRadius.lg,
    ...S.padding("lg"),
    backgroundColor: colors.background.primary,
  },
});
```

### Form Field

```typescript
const styles = StyleSheet.create({
  field: {
    ...S.formField("sm"),
  },
  input: {
    height: 44,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border.light,
    paddingHorizontal: spacing.md,
  },
});
```

### List Item

```typescript
const styles = StyleSheet.create({
  item: {
    ...S.rowCenter("lg"),
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
});
```

### Button Row

```typescript
<View style={{ gap: spacing.md, flexDirection: "row" }}>
  <Button variant="secondary" fullWidth>
    Cancel
  </Button>
  <Button variant="primary" fullWidth>
    Save
  </Button>
</View>
```

---

## Border Radius Reference

```
none: 0px
xs:   4px
sm:   6px
md:   8px      ← Most common
lg:   12px     ← Cards
xl:   16px
full: 999px    ← Circles/pills
```

---

## Style Spread Syntax

### Combine Styles Easily

```typescript
const baseCard = StyleSheet.create({
  card: {
    ...S.border(1, colors.border.light),
    ...S.padding("lg"),
    borderRadius: borderRadius.lg,
  },
});

// Apply with conditional
<View style={[baseCard.card, selected && styles.selected]} />;
```

---

## Don't Forget These!

### ❌ Hardcoded Values

```typescript
// DON'T:
padding: 16;
color: "#005B78";
fontSize: 24;
gap: 12;
```

### ✅ Design System

```typescript
// DO:
...S.padding('lg')
color: colors.primary.teal
...typography.heading.h2
gap: spacing.md
```

---

## Mobile-First Tips

1. **Always test on multiple screen sizes**
2. **Use responsive utilities for large screens**
3. **Ensure touch targets are 44px minimum**
4. **Test text overflow with long content**
5. **Use flexbox for responsive layouts**

---

## Accessibility Checklist

- [ ] Text color contrast sufficient (primary text on backgrounds)
- [ ] Touch targets ≥ 44px × 44px
- [ ] Text is readable (min 12px for body, 14px for normal)
- [ ] Focus states are visible
- [ ] Buttons have clear active state
- [ ] Error messages are red AND have text
- [ ] No color-only indicators

---

## File Locations

```
Design System:     /src/constants/designSystem.ts
Button Component:  /src/components/common/Button.tsx
Typography:        /src/components/common/Typography.tsx
Spacing Utils:     /src/utils/spacing.ts
Full Docs:         /DESIGN_SYSTEM.md
Implementation:    /IMPLEMENTATION_GUIDE.md
```

---

## One-Minute Rules

1. **Typography** → Use design system components (Heading1, BodyText, etc.)
2. **Spacing** → Use spacing tokens (sm, md, lg, xl) never hardcode
3. **Colors** → Use colors object, never #hex values
4. **Buttons** → Use Button component, not TouchableOpacity
5. **Border Radius** → Use borderRadius tokens
6. **Padding** → Use spacing utilities for consistency

---

## Emergency Copy-Paste

### Standard Card

```typescript
<View
  style={{
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    backgroundColor: colors.background.primary,
    gap: spacing.md,
  }}
>
  <Heading3>Title</Heading3>
  <BodyText>Content</BodyText>
</View>
```

### Standard Button Section

```typescript
<View style={{ gap: spacing.md, paddingHorizontal: spacing.lg }}>
  <Button fullWidth variant="primary" onPress={onSave}>
    Save
  </Button>
  <Button fullWidth variant="secondary" onPress={onCancel}>
    Cancel
  </Button>
</View>
```

### Standard Form Field

```typescript
<View style={{ marginBottom: spacing.lg, gap: spacing.sm }}>
  <Label>Field Label</Label>
  <TextInput
    placeholder="Enter value"
    style={{
      height: 44,
      borderRadius: borderRadius.md,
      borderWidth: 1,
      borderColor: colors.border.light,
      paddingHorizontal: spacing.md,
    }}
  />
</View>
```

---

## Performance Tips

1. **Extract StyleSheet.create() outside component**
2. **Use memoization for list items**
3. **Avoid inline styles when possible**
4. **Batch conditional styles: [base, condition && variant]**
5. **Use gap instead of margin for flex layouts**

---

## Quick Decision Tree

```
Need text?
  ├─ Is it a heading?
  │  ├─ Large page title → H1
  │  ├─ Section → H2
  │  ├─ Card title → H3
  │  └─ Minor → H4
  ├─ Is it body text?
  │  ├─ Important → BodyLarge
  │  ├─ Regular → BodyText
  │  └─ Secondary → BodySmall
  └─ Is it a label?
     ├─ Form label → Label
     ├─ Badge → LabelSmall
     └─ Caption → Caption

Need padding/margin?
  ├─ Screen padding → S.screenPadding()
  ├─ Card padding → S.padding('lg')
  ├─ Custom → S.paddingHV() or spacing.lg
  └─ Between elements → gap: spacing.md

Need color?
  ├─ Brand → colors.primary.teal
  ├─ Text → colors.text.primary/secondary
  ├─ Semantic → colors.semantic.error
  └─ Border → colors.border.light

Need button?
  ├─ Main action → variant="primary"
  ├─ Alternative → variant="secondary"
  ├─ Light action → variant="tertiary"
  └─ Icon only → IconButton component
```

---

**Keep this handy! Reference it daily for quick lookups.**

Last Updated: December 18, 2025
