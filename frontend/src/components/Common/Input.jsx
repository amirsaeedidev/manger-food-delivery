/**
 * Input — reusable text field with an optional leading icon (search box style of the design).
 *
 *   <Input icon="search" placeholder="..." value={value} onChange={...} />
 *
 * `className` styles the wrapper; any other prop goes to the <input>.
 */
import { forwardRef } from 'react';

import Icon from './Icon';

const Input = forwardRef(({ icon, className = '', inputClassName = '', ...rest }, ref) => (
  <label
    className={`flex h-[49px] items-center gap-3 rounded-[14px] bg-ui-field px-4 text-ui-field-fg shadow-field focus-within:ring-2 focus-within:ring-ui-accent ${className}`}
  >
    {icon && <Icon name={icon} size={20} className="shrink-0 text-ui-placeholder" />}
    <input
      ref={ref}
      className={`min-w-0 flex-1 bg-transparent text-[15px] text-ui-field-fg outline-none placeholder:text-ui-placeholder ${inputClassName}`}
      {...rest}
    />
  </label>
));

Input.displayName = 'Input';

export default Input;
