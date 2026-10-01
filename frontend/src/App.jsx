/**
 * Root component
 * کامپوننت اصلی
 *
 * Declares the application routes. Every page renders inside <Layout />.
 */
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';

import ForgotPassword from './components/Auth/ForgotPassword';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

import CustomersPage from './pages/CustomersPage';
import DashboardPage from './pages/DashboardPage';
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

    {/* TODO: wrap these routes with <ProtectedRoute /> once authentication is implemented. */}
    <Route element={<Layout />}>
      <Route index element={<HomePage />} />
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
  </Routes>
);

export default App;
