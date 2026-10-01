/**
 * Sidebar — main navigation.
 *
 * TODO: show only the links allowed for the current user's role.
 */
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/dashboard', label: 'داشبورد' },
  { to: '/orders', label: 'سفارش‌ها' },
  { to: '/tables', label: 'میزها' },
  { to: '/menu', label: 'منو' },
  { to: '/customers', label: 'مشتریان' },
  { to: '/inventory', label: 'انبار' },
  { to: '/reservations', label: 'رزروها' },
  { to: '/reports', label: 'گزارش‌ها' },
  { to: '/settings', label: 'تنظیمات' },
];

const linkClass = ({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm font-medium ${
    isActive ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:bg-slate-100'
  }`;

const Sidebar = () => (
  <aside className="w-56 shrink-0 border-e border-slate-200 bg-white p-4">
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <NavLink key={item.to} to={item.to} className={linkClass}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
