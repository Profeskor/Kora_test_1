
import { create } from 'zustand';
import { AppUser, UserRole } from '../types';

interface UserState {
  user: AppUser | null;
  isLoading: boolean;
  setUser: (user: AppUser | null) => void;
  setLoading: (loading: boolean) => void;
  setCurrentRole: (role: UserRole) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setCurrentRole: (role) =>
    set((state) => ({
      user: state.user ? { ...state.user, currentRole: role } : null,
    })),
  logout: () => set({ user: null }),
}));
