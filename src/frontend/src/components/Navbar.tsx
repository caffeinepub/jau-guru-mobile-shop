import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, ShoppingCart, User, Wrench, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function Navbar({
  onNavigate,
  currentPage,
  searchQuery,
  onSearchChange,
}: NavbarProps) {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 shadow-md"
      style={{ background: "linear-gradient(135deg, #6B21A8, #4C1D95)" }}
    >
      <div className="max-w-7xl mx-auto px-3 py-2">
        <div className="flex items-center gap-3">
          {/* Logo + Brand */}
          <button
            type="button"
            data-ocid="nav.home.link"
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <img
              src="/assets/uploads/img_20260329_072244-019d374c-0acd-770c-a15d-15f434fb8564-1.png"
              alt="Jau Guru Mobile Shop"
              className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/assets/generated/jau-guru-logo-transparent.dim_200x200.png";
              }}
            />
            <div className="hidden sm:block">
              <p className="text-yellow-400 font-bold text-sm leading-tight">
                Jau Guru
              </p>
              <p className="text-purple-200 text-xs leading-tight">
                Mobile Shop
              </p>
            </div>
          </button>

          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              data-ocid="nav.search_input"
              placeholder="Search mobiles, repairs, accessories..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 bg-white text-gray-800 border-0 rounded-sm h-9 text-sm"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            <Button
              data-ocid="nav.repair.button"
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("repair")}
              className="hidden md:flex text-white hover:bg-white/10 gap-1 text-xs"
            >
              <Wrench className="w-4 h-4" />
              Repair
            </Button>
            <Button
              data-ocid="nav.admin.button"
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("admin")}
              className="hidden md:flex text-white hover:bg-white/10 gap-1 text-xs"
            >
              <User className="w-4 h-4" />
              Admin
            </Button>
            <button
              type="button"
              data-ocid="nav.cart.button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white hover:bg-white/10 rounded-md transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-yellow-400 text-gray-900 border-0">
                  {totalItems}
                </Badge>
              )}
            </button>
            <button
              type="button"
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 pb-2 flex gap-2 border-t border-purple-600 pt-2">
            <button
              type="button"
              onClick={() => {
                onNavigate("home");
                setMobileMenuOpen(false);
              }}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                currentPage === "home"
                  ? "bg-yellow-400 text-gray-900"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => {
                onNavigate("repair");
                setMobileMenuOpen(false);
              }}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                currentPage === "repair"
                  ? "bg-yellow-400 text-gray-900"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Book Repair
            </button>
            <button
              type="button"
              onClick={() => {
                onNavigate("admin");
                setMobileMenuOpen(false);
              }}
              className="px-3 py-1.5 rounded text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              Admin
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
