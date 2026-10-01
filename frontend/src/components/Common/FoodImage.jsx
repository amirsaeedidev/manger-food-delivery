/**
 * FoodImage — dish picture with a graceful placeholder.
 *
 *   <FoodImage name="greek-salad" alt="سالاد یونانی" className="h-32 w-32" shadow />
 *
 * `name` is the slug of a file in src/assets/foods (see src/assets/index.js). While that file does
 * not exist (the Figma export has not been added yet) a neutral plate is drawn instead, so the layout
 * of every screen stays exactly the same. `shadow` adds the soft drop shadow of the design:
 * true / "lg" for the big hero picture, "sm" for card thumbnails (it flips in right-to-left layouts).
 */
import { foodImages } from '../../assets';

import Icon from './Icon';

// Drop shadows; the horizontal offset flips with the reading direction (see variables.css).
const SHADOWS = {
  lg: 'drop-shadow(calc(14px * var(--ui-shadow-dir)) 18px 22px var(--ui-shadow-hero-color))',
  sm: 'drop-shadow(calc(4px * var(--ui-shadow-dir)) 8px 8px var(--ui-shadow-card-color))',
};

const FoodImage = ({ name, alt = '', className = '', shadow = false }) => {
  const src = foodImages[name];
  const filter = shadow === true ? SHADOWS.lg : SHADOWS[shadow];
  const style = filter ? { filter } : undefined;

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        draggable="false"
        className={`select-none object-contain ${className}`}
        style={style}
      />
    );
  }

  // The placeholder sets no `position` of its own, so a caller can safely pass "absolute" etc.
  // (the inner ring is sized with percentages instead of being positioned).
  return (
    <span
      role="img"
      aria-label={alt}
      data-placeholder="food"
      className={`inline-flex shrink-0 items-center justify-center rounded-full ${className}`}
      style={{
        background: 'radial-gradient(circle at 32% 28%, #ffffff 0%, #eceef4 55%, #d6dae6 100%)',
        boxShadow: 'inset 0 0 0 1px rgba(15, 23, 42, 0.08), inset 0 -6px 14px rgba(15, 23, 42, 0.06)',
        ...style,
      }}
    >
      <span
        aria-hidden="true"
        className="grid h-[74%] w-[74%] place-items-center rounded-full"
        style={{ boxShadow: 'inset 0 0 0 1.5px rgba(15, 23, 42, 0.09)' }}
      >
        <Icon name="utensils" size="46%" strokeWidth={1.6} className="text-slate-400" />
      </span>
    </span>
  );
};

export default FoodImage;
