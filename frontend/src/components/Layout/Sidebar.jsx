/**
 * Sidebar — main navigation.
 *
 * TODO: show only the links allowed for the current user's role.
 */
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/admin/dashboard', label: 'داشبورد' },
  { to: '/admin/orders', label: 'سفارش‌ها' },
  { to: '/admin/tables', label: 'میزها' },
  { to: '/admin/menu', label: 'منو' },
  { to: '/admin/customers', label: 'مشتریان' },
  { to: '/admin/inventory', label: 'انبار' },
  { to: '/admin/reservations', label: 'رزروها' },
  { to: '/admin/reports', label: 'گزارش‌ها' },
  { to: '/admin/settings', label: 'تنظیمات' },
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
