import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { products, reviews, formatPrice } from "../data/products";
import { useApp } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isWishlisted, user } = useApp();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<"description" | "reviews" | "shipping">("description");
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h2 className="font-display text-2xl text-gray-400 mb-4">Product not found</h2>
        <Link to="/" style={{ backgroundColor: "var(--primary)" }} className="px-6 py-2 rounded-lg text-white text-sm">Go Home</Link>
      </div>
    </div>
  );

  const productReviews = reviews.filter(r => r.productId === id);
  const related = products.filter(p => p.category === product.category && p.id !== id).slice(0, 4);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    for (const v of product.variants) {
      if (!selectedVariants[v.name]) {
        selectedVariants[v.name] = v.options[0];
      }
    }
    for (let i = 0; i < quantity; i++) addToCart(product.id, selectedVariants);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    for (const v of product.variants) {
      if (!selectedVariants[v.name]) selectedVariants[v.name] = v.options[0];
    }
    addToCart(product.id, selectedVariants);
    navigate("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-gray-700">Home</Link>
        <span>/</span>
        <Link to={`/categories?cat=${product.category}`} className="hover:text-gray-700 capitalize">{product.category}</Link>
        <span>/</span>
        <span className="text-gray-800 truncate max-w-xs">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 mb-16">
        {/* Images */}
        <div>
          <div className="rounded-2xl overflow-hidden bg-gray-50 mb-4" style={{ aspectRatio: "1" }}>
            <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setActiveImage(i)}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? "border-amber-500" : "border-transparent"}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p style={{ color: "var(--accent)" }} className="text-sm font-semibold uppercase tracking-wide mb-1">{product.brand}</p>
              <h1 className="font-display text-3xl font-semibold text-gray-800 leading-tight">{product.name}</h1>
            </div>
            <button onClick={() => toggleWishlist(product.id)}
              className={`ml-4 p-2 rounded-full border transition-all ${wishlisted ? "border-red-300 bg-red-50 text-red-500" : "border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-500"}`}>
              <svg className="w-5 h-5" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex">
              {[1,2,3,4,5].map(s => (
                <svg key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-800">{product.rating}</span>
            <span className="text-sm text-gray-400">({product.reviewCount.toLocaleString()} reviews)</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${product.stock > 10 ? "bg-green-100 text-green-700" : product.stock > 0 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
              {product.stock > 10 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-display text-3xl font-semibold text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice && <>
              <span className="text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
              <span style={{ backgroundColor: "rgba(212,133,42,0.15)", color: "var(--accent)" }} className="text-sm font-semibold px-2 py-0.5 rounded-full">
                {discount}% off
              </span>
            </>}
          </div>

          {/* Variants */}
          {product.variants.map(v => (
            <div key={v.name} className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">{v.name}:</p>
              <div className="flex flex-wrap gap-2">
                {v.options.map(opt => (
                  <button key={opt} onClick={() => setSelectedVariants(prev => ({ ...prev, [v.name]: opt }))}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-all ${selectedVariants[v.name] === opt ? "border-amber-500 text-amber-700 bg-amber-50" : "border-gray-200 text-gray-600 hover:border-gray-400"}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <p className="text-sm font-semibold text-gray-700">Quantity:</p>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-gray-600 hover:bg-gray-50 transition-colors text-lg">−</button>
              <span className="px-6 py-2 font-semibold text-gray-800">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-4 py-2 text-gray-600 hover:bg-gray-50 transition-colors text-lg">+</button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-6">
            <button onClick={handleAddToCart} disabled={product.stock === 0}
              style={{ backgroundColor: addedToCart ? "var(--success)" : "var(--primary)", borderRadius: "var(--radius)" }}
              className="flex-1 py-3 text-white font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-50">
              {addedToCart ? "✓ Added to Cart!" : "Add to Cart"}
            </button>
            <button onClick={handleBuyNow} disabled={product.stock === 0}
              style={{ backgroundColor: "var(--accent)", borderRadius: "var(--radius)" }}
              className="flex-1 py-3 text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
              Buy Now
            </button>
          </div>

          <div style={{ backgroundColor: "var(--secondary)", borderRadius: "var(--radius)" }} className="p-4 flex items-center gap-3">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8l1 12a2 2 0 002 2h8a2 2 0 002-2L19 8" /></svg>
            <span className="text-sm text-gray-600">{product.shipping}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ border: "1px solid var(--border)" }} className="rounded-2xl overflow-hidden mb-16">
        <div className="flex border-b border-gray-100">
          {(["description", "reviews", "shipping"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-semibold capitalize transition-colors ${activeTab === tab ? "border-b-2 border-amber-500 text-amber-600" : "text-gray-500 hover:text-gray-700"}`}>
              {tab === "reviews" ? `Reviews (${productReviews.length || product.reviewCount})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="p-6">
          {activeTab === "description" && (
            <div>
              <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
              <h4 className="font-semibold text-gray-800 mb-3">Key Features</h4>
              <ul className="space-y-2">
                {product.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              {productReviews.length > 0 ? productReviews.map(r => (
                <div key={r.id} className="border-b border-gray-100 pb-6 last:border-0">
                  <div className="flex items-start gap-4">
                    <div style={{ backgroundColor: "var(--primary)" }} className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0">
                      {r.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold text-gray-800 text-sm">{r.user}</span>
                        <div className="flex">
                          {[1,2,3,4,5].map(s => <svg key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                        </div>
                        <span className="text-xs text-gray-400">{new Date(r.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                      </div>
                      <p className="font-medium text-gray-800 text-sm mb-1">{r.title}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{r.comment}</p>
                    </div>
                  </div>
                </div>
              )) : (
                <p className="text-gray-400 text-sm text-center py-8">No reviews yet. Be the first to review this product!</p>
              )}
            </div>
          )}
          {activeTab === "shipping" && (
            <div className="space-y-4">
              {[
                { icon: "🚚", title: "Free Standard Delivery", desc: "2-7 business days. Free on all orders above ₹500." },
                { icon: "⚡", title: "Express Delivery", desc: "1-2 business days for ₹99. Available in select cities." },
                { icon: "↩️", title: "Easy Returns", desc: "30-day hassle-free return policy. Free pickup for defective items." },
                { icon: "🔒", title: "Secure Packaging", desc: "All items are carefully packed to ensure safe delivery." },
              ].map(item => (
                <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl" style={{ backgroundColor: "var(--secondary)" }}>
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section>
          <h2 className="font-display text-2xl font-semibold text-gray-800 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
