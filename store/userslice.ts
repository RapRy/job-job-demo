import { StateCreator } from "zustand";
import { UserCredModel } from "@/lib/models/users/usermodel";

export interface UserSlice {
  user: UserCredModel | null;
  setUser: (user: UserCredModel) => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
});
