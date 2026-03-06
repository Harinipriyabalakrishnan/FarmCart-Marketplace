import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickReplies = ["Best fertilizer for wheat?", "How to control pests?", "Irrigation tips", "Weather impact on crops"];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! 🌱 I'm FarmCart AI assistant. Ask me anything about farming, crops, fertilizers, pest control, or weather conditions!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Mock AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        fertilizer: "For wheat, I recommend using NPK (12-32-16) at sowing time, followed by urea top-dressing after 21 days. Organic options include vermicompost at 2 tonnes/acre.",
        pest: "Common pest control methods:\n1. **Neem oil spray** - natural pesticide\n2. **Crop rotation** - breaks pest cycles\n3. **Companion planting** - marigolds repel many insects\n4. **Biological control** - introduce beneficial insects",
        irrigation: "Smart irrigation tips:\n- **Drip irrigation** saves 30-50% water\n- Water early morning to reduce evaporation\n- Monitor soil moisture with sensors\n- Mulching reduces water needs by 25%",
        weather: "Weather affects crops significantly:\n- **High humidity** → fungal disease risk\n- **Frost** → cover crops with mulch\n- **Heavy rain** → ensure proper drainage\n- Use weather forecasts to plan spraying schedules",
      };
      const key = Object.keys(responses).find((k) => text.toLowerCase().includes(k));
      setMessages((prev) => [...prev, { role: "assistant", content: key ? responses[key] : "That's a great question! Based on current agricultural best practices, I'd recommend consulting your local agricultural extension office for region-specific advice. In the meantime, ensure proper soil testing, adequate irrigation, and timely fertilizer application for optimal crop yield. 🌾" }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 z-50 flex h-[500px] w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-elevated md:bottom-6 md:right-6"
          >
            <div className="flex items-center justify-between gradient-primary px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🌱</span>
                <div>
                  <p className="text-sm font-semibold text-primary-foreground">FarmCart AI</p>
                  <p className="text-[10px] text-primary-foreground/70">Farming Assistant</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-lg p-1 text-primary-foreground/80 hover:text-primary-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.role === "user" ? "gradient-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}>
                    <p className="whitespace-pre-line">{m.content}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-muted px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
                {quickReplies.map((q) => (
                  <button key={q} onClick={() => sendMessage(q)} className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div className="border-t border-border p-3">
              <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about farming..."
                  className="flex-1 rounded-xl border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button type="submit" disabled={!input.trim() || loading} className="rounded-xl gradient-primary p-2.5 text-primary-foreground disabled:opacity-50">
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full gradient-primary shadow-elevated animate-pulse-glow md:bottom-6 md:right-6"
      >
        <MessageCircle className="h-6 w-6 text-primary-foreground" />
      </button>
    </>
  );
}
