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
<section className="relative text-white py-28">

  {/* Background Image */}
  <img
    src={heroFarm}
    alt="Farm"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Content */}
  <div className="relative max-w-6xl mx-auto text-center px-6">

    <div className="inline-block border border-white/40 rounded-full px-5 py-2 mb-6 text-sm">
      🌾 AI-Powered Agriculture Marketplace
    </div>

    <h1 className="text-6xl font-bold leading-tight">
      Farm Fresh, <br />
      <span className="text-green-300">Directly to You</span>
    </h1>

    <p className="mt-6 text-lg text-gray-200 max-w-3xl mx-auto">
      Connect with local farmers, get AI-powered crop recommendations,
      real-time market prices, and smart farming insights — all in one platform.
    </p>

    <div className="mt-10 flex justify-center gap-6">

      <button className="bg-white text-green-800 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition">
        Explore Marketplace →
      </button>

      <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-green-800 transition">
        Start Selling
      </button>

    </div>

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
