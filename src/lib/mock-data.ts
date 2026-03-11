export interface Product {
  _id?: string;   // MongoDB id
  id?: string;    // local mock id

  name: string;
  price: number;
  unit: string;
  quantity: number;
  image: string;

  farmer?: string;
  farmerLocation?: string;

  category: string;
  description?: string;
  rating?: number;
}

export interface WeatherData {
  temp: number;
  humidity: number;
  windSpeed: number;
  rainfall: number;
  condition: string;
  icon: string;
}

export interface PricePrediction {
  crop: string;
  currentPrice: number;
  predictedPrice: number;
  trend: "up" | "down" | "stable";
  history: { month: string; price: number }[];
}

export const products: Product[] = [
  { id: "1", name: "Organic Wheat", price: 2400, unit: "quintal", quantity: 50, image: "", farmer: "Rajesh Kumar", farmerLocation: "Punjab", category: "Grains", description: "Premium organic wheat grown without pesticides. Rich in nutrients and perfect for chapati and bread.", rating: 4.5 },
  { id: "2", name: "Basmati Rice", price: 3500, unit: "quintal", quantity: 30, image: "", farmer: "Amit Singh", farmerLocation: "Haryana", category: "Grains", description: "Long grain aromatic basmati rice. Ideal for biryani and pulao.", rating: 4.8 },
  { id: "3", name: "Fresh Tomatoes", price: 40, unit: "kg", quantity: 500, image: "", farmer: "Priya Devi", farmerLocation: "Maharashtra", category: "Vegetables", description: "Freshly harvested red tomatoes. Perfect for cooking and salads.", rating: 4.2 },
  { id: "4", name: "Cotton Bales", price: 5500, unit: "quintal", quantity: 20, image: "", farmer: "Suresh Patel", farmerLocation: "Gujarat", category: "Cash Crops", description: "High quality cotton bales. Perfect for textile manufacturing.", rating: 4.6 },
  { id: "5", name: "Alphonso Mangoes", price: 300, unit: "dozen", quantity: 200, image: "", farmer: "Vikas Desai", farmerLocation: "Ratnagiri", category: "Fruits", description: "Premium Alphonso mangoes known for their sweetness and aroma.", rating: 4.9 },
  { id: "6", name: "Green Chillies", price: 80, unit: "kg", quantity: 100, image: "", farmer: "Lakshmi Reddy", farmerLocation: "Andhra Pradesh", category: "Vegetables", description: "Fresh spicy green chillies. Adds perfect heat to any dish.", rating: 4.3 },
  { id: "7", name: "Sugarcane", price: 350, unit: "quintal", quantity: 100, image: "", farmer: "Mohan Das", farmerLocation: "Uttar Pradesh", category: "Cash Crops", description: "Fresh sugarcane, perfect for juice and jaggery production.", rating: 4.1 },
  { id: "8", name: "Organic Turmeric", price: 120, unit: "kg", quantity: 80, image: "", farmer: "Sita Sharma", farmerLocation: "Kerala", category: "Spices", description: "Pure organic turmeric with high curcumin content.", rating: 4.7 },
];

export const weatherData: WeatherData = {
  temp: 32,
  humidity: 65,
  windSpeed: 12,
  rainfall: 2.5,
  condition: "Partly Cloudy",
  icon: "⛅",
};

export const weeklyForecast = [
  { day: "Mon", temp: 32, condition: "☀️", rain: 0 },
  { day: "Tue", temp: 30, condition: "⛅", rain: 10 },
  { day: "Wed", temp: 28, condition: "🌧️", rain: 60 },
  { day: "Thu", temp: 27, condition: "🌧️", rain: 75 },
  { day: "Fri", temp: 29, condition: "⛅", rain: 20 },
  { day: "Sat", temp: 31, condition: "☀️", rain: 5 },
  { day: "Sun", temp: 33, condition: "☀️", rain: 0 },
];

export const pricePredictions: PricePrediction[] = [
  { crop: "Wheat", currentPrice: 2400, predictedPrice: 2650, trend: "up", history: [{ month: "Jan", price: 2200 }, { month: "Feb", price: 2250 }, { month: "Mar", price: 2300 }, { month: "Apr", price: 2350 }, { month: "May", price: 2400 }, { month: "Jun", price: 2650 }] },
  { crop: "Rice", currentPrice: 3500, predictedPrice: 3400, trend: "down", history: [{ month: "Jan", price: 3600 }, { month: "Feb", price: 3550 }, { month: "Mar", price: 3500 }, { month: "Apr", price: 3480 }, { month: "May", price: 3500 }, { month: "Jun", price: 3400 }] },
  { crop: "Tomatoes", currentPrice: 40, predictedPrice: 55, trend: "up", history: [{ month: "Jan", price: 30 }, { month: "Feb", price: 35 }, { month: "Mar", price: 38 }, { month: "Apr", price: 42 }, { month: "May", price: 40 }, { month: "Jun", price: 55 }] },
  { crop: "Cotton", currentPrice: 5500, predictedPrice: 5500, trend: "stable", history: [{ month: "Jan", price: 5400 }, { month: "Feb", price: 5450 }, { month: "Mar", price: 5500 }, { month: "Apr", price: 5480 }, { month: "May", price: 5500 }, { month: "Jun", price: 5500 }] },
];

export const cropRecommendations = [
  { crop: "Wheat", confidence: 92, season: "Rabi", soilType: "Loamy", reason: "Ideal temperature and soil conditions" },
  { crop: "Mustard", confidence: 87, season: "Rabi", soilType: "Sandy Loam", reason: "Good rainfall prediction for the region" },
  { crop: "Chickpea", confidence: 85, season: "Rabi", soilType: "Clay", reason: "High market demand expected" },
  { crop: "Potato", confidence: 80, season: "Rabi", soilType: "Loamy", reason: "Price trend showing upward movement" },
];

export const salesData = [
  { month: "Jan", revenue: 45000, orders: 12 },
  { month: "Feb", revenue: 52000, orders: 15 },
  { month: "Mar", revenue: 48000, orders: 13 },
  { month: "Apr", revenue: 61000, orders: 18 },
  { month: "May", revenue: 55000, orders: 16 },
  { month: "Jun", revenue: 67000, orders: 20 },
];

export const orders = [
  { id: "ORD001", product: "Organic Wheat", buyer: "FoodCorp Ltd", quantity: 10, total: 24000, status: "delivered", date: "2026-03-01" },
  { id: "ORD002", product: "Basmati Rice", buyer: "Rice World", quantity: 5, total: 17500, status: "shipped", date: "2026-03-03" },
  { id: "ORD003", product: "Fresh Tomatoes", buyer: "VegMart", quantity: 100, total: 4000, status: "processing", date: "2026-03-05" },
  { id: "ORD004", product: "Alphonso Mangoes", buyer: "FruitBasket", quantity: 50, total: 15000, status: "pending", date: "2026-03-06" },
];
