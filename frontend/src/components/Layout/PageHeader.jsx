/**
 * PageHeader — title bar of the simple customer pages (settings, cart, coming soon ...).
 * `backTo` adds a back arrow (it points to the right in RTL); `action` is an optional element
 * shown at the opposite end.
 */
import { Link } from 'react-router-dom';

import Icon from '../Common/Icon';

const PageHeader = ({ title, backTo, action }) => (
  <header className="flex items-center gap-3 px-6 pb-4 pt-8">
    {backTo && (
      <Link to={backTo} aria-label="بازگشت" className="-ms-2 grid h-10 w-10 place-items-center rounded-full">
        <Icon name="back" size={24} />
      </Link>
    )}
    <h1 className="flex-1 text-xl font-bold">{title}</h1>
    {action}
  </header>
);

export default PageHeader;
