/**
 * BottomNav — fixed tab bar of the customer app.
 *
 * Geometry follows the "Home" reference (430px frame): 80px high, rounded top corners, translucent
 * background with blur, five equal columns with 14px side padding and 26px icons. Home / mail / user
 * use solid icons, settings / bag use outline icons. In the RTL layout the first tab is on the right.
 * The active tab is painted with the brand green.
 */
import { NavLink } from 'react-router-dom';

import Icon from '../Common/Icon';

const TABS = [
  { to: '/', icon: 'home', label: 'خانه', solid: true, end: true },
  { to: '/messages', icon: 'mail', label: 'پیام‌ها', solid: true },
  { to: '/profile', icon: 'user', label: 'حساب کاربری', solid: true },
  { to: '/settings', icon: 'settings', label: 'تنظیمات' },
  { to: '/cart', icon: 'bag', label: 'سبد خرید' },
];

const BottomNav = () => (
  <nav
    aria-label="ناوبری اصلی"
    className="fixed inset-x-0 bottom-0 z-40 mx-auto h-[80px] w-full max-w-[430px] rounded-t-[28px] bg-ui-nav px-[14px] shadow-nav backdrop-blur-[12px]"
  >
    <ul className="grid h-full grid-cols-5">
      {TABS.map((tab) => (
        <li key={tab.to} className="grid place-items-center">
          <NavLink
            to={tab.to}
            end={tab.end}
            aria-label={tab.label}
            title={tab.label}
            className={({ isActive }) =>
              `grid h-12 w-12 place-items-center rounded-full transition-colors ${
                isActive ? 'text-ui-nav-active' : 'text-ui-nav-fg'
              }`
            }
          >
            <Icon name={tab.icon} size={26} filled={tab.solid} strokeWidth={1.8} />
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default BottomNav;
