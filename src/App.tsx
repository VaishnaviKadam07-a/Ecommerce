import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import SearchPage from "./pages/SearchPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";

import ProfileLayout, { ProfileOverview } from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
import WishlistPage from "./pages/WishlistPage";
import AddressesPage from "./pages/AddressesPage";
import SettingsPage from "./pages/SettingsPage";

import TestimonialsPage from "./pages/TestimonialsPage";
import BookingPage from "./pages/BookingPage";
import ChatPage from "./pages/ChatPage";

function ProtectedRoute({ children }) {
  const { user } = useApp();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function Layout({ children, hideFooter = false }) {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/login" element={<LoginPage />} />

      {/* Main Pages */}
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />

      <Route
        path="/categories"
        element={
          <Layout>
            <CategoriesPage />
          </Layout>
        }
      />

      <Route
        path="/search"
        element={
          <Layout>
            <SearchPage />
          </Layout>
        }
      />

      <Route
        path="/product/:id"
        element={
          <Layout>
            <ProductPage />
          </Layout>
        }
      />

      {/* Cart */}
      <Route
        path="/cart"
        element={
          <Layout>
            <CartPage />
          </Layout>
        }
      />

      {/* Protected Checkout */}
      <Route
        path="/checkout"
        element={
          <Layout hideFooter>
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          </Layout>
        }
      />

      {/* Protected Payment */}
      <Route
        path="/payment"
        element={
          <Layout hideFooter>
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          </Layout>
        }
      />

      {/* Protected Order Success */}
      <Route
        path="/order-success"
        element={
          <Layout>
            <ProtectedRoute>
              <OrderSuccessPage />
            </ProtectedRoute>
          </Layout>
        }
      />

      {/* Other Pages */}
      <Route
        path="/testimonials"
        element={
          <Layout>
            <TestimonialsPage />
          </Layout>
        }
      />

      <Route
        path="/booking"
        element={
          <Layout>
            <BookingPage />
          </Layout>
        }
      />

      <Route
        path="/chat"
        element={
          <Layout>
            <ChatPage />
          </Layout>
        }
      />

      {/* Protected Profile */}
      <Route
        path="/profile"
        element={
          <Layout>
            <ProtectedRoute>
              <ProfileLayout />
            </ProtectedRoute>
          </Layout>
        }
      >
        <Route index element={<ProfileOverview />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="addresses" element={<AddressesPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Unknown Routes */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}