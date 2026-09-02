import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { formatPrice } from "../data/products";

const statusColors: Record<string, string> = {
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-yellow-100 text-yellow-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function OrdersPage() {
  const { orders } = useApp();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-gray-800 mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} className="rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="font-semibold text-gray-700 mb-2">No orders yet</h3>
          <p className="text-gray-400 text-sm mb-6">You haven't placed any orders yet. Start shopping!</p>
          <Link to="/" style={{ backgroundColor: "var(--primary)", borderRadius: "0.75rem" }} className="inline-block px-6 py-2.5 text-white text-sm font-medium">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} className="rounded-xl overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-sm font-bold text-gray-800">{order.id}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[order.status]}`}>{order.status}</span>
                    <span className="font-bold text-gray-800">{formatPrice(order.total)}</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
                  {order.items.slice(0, 4).map((item, i) => (
                    <div key={i} className="shrink-0 relative">
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover bg-gray-50" />
                      {item.quantity > 1 && (
                        <span style={{ backgroundColor: "var(--primary)" }} className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold">
                          {item.quantity}
                        </span>
                      )}
                    </div>
                  ))}
                  {order.items.length > 4 && (
                    <div className="shrink-0 w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-500">
                      +{order.items.length - 4}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <button onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors">
                    {expandedOrder === order.id ? "Hide details ↑" : "View details ↓"}
                  </button>
                </div>
              </div>

              {expandedOrder === order.id && (
                <div style={{ backgroundColor: "var(--secondary)" }} className="px-5 py-4 border-t border-gray-100">
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Items</p>
                      <div className="space-y-2">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-gray-700 truncate max-w-[60%]">{item.name} × {item.quantity}</span>
                            <span className="font-medium text-gray-800">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Delivery Address</p>
                      <p className="text-sm text-gray-700">{order.address.name}</p>
                      <p className="text-sm text-gray-500">{order.address.line1}, {order.address.city}</p>
                      <p className="text-sm text-gray-500">{order.address.state} — {order.address.pincode}</p>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 mt-3">Payment</p>
                      <p className="text-sm text-gray-700">{order.paymentMethod}</p>
                      <p className="text-xs text-gray-400 font-mono">{order.paymentId}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 text-sm text-gray-600 border-t border-gray-200 pt-3">
                    <span>Subtotal: {formatPrice(order.subtotal)}</span>
                    <span>•</span>
                    <span>Shipping: {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span>
                    <span>•</span>
                    <span>GST: {formatPrice(order.tax)}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
