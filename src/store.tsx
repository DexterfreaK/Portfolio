import { create } from "zustand";

export enum NavbarState {
  Home = "translate(18px) scale(0.18, 1)",
  Work = "translate(102px) scale(0.16, 1)",
  About = "translate(176px) scale(0.20, 1)",
}

interface NavbarStore {
  NavbarCurrentState: NavbarState;
  setNavbarCurrentState: (state: NavbarState) => void;
}

export const useNavbarStore = create<NavbarStore>((set) => ({
  NavbarCurrentState: NavbarState.Home,
  setNavbarCurrentState: (state: NavbarState) =>
    set({ NavbarCurrentState: state }),
}));
