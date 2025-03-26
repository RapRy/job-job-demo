import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createUserSlice, UserSlice } from "./userslice";

export const useBoundStore = create<UserSlice>()(
  devtools(
    persist(
      (...a) => ({
        ...createUserSlice(...a),
      }),
      {
        name: "job-job-store",
      }
    )
  )
);
