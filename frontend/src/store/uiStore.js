/**
 * uiStore — Zustand store: UI state (theme now; sidebar, modals later).
 *
 * Theme: the customer app has a dark and a light theme (CSS variables in styles/variables.css).
 * The choice is saved in localStorage and applied as <html data-theme="dark|light">.
 * public/index.html applies the saved theme before React starts, so there is no flash.
 */
import { create } from 'zustand';

// Keep the key, the default and the colors in sync with the script in public/index.html.
export const THEME_STORAGE_KEY = 'restaurant-theme';
export const THEMES = ['dark', 'light'];
const DEFAULT_THEME = 'dark';

// Browser UI color (<meta name="theme-color">) for each theme.
const THEME_COLORS = { dark: '#1b1c20', light: '#f5f6fc' };

const isTheme = (value) => THEMES.includes(value);

const readInitialTheme = () => {
  const applied = document.documentElement.getAttribute('data-theme');
  if (isTheme(applied)) return applied;

  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (isTheme(saved)) return saved;
  } catch {
    // Storage can be unavailable (private mode, blocked cookies): fall back to the default.
  }
  return DEFAULT_THEME;
};

const applyTheme = (theme) => {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
};

const useUiStore = create((set, get) => ({
  theme: readInitialTheme(),

  setTheme: (theme) => {
    if (!isTheme(theme)) return;
    applyTheme(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Not persisted, but the theme still changes for this session.
    }
    set({ theme });
  },

  toggleTheme: () => get().setTheme(get().theme === 'dark' ? 'light' : 'dark'),
}));

export default useUiStore;
