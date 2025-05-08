import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  email: string;
  name: string;
  type: string;
  status: string;
}

interface UserState {
  user: User | null;
  isHydrated: boolean;
  setUser: (user: User | null) => void;
  setHydrated: (state: boolean) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isHydrated: false,
      setUser: (user) => set({ user }),
      setHydrated: (state) => set({ isHydrated: state }),
      logout: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => {
        // Make sure localStorage is available (client-side only)
        if (typeof window !== "undefined") {
          return localStorage;
        }
        // Provide a mock implementation for server-side
        return {
          getItem: () => null,
          setItem: () => null,
          removeItem: () => null,
        };
      }),
      skipHydration: true,
    }
  )
);
