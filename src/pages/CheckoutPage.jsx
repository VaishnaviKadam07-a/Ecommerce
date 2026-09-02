import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { products, formatPrice } from "../data/products";

export default function CheckoutPage() {
  const {
    cart,
    cartTotal,
    appliedCoupon,
    couponDiscount,
    addresses,
    user,
  } = useApp();

  const navigate = useNavigate();

  const [useExisting, setUseExisting] = useState(
    addresses.length > 0
  );

  const [selectedAddressId, setSelectedAddressId] = useState(
    addresses.find((a) => a.isDefault)?.id ||
      addresses[0]?.id ||
      ""
  );

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  const shipping = cartTotal > 500 ? 0 : 99;
  const tax = Math.round(cartTotal * 0.18);
  const discountAmount = Math.round(
    cartTotal * (couponDiscount / 100)
  );
  const total =
    cartTotal + shipping + tax - discountAmount;

  const validate = () => {
    const errs = {};

    if (!form.name.trim()) {
      errs.name = "Required";
    }

    if (!form.phone.match(/^\d{10}$/)) {
      errs.phone = "Enter valid 10-digit phone";
    }

    if (!form.email.includes("@")) {
      errs.email = "Enter valid email";
    }

    if (!useExisting || !selectedAddressId) {
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
    }

    setErrors(errs);

    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const selectedAddr = addresses.find(
      (a) => a.id === selectedAddressId
    );

    const address =
      useExisting && selectedAddr
        ? selectedAddr
        : {
            id: "new",
            label: "Home",
            name: form.name,
            phone: form.phone,
            line1: form.line1,
            line2: form.line2,
            city: form.city,
            state: form.state,
            pincode: form.pincode,
            isDefault: false,
          };

    navigate("/payment", {
      state: {
        address,
        name: form.name,
        phone: form.phone,
        email: form.email,
        total,
        subtotal: cartTotal,
        shipping,
        tax,
        discount: discountAmount,
      },
    });
  };

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-semibold text-gray-800 mb-8">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 space-y-6"
        >
          {/* Contact Information */}
          <div
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
            }}
            className="rounded-xl p-6"
          >
            <h3 className="font-semibold text-gray-800 mb-4">
              Contact Information
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name" error={errors.name}>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      name: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2.5 text-sm bg-white focus:outline-none rounded-lg border border-gray-200"
                  placeholder="Arjun Sharma"
                />
              </Field>

              <Field
                label="Phone Number"
                error={errors.phone}
              >
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      phone: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2.5 text-sm bg-white focus:outline-none rounded-lg border border-gray-200"
                  placeholder="9876543210"
                />
              </Field>

              <Field
                label="Email Address"
                error={errors.email}
                className="sm:col-span-2"
              >
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      email: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2.5 text-sm bg-white focus:outline-none rounded-lg border border-gray-200"
                  placeholder="arjun@example.com"
                />
              </Field>
            </div>
          </div>

          {/* Shipping Address */}
          <div
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
            }}
            className="rounded-xl p-6"
          >
            <h3 className="font-semibold text-gray-800 mb-4">
              Shipping Address
            </h3>

            {addresses.length > 0 && (
              <div className="flex gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setUseExisting(true)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                    useExisting
                      ? "border-amber-500 text-amber-700 bg-amber-50"
                      : "border-gray-200 text-gray-600"
                  }`}
                >
                  Saved Addresses
                </button>

                <button
                  type="button"
                  onClick={() => setUseExisting(false)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                    !useExisting
                      ? "border-amber-500 text-amber-700 bg-amber-50"
                      : "border-gray-200 text-gray-600"
                  }`}
                >
                  New Address
                </button>
              </div>
            )}

            {useExisting && addresses.length > 0 ? (
              <div className="space-y-3">
                {addresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={`flex gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedAddressId === addr.id
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      value={addr.id}
                      checked={
                        selectedAddressId === addr.id
                      }
                      onChange={() =>
                        setSelectedAddressId(addr.id)
                      }
                      className="mt-0.5"
                    />

                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        {addr.name} — {addr.label}
                      </p>

                      <p className="text-gray-500 text-sm">
                        {addr.line1}
                        {addr.line2
                          ? `, ${addr.line2}`
                          : ""}
                        , {addr.city}, {addr.state} —{" "}
                        {addr.pincode}
                      </p>

                      <p className="text-gray-400 text-xs">
                        {addr.phone}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="Address Line 1"
                  error={errors.line1}
                  className="sm:col-span-2"
                >
                  <input
                    type="text"
                    value={form.line1}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        line1: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2.5 text-sm bg-white focus:outline-none rounded-lg border border-gray-200"
                    placeholder="House No, Street Name"
                  />
                </Field>

                <Field
                  label="Address Line 2 (Optional)"
                  className="sm:col-span-2"
                >
                  <input
                    type="text"
                    value={form.line2}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        line2: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2.5 text-sm bg-white focus:outline-none rounded-lg border border-gray-200"
                    placeholder="Landmark, Area"
                  />
                </Field>

                <Field
                  label="City"
                  error={errors.city}
                >
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        city: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2.5 text-sm bg-white focus:outline-none rounded-lg border border-gray-200"
                    placeholder="Mumbai"
                  />
                </Field>

                <Field
                  label="State"
                  error={errors.state}
                >
                  <select
                    value={form.state}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        state: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2.5 text-sm bg-white focus:outline-none rounded-lg border border-gray-200"
                  >
                    <option value="">
                      Select State
                    </option>

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
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="Pincode"
                  error={errors.pincode}
                >
                  <input
                    type="text"
                    value={form.pincode}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        pincode: e.target.value,
                      }))
                    }
                    maxLength={6}
                    className="w-full px-3 py-2.5 text-sm bg-white focus:outline-none rounded-lg border border-gray-200"
                    placeholder="400001"
                  />
                </Field>
              </div>
            )}
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "var(--primary)",
              borderRadius: "var(--radius)",
            }}
            className="w-full py-3.5 text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Continue to Payment →
          </button>
        </form>

        {/* Order Summary */}
        <div>
          <div
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
            }}
            className="rounded-xl p-5 sticky top-24"
          >
            <h3 className="font-semibold text-gray-800 mb-4">
              Order Summary
            </h3>

            <div className="space-y-3 mb-4">
              {cart.map((item) => {
                const product = products.find(
                  (p) => p.id === item.productId
                );

                if (!product) return null;

                return (
                  <div
                    key={`${item.productId}-${JSON.stringify(
                      item.variant
                    )}`}
                    className="flex gap-3"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-gray-50"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-800 font-medium line-clamp-2">
                        {product.name}
                      </p>

                      <p className="text-xs text-gray-400">
                        × {item.quantity}
                      </p>
                    </div>

                    <p className="text-xs font-semibold text-gray-800 shrink-0">
                      {formatPrice(
                        product.price * item.quantity
                      )}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2 text-sm border-t border-gray-100 pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span
                  className={
                    shipping === 0 ? "text-green-500" : ""
                  }
                >
                  {shipping === 0
                    ? "Free"
                    : formatPrice(shipping)}
                </span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>GST (18%)</span>
                <span>{formatPrice(tax)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>
                    −{formatPrice(discountAmount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between font-bold text-gray-800 text-base border-t pt-3">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, children, className }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      {children}

      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}