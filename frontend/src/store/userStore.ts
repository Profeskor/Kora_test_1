import { create } from "zustand";
import { AppUser, UserRole } from "../types";

export interface BrokerClientSession {
  name: string;
  email: string;
  phone: string;
  address?: string;
  agentName?: string; // Selected agent for this client
}

interface UserState {
  user: AppUser | null;
  isLoading: boolean;
  brokerClientSession: BrokerClientSession | null;
  setUser: (user: AppUser | null) => void;
  setLoading: (loading: boolean) => void;
  setCurrentRole: (role: UserRole) => void;
  setBrokerClientSession: (session: BrokerClientSession | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  brokerClientSession: null,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setCurrentRole: (role) =>
    set((state) => ({
      user: state.user ? { ...state.user, currentRole: role } : null,
    })),
  setBrokerClientSession: (session) => set({ brokerClientSession: session }),
  logout: () => set({ user: null, brokerClientSession: null }),
}));
