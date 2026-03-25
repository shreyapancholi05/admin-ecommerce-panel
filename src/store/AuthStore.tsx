import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../Types/user.ts";

interface AuthState {
  userData: User | null;
  isAuthentic: boolean;
  setUser: (userData: User) => void;
  clearUser: () => void;
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  refreshToken: string | null;
  setRefreshToken: (token: string) => void;
}
const AuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userData: null,
      isAuthentic: false,
      accessToken: null,
      refreshToken: null,

      setUser: (userData) => set({ userData, isAuthentic: true }),

      setAccessToken: (token) => set({ accessToken: token }),

      setRefreshToken: (token) => set({ refreshToken: token }),

      clearUser: () => {
        set({
          userData: null,
          isAuthentic: false,
          accessToken: null,
          refreshToken: null,
        });
        AuthStore.persist.clearStorage();
      },
    }),
    {
      name: "user1",
    },
  ),
);

export default AuthStore;
