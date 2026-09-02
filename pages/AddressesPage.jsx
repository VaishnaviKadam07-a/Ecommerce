import { useState } from "react";
import { useApp } from "../context/AppContext";

const empty = {
  label: "Home",
  name: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
  isDefault: false,
};

export default function AddressesPage() {
  const { addresses, addAddress, updateAddress, deleteAddress } = useApp();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};

    if (!form.name.trim()) {
      errs.name = "Required";
    }

    if (!form.phone.match(/^\d{10}$/)) {
      errs.phone = "Enter valid 10-digit phone";
    }

    if (!form.line1.trim()) {
      errs.line1 = "Required";
    }

    if (!form.city.trim()) {
      errs.city = "Required";
    }

    if (!form.state.trim()) {
      errs.state = "Required";
    }

    if (!form.pincode.match(/^\d{6}$/)) {
      errs.pincode = "Enter valid 6-digit pincode";
    }

    setErrors(errs);

    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (editing) {
      updateAddress({
        ...editing,
        ...form,
      });
    } else {
      addAddress(form);
    }

    setShowForm(false);
    setEditing(null);
    setForm(empty);
    setErrors({});
  };

  const handleEdit = (addr) => {
    setEditing(addr);

    setForm({
      label: addr.label,
      name: addr.name,
      phone: addr.phone,
      line1: addr.line1,
      line2: addr.line2,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      isDefault: addr.isDefault,
    });

    setShowForm(true);
  };

  const F = (key) => ({
    value: form[key],
    onChange: (e) =>
      setForm((f) => ({
        ...f,
        [key]: e.target.value,
      })),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-semibold text-gray-800">
          My Addresses
        </h2>

        <button
          onClick={() => {
            setShowForm(true);
            setEditing(null);
            setForm(empty);
          }}
          style={{
            backgroundColor: "var(--primary)",
            borderRadius: "0.5rem",
          }}
          className="px-4 py-2 text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          + Add New Address
        </button>
      </div>

      {showForm && (
        <div
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
          }}
          className="rounded-xl p-6 mb-6"
        >
          <h3 className="font-semibold text-gray-800 mb-4">
            {editing ? "Edit Address" : "New Address"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Label */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Label
                </label>

                <select
                  {...F("label")}
                  className="w-full px-3 py-2.5 text-sm bg-white rounded-lg border border-gray-200 focus:outline-none"
                >
                  {["Home", "Work", "Other"].map((label) => (
                    <option key={label}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>

                <input
                  type="text"
                  {...F("name")}
                  className="w-full px-3 py-2.5 text-sm bg-white rounded-lg border border-gray-200 focus:outline-none"
                  placeholder="Arjun Sharma"
                />

                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>

                <input
                  type="tel"
                  {...F("phone")}
                  className="w-full px-3 py-2.5 text-sm bg-white rounded-lg border border-gray-200 focus:outline-none"
                  placeholder="9876543210"
                />

                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Address Line 1 */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 1
                </label>

                <input
                  type="text"
                  {...F("line1")}
                  className="w-full px-3 py-2.5 text-sm bg-white rounded-lg border border-gray-200 focus:outline-none"
                  placeholder="House No, Street"
                />

                {errors.line1 && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.line1}
                  </p>
                )}
              </div>

              {/* Address Line 2 */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 2 (Optional)
                </label>

                <input
                  type="text"
                  {...F("line2")}
                  className="w-full px-3 py-2.5 text-sm bg-white rounded-lg border border-gray-200 focus:outline-none"
                  placeholder="Landmark, Area"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>

                <input
                  type="text"
                  {...F("city")}
                  className="w-full px-3 py-2.5 text-sm bg-white rounded-lg border border-gray-200 focus:outline-none"
                  placeholder="Mumbai"
                />

                {errors.city && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.city}
                  </p>
                )}
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>

                <select
                  {...F("state")}
                  className="w-full px-3 py-2.5 text-sm bg-white rounded-lg border border-gray-200 focus:outline-none"
                >
                  <option value="">Select State</option>

                  {[
                    "Maharashtra",
                    "Karnataka",
                    "Tamil Nadu",
                    "Delhi",
                    "Gujarat",
                    "Rajasthan",
                    "West Bengal",
                    "Uttar Pradesh",
                    "Telangana",
                    "Kerala",
                    "Punjab",
                    "Haryana",
                  ].map((state) => (
                    <option key={state}>{state}</option>
                  ))}
                </select>

                {errors.state && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.state}
                  </p>
                )}
              </div>

              {/* Pincode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode
                </label>

                <input
                  type="text"
                  {...F("pincode")}
                  maxLength={6}
                  className="w-full px-3 py-2.5 text-sm bg-white rounded-lg border border-gray-200 focus:outline-none"
                  placeholder="400001"
                />

                {errors.pincode && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.pincode}
                  </p>
                )}
              </div>

              {/* Default Address */}
              <div className="flex items-center gap-2 pt-4">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={form.isDefault}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      isDefault: e.target.checked,
                    }))
                  }
                  className="rounded"
                />

                <label
                  htmlFor="isDefault"
                  className="text-sm text-gray-700"
                >
                  Set as default address
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                style={{
                  backgroundColor: "var(--primary)",
                  borderRadius: "0.5rem",
                }}
                className="px-6 py-2.5 text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                {editing ? "Update Address" : "Save Address"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                }}
                className="px-6 py-2.5 text-gray-600 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {addresses.length === 0 && !showForm ? (
        <div
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
          }}
          className="rounded-xl p-12 text-center"
        >
          <div className="text-6xl mb-4">📍</div>

          <h3 className="font-semibold text-gray-700 mb-2">
            No addresses saved
          </h3>

          <p className="text-gray-400 text-sm">
            Add a delivery address to speed up checkout
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              style={{
                backgroundColor: "var(--card)",
                border: addr.isDefault
                  ? "2px solid var(--accent)"
                  : "1px solid var(--border)",
              }}
              className="rounded-xl p-5 relative"
            >
              {addr.isDefault && (
                <span
                  style={{ backgroundColor: "var(--accent)" }}
                  className="absolute top-3 right-3 text-white text-xs font-semibold px-2 py-0.5 rounded-full"
                >
                  Default
                </span>
              )}

              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">
                  {addr.label === "Home"
                    ? "🏠"
                    : addr.label === "Work"
                    ? "💼"
                    : "📍"}
                </span>

                <span className="font-semibold text-gray-800 text-sm">
                  {addr.label}
                </span>
              </div>

              <p className="font-medium text-gray-800 text-sm">
                {addr.name}
              </p>

              <p className="text-gray-500 text-sm">
                {addr.line1}
                {addr.line2 ? `, ${addr.line2}` : ""}
              </p>

              <p className="text-gray-500 text-sm">
                {addr.city}, {addr.state} — {addr.pincode}
              </p>

              <p className="text-gray-400 text-xs mt-1">
                {addr.phone}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEdit(addr)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteAddress(addr.id)}
                  className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}