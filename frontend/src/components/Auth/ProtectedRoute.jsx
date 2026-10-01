/**
 * ProtectedRoute — route guard for pages that require a logged-in user.
 *
 * Works as a wrapper (<ProtectedRoute><Page /></ProtectedRoute>)
 * or as a layout route (<Route element={<ProtectedRoute />}> ... </Route>).
 *
 * TODO: redirect unauthenticated users to /login and check the user's role.
 * WARNING: until that is implemented this is a pass-through — it does NOT enforce authentication.
 */
import { Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  return children ?? <Outlet />;
};

export default ProtectedRoute;
