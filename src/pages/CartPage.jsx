import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { products, formatPrice } from "../data/products";

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    cartTotal,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    user,
  } = useApp();

  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const shipping = cartTotal > 500 ? 0 : 99;
  const tax = Math.round(cartTotal * 0.18);
  const discountAmount = Math.round(
    cartTotal * (couponDiscount / 100)
  );
  const total = cartTotal + shipping + tax - discountAmount;

  const handleApplyCoupon = () => {
    setCouponError("");
    setCouponSuccess("");

    if (applyCoupon(couponInput)) {
      setCouponSuccess(`Coupon applied! ${couponDiscount}% off`);
    } else {
      setCouponError("Invalid coupon code");
    }

    setCouponInput("");
  };

  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <svg
          className="w-24 h-24 mx-auto mb-6 text-gray-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>

        <h2 className="font-display text-3xl text-gray-400 mb-3">
          Your cart is empty
        </h2>

        <p className="text-gray-400 mb-8">
          Browse our products and add something you love
        </p>

        <Link
          to="/categories"
          style={{
            backgroundColor: "var(--primary)",
            borderRadius: "var(--radius)",
          }}
          className="inline-block px-8 py-3 text-white font-semibold"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-semibold text-gray-800 mb-8">
        Shopping Cart ({cart.length} items)
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const product = products.find(
              (p) => p.id === item.productId
            );

            if (!product) return null;

            const variantKey = JSON.stringify(item.variant);

            return (
              <div
                key={`${item.productId}-${variantKey}`}
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
                className="rounded-xl p-4 flex gap-4"
              >
                <Link
                  to={`/product/${product.id}`}
                  className="shrink-0"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-24 h-24 rounded-xl object-cover bg-gray-50"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-gray-800 text-sm hover:text-amber-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  {Object.entries(item.variant).length > 0 && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {Object.entries(item.variant)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(", ")}
                    </p>
                  )}

                  <p className="font-bold text-gray-900 mt-1">
                    {formatPrice(product.price)}
                  </p>

                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity - 1,
                            item.variant
                          )
                        }
                        className="px-3 py-1 text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        −
                      </button>

                      <span className="px-3 py-1 text-sm font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity + 1,
                            item.variant
                          )
                        }
                        className="px-3 py-1 text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(
                          item.productId,
                          item.variant
                        )
                      }
                      className="text-xs text-red-500 hover:text-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="font-bold text-gray-800">
                    {formatPrice(
                      product.price * item.quantity
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

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

            {/* Coupon */}
            <div className="mb-5">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) =>
                    setCouponInput(e.target.value)
                  }
                  placeholder="Enter coupon code"
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "0.5rem",
                  }}
                  className="flex-1 px-3 py-2 text-sm bg-white focus:outline-none"
                />

                <button
                  onClick={handleApplyCoupon}
                  style={{
                    backgroundColor: "var(--primary)",
                    borderRadius: "0.5rem",
                  }}
                  className="px-3 py-2 text-white text-sm font-medium hover:opacity-90"
                >
                  Apply
                </button>
              </div>

              {couponError && (
                <p className="text-xs text-red-500 mt-1">
                  {couponError}
                </p>
              )}

              {couponSuccess && (
                <p className="text-xs text-green-500 mt-1">
                  {couponSuccess}
                </p>
              )}

              {appliedCoupon && (
                <div className="flex items-center justify-between mt-2 p-2 bg-green-50 rounded-lg">
                  <span className="text-xs text-green-700 font-medium">
                    {appliedCoupon} applied
                  </span>

                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              )}

              <p className="text-xs text-gray-400 mt-1">
                Try: SAVE10, SAVE20, WELCOME15
              </p>
            </div>

            <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>

                <span
                  className={
                    shipping === 0
                      ? "text-green-500 font-medium"
                      : ""
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
                  <span>
                    Discount ({couponDiscount}%)
                  </span>

                  <span>
                    −{formatPrice(discountAmount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between font-bold text-gray-800 text-base border-t border-gray-100 pt-3">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              style={{
                backgroundColor: "var(--primary)",
                borderRadius: "var(--radius)",
              }}
              className="w-full py-3 text-white font-semibold text-sm mt-5 hover:opacity-90 transition-opacity"
            >
              Proceed to Checkout →
            </button>

            {shipping > 0 && (
              <p className="text-xs text-center text-gray-400 mt-3">
                Add ₹
                {formatPrice(500 - cartTotal).slice(1)}
                {" "}more for free shipping
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}