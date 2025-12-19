```markdown
# APP_CONTEXT_SPEC

### 1. Architecture & Navigation Map

- **Sitemap (state-driven, no router)**
  - `splash` → `components/onboarding/SplashScreen.tsx`
  - `onboarding` → `components/onboarding/OnboardingCarousel.tsx`
  - `landing` → `components/LandingPage.tsx`
  - `auth` → `components/auth/UnifiedAuthPage.tsx`
  - `registration` → `components/registration/RegistrationFlow.tsx` (plus role/type steps in the same folder)
  - `multi-role-selector` → `components/auth/MultiRoleSelector.tsx`
  - `quick-pay` → `components/QuickPayScreen.tsx`
  - `app` (main shell) → header + tabbed content + `components/BottomNavigation.tsx`
    - `home` tab: role-specific home (`BrokerHome`/`BuyerHome`/`HomeownerHome`/`GuestHome`)
    - `search` tab: `components/broker/PropertySearch.tsx` (drills into `PropertyDetail`)
    - `shortlist` tab: `components/broker/Shortlist.tsx` (guest shows `guest/SignInRequired.tsx`)
    - `leads` tab: `components/broker/LeadManagement.tsx` (guest blocked)
    - `booking` tab: `components/broker/BookingManagement.tsx` (guest blocked)
  - Flow-only screens triggered from tabs or CTAs:
    - `property-detail` → `components/broker/PropertyDetail.tsx`
    - `unit-selection` → `components/broker/UnitSelection.tsx`
    - `my-leads`/`lead-detail`/`create-lead` → `LeadManagement`, `LeadDetail`, `CreateLead`
    - `my-bookings`/`booking-detail`/`create-booking` → `BookingManagement`, `BookingDetail`, `CreateBooking`
    - `compare-properties` → `components/broker/CompareProperties.tsx`
    - `virtual-tour` → `components/broker/VirtualTour.tsx`
- **User Flow (happy path)**
  - Splash → Onboarding carousel → Landing
  - Landing choices: Sign in/register → Auth → (if multi-role) Role selector → Main app; Create Account → Registration flow → back to Landing; Quick Pay → Payment wizard; Continue as Guest → Main app with guest role.
  - Inside app (broker role): Header (profile/notifications) + tabs (Home/Search/Shortlist/Leads/Booking). Deep links to Property Detail → Add Lead / Booking / Compare / Virtual Tour; Unit Selection reachable from broker cards.
- **State Management**
  - Pure React local state in `App.tsx` (no Redux/Context/Zustand). Key state: `currentScreen`, `activeTab`, `user` (`id`, `name`, `email`, `mobile`, `roles`, `currentRole`, `preferredRole`), role selector flags, selected IDs for property/lead/booking, modal toggles, comparison list (array of property IDs), notification/profile visibility, property detail visibility.

### 2. Design System & UI Specifications (CRITICAL)

- **Color Palette (observed)**
  - Primary: `#005B78` (buttons, headers, chips), gradient partner `#007a9e`.
  - Accent/Gold: `#C9A961` / `#C5A572` (tabs, chips, filters).
  - Accent dark card: `#1a2b3c`, gradient via `#2d4456`.
  - Backgrounds: `#F5F5F5`, `#E6F2F5`, `#CCE5EB`, `#FFFFFF`.
  - Status: green `#22c55e`/`#16a34a` (classes), amber `#f59e0b`, red `#ef4444`; gray scale from Tailwind (50–900).
  - Text defaults: dark gray (`var(--foreground)`), primary text overrides `#005B78`.
- **Typography**
  - Font family: Tailwind default sans (`ui-sans-serif, system-ui, ...`) from `index.css`.
  - Base sizes: `--text-base: 16px`; headings auto-scale via Tailwind utilities; common sizes in components: 14px, 16px, 24px, 32px for hero/banners.
  - Weights: normal 400, medium 500, bold 700 (via Tailwind classes).
