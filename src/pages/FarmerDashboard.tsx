import { useState } from "react";
import type React from "react";
import { Package, DollarSign, ShoppingBag, TrendingUp, Cloud, Satellite, Brain, Plus } from "lucide-react";
import StatCard from "@/components/StatCard";
import { salesData, pricePredictions, cropRecommendations, weatherData, weeklyForecast, orders } from "@/lib/mock-data";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

type Tab = "overview" | "weather" | "prices" | "satellite" | "recommendations";

export default function FarmerDashboard() {
  const [tab, setTab] = useState<Tab>("overview");

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <Package className="h-4 w-4" /> },
    { id: "weather", label: "Weather", icon: <Cloud className="h-4 w-4" /> },
    { id: "prices", label: "Prices", icon: <TrendingUp className="h-4 w-4" /> },
    { id: "satellite", label: "Satellite", icon: <Satellite className="h-4 w-4" /> },
    { id: "recommendations", label: "AI Crops", icon: <Brain className="h-4 w-4" /> },
  ];

  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Farmer Dashboard</h1>
          <p className="mt-1 text-muted-foreground">Welcome back, Rajesh Kumar</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:shadow-elevated">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-2 overflow-x-auto">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${tab === t.id ? "gradient-primary text-primary-foreground" : "border border-border bg-card text-muted-foreground hover:text-foreground"}`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total Revenue" value="₹3,28,000" change="+12.5% from last month" icon={<DollarSign className="h-5 w-5" />} trend="up" />
            <StatCard title="Active Products" value="8" change="+2 new this week" icon={<Package className="h-5 w-5" />} trend="up" />
            <StatCard title="Total Orders" value="94" change="+8 this week" icon={<ShoppingBag className="h-5 w-5" />} trend="up" />
            <StatCard title="Avg. Rating" value="4.6" change="Consistent" icon={<TrendingUp className="h-5 w-5" />} trend="stable" />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-heading text-lg font-semibold text-foreground">Revenue Trend</h3>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(90, 15%, 88%)" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="hsl(142, 55%, 35%)" strokeWidth={2} dot={{ fill: "hsl(142, 55%, 35%)" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-heading text-lg font-semibold text-foreground">Recent Orders</h3>
              <div className="mt-4 space-y-3">
                {orders.slice(0, 4).map((o) => (
                  <div key={o.id} className="flex items-center justify-between rounded-lg bg-muted p-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{o.product}</p>
                      <p className="text-xs text-muted-foreground">{o.buyer} · {o.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">₹{o.total.toLocaleString()}</p>
                      <span className={`text-xs capitalize ${o.status === "delivered" ? "text-success" : o.status === "shipped" ? "text-info" : "text-warning"}`}>{o.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "weather" && (
        <div className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Temperature" value={`${weatherData.temp}°C`} icon={<span className="text-xl">🌡️</span>} />
            <StatCard title="Humidity" value={`${weatherData.humidity}%`} icon={<span className="text-xl">💧</span>} />
            <StatCard title="Wind Speed" value={`${weatherData.windSpeed} km/h`} icon={<span className="text-xl">💨</span>} />
            <StatCard title="Rainfall" value={`${weatherData.rainfall} mm`} icon={<span className="text-xl">🌧️</span>} />
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="font-heading text-lg font-semibold text-foreground">7-Day Forecast</h3>
            <div className="mt-4 grid grid-cols-7 gap-3">
              {weeklyForecast.map((d) => (
                <div key={d.day} className="flex flex-col items-center rounded-lg bg-muted p-3 text-center">
                  <span className="text-xs font-medium text-muted-foreground">{d.day}</span>
                  <span className="mt-1 text-2xl">{d.condition}</span>
                  <span className="mt-1 text-sm font-bold text-foreground">{d.temp}°</span>
                  <span className="text-xs text-info">{d.rain}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border-2 border-warning/30 bg-warning/5 p-5">
            <h3 className="font-heading font-semibold text-foreground">⚠️ Farming Alerts</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• Heavy rainfall expected Wed-Thu. Delay pesticide spraying.</li>
              <li>• High humidity levels — watch for fungal infections in crops.</li>
              <li>• Ideal conditions for wheat sowing this weekend.</li>
            </ul>
          </div>
        </div>
      )}

      {tab === "prices" && (
        <div className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pricePredictions.map((p) => (
              <StatCard key={p.crop} title={p.crop} value={`₹${p.predictedPrice}`}
                change={`Current: ₹${p.currentPrice}`}
                icon={<TrendingUp className="h-5 w-5" />}
                trend={p.trend} />
            ))}
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="font-heading text-lg font-semibold text-foreground">Price Trend — Wheat</h3>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pricePredictions[0].history}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(90, 15%, 88%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="price" stroke="hsl(142, 55%, 35%)" strokeWidth={2} dot={{ fill: "hsl(142, 55%, 35%)" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="font-heading text-lg font-semibold text-foreground">Market Demand</h3>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pricePredictions.map((p) => ({ crop: p.crop, demand: Math.round(Math.random() * 100) }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(90, 15%, 88%)" />
                  <XAxis dataKey="crop" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="demand" fill="hsl(36, 60%, 50%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {tab === "satellite" && (
        <div className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-3xl">🌿</div>
              <p className="mt-3 font-heading text-2xl font-bold text-foreground">0.82</p>
              <p className="text-sm text-muted-foreground">Vegetation Index (NDVI)</p>
              <p className="mt-1 text-xs text-success">Healthy</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 shadow-card text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-info/10 text-3xl">🛰️</div>
              <p className="mt-3 font-heading text-2xl font-bold text-foreground">92%</p>
              <p className="text-sm text-muted-foreground">Crop Health Index</p>
              <p className="mt-1 text-xs text-info">Excellent</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 shadow-card text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-warning/10 text-3xl">📊</div>
              <p className="mt-3 font-heading text-2xl font-bold text-foreground">5.2 ha</p>
              <p className="text-sm text-muted-foreground">Monitored Area</p>
              <p className="mt-1 text-xs text-muted-foreground">Last scan: 2 hours ago</p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-accent p-8 text-center">
            <Satellite className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">Satellite View</h3>
            <p className="mt-2 text-sm text-muted-foreground">Satellite imagery visualization will display here when connected to a satellite data provider.</p>
          </div>
        </div>
      )}

      {tab === "recommendations" && (
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="font-heading text-lg font-semibold text-foreground">🧠 AI Crop Recommendations</h3>
            <p className="mt-1 text-sm text-muted-foreground">Based on your location, soil type, season, and weather data</p>
          </div>
          {cropRecommendations.map((r) => (
            <div key={r.crop} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-2xl shrink-0">
                {r.crop === "Wheat" ? "🌾" : r.crop === "Mustard" ? "🌻" : r.crop === "Chickpea" ? "🫘" : "🥔"}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-heading font-semibold text-foreground">{r.crop}</h4>
                  <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">{r.confidence}% match</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{r.reason}</p>
                <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
                  <span>Season: {r.season}</span>
                  <span>Soil: {r.soilType}</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="h-2 w-24 rounded-full bg-muted">
                  <div className="h-full rounded-full gradient-primary" style={{ width: `${r.confidence}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
