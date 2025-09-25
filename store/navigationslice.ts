import { StateCreator } from "zustand";

export interface NavigationSlice {
    showSideBar: boolean;
    setShowSideBar: (val?: boolean) => void;
}

export const createNavigationSlice: StateCreator<NavigationSlice> = set => ({
    showSideBar: false,
    setShowSideBar: (val) => set((state) => ({ showSideBar: val ?? !state.showSideBar })),
})