- **Component Library & Custom Reusables**
  - Libraries: Tailwind CSS v4 (class utilities), lucide-react icons, sonner 2.0.3 for toasts, figma:asset imports for images, shadcn-style primitives under `src/components/ui/*` (buttons, inputs, dialog, drawer, accordion, table, chart, etc.; props mirror shadcn defaults).
  - Reusable app components:
    - `BottomNavigation` (props: `activeTab`, `onTabChange`, `onShowNotifications`, `onShowProfile`).
    - `ImageWithFallback` (figma image loader with fallback).
    - Role/auth: `UnifiedAuthPage` (props: `onSuccess(role)`, `onBack`, `onQuickPay`), `MultiRoleSelector` (`availableRoles`, `onSelectRole(role, remember?)`, `userName`, `showLogout`, `onLogout`, `isModal`, `onBack`), `RoleSelectionScreen` variants in `registration` and `auth`.
    - Broker flows: `BrokerHome` (`userName`, `onNavigate(screen)`, `onTabSwitch(tab)`, `comparisonCount`, `onPropertySelect(id)`), `PropertySearch` (`onPropertySelect`, `onBack`), `PropertyDetail` (`propertyId`, `onBack`, `onAddToLead`, `onBookNow`, `onAddToComparison`, `onVirtualTour`), `UnitSelection` (`propertyId`, `onBack`, `onUnitSelect`), `LeadManagement` (`onBack`, `onCreateLead`, `onLeadSelect`), `BookingManagement` (`onBack`, `onBookingSelect`, `onCreateBooking`), `CompareProperties` (`properties[]`, `onBack`, `onRemoveProperty`, `onPropertySelect`), `Shortlist` (`onBack`, `onPropertySelect`, `onCreateLead?`, `onCompare?`), `VirtualTour` (`propertyId`, `propertyName`, `onBack`), `CreateLead`, `LeadDetail`, `CreateBooking`, `BookingDetail`.
    - Other sections: `QuickPayScreen` (`onBack`), `LandingPage` CTA handlers, `OnboardingCarousel` (`onComplete`), `SplashScreen` (`onComplete`), `SignInRequired` gating component for guests.
- **Styling Strategy**
  - Tailwind utility classes dominate; gradients for CTAs, rounded-2xl shapes, glassmorphism overlays (`bg-white/20` + `backdrop-blur`), shadow-sm/md/lg for depth.
  - Global theme tokens defined in `src/index.css` and `src/styles/globals.css` (CSS variables for colors, radius, font sizes). No CSS Modules or styled-components.
- **Layout Patterns**
  - Mobile-first single column, max width ~`max-w-md` for auth/landing; main app uses `min-h-screen` flex column.
  - Header: white top bar with avatar circle + greeting, right notification icon.
  - Bottom navigation fixed with five items (Home, Search, Alliance CTA, Notifications, More/Profile).
  - Cards: rounded-2xl/3xl, padding 4–6, shadows; banners use image background with white overlay card.
  - Lists: sticky filter bars and search bars, scrollable chips (`scrollbar-hide`), grid stats, fixed bottom action bars for primary CTAs (Property Detail, Unit Selection).
  - Responsiveness: Tailwind `sm:` for desktop widening (modals become centered cards).

### 3. Page-by-Page Breakdown

- **Splash Screen (`SplashScreen`)**
  - Fullscreen figma image of Kora logo on marble background; auto-advances after 3s.
  - No API calls.
- **Onboarding Carousel (`OnboardingCarousel`)**
  - 3 slides with Unsplash hero images, headlines, description; gradient overlay, dot pagination, Continue/Skip buttons.
  - No API; internal timers for auto-advance.
- **Landing Page (`LandingPage`)**
  - Centered Kora logo, welcome copy; toggle tabs Email+Password vs Mobile+OTP; inputs styled with rounded-2xl fields; Sign In, Google continue; CTA buttons for Quick Pay, Create Account, Continue as Guest, Demo Account.
  - Actions trigger parent handlers; no backend call.
- **Unified Auth (`UnifiedAuthPage`)**
  - Toggle Login/Register; Quick Pay banner; fields for name/email/mobile/password; role selector chips for register (Broker/Buyer/Homeowner).
  - Calls `onSuccess(role)` to proceed; OTP links are placeholders.
- **Registration Flow (`RegistrationFlow` and substeps)**
  - Multi-step role-based registration (files in `components/registration/*`); uses progress indicators and role selection UIs similar to auth.
- **Multi Role Selector (`MultiRoleSelector`)**
  - Card list of roles with icons/colors; optional “remember my choice”; modal or full-screen variants.
  - On select, calls parent to set `currentRole`.
- **Quick Pay (`QuickPayScreen`)**
  - Step 1 search by account number + last name; Step 2 payment breakdown and card form; Step 3 success receipt with download button.
  - Mock data only; no real payment API.
- **Main App Shell (`App.tsx` when `currentScreen='app'`)**
  - Header with avatar, greeting, notification modal; Profile modal with roles, switch role, logout.
  - Content controlled by `activeTab` and role; bottom nav fixed.
- **Broker Home (`BrokerHome`)**
  - Search bar + filter chips; banner carousel with badges/CTA; “Search by Filters” icon grid; dark “Access Card” for user; stats widgets; “Experiences” video card; “Top Picks” horizontal cards linking to Unit Selection/Property Detail.
  - No API; uses mock banners/properties.
