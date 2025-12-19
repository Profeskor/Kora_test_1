import { create } from 'zustand';
import { AppScreen, AppTab, UserRole } from '../types';

export interface AppState {
  currentScreen: AppScreen;
  activeTab: AppTab;
  userRole?: UserRole;
  selectedPropertyId?: string;
  selectedUnitId?: string;
  selectedLeadId?: string;
  selectedBookingId?: string;
  comparisonList: string[];
  showRoleSelector: boolean;
  showNotifications: boolean;
  showProfile: boolean;
  showPropertyDetail: boolean;
  setScreen: (screen: AppScreen) => void;
  setTab: (tab: AppTab) => void;
  setUserRole: (role: UserRole) => void;
  selectProperty: (id?: string) => void;
  selectUnit: (id?: string) => void;
  selectLead: (id?: string) => void;
  selectBooking: (id?: string) => void;
  addToComparison: (id: string) => { added: boolean; reason?: string };
  removeFromComparison: (id: string) => void;
  clearComparison: () => void;
  toggleRoleSelector: (value?: boolean) => void;
  toggleNotifications: (value?: boolean) => void;
  toggleProfile: (value?: boolean) => void;
  togglePropertyDetail: (value?: boolean) => void;
}

const MAX_COMPARISON = 4;

export const useAppState = create<AppState>((set, get) => ({
  currentScreen: 'splash',
  activeTab: 'home',
  userRole: undefined,
  selectedPropertyId: undefined,
  selectedUnitId: undefined,
  selectedLeadId: undefined,
  selectedBookingId: undefined,
  comparisonList: [],
  showRoleSelector: false,
  showNotifications: false,
  showProfile: false,
  showPropertyDetail: false,

  setScreen: (screen) => set({ currentScreen: screen }),
  setTab: (tab) => set({ activeTab: tab }),
  setUserRole: (role) => set({ userRole: role }),

  selectProperty: (id) => set({ selectedPropertyId: id }),
  selectUnit: (id) => set({ selectedUnitId: id }),
  selectLead: (id) => set({ selectedLeadId: id }),
  selectBooking: (id) => set({ selectedBookingId: id }),

  addToComparison: (id: string) => {
    const { comparisonList } = get();
    if (comparisonList.includes(id)) {
      return { added: false, reason: 'already-added' };
    }
    if (comparisonList.length >= MAX_COMPARISON) {
      return { added: false, reason: 'limit-reached' };
    }
    set({ comparisonList: [...comparisonList, id] });
    return { added: true };
  },

  removeFromComparison: (id: string) =>
    set((state) => ({
      comparisonList: state.comparisonList.filter((item) => item !== id),
    })),

  clearComparison: () => set({ comparisonList: [] }),

  toggleRoleSelector: (value) =>
    set((state) => ({
      showRoleSelector: value ?? !state.showRoleSelector,
    })),

  toggleNotifications: (value) =>
    set((state) => ({
      showNotifications: value ?? !state.showNotifications,
    })),

  toggleProfile: (value) =>
    set((state) => ({
      showProfile: value ?? !state.showProfile,
    })),

  togglePropertyDetail: (value) =>
    set((state) => ({
      showPropertyDetail: value ?? !state.showPropertyDetail,
    })),
}));

