import {
  Grid3X3,
  Home,
  MessageCircle,
  Package,
  ShoppingCart,
  Wrench,
} from "lucide-react";
import { useCart } from "../context/CartContext";

interface MobileBottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function MobileBottomNav({
  currentPage,
  onNavigate,
}: MobileBottomNavProps) {
  const { totalItems, setIsCartOpen } = useCart();

  const items = [
    { id: "home", label: "Home", icon: Home },
    { id: "categories", label: "Categories", icon: Grid3X3 },
    { id: "repair", label: "Repair", icon: Wrench },
    { id: "orders", label: "Orders", icon: Package },
    { id: "contact", label: "Contact", icon: MessageCircle },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex md:hidden z-40 shadow-lg">
      {items.map((item) => (
        <button
          type="button"
          key={item.id}
          data-ocid={`mobile_nav.${item.id}.link`}
          onClick={() => onNavigate(item.id)}
          className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-xs transition-colors ${
            currentPage === item.id
              ? "text-primary"
              : "text-gray-400 hover:text-primary"
          }`}
        >
          <item.icon className="w-5 h-5" />
          {item.label}
        </button>
      ))}
      <button
        type="button"
        data-ocid="mobile_nav.cart.button"
        onClick={() => setIsCartOpen(true)}
        className="flex-1 flex flex-col items-center gap-0.5 py-2 text-xs relative text-gray-400 hover:text-primary transition-colors"
      >
        <div className="relative">
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 text-gray-900 rounded-full text-[10px] font-bold flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>
        Cart
      </button>
    </nav>
  );
}
