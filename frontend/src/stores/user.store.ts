import { create } from "zustand";
import { type User } from "../infra/types/user.type";

const initialUserState: User = {
  firstName: "",
  lastName: "",
  email: "",
  id: "",
};

export const useUser = create((set) => ({
  user: initialUserState,
  setUser: (user: User) => set({ user }),
  removeUser: () => set({ user: initialUserState }),
}));
