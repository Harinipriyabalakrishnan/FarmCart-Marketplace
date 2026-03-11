import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, TrendingUp, Cloud, Bot, Satellite, Shield } from "lucide-react";
import heroFarm from "../assets/images/home.jpg";
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
      <section className="relative h-[90vh] flex items-center">

  {/* Background image */}
  <img
    src="/home.jpg"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Content */}
  <div className="relative z-10 max-w-5xl px-10 text-white">

    <div className="bg-green-700/80 inline-block px-4 py-1 rounded-full text-sm mb-6">
      🌱 AI-Powered Agriculture
    </div>

    <h1 className="text-6xl font-bold leading-tight mb-6">
      Farm Fresh,
      <br />
      Direct to You
    </h1>

    <p className="text-lg text-gray-200 max-w-xl mb-8">
      FarmCart connects farmers directly with buyers — no middlemen.
      Powered by AI for smarter farming and fairer prices.
    </p>

    <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold">
      Browse Marketplace →
    </button>

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
