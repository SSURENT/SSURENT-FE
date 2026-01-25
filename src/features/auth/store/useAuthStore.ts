import { create } from 'zustand';

interface AuthState {
  role: 'admin' | 'user' | null;
  setRole: (role: 'admin' | 'user') => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
  logout: () => set({ role: null }),
}));
