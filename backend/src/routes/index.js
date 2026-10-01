/**
 * Routes index
 * ترکیب تمام routes
 *
 * Combines every router under one parent router. The parent is mounted at /api in src/app.js,
 * so `router.use('/orders', ...)` below becomes `/api/orders`.
 */
const express = require('express');

const authRoutes = require('./auth.routes');
const ordersRoutes = require('./orders.routes');
const tablesRoutes = require('./tables.routes');
const menuRoutes = require('./menu.routes');
const customersRoutes = require('./customers.routes');
const inventoryRoutes = require('./inventory.routes');
const discountsRoutes = require('./discounts.routes');
const reservationsRoutes = require('./reservations.routes');
const loyaltyRoutes = require('./loyalty.routes');
const paymentsRoutes = require('./payments.routes');
const smsRoutes = require('./sms.routes');
const reportsRoutes = require('./reports.routes');
const employeesRoutes = require('./employees.routes');
const dashboardRoutes = require('./dashboard.routes');

const router = express.Router();

// Health check: GET /api/health
router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

router.use('/auth', authRoutes);
router.use('/orders', ordersRoutes);
router.use('/tables', tablesRoutes);
router.use('/menu', menuRoutes);
router.use('/customers', customersRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/discounts', discountsRoutes);
router.use('/reservations', reservationsRoutes);
router.use('/loyalty', loyaltyRoutes);
router.use('/payments', paymentsRoutes);
router.use('/sms', smsRoutes);
router.use('/reports', reportsRoutes);
router.use('/employees', employeesRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
