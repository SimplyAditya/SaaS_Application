import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import BrowsePlansPage from './pages/public/BrowsePlansPage';
import CartPage from './pages/public/CartPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import CheckoutPage from './pages/public/CheckoutPage';
import PaymentSuccessPage from './pages/public/PaymentSuccessPage';
import PaymentFailurePage from './pages/public/PaymentFailurePage';

// User Pages
import UserDashboard from './pages/user/UserDashboard';
import OrderHistory from './pages/user/OrderHistory';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';

// Super Admin Pages
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
import ManagePlans from './pages/superadmin/ManagePlans';
import ManageOrganizations from './pages/superadmin/ManageOrganizations';

// Layouts
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import SuperAdminLayout from './layouts/SuperAdminLayout';

// Auth
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const theme = createTheme({
  palette: {
    primary: {
      main: '#722F37',
      light: '#8B3D46',
      dark: '#5C252B',
    },
    secondary: {
      main: '#2C3333',
      light: '#3D4444',
      dark: '#1A1F1F',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C3333',
      secondary: '#4A5858',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#722F37',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#5C252B',
          },
        },
        outlined: {
          borderColor: '#722F37',
          color: '#722F37',
          '&:hover': {
            borderColor: '#5C252B',
            backgroundColor: 'rgba(114, 47, 55, 0.1)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-colorPrimary': {
            backgroundColor: '#722F37',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Plans Route - Admin Only */}
            <Route
              path="/plans"
              element={
                <ProtectedRoute allowedRoles={['Admin', 'User']}>
                  <BrowsePlansPage />
                </ProtectedRoute>
              }
            />

            {/* Protected Checkout Routes - Admin Only */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute allowedRoles={['Admin', 'User']}>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute allowedRoles={['Admin', 'User']}>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment/success"
              element={
                <ProtectedRoute allowedRoles={['Admin', 'User']}>
                  <PaymentSuccessPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment/failure"
              element={
                <ProtectedRoute allowedRoles={['Admin', 'User']}>
                  <PaymentFailurePage />
                </ProtectedRoute>
              }
            />

            {/* User Routes */}
            <Route
              path="/user"
              element={
                <ProtectedRoute allowedRoles={['Admin', 'User']}>
                  <UserLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="orders" element={<OrderHistory />} />
            </Route>

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['User']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="manage-users" element={<ManageUsers />} />
            </Route>

            {/* Super Admin Routes */}
            <Route
              path="/superadmin"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <SuperAdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<SuperAdminDashboard />} />
              <Route path="manage-plans" element={<ManagePlans />} />
              <Route path="manage-organizations" element={<ManageOrganizations />} />
            </Route>

            {/* Catch all - replace with 404 page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
