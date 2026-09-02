import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function CategoriesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("cat") || "all"
  );

  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 200000]);

  useEffect(() => {
    const cat = searchParams.get("cat");

    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);

    if (cat === "all") {
      searchParams.delete("cat");
    } else {
      searchParams.set("cat", cat);
    }

    setSearchParams(searchParams);
  };

  let filtered =
    activeCategory === "all"
      ? products
      : products.filter(
          (p) => p.category === activeCategory
        );

  filtered = filtered.filter(
    (p) =>
      p.price >= priceRange[0] &&
      p.price <= priceRange[1]
  );

  if (sortBy === "price-asc") {
    filtered = [...filtered].sort(
      (a, b) => a.price - b.price
    );
  } else if (sortBy === "price-desc") {
    filtered = [...filtered].sort(
      (a, b) => b.price - a.price
    );
  } else if (sortBy === "rating") {
    filtered = [...filtered].sort(
      (a, b) => b.rating - a.rating
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-semibold text-gray-800 mb-8">
        All Categories
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <div
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
            }}
            className="rounded-xl p-5 sticky top-24"
          >
            <h3 className="font-semibold text-gray-800 mb-4">
              Categories
            </h3>

            <div className="space-y-1 mb-6">
              <button
                onClick={() =>
                  handleCategoryChange("all")
                }
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeCategory === "all"
                    ? "text-white font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                style={{
                  backgroundColor:
                    activeCategory === "all"
                      ? "var(--primary)"
                      : "transparent",
                }}
              >
                All Products ({products.length})
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() =>
                    handleCategoryChange(cat.id)
                  }
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeCategory === cat.id
                      ? "text-white font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  style={{
                    backgroundColor:
                      activeCategory === cat.id
                        ? "var(--primary)"
                        : "transparent",
                  }}
                >
                  {cat.name} (
                  {
                    products.filter(
                      (p) => p.category === cat.id
                    ).length
                  }
                  )
                </button>
              ))}
            </div>

            <h3 className="font-semibold text-gray-800 mb-4">
              Sort By
            </h3>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              style={{
                border: "1px solid var(--border)",
                borderRadius: "0.5rem",
              }}
              className="w-full px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none mb-6"
            >
              <option value="featured">
                Featured
              </option>
              <option value="price-asc">
                Price: Low to High
              </option>
              <option value="price-desc">
                Price: High to Low
              </option>
              <option value="rating">
                Highest Rated
              </option>
            </select>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              {filtered.length} products found
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <svg
                className="w-16 h-16 mx-auto mb-4 opacity-30"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>

              <p className="text-lg font-medium">
                No products found
              </p>

              <p className="text-sm mt-1">
                Try a different category or filter
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}