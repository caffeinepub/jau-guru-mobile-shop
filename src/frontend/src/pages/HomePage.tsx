import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronRight,
  Gift,
  Headphones,
  RefreshCw,
  Smartphone,
  Star,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useProductsByCategory } from "../hooks/useQueries";

const CATEGORIES = [
  {
    id: "All",
    label: "All",
    icon: Smartphone,
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "Repair",
    label: "Phone Repair",
    icon: Wrench,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    id: "Accessories",
    label: "Accessories",
    icon: Headphones,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "New Phones",
    label: "New Phones",
    icon: Smartphone,
    color: "bg-green-100 text-green-700",
  },
  {
    id: "Used Phones",
    label: "Used Phones",
    icon: RefreshCw,
    color: "bg-orange-100 text-orange-700",
  },
];

const CATEGORY_CARDS = [
  {
    label: "Phone Repair",
    icon: Wrench,
    desc: "Screen, battery & more",
    bg: "from-purple-500 to-purple-700",
    id: "Repair",
  },
  {
    label: "Accessories",
    icon: Headphones,
    desc: "Covers, cables & more",
    bg: "from-blue-500 to-blue-700",
    id: "Accessories",
  },
  {
    label: "New Phones",
    icon: Smartphone,
    desc: "Latest models",
    bg: "from-green-500 to-green-700",
    id: "New Phones",
  },
  {
    label: "Used Phones",
    icon: RefreshCw,
    desc: "Certified pre-owned",
    bg: "from-orange-500 to-orange-700",
    id: "Used Phones",
  },
];

interface HomePageProps {
  searchQuery: string;
  onNavigate: (page: string) => void;
}

