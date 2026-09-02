import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { products, categories, formatPrice } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const featured = products.slice(0, 8);
  const filtered = activeCategory === "all" ? featured : featured.filter(p => p.category === activeCategory);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <div>
      {/* Hero */}
      <section style={{ backgroundColor: "var(--primary)" }} className="relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&h=600&fit=crop&auto=format" alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl">
            <p style={{ color: "var(--accent)" }} className="text-sm font-semibold uppercase tracking-widest mb-4">New Season Arrivals</p>
            <h1 className="font-display text-4xl md:text-6xl font-light text-white leading-tight mb-6">
              Discover Premium<br /><span style={{ color: "var(--accent)" }}>Products</span> You'll Love
            </h1>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">Shop from thousands of curated products across electronics, fashion, home decor, books and more.</p>
            <form onSubmit={handleSearch} className="flex gap-3 mb-8 max-w-lg">
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search for products..." className="flex-1 px-5 py-3 rounded-xl text-gray-800 bg-white focus:outline-none" />
              <button type="submit" style={{ backgroundColor: "var(--accent)" }} className="px-6 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity whitespace-nowrap">
                Search
              </button>
            </form>
            <div className="flex flex-wrap gap-3">
              {["Free Delivery", "Easy Returns", "Authentic Products"].map(badge => (
                <span key={badge} className="text-white/60 text-sm flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-3xl font-semibold text-gray-800">Shop by Category</h2>
          <Link to="/categories" style={{ color: "var(--accent)" }} className="text-sm font-medium hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(cat => (
            <Link key={cat.id} to={`/categories?cat=${cat.id}`} className="group relative rounded-2xl overflow-hidden cursor-pointer" style={{ aspectRatio: "1" }}>
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <p className="font-semibold text-sm">{cat.name}</p>
                <p className="text-white/70 text-xs">{cat.count} items</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Products */}
      <section style={{ backgroundColor: "var(--secondary)" }} className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl font-semibold text-gray-800">Featured Products</h2>
            <Link to="/categories" style={{ color: "var(--accent)" }} className="text-sm font-medium hover:underline">View all →</Link>
          </div>

          {/* Category filter tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {[{ id: "all", name: "All" }, ...categories].map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat.id ? "text-white" : "text-gray-600 hover:text-gray-800"}`}
                style={{ backgroundColor: activeCategory === cat.id ? "var(--primary)" : "var(--card)", border: "1px solid var(--border)" }}>
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: 220 }}>
            <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=300&fit=crop&auto=format" alt="Electronics" className="absolute inset-0 w-full h-full object-cover" />
            <div style={{ background: "linear-gradient(135deg, rgba(26,39,68,0.85) 0%, rgba(26,39,68,0.4) 100%)" }} className="absolute inset-0" />
            <div className="relative p-8 text-white">
              <p className="text-sm font-medium text-white/70 mb-2">Up to 30% off</p>
              <h3 className="font-display text-2xl font-semibold mb-4">Latest Electronics</h3>
              <Link to="/categories?cat=electronics" style={{ backgroundColor: "var(--accent)" }} className="inline-block px-5 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity">
                Shop Now
              </Link>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: 220 }}>
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=300&fit=crop&auto=format" alt="Fashion" className="absolute inset-0 w-full h-full object-cover" />
            <div style={{ background: "linear-gradient(135deg, rgba(212,133,42,0.85) 0%, rgba(212,133,42,0.4) 100%)" }} className="absolute inset-0" />
            <div className="relative p-8 text-white">
              <p className="text-sm font-medium text-white/70 mb-2">New Arrivals</p>
              <h3 className="font-display text-2xl font-semibold mb-4">Trending Fashion</h3>
              <Link to="/categories?cat=fashion" style={{ backgroundColor: "var(--primary)" }} className="inline-block px-5 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity">
                Explore
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section style={{ backgroundColor: "var(--secondary)" }} className="py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "🚚", title: "Free Delivery", desc: "On orders above ₹500" },
            { icon: "↩️", title: "Easy Returns", desc: "30-day return policy" },
            { icon: "🔒", title: "Secure Payment", desc: "100% secure checkout" },
            { icon: "💬", title: "24/7 Support", desc: "Live chat available" },
          ].map(f => (
            <div key={f.title} className="flex items-start gap-4">
              <span className="text-3xl">{f.icon}</span>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{f.title}</p>
                <p className="text-gray-500 text-xs mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
