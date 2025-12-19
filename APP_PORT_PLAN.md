## Port Plan from APP_CONTEXT_SPEC to Expo app

### 1) Gaps vs current app

- Navigation uses Expo Router tabs; spec expects state-driven flow (splash → onboarding → landing → auth/registration/quick-pay → app shell with tabs + detail flows).
- State is only `user` in Zustand; spec requires richer app state (screen/tab, role selection, selections, comparison list, modals).
- Missing/wip screens: SplashScreen, OnboardingCarousel, UnifiedAuthPage, RegistrationFlow, MultiRoleSelector, QuickPay wizard, SignInRequired gating, UnitSelection, CompareProperties, VirtualTour, Lead/Booking detail/create; header + notification/profile modals; custom BottomNavigation.
- Guest/role logic incomplete: no multi-role selector or preferredRole; guest gating not enforced; comparison cap/toasts absent.
- Styling diverges: spec uses Tailwind-like tokens, gradients, cards; current RN screens are basic StyleSheet layouts.

### 2) Target app state model (single source, can be Zustand or local state)

```ts
{
  currentScreen: 'splash' | 'onboarding' | 'landing' | 'auth' | 'registration' | 'quick-pay' | 'app';
  activeTab: 'home' | 'search' | 'shortlist' | 'leads' | 'booking';
  user?: {
    id: string;
    name: string;
    email: string;
    mobile: string;
    roles: UserRole[];
    currentRole?: UserRole;
    preferredRole?: UserRole;
  };
  showRoleSelector: boolean;
  selectedPropertyId?: string;
  selectedUnitId?: string;
  selectedLeadId?: string;
  selectedBookingId?: string;
  comparisonList: string[]; // max 4
  showNotifications: boolean;
  showProfile: boolean;
  showPropertyDetail: boolean;
}
```

Handlers: tab change, screen change, set user/set role (remember choice), add/remove comparison with cap + toast, select entities, toggle modals, guest guard helpers.

### 3) Navigation flow

- Splash (auto-advance ~3s) → OnboardingCarousel → Landing.
- Landing options: Sign In/Register → UnifiedAuthPage; Quick Pay → QuickPay wizard; Continue as Guest → app shell with guest role; Demo account → seeded user -> app.
- Auth/register: UnifiedAuthPage handles login/register toggle; on success set user & role, maybe trigger MultiRoleSelector if multiple roles; then go to app.
- RegistrationFlow: multi-step role/type selection, then back to landing or direct to app.
- In app: header + bottom nav (home/search/shortlist/leads/booking); detail flows reachable via state (property detail → unit selection/compare/lead/book/virtual tour; leads/bookings detail/create).
- Guest guard: shortlist/leads/booking show SignInRequired for guest.

### 4) Missing screens/components/data to add or wire

- Screens: SplashScreen, OnboardingCarousel, UnifiedAuthPage, RegistrationFlow (and substeps), MultiRoleSelector (page/modal), QuickPayScreen wizard, SignInRequired gating, UnitSelection, CompareProperties, VirtualTour, LeadDetail/CreateLead, BookingDetail/CreateBooking.
- App shell: header with profile/notifications modals; custom BottomNavigation component controlling `activeTab`.
- Logic: comparison list cap 4 with toast; role switcher; remember role; share/download/whatsapp mocks in PropertyDetail.
- Data: property/unit/lead/booking mocks per spec; ensure types match.

### 4b) Stakeholder feature backlog (from sheet)

- Sign in/Login: email + password + mobile + OTP; password recovery.
- Live inventory/properties + search + filters (price, size, BHK); browse without login.
- Unit detail pages with media (floor plan, brochure), pricing; compare two+ units.
- WhatsApp sharing; Favorite/Bookmark.
- Promotional banner carousel (up to 6) for launches/events/offers.
- Profile management.
- Document vault/storage: upload/update docs (EID, passport, etc.).
- Quick payments without login: search by account/last name, show dues, pay, receipt.
- Help center / FAQ.
- Mortgage calculator (could).
- Broker onboarding & verification (Individual + Company) with doc upload.
- Lead creation, bulk upload, status management; login prompt when accessing shortlist.
- Booking request creation & tracking.
- Onboarding flow with document upload; ownership onboarding & verification with docs.
- Submit purchase interest → creates lead → assign to Kora RM (organic lead).
- Payment of unit dues; view purchased property info & uploaded/review docs.

### 5) Styling approach

- Stay with React Native StyleSheet but introduce a shared theme (colors, spacing, radius, shadows) to mirror spec palette/gradients/cards. Optional: add `nativewind` later, but avoid large migration now.

### 6) Implementation sequencing

1. Establish app state store matching the model; expose helpers (navigation, role, comparison, selection, modals, guards).
2. Replace entry flow: add SplashScreen + OnboardingCarousel + Landing; wire to state transitions.
3. Build UnifiedAuthPage + RegistrationFlow + MultiRoleSelector; handle multi-role and preferredRole; set user and move into app.
4. Implement QuickPay wizard flow.
5. Build app shell: header + profile/notifications modals + custom BottomNavigation; wire existing Home/Search/Shortlist/Bookings components via state, add SignInRequired guard.
6. Add/wire detail flows: PropertyDetail → UnitSelection/Compare/Booking/VirtualTour; Booking detail/create (leads merged into booking requests).
7. Add comparison cap + toasts, share/download mocks, demo/guest paths.
8. Pass mock data/types through components; align props with spec; style per theme.
9. QA the full happy path and guarded paths (guest blocks, role switch, comparison cap).

### Next Gaps to Close (stakeholder-ready)

- Remove standalone Leads; fold “lead” into Bookings as a booking request type/status. No leads tab/routes/CTAs.
- Comparison UX: build full compare screen with property cards/tabs, add/remove, and cap=4 toasts; wire from detail and shortlist.
- Property detail polish: auto-advance carousel option, real PDF viewer component for media; add WhatsApp share/favorite persistence mock.
- Unit selection: replace stub with real mock units per property, selection callbacks, and CTA to booking request.
- Booking detail/create: flesh out forms and detail views with mock data and actions; support request vs confirmed states (replaces leads).
- Guest/role guards: ensure shortlist/bookings prompt auth; add multi-role switcher in profile with preferredRole persistence.
- Theme/styling: apply shared theme (colors, radii, shadows), tighten spacing to match reference UI; add banners/promotions carousel on Home.
- Additional features from backlog: document vault (upload/update mock), help/FAQ screen, mortgage calculator stub, profile management stub.
- Data: expand mock datasets (properties/bookings/units/media) to look realistic for demos.
- QA: device check (Expo Go) for full flows, including media view/download, compare limit, guest blocks, quick pay, and booking CTA.