export default function HomePage({ searchQuery, onNavigate }: HomePageProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: products, isLoading } = useProductsByCategory(activeCategory);

  const filtered = (products || []).filter((p) =>
    searchQuery
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true,
  );

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="relative overflow-hidden">
        <img
          src="/assets/generated/hero-mobile-repair.dim_1200x400.jpg"
          alt="Mobile Repair Services"
          className="w-full h-48 sm:h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-transparent flex items-center">
          <div className="px-6 md:px-12 max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white font-bold text-2xl md:text-4xl leading-tight"
            >
              Expert Mobile <span className="text-yellow-400">Repairs</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-purple-200 mt-2 text-sm md:text-base"
            >
              Fast · Reliable · Affordable
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => onNavigate("repair")}
              data-ocid="home.primary_button"
              className="mt-4 yellow-gradient text-gray-900 font-bold px-5 py-2 rounded-sm text-sm hover:opacity-90 transition-opacity"
            >
              Book Repair Now →
            </motion.button>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="font-bold text-gray-800 text-lg mb-4">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORY_CARDS.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              data-ocid="home.tab"
              onClick={() => setActiveCategory(cat.id)}
              className={`bg-gradient-to-br ${cat.bg} text-white rounded-xl p-4 text-center hover:scale-105 transition-transform shadow-sm`}
            >
              <cat.icon className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold text-sm">{cat.label}</p>
              <p className="text-white/80 text-xs mt-0.5">{cat.desc}</p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Offers Strip */}
      <section className="bg-yellow-50 border-y border-yellow-200 py-3 px-4">
        <div className="max-w-7xl mx-auto flex gap-6 overflow-x-auto text-sm">
          {[
            "🔧 Screen Repair from ₹499",
            "🔋 Battery Replacement ₹299",
            "📦 Free Delivery on ₹999+",
            "⭐ 1 Year Warranty on Repairs",
          ].map((offer) => (
            <span
              key={offer}
              className="flex-shrink-0 text-yellow-800 font-medium flex items-center gap-1"
            >
              {offer}
              <ChevronRight className="w-3 h-3" />
            </span>
          ))}
        </div>
      </section>

      {/* Free Gift Banner */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-r from-yellow-400 to-yellow-500"
        >
          {/* Decorative sparkle dots */}
          <div className="absolute top-2 left-4 text-yellow-600 text-xl opacity-40 select-none">
            ✦
          </div>
          <div className="absolute top-4 right-10 text-yellow-600 text-lg opacity-30 select-none">
            ✦
          </div>
          <div className="absolute bottom-3 left-12 text-yellow-600 text-base opacity-30 select-none">
            ✦
          </div>
          <div className="absolute bottom-2 right-6 text-yellow-600 text-xl opacity-40 select-none">
            ✦
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 p-5 sm:p-6">
            {/* Earbuds image */}
            <div className="relative flex-shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden bg-yellow-300/50 border-2 border-yellow-300 shadow-md flex items-center justify-center">
                <img
                  src="/assets/uploads/61lktd-ynrl._ac_uf1000_1000_ql80-019d377f-a265-769c-a98b-cb7605e651f2-1.jpg"
                  alt="Free Realme Earbuds"
                  className="w-full h-full object-contain p-2"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              {/* FREE badge */}
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-extrabold px-2 py-0.5 rounded-full shadow-md rotate-6">
                FREE!
              </span>
            </div>

            {/* Text content */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <Gift className="w-5 h-5 text-gray-900" />
                <span className="text-gray-900 text-xs font-bold uppercase tracking-widest">
                  Limited Time Offer
                </span>
              </div>
              <h2 className="text-gray-900 font-extrabold text-xl sm:text-2xl leading-tight">
                🎁 Free Gift for Every Customer!
              </h2>
              <p className="text-gray-800 text-sm mt-1 leading-relaxed">
                Get <strong>FREE Realme Earbuds</strong> with every purchase
                above <span className="font-extrabold">₹999</span>
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
                <button
                  type="button"
                  data-ocid="gift.primary_button"
                  onClick={() => onNavigate("products")}
                  className="bg-gray-900 text-yellow-400 font-bold text-sm px-5 py-2 rounded-full hover:bg-gray-800 transition-colors shadow-md"
                >
                  Shop Now →
                </button>
                <span className="bg-white/70 text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full border border-yellow-300">
                  🎧 Worth ₹799
                </span>
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  🔥 Offer Live!
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Service: Screen Repair */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="font-bold text-gray-800 text-lg mb-4">
          Featured Service
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-2xl overflow-hidden shadow-lg"
        >
          <div className="flex flex-col sm:flex-row">
            {/* Image */}
            <div className="sm:w-2/5 relative">
              <img
                src="/assets/uploads/images-019d3771-302a-7349-a7c7-6babc76e25be-1.jpeg"
                alt="Screen Repair Before and After"
                className="w-full h-52 sm:h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-purple-900/40" />
              <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                Before &amp; After
              </span>
            </div>

            {/* Text content */}
            <div className="sm:w-3/5 p-6 flex flex-col justify-center gap-3">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wide">
                  Most Popular Repair
                </span>
              </div>
              <h3 className="text-white font-bold text-2xl leading-snug">
                Screen Repair Specialist
              </h3>
              <p className="text-purple-200 text-sm leading-relaxed">
                Cracked screen? We fix it fast. All phone models. Genuine parts.
                1 year warranty.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-1">
                <span className="bg-yellow-400 text-yellow-900 font-bold text-lg px-4 py-1.5 rounded-full">
                  Starting at ₹1550
                </span>
                <div className="flex gap-1">
                  {["1", "2", "3", "4", "5"].map((n) => (
                    <Star
                      key={`fs-star-${n}`}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-purple-300 mt-1">
                <span className="bg-purple-800/60 px-2 py-1 rounded">
                  ⚡ Same Day Repair
                </span>
                <span className="bg-purple-800/60 px-2 py-1 rounded">
                  🔒 Genuine Parts
                </span>
                <span className="bg-purple-800/60 px-2 py-1 rounded">
                  🛡️ 1 Year Warranty
                </span>
              </div>
              <button
                type="button"
                data-ocid="home.secondary_button"
                onClick={() => onNavigate("repair")}
                className="mt-2 w-fit yellow-gradient text-gray-900 font-bold px-6 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity shadow-md"
              >
                Book Now →
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-800 text-lg">
            Our Products & Services
          </h2>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat.id}
              data-ocid="product.tab"
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary"
              }`}
            >
              <cat.icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div
            data-ocid="product.loading_state"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          >
            {Array.from({ length: 10 }, (_, i) => i).map((i) => (
              <div
                key={`skeleton-${i}`}
                className="bg-white rounded-lg overflow-hidden"
              >
                <Skeleton className="h-44 w-full" />
                <div className="p-3 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            data-ocid="product.empty_state"
            className="text-center py-16 text-gray-400"
          >
            <Smartphone className="w-16 h-16 mx-auto opacity-30 mb-4" />
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filtered.map((product, idx) => (
              <ProductCard
                key={product.id.toString()}
                product={product}
                index={idx + 1}
              />
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-8 px-4 mt-4 border-t">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-bold text-gray-800 text-lg text-center mb-6">
            Why Choose Jau Guru?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "⚡", title: "Fast Service", desc: "Same day repairs" },
              {
                icon: "🔒",
                title: "Genuine Parts",
                desc: "100% original parts",
              },
              {
                icon: "⭐",
                title: "Expert Technicians",
                desc: "5+ years experience",
              },
              {
                icon: "💰",
                title: "Best Prices",
                desc: "Price match guarantee",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="text-center p-4 rounded-xl bg-purple-50"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="font-semibold text-gray-800 text-sm">
                  {item.title}
                </p>
                <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-bold text-gray-800 text-lg text-center mb-6">
            Customer Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: "Rahul Sharma",
                rating: 5,
                text: "Excellent service! My iPhone screen was repaired in just 2 hours. Highly recommended!",
                date: "2 days ago",
              },
              {
                name: "Priya Patel",
                rating: 5,
                text: "Got a great deal on a used Samsung phone. Works perfectly. Very trustworthy shop.",
                date: "1 week ago",
              },
              {
                name: "Amit Kumar",
                rating: 4,
                text: "Fast battery replacement at a fair price. The staff is very knowledgeable and friendly.",
                date: "2 weeks ago",
              },
            ].map((review) => (
              <div
                key={review.name}
                className="bg-white rounded-xl p-4 shadow-xs border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {review.name}
                    </p>
                    <p className="text-gray-400 text-xs">{review.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: 5 }, (_, j) => j).map((j) => (
                    <Star
                      key={`review-star-${j}`}
                      className={`w-3.5 h-3.5 ${j < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