- **Search (`PropertySearch`)**
  - Sticky search/filter panel: property type toggle, select dropdowns (community/property/unit position), project status chips, bedrooms chips, search button; list of property cards with status badges, price, BR/size.
  - Uses figma images and mock data; on select opens `PropertyDetail`.
- **Property Detail (`PropertyDetail`)**
  - Image carousel with arrows/dots; status badge; actions: favorite, share modal (WhatsApp/email), download brochure/floor plan (dummy PDF generator), virtual tour CTA, add lead, booking, add to comparison.
  - Sections: hero price/location, key stats (BR/BA/size), description, project specs image (for IL VENTO), features, nearby, amenities, downloads, contact info; fixed bottom action bar.
  - Uses `PROPERTIES_DATA` shape; no live API.
- **Unit Selection (`UnitSelection`)**
  - Header with search, filter chips, select-multiple toggle, sorting controls, list/table of units with status badges; “Show on Map” CTA.
  - Mock units; selection returns `unitId` to parent.
- **Shortlist (`Shortlist`)**
  - Saved property cards with actions remove/compare/add lead; optional search toggle; empty state with CTA to browse.
  - Uses sonner toast for undo.
- **Lead Management (`LeadManagement`)**
  - Filters by status, search bar; cards with status pill, contact info, requirements, linked units; edit modal (full form) and toast on save.
  - No API; mock leads.
- **Lead Detail / Create Lead**
  - Present (not opened in main flow) to show details/edit; invoked from `App` via state.
- **Booking Management (`BookingManagement`)**
  - Similar to leads: status filters, search, cards with price/booking amount, dates, status icons; “Create” CTA.
- **Booking Detail / Create Booking**
  - Present for detail and creation; called via `App` state.
- **Compare Properties (`CompareProperties`)**
  - Tabs for Overview/Price & Size/Amenities/Features; horizontal cards per property with remove button and “View Full Details”; supports up to 4; empty state message.
- **Virtual Tour (`VirtualTour`)**
  - Mock 360 viewer with zoom/rotate/fullscreen, hotspots, info banner, room pills; uses Unsplash panoramas by property id; demo note overlay.
- **Guest Home / Buyer Home / Homeowner Home**
  - Stubs (not detailed in code shown) but selected via `renderRoleHome`; guest gets `SignInRequired` on gated tabs.
- **Services/Payments/Documents sections**
  - Additional components exist (`ServicesSection`, `PaymentsSection`, `DocumentsSection`, `CommunitySection`), but not currently wired into `App.tsx`.

### 4. Technical Constraints & Logic

- **Authentication**
  - No backend auth; mock success sets `user` state with roles. Multi-role flow chooses active role; “Remember my choice” stored in `user.preferredRole`. Logout clears state and returns to Landing. Quick Pay bypasses auth with mock account lookup.
- **3rd Party Integrations**
  - UI: Tailwind v4, lucide-react icons, sonner toasts, shadcn-style ui components (not all used).
  - Assets: figma:asset imports for logos/backgrounds; Unsplash image URLs for content.
  - No live APIs, payments, or analytics integrated.
- **Data Models (in-code)**
  - `PropertyData` (`data/properties.ts`): `{id, name, tagline?, project, location, price:number, size:number, bedrooms:number, bathrooms:number, status:'Available'|'Reserved'|'Sold', type, images:string[], description, amenities:string[], features:{parking?, balcony?, furnished?, view?}, proximity?:[{name,time,icon}], handoverDate?}`.
  - Leads (mock in `LeadManagement`): `{id, name, phone, email, status, budget, propertyType, bedrooms, linkedUnits[], createdDate, lastContact, notes[]}`.
  - Bookings (mock in `BookingManagement`): `{id, buyerName, buyerPhone, unitName, project, price, bookingAmount, status, bookingDate, handoverDate}`.
  - Units (mock in `UnitSelection`): `{id, name, tower?, area, bedrooms, bathrooms, price, status, floor?}`.
  - App user (`App.tsx`): `{id, name, email, mobile, roles: UserRole[], currentRole?, preferredRole?}`.
- **Behavioral Notes**
  - Navigation is entirely via local state; no URL deep linking.
  - Comparison list capped at 4; duplicate/limit responses surfaced via toast in `PropertyDetail`.
  - Guest role blocked from Shortlist/Leads/Booking tabs (shows `SignInRequired`).
  - PDF downloads are mocked via data URLs; sharing opens WhatsApp URL with composed message.
  - Virtual tour is a demo; replace with real 360 viewer for production.
  - Payment flow is mock; replace with gateway (Stripe/Checkout.com) for production.
```
