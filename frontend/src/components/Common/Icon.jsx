/**
 * Icon — one place for every UI icon.
 *
 * Icons come from lucide-react and are referenced by a logical name (<Icon name="bell" />).
 * Directional icons ("back", "forward") flip automatically in right-to-left layouts.
 * To use a different icon (e.g. an SVG exported from Figma) change only the entry below.
 *
 * `filled` paints the shape with the current text color (used by the bottom navigation).
 */
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CakeSlice,
  Check,
  ChevronDown,
  Clock,
  CupSoda,
  Ellipsis,
  Hamburger,
  House,
  Leaf,
  Mail,
  Minus,
  Moon,
  Pizza,
  Plus,
  Salad,
  Search,
  Settings,
  ShoppingBag,
  Star,
  Sun,
  Trash2,
  User,
  Utensils,
} from 'lucide-react';

// Lucide icons are outline-only. A plain fill would hide the door of the house and the flap of the
// envelope, so these two get hand-drawn solid versions (used by the bottom navigation).
const solid = (children) => {
  const Glyph = ({ size = 24, className, ...rest }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
  return Glyph;
};

const HomeSolid = solid(
  <path
    fillRule="evenodd"
    d="M10.55 2.53a2.5 2.5 0 0 1 2.9 0l7 5.1A2.5 2.5 0 0 1 21.5 9.65V19a2.5 2.5 0 0 1-2.5 2.5h-4V15a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v6.5H5A2.5 2.5 0 0 1 2.5 19V9.65a2.5 2.5 0 0 1 1.05-2.02z"
  />
);

const MailSolid = solid(
  <path
    fillRule="evenodd"
    d="M5 4.5h14A3 3 0 0 1 22 7.5v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3zM3.4 6.2 12 12.3l8.6-6.1v1.7L12 14 3.4 7.9z"
  />
);

const ICONS = {
  back: { component: ArrowLeft, flipInRtl: true },
  forward: { component: ArrowRight, flipInRtl: true },
  bell: { component: Bell },
  search: { component: Search },
  bag: { component: ShoppingBag },
  home: { component: House, solid: HomeSolid },
  mail: { component: Mail, solid: MailSolid },
  user: { component: User },
  settings: { component: Settings },
  star: { component: Star },
  plus: { component: Plus },
  minus: { component: Minus },
  check: { component: Check },
  clock: { component: Clock },
  trash: { component: Trash2 },
  sun: { component: Sun },
  moon: { component: Moon },
  'caret-down': { component: ChevronDown },
  utensils: { component: Utensils },
  // food categories
  leaf: { component: Leaf },
  cake: { component: CakeSlice },
  drink: { component: CupSoda },
  burger: { component: Hamburger },
  pizza: { component: Pizza },
  salad: { component: Salad },
  more: { component: Ellipsis },
};

export const ICON_NAMES = Object.keys(ICONS);

const Icon = ({ name, size = 24, strokeWidth = 2, filled = false, className = '', ...rest }) => {
  const entry = ICONS[name];
  if (!entry) return null;

  const { component, solid: SolidGlyph, flipInRtl } = entry;
  const classes = [flipInRtl ? 'rtl:-scale-x-100' : '', className].filter(Boolean).join(' ');

  if (filled && SolidGlyph) {
    return <SolidGlyph size={size} className={classes || undefined} {...rest} />;
  }

  const Glyph = component;
  return (
    <Glyph
      size={size}
      strokeWidth={strokeWidth}
      fill={filled ? 'currentColor' : 'none'}
      className={classes || undefined}
      aria-hidden="true"
      focusable="false"
      {...rest}
    />
  );
};

export default Icon;
