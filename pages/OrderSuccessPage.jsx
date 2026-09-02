import { useLocation, useNavigate, Link } from "react-router-dom";
import { formatPrice } from "../data/products";

export default function OrderSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as any;

  if (!state) { navigate("/"); return null; }

  const { orderId, paymentId, total, items, address, paymentMethod, subtotal, shipping, tax, discount } = state;
  const orderDate = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  const handlePrint = () => window.print();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Success header */}
      <div className="text-center mb-10">
        <div style={{ backgroundColor: "rgba(39,174,96,0.1)" }} className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-display text-3xl font-semibold text-gray-800 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-500">Thank you for your purchase. Your order has been confirmed.</p>
      </div>

      {/* Receipt card */}
      <div id="receipt" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} className="rounded-2xl overflow-hidden">
        {/* Header */}
        <div style={{ backgroundColor: "var(--primary)" }} className="p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div style={{ backgroundColor: "var(--accent)" }} className="w-7 h-7 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">S</span>
                </div>
                <span className="font-display text-lg font-semibold">Shopify</span>
              </div>
              <p className="text-white/60 text-sm">Order Receipt</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-sm font-bold">{orderId}</p>
              <p className="text-white/60 text-xs mt-1">{orderDate}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Order info */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "Payment ID", value: paymentId, mono: true },
              { label: "Payment Method", value: paymentMethod },
              { label: "Estimated Delivery", value: estimatedDelivery },
            ].map(item => (
              <div key={item.label} style={{ backgroundColor: "var(--secondary)", borderRadius: "0.75rem" }} className="p-3">
                <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                <p className={`text-sm font-semibold text-gray-800 ${item.mono ? "font-mono" : ""}`}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* Items */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Items Ordered</h3>
            <div className="space-y-3">
              {items.map((item: any) => (
                <div key={`${item.productId}-${JSON.stringify(item.variant)}`} className="flex gap-3 pb-3 border-b border-gray-100 last:border-0">
                  <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover bg-gray-50" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 line-clamp-2">{item.name}</p>
                    {Object.keys(item.variant).length > 0 && (
                      <p className="text-xs text-gray-400 mt-0.5">{Object.entries(item.variant).map(([k, v]) => `${k}: ${v}`).join(", ")}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 shrink-0">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Price breakdown */}
          <div style={{ backgroundColor: "var(--secondary)", borderRadius: "0.75rem" }} className="p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Price Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Shipping</span><span className={shipping === 0 ? "text-green-500" : ""}>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
              <div className="flex justify-between text-gray-600"><span>GST (18%)</span><span>{formatPrice(tax)}</span></div>
              {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>−{formatPrice(discount)}</span></div>}
              <div className="flex justify-between font-bold text-gray-800 text-base border-t border-gray-200 pt-2"><span>Amount Paid</span><span>{formatPrice(total)}</span></div>
            </div>
          </div>

          {/* Delivery address */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Delivery Address</h3>
            <div style={{ border: "1px solid var(--border)", borderRadius: "0.75rem" }} className="p-4">
              <p className="font-medium text-gray-800 text-sm">{address.name}</p>
              <p className="text-gray-500 text-sm">{address.line1}{address.line2 ? `, ${address.line2}` : ""}</p>
              <p className="text-gray-500 text-sm">{address.city}, {address.state} — {address.pincode}</p>
              <p className="text-gray-400 text-xs mt-1">{address.phone}</p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div style={{ backgroundColor: "var(--secondary)" }} className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-gray-800">Order Confirmed & Processing</span>
            </div>
            <span className="text-xs text-gray-400">Est. delivery by {estimatedDelivery}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button onClick={handlePrint}
          style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)" }}
          className="flex-1 py-3 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 bg-white">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          Print Receipt
        </button>
        <Link to="/profile/orders"
          style={{ backgroundColor: "var(--primary)", borderRadius: "var(--radius)" }}
          className="flex-1 py-3 text-white font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          View My Orders
        </Link>
        <Link to="/"
          style={{ backgroundColor: "var(--accent)", borderRadius: "var(--radius)" }}
          className="flex-1 py-3 text-white font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
