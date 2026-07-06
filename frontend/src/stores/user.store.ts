import { create } from "zustand";
import { type User } from "../infra/types/user.type";
import { type UserStore } from "@/infra/types/store/user.store.type";
import { persist, createJSONStorage } from "zustand/middleware";

const initialUserState: User = {
  firstName: "",
  lastName: "",
  email: "",
  _id: "",
};

export const useUser = create<UserStore>()(
  persist(
    (set) => ({
      user: initialUserState,
      setUser: (user: User) => set({ user }),
      removeUser: () => set({ user: initialUserState }),
    }),
    {
      name: "user-info",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
