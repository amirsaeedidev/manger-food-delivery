/**
 * QuantityStepper — "minus  number  plus" control (the "Choice quantity" row of the food page).
 *
 * Controlled component: pass `value` and `onChange(newValue)`.
 * The two buttons are 25px like in the design, but their touch area is enlarged to 41px.
 * The DOM order is minus, value, plus; in the RTL layout it is mirrored like the rest of the page.
 */
import { formatNumber } from '../../utils/formatters';

import Icon from './Icon';

// At a limit the button keeps the look of the design (both buttons are plain white squares there),
// but it does nothing and tells assistive technology that it is unavailable.
const StepButton = ({ label, atLimit, onClick, icon }) => (
  <button
    type="button"
    aria-label={label}
    aria-disabled={atLimit || undefined}
    onClick={atLimit ? undefined : onClick}
    className="relative grid h-[25px] w-[25px] place-items-center rounded-md bg-ui-stepper text-ui-stepper-fg shadow-stepper transition active:scale-95 aria-disabled:cursor-not-allowed aria-disabled:active:scale-100 before:absolute before:-inset-2 before:content-['']"
  >
    <Icon name={icon} size={12} strokeWidth={3} />
  </button>
);

const QuantityStepper = ({ value, onChange, min = 1, max = 99, className = '' }) => (
  <div role="group" aria-label="تعداد" className={`inline-flex items-center ${className}`}>
    <StepButton
      icon="minus"
      label="کم کردن"
      atLimit={value <= min}
      onClick={() => onChange(Math.max(min, value - 1))}
    />
    <output aria-live="polite" className="w-[46px] text-center text-base font-semibold text-ui-fg">
      {formatNumber(value)}
    </output>
    <StepButton
      icon="plus"
      label="زیاد کردن"
      atLimit={value >= max}
      onClick={() => onChange(Math.min(max, value + 1))}
    />
  </div>
);

export default QuantityStepper;
