import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createUserSlice, UserSlice } from "./userslice";
import { createNavigationSlice, NavigationSlice } from "./navigationslice";

export const useUserStore = create<UserSlice>()(
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

export const useNavigationStore = create<NavigationSlice>()(devtools((...a) => ({...createNavigationSlice(...a)})))
