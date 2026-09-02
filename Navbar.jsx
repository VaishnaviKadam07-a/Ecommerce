```jsx
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { user, logout, cartCount, wishlist } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/categories", label: "Categories" },
    { to: "/testimonials", label: "Reviews" },
    { to: "/booking", label: "Booking" },
  ];

  return (
    <nav
      style={{ backgroundColor: "var(--primary)" }}
      className="sticky top-0 z-50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div
              style={{ backgroundColor: "var(--accent)" }}
              className="w-8 h-8 rounded-lg flex items-center justify-center"
            >
              <span className="text-white font-bold text-sm">S</span>
            </div>

            <span className="font-display text-white text-xl font-semibold hidden sm:block">
              Shopify
            </span>
          </Link>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-xl mx-4 hidden md:flex"
          >
            <div className="flex w-full rounded-lg overflow-hidden">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-4 py-2 text-sm bg-white text-gray-800 focus:outline-none"
              />

              <button
                type="submit"
                style={{ backgroundColor: "var(--accent)" }}
                className="px-4 py-2 text-white hover:opacity-90 transition-opacity"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </form>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "text-amber-400"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 ml-auto">

            {/* Wishlist */}
            <Link
              to={user ? "/profile/wishlist" : "/login"}
              className="relative text-white/80 hover:text-white transition-colors p-1"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>

              {wishlist.length > 0 && (
                <span
                  style={{ backgroundColor: "var(--accent)" }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center"
                >
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-white/80 hover:text-white transition-colors p-1"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>

              {cartCount > 0 && (
                <span
                  style={{ backgroundColor: "var(--accent)" }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center"
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Chat */}
            <Link
              to="/chat"
              className="text-white/80 hover:text-white transition-colors p-1"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </Link>

            {/* User */}
            {user ? (
              <div className="relative">

                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <div
                    style={{ backgroundColor: "var(--accent)" }}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                  >
                    {user.avatar}
                  </div>
                </button>

                {userMenuOpen && (
                  <div
                    style={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                    }}
                    className="absolute right-0 top-10 w-48 rounded-xl shadow-xl py-1 z-50"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">
                        {user.name}
                      </p>

                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    {[
                      { to: "/profile", label: "My Profile" },
                      { to: "/profile/orders", label: "My Orders" },
                      { to: "/profile/wishlist", label: "Wishlist" },
                      { to: "/profile/addresses", label: "Addresses" },
                      { to: "/profile/settings", label: "Settings" },
                    ].map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                style={{ backgroundColor: "var(--accent)" }}
                className="px-4 py-1.5 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-white p-1"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    menuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-white/10 py-3 space-y-1">

            <form
              onSubmit={handleSearch}
              className="flex mb-3 rounded-lg overflow-hidden"
            >
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="flex-1 px-3 py-2 text-sm bg-white text-gray-800"
              />

              <button
                type="submit"
                style={{ backgroundColor: "var(--accent)" }}
                className="px-3 text-white"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>

            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-white/80 hover:text-white text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
```
