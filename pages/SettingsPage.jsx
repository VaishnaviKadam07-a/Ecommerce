import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function SettingsPage() {
  const { user, updateUser } = useApp();
  const [form, setForm] = useState({ name: user?.name || "", phone: user?.phone || "", email: user?.email || "" });
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({ orders: true, promotions: false, wishlist: true });

  if (!user) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name: form.name, phone: form.phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-semibold text-gray-800">Account Settings</h2>

      {/* Personal info */}
      <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} className="rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Personal Information</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full px-3 py-2.5 text-sm bg-white rounded-lg border border-gray-200 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                className="w-full px-3 py-2.5 text-sm bg-white rounded-lg border border-gray-200 focus:outline-none" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" value={form.email} disabled className="w-full px-3 py-2.5 text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-400 cursor-not-allowed" />
              <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
            </div>
          </div>
          <button type="submit" style={{ backgroundColor: saved ? "var(--success)" : "var(--primary)", borderRadius: "0.5rem" }}
            className="px-6 py-2.5 text-white text-sm font-medium hover:opacity-90 transition-all">
            {saved ? "✓ Saved!" : "Save Changes"}
          </button>
        </form>
      </div>

      {/* Notifications */}
      <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} className="rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {[
            { key: "orders", label: "Order Updates", desc: "Get notified about order status changes" },
            { key: "promotions", label: "Promotions & Offers", desc: "Receive deals, discounts, and special offers" },
            { key: "wishlist", label: "Wishlist Alerts", desc: "Price drops on your wishlist items" },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
              </div>
              <button onClick={() => setNotifications(n => ({ ...n, [item.key]: !n[item.key as keyof typeof n] }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications[item.key as keyof typeof notifications] ? "bg-green-500" : "bg-gray-200"}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${notifications[item.key as keyof typeof notifications] ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy */}
      <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} className="rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Privacy & Security</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-800">Change Password</p>
              <p className="text-xs text-gray-400">Update your account password</p>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">Update</button>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-red-500">Delete Account</p>
              <p className="text-xs text-gray-400">Permanently delete your account and data</p>
            </div>
            <button className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
