import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, TrendingUp, Cloud, Bot, Satellite, Shield } from "lucide-react";

const features = [
  { icon: <Leaf className="h-6 w-6" />, title: "Direct Farm Sales", desc: "Buy directly from farmers. No middlemen, fair prices." },
  { icon: <TrendingUp className="h-6 w-6" />, title: "AI Price Prediction", desc: "ML-powered market price forecasting and trends." },
  { icon: <Cloud className="h-6 w-6" />, title: "Weather Intelligence", desc: "Real-time weather data and 7-day farming forecasts." },
  { icon: <Bot className="h-6 w-6" />, title: "AI Farm Assistant", desc: "GPT-powered chatbot for farming advice 24/7." },
  { icon: <Satellite className="h-6 w-6" />, title: "Satellite Monitoring", desc: "Crop health & vegetation index from satellite imagery." },
  { icon: <Shield className="h-6 w-6" />, title: "Secure Payments", desc: "Integrated PayU gateway for safe transactions." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero py-24 md:py-36">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, hsl(142, 55%, 45%) 0%, transparent 50%)" }} />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary-foreground/90 mb-6">
              🌾 AI-Powered Agriculture Marketplace
            </span>
            <h1 className="font-heading text-4xl font-extrabold leading-tight text-primary-foreground md:text-6xl lg:text-7xl">
              Farm Fresh, <br className="hidden md:block" />
              <span className="text-emerald-300">Directly to You</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/70">
              Connect with local farmers, get AI-powered crop recommendations, real-time market prices, and smart farming insights — all in one platform.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/marketplace" className="inline-flex items-center gap-2 rounded-xl bg-primary-foreground px-8 py-4 font-semibold text-primary shadow-elevated transition-transform hover:scale-105">
                Explore Marketplace <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/register" className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/20 px-8 py-4 font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10">
                Start Selling
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card py-12">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 md:grid-cols-4">
          {[
            { value: "5,000+", label: "Active Farmers" },
            { value: "₹2.5Cr", label: "Monthly Trade" },
            { value: "15,000+", label: "Products Listed" },
            { value: "50+", label: "Districts" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-3xl font-bold text-foreground">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">Smart Farming, Simplified</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Everything farmers and buyers need, powered by artificial intelligence.</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-elevated"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary">{f.icon}</div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground md:text-4xl">Ready to Transform Your Farm?</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">Join thousands of farmers and buyers on India's smartest agriculture platform.</p>
          <Link to="/register" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-foreground px-8 py-4 font-semibold text-primary transition-transform hover:scale-105">
            Get Started Free <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-10">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 FarmCart. AI-Powered Agriculture Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
