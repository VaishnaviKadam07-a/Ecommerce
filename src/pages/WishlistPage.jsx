import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useApp();
  const wishlisted = products.filter(p => wishlist.includes(p.id));

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-gray-800 mb-6">My Wishlist ({wishlisted.length})</h2>

      {wishlisted.length === 0 ? (
        <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} className="rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">❤️</div>
          <h3 className="font-semibold text-gray-700 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-400 text-sm mb-6">Save items you love by clicking the heart icon on any product</p>
          <Link to="/categories" style={{ backgroundColor: "var(--primary)", borderRadius: "0.75rem" }} className="inline-block px-6 py-2.5 text-white text-sm font-medium">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {wishlisted.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
