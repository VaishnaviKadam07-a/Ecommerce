import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { products, formatPrice } from "../data/products";

type PaymentMethod = "card" | "upi" | "netbanking" | "cod";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, addOrder, clearCart, user } = useApp();
  const state = location.state as any;

  const [method, setMethod] = useState<PaymentMethod>("card");
  const [loading, setLoading] = useState(false);
  const [cardForm, setCardForm] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [upiId, setUpiId] = useState("");
  const [bank, setBank] = useState("sbi");
  const [error, setError] = useState("");

  if (!state) { navigate("/cart"); return null; }

  const { address, name, phone, email, total, subtotal, shipping, tax, discount } = state;

  const formatCardNumber = (v: string) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (v: string) => v.replace(/\D/g, "").slice(0, 4).replace(/^(\d{2})(\d)/, "$1/$2");

  const validate = () => {
    if (method === "card") {
      if (cardForm.number.replace(/\s/g, "").length < 16) return "Enter valid 16-digit card number";
      if (!cardForm.name.trim()) return "Enter cardholder name";
      if (cardForm.expiry.length < 5) return "Enter valid expiry date";
      if (cardForm.cvv.length < 3) return "Enter valid CVV";
    }
    if (method === "upi") {
      if (!upiId.includes("@")) return "Enter valid UPI ID (e.g., name@upi)";
    }
    return null;
  };

  const handlePay = async () => {
    const err = method !== "cod" ? validate() : null;
    if (err) { setError(err); return; }
    setError(""); setLoading(true);

    await new Promise(r => setTimeout(r, 2000));

    const orderId = "ORD" + Date.now().toString().slice(-8);
    const paymentId = "PAY" + Math.random().toString(36).slice(2, 10).toUpperCase();

    const orderItems = cart.map(item => {
      const product = products.find(p => p.id === item.productId)!;
      return { productId: item.productId, name: product.name, price: product.price, quantity: item.quantity, image: product.images[0], variant: item.variant };
    });

    addOrder({
      id: orderId,
      date: new Date().toISOString(),
      items: orderItems,
      subtotal, shipping, tax, discount, total,
      status: method === "cod" ? "processing" : "processing",
      address,
      paymentMethod: method === "card" ? "Credit/Debit Card" : method === "upi" ? `UPI (${upiId})` : method === "netbanking" ? `Net Banking (${bank.toUpperCase()})` : "Cash on Delivery",
      paymentId,
    });

    clearCart();
    setLoading(false);
    navigate("/order-success", { state: { orderId, paymentId, total, items: orderItems, address, paymentMethod: method, subtotal, shipping, tax, discount } });
  };

  const methods: { id: PaymentMethod; icon: string; label: string }[] = [
    { id: "card", icon: "💳", label: "Credit / Debit Card" },
    { id: "upi", icon: "📱", label: "UPI Payment" },
    { id: "netbanking", icon: "🏦", label: "Net Banking" },
    { id: "cod", icon: "💵", label: "Cash on Delivery" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-semibold text-gray-800 mb-8">Payment</h1>

      {/* Test mode banner */}
      <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700 flex items-center gap-2">
        <span>🔧</span>
        <span><strong>Test Mode:</strong> No real payment is processed. Use any card/UPI details to simulate payment.</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {/* Payment method selection */}
          <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} className="rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Select Payment Method</h3>
            <div className="grid grid-cols-2 gap-3">
              {methods.map(m => (
                <button key={m.id} onClick={() => setMethod(m.id)}
                  className={`flex items-center gap-3 p-4 rounded-xl border text-sm font-medium text-left transition-all ${method === m.id ? "border-amber-500 bg-amber-50 text-amber-700" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                  <span className="text-xl">{m.icon}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Payment form */}
          <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} className="rounded-xl p-6">
            {method === "card" && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 mb-4">Card Details</h3>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Card Number</label>
                  <input type="text" value={cardForm.number} onChange={e => setCardForm(f => ({ ...f, number: formatCardNumber(e.target.value) }))}
                    placeholder="1234 5678 9012 3456" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-mono focus:outline-none" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Cardholder Name</label>
                  <input type="text" value={cardForm.name} onChange={e => setCardForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="ARJUN SHARMA" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Expiry Date</label>
                    <input type="text" value={cardForm.expiry} onChange={e => setCardForm(f => ({ ...f, expiry: formatExpiry(e.target.value) }))}
                      placeholder="MM/YY" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-mono focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">CVV</label>
                    <input type="password" value={cardForm.cvv} onChange={e => setCardForm(f => ({ ...f, cvv: e.target.value.slice(0, 4) }))}
                      placeholder="•••" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-mono focus:outline-none" />
                  </div>
                </div>
                <p className="text-xs text-gray-400">Test card: 4111 1111 1111 1111 | Any expiry/CVV</p>
              </div>
            )}

            {method === "upi" && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">UPI Payment</h3>
                <label className="text-sm font-medium text-gray-700 block mb-1">UPI ID</label>
                <input type="text" value={upiId} onChange={e => setUpiId(e.target.value)}
                  placeholder="yourname@upi" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none" />
                <p className="text-xs text-gray-400 mt-2">Supported: PhonePe, Google Pay, Paytm, BHIM</p>
                <div className="flex gap-4 mt-4">
                  {["PhonePe", "GPay", "Paytm", "BHIM"].map(app => (
                    <button key={app} onClick={() => setUpiId(`test@${app.toLowerCase()}`)}
                      className="px-4 py-2 text-xs font-medium rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
                      {app}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {method === "netbanking" && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Net Banking</h3>
                <label className="text-sm font-medium text-gray-700 block mb-1">Select Bank</label>
                <select value={bank} onChange={e => setBank(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none">
                  {[["sbi", "State Bank of India"], ["hdfc", "HDFC Bank"], ["icici", "ICICI Bank"], ["axis", "Axis Bank"], ["kotak", "Kotak Mahindra Bank"], ["yes", "Yes Bank"]].map(([v, l]) => (
                    <option key={v} value={v}>{l}</option>
                  ))}
                </select>
              </div>
            )}

            {method === "cod" && (
              <div className="text-center py-6">
                <div className="text-5xl mb-4">💵</div>
                <h3 className="font-semibold text-gray-800 mb-2">Cash on Delivery</h3>
                <p className="text-gray-500 text-sm">Pay when your order arrives. An additional ₹49 COD fee will be charged.</p>
              </div>
            )}
          </div>

          {error && <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>}

          <button onClick={handlePay} disabled={loading}
            style={{ backgroundColor: loading ? "#9ca3af" : "var(--accent)", borderRadius: "var(--radius)" }}
            className="w-full py-4 text-white font-bold text-base hover:opacity-90 transition-all disabled:cursor-not-allowed flex items-center justify-center gap-3">
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>🔒 Pay {formatPrice(total)}</>
            )}
          </button>
        </div>

        {/* Summary */}
        <div>
          <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} className="rounded-xl p-5 sticky top-24">
            <h3 className="font-semibold text-gray-800 mb-4">Order Total</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Shipping</span><span className={shipping === 0 ? "text-green-500" : ""}>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
              <div className="flex justify-between text-gray-600"><span>GST (18%)</span><span>{formatPrice(tax)}</span></div>
              {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>−{formatPrice(discount)}</span></div>}
              {method === "cod" && <div className="flex justify-between text-gray-600"><span>COD Fee</span><span>₹49</span></div>}
              <div className="flex justify-between font-bold text-gray-800 text-base border-t pt-3"><span>Total</span><span>{formatPrice(total + (method === "cod" ? 49 : 0))}</span></div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs font-semibold text-gray-600 mb-2">Delivering to:</p>
              <p className="text-xs text-gray-500">{address.name}</p>
              <p className="text-xs text-gray-500">{address.line1}{address.line2 ? `, ${address.line2}` : ""}</p>
              <p className="text-xs text-gray-500">{address.city}, {address.state} — {address.pincode}</p>
            </div>

            <div className="border-t border-gray-100 pt-4 mt-4 flex items-center gap-2 text-xs text-gray-400">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
              100% Secure & Encrypted Payment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
