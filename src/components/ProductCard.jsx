import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { formatPrice } from "../data/products";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useApp();

  const wishlisted = isWishlisted(product.id);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
      }}
      className="group rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
    >
      <div
        className="relative overflow-hidden bg-gray-50"
        style={{ aspectRatio: "1" }}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {discount > 0 && (
          <span
            style={{ backgroundColor: "var(--danger)" }}
            className="absolute top-3 left-3 text-white text-xs font-semibold px-2 py-0.5 rounded-full"
          >
            -{discount}%
          </span>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
            wishlisted
              ? "bg-red-500 text-white"
              : "bg-white text-gray-400 hover:text-red-500"
          }`}
        >
          <svg
            className="w-4 h-4"
            fill={wishlisted ? "currentColor" : "none"}
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
        </button>

        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product.id);
            }}
            style={{ backgroundColor: "var(--primary)" }}
            className="w-full py-2 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <Link to={`/product/${product.id}`} className="block p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
          {product.brand}
        </p>

        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 hover:text-amber-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg
                key={s}
                className={`w-3 h-3 ${
                  s <= Math.round(product.rating)
                    ? "text-amber-400"
                    : "text-gray-200"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          <span className="text-xs text-gray-400">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>

          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}