/**
 * Layout — application shell: header + sidebar + page content + footer.
 * Pages are rendered through <Outlet /> (see the nested routes in App.jsx).
 */
import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => (
  <div className="flex min-h-screen flex-col">
    <Header />

    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>

    <Footer />
  </div>
);

export default Layout;
