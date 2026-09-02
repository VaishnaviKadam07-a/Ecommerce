import { useState } from "react";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

const navItems = [
  { to: "/profile", label: "My Profile", icon: "👤", exact: true },
  { to: "/profile/orders", label: "My Orders", icon: "📦" },
  { to: "/profile/wishlist", label: "Wishlist", icon: "❤️" },
  { to: "/profile/addresses", label: "Addresses", icon: "📍" },
  { to: "/profile/settings", label: "Account Settings", icon: "⚙️" },
];

export default function ProfileLayout() {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) { navigate("/login"); return null; }

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} className="rounded-xl overflow-hidden sticky top-24">
            <div style={{ backgroundColor: "var(--primary)" }} className="p-5">
              <div className="flex items-center gap-3">
                <div style={{ backgroundColor: "var(--accent)" }} className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {user.avatar}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{user.name}</p>
                  <p className="text-white/60 text-xs truncate">{user.email}</p>
                </div>
              </div>
            </div>
            <nav className="p-2">
              {navItems.map(item => {
                const active = item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to) && !navItems.find(n => n.to !== item.to && n.exact && location.pathname === n.to);
                return (
                  <Link key={item.to} to={item.to}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active ? "text-white" : "text-gray-600 hover:bg-gray-50"}`}
                    style={{ backgroundColor: active ? "var(--primary)" : "transparent" }}>
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
                <span>🚪</span>
                Logout
              </button>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export function ProfileOverview() {
  const { user, orders, wishlist } = useApp();
  if (!user) return null;

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-gray-800 mb-6">My Profile</h2>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Orders", value: orders.length, icon: "📦" },
          { label: "Wishlist Items", value: wishlist.length, icon: "❤️" },
          { label: "Pending Deliveries", value: orders.filter(o => o.status === "processing").length, icon: "🚚" },
        ].map(stat => (
          <div key={stat.label} style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} className="rounded-xl p-5 text-center">
            <span className="text-3xl">{stat.icon}</span>
            <p className="font-display text-3xl font-semibold text-gray-800 mt-2">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} className="rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Personal Information</h3>
        <div className="space-y-3">
          {[
            { label: "Full Name", value: user.name },
            { label: "Email", value: user.email },
            { label: "Phone", value: user.phone || "Not set" },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-500">{item.label}</span>
              <span className="text-sm font-medium text-gray-800">{item.value}</span>
            </div>
          ))}
        </div>
        <Link to="/profile/settings" style={{ backgroundColor: "var(--primary)", borderRadius: "0.5rem" }} className="inline-block mt-4 px-5 py-2 text-white text-sm font-medium hover:opacity-90 transition-opacity">
          Edit Profile
        </Link>
      </div>
    </div>
  );
}
