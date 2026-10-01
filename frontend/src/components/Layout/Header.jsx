/**
 * Header — top bar with the logo and application name.
 *
 * TODO: add the user menu, notifications and logout button.
 */
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="flex items-center gap-3 border-b border-slate-200 bg-white px-6 py-3">
    <Link to="/" className="flex items-center gap-3">
      <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt="" className="h-9 w-9" />
      <span className="text-lg font-bold">سیستم مدیریت رستوران</span>
    </Link>
  </header>
);

export default Header;
