/**
 * Root component
 * کامپوننت اصلی
 *
 * Declares the application routes:
 *  - /login, /register, /forgot-password   public authentication screens
 *  - /admin/...                            admin panel, rendered inside <Layout />
 *  - everything else                       customer app, rendered inside <CustomerLayout />
 */
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import CustomerLayout from './components/Layout/CustomerLayout';

import ForgotPassword from './components/Auth/ForgotPassword';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

import AccountSettingsPage from './pages/AccountSettingsPage';
import CartPage from './pages/CartPage';
import ComingSoonPage from './pages/ComingSoonPage';
import CustomerNotFoundPage from './pages/CustomerNotFoundPage';
import CustomersPage from './pages/CustomersPage';
import DashboardPage from './pages/DashboardPage';
import FoodDetailPage from './pages/FoodDetailPage';
import HomePage from './pages/HomePage';
import InventoryPage from './pages/InventoryPage';
import MenuPage from './pages/MenuPage';
import NotFoundPage from './pages/NotFoundPage';
import OrdersPage from './pages/OrdersPage';
import ReportsPage from './pages/ReportsPage';
import ReservationsPage from './pages/ReservationsPage';
import SettingsPage from './pages/SettingsPage';
import TablesPage from './pages/TablesPage';

const App = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />

    {/* Admin panel. TODO: wrap it with <ProtectedRoute /> once authentication is implemented. */}
    <Route path="/admin" element={<Layout />}>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="tables" element={<TablesPage />} />
      <Route path="menu" element={<MenuPage />} />
      <Route path="customers" element={<CustomersPage />} />
      <Route path="inventory" element={<InventoryPage />} />
      <Route path="reservations" element={<ReservationsPage />} />
      <Route path="reports" element={<ReportsPage />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>

    {/* Customer app (mobile-first, dark and light theme) */}
    <Route element={<CustomerLayout />}>
      <Route index element={<HomePage />} />
      <Route path="food/:id" element={<FoodDetailPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="menu" element={<ComingSoonPage title="منو" />} />
      <Route path="offers" element={<ComingSoonPage title="پیشنهادهای ویژه" />} />
      <Route path="messages" element={<ComingSoonPage title="پیام‌ها" />} />
      <Route path="notifications" element={<ComingSoonPage title="اعلان‌ها" />} />
      <Route path="profile" element={<ComingSoonPage title="حساب کاربری" />} />
      <Route path="settings" element={<AccountSettingsPage />} />
      <Route path="*" element={<CustomerNotFoundPage />} />
    </Route>
  </Routes>
);

export default App;
