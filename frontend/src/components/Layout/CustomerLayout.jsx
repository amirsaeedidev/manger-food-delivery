/**
 * CustomerLayout — shell of the customer app (the pages designed in the mobile references).
 *
 * The app is a single column up to 430px wide (the design frame), centered on larger screens.
 * The bottom tab bar is shown on every page except the ones listed in NAV_HIDDEN_ON
 * (the food detail page has its own action buttons at the bottom).
 * On desktop widths there is room beside the column, so the theme toggle floats there; on phones
 * the same switch lives on the settings tab.
 */
import { Outlet, useLocation } from 'react-router-dom';

import ThemeToggle from '../Common/ThemeToggle';

import BottomNav from './BottomNav';

const NAV_HIDDEN_ON = ['/food/'];

const CustomerLayout = () => {
  const { pathname } = useLocation();
  const showNav = !NAV_HIDDEN_ON.some((prefix) => pathname.startsWith(prefix));

  return (
    <div className="min-h-dvh bg-ui-bg text-ui-fg">
      <ThemeToggle className="fixed end-6 top-6 z-50 hidden md:grid" />

      <div
        className={`relative mx-auto min-h-dvh w-full max-w-[430px] md:border-x md:border-ui-line ${
          showNav ? 'pb-[96px]' : ''
        }`}
      >
        <Outlet />
      </div>

      {showNav && <BottomNav />}
    </div>
  );
};

export default CustomerLayout;
