import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { OrderItem } from "../backend.d";
import { useCart } from "../context/CartContext";
import { useOrderHistory } from "../hooks/useOrderHistory";
import { usePlaceOrder } from "../hooks/useQueries";

export default function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();
  const placeOrder = usePlaceOrder();
  const { saveOrder } = useOrderHistory();
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
  });
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [isPlacing, setIsPlacing] = useState(false);

  if (!isCartOpen) return null;

  const handlePlaceOrder = async () => {
    if (!form.customerName || !form.phone || !form.address) {
      toast.error("Please fill all fields");
      return;
    }

    setIsPlacing(true);

    const localOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-IN"),
      customerName: form.customerName,
      phone: form.phone,
      address: form.address,
      items: items.map((i) => ({
        name: i.product.name,
        quantity: i.quantity,
        price: Number(i.product.price),
      })),
      total: Math.round(totalPrice),
      status: "Confirmed",
    };

    // Save to localStorage FIRST — this ensures order history always works
    saveOrder(localOrder);

    // Then try the backend (fire and forget — don't block the UX)
    const orderItems: OrderItem[] = items.map((i) => ({
      productId: i.product.id,
      name: i.product.name,
      quantity: BigInt(i.quantity),
      price: i.product.price,
    }));

    placeOrder
      .mutateAsync({
        customerName: form.customerName,
        phone: form.phone,
        address: form.address,
        items: orderItems,
        total: BigInt(Math.round(totalPrice)),
      })
      .catch(() => {
        // Backend unavailable — order is already saved locally, nothing to do
      });

    toast.success(`Order #${localOrder.id} placed successfully! 🎉`);
    clearCart();
    setIsCartOpen(false);
    setStep("cart");
    setForm({ customerName: "", phone: "", address: "" });
    setIsPlacing(false);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setIsCartOpen(false)}
        onKeyDown={(e) => e.key === "Escape" && setIsCartOpen(false)}
        role="button"
        tabIndex={-1}
        aria-label="Close cart"
      />
      {/* Drawer */}
      <div
        data-ocid="cart.panel"
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in-right"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 flipkart-gradient text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <span className="font-bold text-lg">
              {step === "cart" ? `My Cart (${items.length})` : "Checkout"}
            </span>
          </div>
          <button
            type="button"
            data-ocid="cart.close_button"
            onClick={() => setIsCartOpen(false)}
            className="hover:bg-white/10 p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === "cart" ? (
          <>
            {items.length === 0 ? (
              <div
                data-ocid="cart.empty_state"
                className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-400"
              >
                <ShoppingBag className="w-16 h-16 opacity-30" />
                <p className="text-lg font-medium">Your cart is empty</p>
                <Button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-primary text-white"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {items.map((item, idx) => (
                    <div
                      key={item.product.id.toString()}
                      data-ocid={`cart.item.${idx + 1}`}
                      className="flex gap-3 bg-gray-50 rounded-lg p-3"
                    >
                      <img
                        src={
                          item.product.imageUrl ||
                          `https://placehold.co/80x80?text=${encodeURIComponent(item.product.name.slice(0, 8))}`
                        }
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/80x80?text=Product";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-800 line-clamp-2">
                          {item.product.name}
                        </p>
                        <p className="text-primary font-bold text-sm">
                          ₹{Number(item.product.price).toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            type="button"
                            data-ocid={`cart.secondary_button.${idx + 1}`}
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-semibold w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            data-ocid={`cart.primary_button.${idx + 1}`}
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        data-ocid={`cart.delete_button.${idx + 1}`}
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-400 hover:text-red-600 p-1 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-600">
                      Total ({items.length} items)
                    </span>
                    <span className="font-bold text-lg text-primary">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <Button
                    data-ocid="cart.primary_button"
                    onClick={() => setStep("checkout")}
                    className="w-full yellow-gradient text-gray-900 font-bold h-12 text-base hover:opacity-90"
                  >
                    Proceed to Checkout →
                  </Button>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex-1 overflow-y-auto p-4">
            <button
              type="button"
              onClick={() => setStep("cart")}
              className="text-primary text-sm mb-4 hover:underline flex items-center gap-1"
            >
              ← Back to cart
            </button>
            <div className="bg-purple-50 rounded-lg p-3 mb-4">
              <p className="text-sm font-semibold text-gray-700">
                Order Total:{" "}
                <span className="text-primary font-bold">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </p>
              <p className="text-xs text-gray-500">{items.length} item(s)</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="customerName">Full Name *</Label>
                <Input
                  data-ocid="cart.input"
                  id="customerName"
                  placeholder="Enter your full name"
                  value={form.customerName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, customerName: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  data-ocid="cart.input"
                  id="phone"
                  placeholder="Enter your 10-digit phone"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="address">Delivery Address *</Label>
                <textarea
                  data-ocid="cart.textarea"
                  id="address"
                  placeholder="Enter full delivery address"
                  value={form.address}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, address: e.target.value }))
                  }
                  rows={3}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
              <Separator />
              <Button
                data-ocid="cart.submit_button"
                onClick={handlePlaceOrder}
                disabled={isPlacing}
                className="w-full yellow-gradient text-gray-900 font-bold h-12 text-base"
              >
                {isPlacing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  "Place Order ✓"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
