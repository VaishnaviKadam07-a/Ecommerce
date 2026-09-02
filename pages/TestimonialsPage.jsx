import { testimonials } from "../data/products";

export default function TestimonialsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <p style={{ color: "var(--accent)" }} className="text-sm font-semibold uppercase tracking-widest mb-3">Testimonials</p>
        <h1 className="font-display text-4xl font-semibold text-gray-800 mb-4">What Our Customers Say</h1>
        <p className="text-gray-500 max-w-xl mx-auto">Join thousands of happy customers who shop with us every day</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {[
          { value: "50,000+", label: "Happy Customers" },
          { value: "4.8/5", label: "Average Rating" },
          { value: "10,000+", label: "5-Star Reviews" },
          { value: "99%", label: "Satisfaction Rate" },
        ].map(stat => (
          <div key={stat.label} style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} className="rounded-2xl p-6 text-center">
            <p className="font-display text-3xl font-semibold text-gray-800" style={{ color: "var(--accent)" }}>{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Testimonials grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {testimonials.map((t, i) => (
          <div key={t.id} style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} className="rounded-2xl p-6 break-inside-avoid">
            <div className="flex mb-3">
              {[1,2,3,4,5].map(s => (
                <svg key={s} className={`w-4 h-4 ${s <= t.rating ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.comment}"</p>
            <div className="flex items-center gap-3">
              <div style={{ backgroundColor: i % 3 === 0 ? "var(--primary)" : i % 3 === 1 ? "var(--accent)" : "#7c3aed" }} className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {t.avatar}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                <p className="text-xs text-gray-400">{t.role} • {t.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
