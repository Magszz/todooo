import type { User } from "../user.type";

export interface UserStore {
  user: User;
  setUser: (user: User) => void;
  removeUser: () => void;
}
