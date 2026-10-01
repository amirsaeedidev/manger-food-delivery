/**
 * Theme controls (dark / light), backed by store/uiStore.js.
 *
 *  - ThemeToggle (default export): round icon button, shows the theme you will switch TO.
 *  - ThemeSwitch (named export):   labelled on/off switch row, used on the settings page.
 */
import useUiStore from '../../store/uiStore';

import Icon from './Icon';

const useIsDark = () => useUiStore((state) => state.theme === 'dark');

const ThemeToggle = ({ className = '' }) => {
  const isDark = useIsDark();
  const toggleTheme = useUiStore((state) => state.toggleTheme);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'تغییر به تم روشن' : 'تغییر به تم تیره'}
      className={`grid h-10 w-10 place-items-center rounded-full bg-ui-stepper text-ui-stepper-fg shadow-stepper transition active:scale-95 ${className}`}
    >
      <Icon name={isDark ? 'sun' : 'moon'} size={20} />
    </button>
  );
};

export const ThemeSwitch = ({ label = 'حالت تیره', className = '' }) => {
  const isDark = useIsDark();
  const toggleTheme = useUiStore((state) => state.toggleTheme);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggleTheme}
      className={`flex w-full items-center justify-between gap-4 text-start ${className}`}
    >
      <span className="flex items-center gap-3">
        <Icon name={isDark ? 'moon' : 'sun'} size={20} />
        <span className="text-[15px] font-medium">{label}</span>
      </span>
      <span
        aria-hidden="true"
        className={`relative h-[26px] w-[46px] shrink-0 rounded-full transition-colors duration-200 ${
          isDark ? 'bg-ui-accent' : 'bg-slate-300'
        }`}
      >
        <span
          className={`absolute top-[3px] h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${
            isDark ? 'start-[23px]' : 'start-[3px]'
          }`}
        />
      </span>
    </button>
  );
};

export default ThemeToggle;
