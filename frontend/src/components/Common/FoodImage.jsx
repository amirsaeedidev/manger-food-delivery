/**
 * FoodImage — dish picture with a graceful placeholder.
 *
 *   <FoodImage name="greek-salad" alt="سالاد یونانی" className="h-32 w-32" shadow />
 *
 * `name` is the slug of a file in src/assets/foods (see src/assets/index.js). While that file does
 * not exist (the Figma export has not been added yet) a neutral plate is drawn instead, so the layout
 * of every screen stays exactly the same. `shadow` adds the soft drop shadow of the design; its
 * horizontal direction flips in right-to-left layouts.
 */
import { foodImages } from '../../assets';

import Icon from './Icon';

const SHADOW = 'drop-shadow(calc(14px * var(--ui-shadow-dir)) 18px 22px var(--ui-shadow-hero-color))';

const FoodImage = ({ name, alt = '', className = '', shadow = false }) => {
  const src = foodImages[name];
  const style = shadow ? { filter: SHADOW } : undefined;

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

  return (
    <span
      role="img"
      aria-label={alt}
      data-placeholder="food"
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full ${className}`}
      style={{
        background: 'radial-gradient(circle at 32% 28%, #ffffff 0%, #eceef4 55%, #d6dae6 100%)',
        boxShadow: 'inset 0 0 0 1px rgba(15, 23, 42, 0.08), inset 0 -6px 14px rgba(15, 23, 42, 0.06)',
        ...style,
      }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-[13%] rounded-full"
        style={{ boxShadow: 'inset 0 0 0 1.5px rgba(15, 23, 42, 0.09)' }}
      />
      <Icon name="utensils" size="34%" strokeWidth={1.6} className="text-slate-400" />
    </span>
  );
};

export default FoodImage;
