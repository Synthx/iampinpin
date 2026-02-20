import { writable } from "svelte/store";
import type { Theme } from "@/types/theme.ts";

const THEME_STORAGE_KEY = "theme";

const createThemeStore = () => {
  const { subscribe, set, update } = writable<Theme>("light");

  const applyTheme = (theme: Theme) => {
    if (typeof window === "undefined") return;

    const htmlEl = document.documentElement;
    htmlEl.setAttribute("data-theme", theme);
  };

  return {
    subscribe,
    init: () => {
      if (typeof window === "undefined") return;

      const value = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      if (value) {
        set(value);
        applyTheme(value);
      }
    },
    toggle: () => {
      update((current) => {
        const next = current === "light" ? "dark" : "light";
        localStorage.setItem(THEME_STORAGE_KEY, next);
        applyTheme(next);

        return next;
      });
    },
  };
};

export const theme = createThemeStore();
