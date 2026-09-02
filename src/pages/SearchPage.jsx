import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [sortBy, setSortBy] = useState("featured");

  let results = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
    p.brand.toLowerCase().includes(query.toLowerCase())
  );

  if (sortBy === "price-asc") results = [...results].sort((a, b) => a.price - b.price);
  else if (sortBy === "price-desc") results = [...results].sort((a, b) => b.price - a.price);
  else if (sortBy === "rating") results = [...results].sort((a, b) => b.rating - a.rating);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-semibold text-gray-800">Search Results</h1>
          <p className="text-gray-500 text-sm mt-1">{results.length} results for "<strong>{query}</strong>"</p>
        </div>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}
          style={{ border: "1px solid var(--border)", borderRadius: "0.5rem" }}
          className="px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none">
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-24">
          <svg className="w-20 h-20 mx-auto mb-6 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <h2 className="font-display text-2xl text-gray-400 mb-2">No results found</h2>
          <p className="text-gray-400 text-sm">Try different keywords or browse our categories</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {results.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
