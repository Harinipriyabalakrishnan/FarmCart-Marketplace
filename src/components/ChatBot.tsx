import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Role = "user" | "assistant";

interface Message {
  role: Role;
  content: string;
}

const quickReplies = [
  "Best fertilizer for wheat?",
  "How to control pests?",
  "Irrigation tips",
  "Weather impact on crops",
];

export default function ChatBot() {
  const [open, setOpen] = useState<boolean>(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! 🌱 I'm FarmCart AI assistant. Ask me anything about farming, crops, fertilizers, pest control, or weather conditions!",
    },
  ]);

  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { role: "user", content: text };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const responses: Record<string, string> = {
        fertilizer:
          "For wheat, use NPK (12-32-16) during sowing and apply urea after 21 days. Organic option: vermicompost (2 tonnes/acre).",
        pest:
          "Pest control tips:\n1. Neem oil spray\n2. Crop rotation\n3. Marigold companion planting\n4. Use beneficial insects",
        irrigation:
          "Irrigation tips:\n• Drip irrigation saves 30-50% water\n• Water early morning\n• Use soil moisture sensors\n• Mulching reduces water loss",
        weather:
          "Weather impact:\n• High humidity → fungal diseases\n• Frost → cover crops\n• Heavy rain → ensure drainage\n• Follow weather forecasts for spraying",
      };

      const key = Object.keys(responses).find((k) =>
        text.toLowerCase().includes(k)
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            key && responses[key]
              ? responses[key]
              : "That's a great question! 🌾 I recommend soil testing, proper irrigation, and balanced fertilizer usage for best crop yield.",
        },
      ]);

      setLoading(false);
    }, 900);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="fixed bottom-24 right-4 z-50 flex h-[420px] w-[340px] flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between bg-green-600 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🌱</span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    FarmCart AI
                  </p>
                  <p className="text-[10px] text-green-100">
                    Farming Assistant
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl px-3 py-2 ${
                      m.role === "user"
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.content}</p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="text-xs text-gray-400">
                  FarmCart AI is typing...
                </div>
              )}
            </div>

            <div className="border-t p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about farming..."
                  className="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="rounded-lg bg-green-600 p-2 text-white disabled:opacity-40"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  );
}
