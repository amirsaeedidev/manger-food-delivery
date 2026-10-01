/**
 * MenuSearch — "Search your interesting foods..." field of the home screen.
 * Controlled: pass `value` and `onChange(newText)`. The input has id="home-search" so the
 * search icon in the header can focus it.
 */
import { forwardRef } from 'react';

import Input from '../Common/Input';

const MenuSearch = forwardRef(({ value, onChange, className = '' }, ref) => (
  <Input
    ref={ref}
    id="home-search"
    type="search"
    icon="search"
    autoComplete="off"
    enterKeyHint="search"
    aria-label="جستجوی غذا"
    placeholder="غذای مورد علاقه‌ات را جستجو کن..."
    value={value}
    onChange={(event) => onChange(event.target.value)}
    className={className}
    inputClassName="[&::-webkit-search-cancel-button]:hidden"
  />
));

MenuSearch.displayName = 'MenuSearch';

export default MenuSearch;
