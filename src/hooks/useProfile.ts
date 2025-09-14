import { create } from "zustand";

// Profile type definition
export interface Profile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
}

type AuthState = {
  profile: Profile | null;
  authenticated: boolean;
  setProfile: (profile: Profile) => void;
  setAuthenticated: (auth: boolean) => void;
  clearProfile: () => void;
};

// Simple profile store
interface ProfileStore {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  clearProfile: () => void;
}

// Create the Zustand store
export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,

  setProfile: (profile: Profile) => {
    set({ profile });
  },

  clearProfile: () => {
    set({ profile: null });
  },
}));

export const useAuthStore = create<AuthState>((set) => ({
  profile: null,
  authenticated: false,
  setProfile: (profile) => set({ profile }),
  setAuthenticated: (auth) => set({ authenticated: auth }),
  clearProfile: () => set({ profile: null }),
}));
