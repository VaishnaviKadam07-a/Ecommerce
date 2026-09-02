import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

type Tab = "login" | "register" | "otp";

export default function LoginPage() {
  const { login, register, sendOTP, verifyOTP } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");

  // OTP
  const [otpEmail, setOtpEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [devOtp, setDevOtp] = useState("");
  const storedOtp = useRef("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    const ok = await login(loginEmail, loginPassword);
    setLoading(false);
    if (ok) navigate("/");
    else setError("Invalid email or password. Try demo@example.com / password123");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (regPassword !== regConfirm) { setError("Passwords don't match"); return; }
    if (regPassword.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    await register(regName, regEmail, regPassword, regPhone);
    setLoading(false);
    navigate("/");
  };

  const handleSendOTP = async () => {
    if (!otpEmail) { setError("Enter your email"); return; }
    setError(""); setLoading(true);
    const otp = await sendOTP(otpEmail);
    storedOtp.current = otp;
    setDevOtp(otp);
    setOtpSent(true);
    setSuccess("OTP sent! (Development mode: OTP shown below)");
    setLoading(false);
  };

  const handleVerifyOTP = () => {
    setError("");
    const ok = verifyOTP(otpEmail, otpCode, storedOtp.current);
    if (ok) navigate("/");
    else setError("Invalid OTP. Please try again.");
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "var(--background)" }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-1 relative" style={{ backgroundColor: "var(--primary)" }}>
        <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=1200&fit=crop&auto=format" alt="Shopping" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="flex items-center gap-3 mb-12">
            <div style={{ backgroundColor: "var(--accent)" }} className="w-10 h-10 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="font-display text-2xl font-semibold">Shopify</span>
          </div>
          <h1 className="font-display text-5xl font-light leading-tight mb-6">Welcome to<br /><span style={{ color: "var(--accent)" }}>premium shopping</span></h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-md">Discover thousands of products across every category, with fast delivery and exceptional service.</p>
          <div className="mt-12 grid grid-cols-3 gap-6">
            {[["10K+", "Products"], ["50K+", "Customers"], ["99%", "Satisfaction"]].map(([num, label]) => (
              <div key={label}>
                <p className="font-display text-3xl font-semibold" style={{ color: "var(--accent)" }}>{num}</p>
                <p className="text-white/60 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div style={{ backgroundColor: "var(--accent)" }} className="w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-display text-xl font-semibold">Shopify</span>
          </div>

          {/* Tabs */}
          <div style={{ border: "1px solid var(--border)" }} className="flex rounded-xl overflow-hidden mb-8">
            {(["login", "register", "otp"] as Tab[]).map(t => (
              <button key={t} onClick={() => { setTab(t); setError(""); setSuccess(""); }}
                className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${tab === t ? "text-white" : "text-gray-500 hover:text-gray-700"}`}
                style={{ backgroundColor: tab === t ? "var(--primary)" : "transparent" }}>
                {t === "otp" ? "OTP Login" : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">{error}</div>}
          {success && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg">{success}</div>}

          {/* Login Form */}
          {tab === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-gray-800 mb-6">Sign in to your account</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required
                  style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)" }}
                  className="w-full px-4 py-2.5 text-sm bg-white focus:outline-none" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required
                  style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)" }}
                  className="w-full px-4 py-2.5 text-sm bg-white focus:outline-none" placeholder="••••••••" />
              </div>
              <button type="submit" disabled={loading}
                style={{ backgroundColor: "var(--primary)", borderRadius: "var(--radius)" }}
                className="w-full py-3 text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
                {loading ? "Signing in..." : "Sign In"}
              </button>
              <p className="text-center text-xs text-gray-500">Demo: demo@example.com / password123</p>
            </form>
          )}

          {/* Register Form */}
          {tab === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-gray-800 mb-6">Create your account</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" value={regName} onChange={e => setRegName(e.target.value)} required
                  style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)" }}
                  className="w-full px-4 py-2.5 text-sm bg-white focus:outline-none" placeholder="Arjun Sharma" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} required
                  style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)" }}
                  className="w-full px-4 py-2.5 text-sm bg-white focus:outline-none" placeholder="arjun@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" value={regPhone} onChange={e => setRegPhone(e.target.value)} required
                  style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)" }}
                  className="w-full px-4 py-2.5 text-sm bg-white focus:outline-none" placeholder="9876543210" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" value={regPassword} onChange={e => setRegPassword(e.target.value)} required
                  style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)" }}
                  className="w-full px-4 py-2.5 text-sm bg-white focus:outline-none" placeholder="Min. 6 characters" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input type="password" value={regConfirm} onChange={e => setRegConfirm(e.target.value)} required
                  style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)" }}
                  className="w-full px-4 py-2.5 text-sm bg-white focus:outline-none" placeholder="••••••••" />
              </div>
              <button type="submit" disabled={loading}
                style={{ backgroundColor: "var(--primary)", borderRadius: "var(--radius)" }}
                className="w-full py-3 text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>
          )}

          {/* OTP Form */}
          {tab === "otp" && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-gray-800 mb-6">Login with OTP</h2>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700">
                <strong>Development Mode:</strong> OTP is displayed here since no email service is connected.
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" value={otpEmail} onChange={e => setOtpEmail(e.target.value)} disabled={otpSent}
                  style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)" }}
                  className="w-full px-4 py-2.5 text-sm bg-white focus:outline-none" placeholder="you@example.com" />
              </div>
              {!otpSent ? (
                <button onClick={handleSendOTP} disabled={loading}
                  style={{ backgroundColor: "var(--primary)", borderRadius: "var(--radius)" }}
                  className="w-full py-3 text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              ) : (
                <>
                  {devOtp && (
                    <div style={{ backgroundColor: "var(--primary)", borderRadius: "var(--radius)" }} className="p-4 text-white text-center">
                      <p className="text-xs text-white/60 mb-1">Your OTP (Dev Mode)</p>
                      <p className="font-mono text-3xl font-bold tracking-widest">{devOtp}</p>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                    <input type="text" value={otpCode} onChange={e => setOtpCode(e.target.value)} maxLength={6}
                      style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)" }}
                      className="w-full px-4 py-2.5 text-sm bg-white focus:outline-none text-center font-mono text-xl tracking-widest" placeholder="000000" />
                  </div>
                  <button onClick={handleVerifyOTP}
                    style={{ backgroundColor: "var(--accent)", borderRadius: "var(--radius)" }}
                    className="w-full py-3 text-white font-semibold text-sm hover:opacity-90 transition-opacity">
                    Verify OTP
                  </button>
                  <button onClick={() => { setOtpSent(false); setDevOtp(""); setOtpCode(""); setSuccess(""); }} className="w-full py-2 text-sm text-gray-500 hover:text-gray-700">
                    Change email
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
