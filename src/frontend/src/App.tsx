import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import MobileBottomNav from "./components/MobileBottomNav";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import AdminPanel from "./pages/AdminPanel";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import RepairPage from "./pages/RepairPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
      retry: 2,
    },
  },
});

function AppContent() {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = (page: string) => {
    setCurrentPage(page);
    if (page !== "home") setSearchQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        onNavigate={navigate}
        currentPage={currentPage}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <CartDrawer />

      <div className="flex-1 pb-16 md:pb-0">
        {currentPage === "home" && (
          <HomePage searchQuery={searchQuery} onNavigate={navigate} />
        )}
        {currentPage === "repair" && <RepairPage onNavigate={navigate} />}
        {currentPage === "admin" && <AdminPanel onNavigate={navigate} />}
        {currentPage === "contact" && <ContactPage onNavigate={navigate} />}
        {currentPage === "orders" && <OrderHistoryPage onNavigate={navigate} />}
        {currentPage === "categories" && (
          <HomePage searchQuery={searchQuery} onNavigate={navigate} />
        )}
      </div>

      {currentPage !== "admin" && <Footer />}
      <MobileBottomNav currentPage={currentPage} onNavigate={navigate} />

      {/* Floating WhatsApp Button */}
      {currentPage !== "admin" && (
        <a
          href="https://wa.me/917077109109"
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="whatsapp.button"
          className="fixed bottom-20 md:bottom-6 right-4 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95"
          style={{ backgroundColor: "#25D366" }}
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 text-white" fill="white" />
        </a>
      )}

      <Toaster position="top-right" richColors />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </QueryClientProvider>
  );
}
