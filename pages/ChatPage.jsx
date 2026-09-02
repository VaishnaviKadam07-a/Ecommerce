import { useState, useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";

interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
}

const AGENT_RESPONSES: Record<string, string> = {
  default: "Thank you for reaching out! I'm here to help you with any questions about your orders, products, or account. How can I assist you?",
  hi: "Hello! Welcome to Shopify support. How can I help you today?",
  hello: "Hi there! Great to hear from you. What can I help you with?",
  order: "I'd be happy to help you with your order! Could you please provide your order ID? It starts with 'ORD' followed by numbers.",
  return: "Our return policy allows returns within 30 days of delivery. Items must be in original condition. I can help initiate a return for you. Which item would you like to return?",
  refund: "Refunds are processed within 5-7 business days after we receive your returned item. If your refund hasn't arrived, please share your order ID and I'll check the status.",
  delivery: "Standard delivery takes 2-7 business days. Express delivery (1-2 days) is available for most cities. You can track your order in My Orders section.",
  cancel: "To cancel an order, it must be in 'Processing' status. Once shipped, cancellation isn't possible. Would you like me to check if your order can be cancelled?",
  payment: "We accept Credit/Debit cards, UPI, Net Banking, and Cash on Delivery. All payments are secured with 256-bit encryption.",
  discount: "Current active coupon codes: SAVE10 (10% off), SAVE20 (20% off), WELCOME15 (15% off for new users). Apply these at checkout!",
  track: "You can track your orders in the 'My Orders' section of your profile. You'll see real-time status updates there.",
};

function getAgentResponse(message: string): string {
  const lower = message.toLowerCase();
  for (const [key, response] of Object.entries(AGENT_RESPONSES)) {
    if (key !== "default" && lower.includes(key)) return response;
  }
  return AGENT_RESPONSES.default;
}

export default function ChatPage() {
  const { user } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hi! I'm your Shopify support assistant. I can help you with orders, returns, refunds, and more. What can I help you with today?",
      sender: "agent",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { id: Date.now().toString(), text, sender: "user", timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    await new Promise(r => setTimeout(r, 800 + Math.random() * 700));

    const agentMsg: Message = { id: (Date.now() + 1).toString(), text: getAgentResponse(text), sender: "agent", timestamp: new Date() };
    setMessages(prev => [...prev, agentMsg]);
    setTyping(false);
  };

  const formatTime = (date: Date) => date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  const quickReplies = ["Track my order", "Return policy", "Discount codes", "Payment methods", "Delivery time"];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-semibold text-gray-800">Live Support Chat</h1>
          <p className="text-gray-500 text-sm mt-1">We typically reply within a few seconds</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-green-600">Online</span>
        </div>
      </div>

      <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} className="rounded-2xl overflow-hidden shadow-lg">
        {/* Chat header */}
        <div style={{ backgroundColor: "var(--primary)" }} className="p-4 flex items-center gap-3">
          <div style={{ backgroundColor: "var(--accent)" }} className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
            S
          </div>
          <div>
            <p className="font-semibold text-white text-sm">Shopify Support</p>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <p className="text-white/60 text-xs">Active now</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4" style={{ backgroundColor: "var(--secondary)" }}>
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              {msg.sender === "agent" && (
                <div style={{ backgroundColor: "var(--accent)" }} className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 shrink-0 mt-1">
                  S
                </div>
              )}
              <div className={`max-w-xs md:max-w-sm`}>
                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.sender === "user" ? "text-white rounded-br-sm" : "text-gray-800 rounded-bl-sm"}`}
                  style={{ backgroundColor: msg.sender === "user" ? "var(--primary)" : "white" }}>
                  {msg.text}
                </div>
                <p className={`text-xs text-gray-400 mt-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                  {formatTime(msg.timestamp)}
                </p>
              </div>
              {msg.sender === "user" && (
                <div style={{ backgroundColor: user ? "var(--primary)" : "var(--muted)" }} className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ml-2 shrink-0 mt-1">
                  {user?.avatar || "U"}
                </div>
              )}
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div style={{ backgroundColor: "var(--accent)" }} className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 shrink-0">S</div>
              <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                {[0, 0.2, 0.4].map((delay, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-gray-400" style={{ animation: `bounce 1s infinite ${delay}s` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick replies */}
        <div className="px-4 py-2 flex gap-2 overflow-x-auto border-t border-gray-100" style={{ backgroundColor: "white" }}>
          {quickReplies.map(reply => (
            <button key={reply} onClick={() => { setInput(reply); }}
              className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap">
              {reply}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 flex gap-3 border-t border-gray-100 bg-white">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none bg-gray-50"
          />
          <button onClick={sendMessage} disabled={!input.trim()}
            style={{ backgroundColor: input.trim() ? "var(--primary)" : "var(--muted)", borderRadius: "0.75rem" }}
            className="px-4 py-2.5 text-white transition-all disabled:cursor-not-allowed">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
      </div>

      {/* FAQs */}
      <div className="mt-8">
        <h3 className="font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { q: "How do I track my order?", a: "Go to My Orders in your profile to see real-time status updates." },
            { q: "What is the return policy?", a: "We offer 30-day returns on all items. Items must be in original condition." },
            { q: "When will I get my refund?", a: "Refunds are processed within 5-7 business days after receiving the return." },
            { q: "Can I change my delivery address?", a: "Address changes are possible before the order is shipped. Contact us immediately." },
          ].map(faq => (
            <div key={faq.q} style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} className="rounded-xl p-4">
              <p className="font-semibold text-gray-800 text-sm mb-1">{faq.q}</p>
              <p className="text-gray-500 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
