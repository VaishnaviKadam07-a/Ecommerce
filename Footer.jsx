import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: "var(--primary)", color: "white" }}
      className="mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                style={{ backgroundColor: "var(--accent)" }}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
              >
                <span className="text-white font-bold text-sm">S</span>
              </div>

              <span className="font-display text-white text-xl font-semibold">
                Shopify
              </span>
            </div>

            <p className="text-white/60 text-sm leading-relaxed">
              Your one-stop destination for premium products across all
              categories. Shop with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>

            <ul className="space-y-2">
              {[
                ["Home", "/"],
                ["Categories", "/categories"],
                ["Testimonials", "/testimonials"],
                ["Booking", "/booking"],
                ["Chat", "/chat"],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              My Account
            </h4>

            <ul className="space-y-2">
              {[
                ["Profile", "/profile"],
                ["Orders", "/profile/orders"],
                ["Wishlist", "/profile/wishlist"],
                ["Addresses", "/profile/addresses"],
                ["Settings", "/profile/settings"],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contact
            </h4>

            <div className="space-y-2 text-white/60 text-sm">
              <p>support@shopify.com</p>
              <p>+91 98765 43210</p>
              <p>Mon–Sat, 9am–6pm IST</p>
            </div>

            <div className="flex gap-3 mt-4">
              {["facebook", "twitter", "instagram"].map((social) => (
                <div
                  key={social}
                  style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
                >
                  <span className="text-white/60 text-xs capitalize">
                    {social[0].toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © 2024 Shopify. All rights reserved.
          </p>

          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map(
              (item) => (
                <span
                  key={item}
                  className="text-white/40 text-xs hover:text-white/60 cursor-pointer transition-colors"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}