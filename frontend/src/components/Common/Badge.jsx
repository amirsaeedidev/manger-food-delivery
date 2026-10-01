/**
 * Badge — small counter bubble (e.g. the number of items in the cart).
 * Renders nothing for 0. Position it by passing classes, e.g. "absolute -top-1 -end-1".
 */
import { formatNumber } from '../../utils/formatters';

const Badge = ({ count = 0, className = '' }) => {
  if (!count || count < 1) return null;

  return (
    <span
      dir="ltr"
      className={`grid h-[14px] min-w-[14px] place-items-center rounded-full bg-ui-badge px-[3px] text-[9px] font-bold leading-none text-white ${className}`}
    >
      {count > 99 ? `${formatNumber(99)}+` : formatNumber(count)}
    </span>
  );
};

export default Badge;
