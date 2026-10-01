/**
 * Button — reusable button (also renders links: pass `as={Link} to="..."`).
 *
 * variant: "solid" (filled, main action) | "outline" | "ghost"
 * size:    "lg" (52px, the CTA buttons of the design) | "md" | "sm"
 * Colors come from the theme tokens, so the same button works in the dark and the light theme.
 */
const VARIANTS = {
  solid: 'bg-ui-cta text-ui-cta-fg',
  outline: 'border-[1.5px] border-ui-cta-outline bg-transparent text-ui-fg',
  ghost: 'bg-transparent text-ui-fg',
};

const SIZES = {
  lg: 'h-[52px] rounded-2xl px-4 text-sm',
  md: 'h-11 rounded-xl px-4 text-sm',
  sm: 'h-9 rounded-lg px-3 text-xs',
};

const Button = ({
  as: Component = 'button',
  variant = 'solid',
  size = 'lg',
  fullWidth = false,
  className = '',
  children,
  ...rest
}) => {
  const classes = [
    'inline-flex select-none items-center justify-center gap-2 font-bold transition duration-150',
    'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
    VARIANTS[variant],
    SIZES[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // A real <button> must not submit forms by accident.
  const typeProps = Component === 'button' ? { type: rest.type || 'button' } : {};

  return (
    <Component className={classes} {...typeProps} {...rest}>
      {children}
    </Component>
  );
};

export default Button;
