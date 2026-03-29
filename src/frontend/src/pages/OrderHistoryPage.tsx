import { Button } from "@/components/ui/button";
import { Package, ShoppingBag } from "lucide-react";
import { useOrderHistory } from "../hooks/useOrderHistory";

interface OrderHistoryPageProps {
  onNavigate: (page: string) => void;
}

export default function OrderHistoryPage({
  onNavigate,
}: OrderHistoryPageProps) {
  const { orders } = useOrderHistory();

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="flipkart-gradient text-white px-4 py-4 flex items-center gap-3">
        <Package className="w-6 h-6" />
        <h1 className="text-xl font-bold">My Orders</h1>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4">
        {orders.length === 0 ? (
          <div
            data-ocid="orders.empty_state"
            className="flex flex-col items-center justify-center gap-4 py-20 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-primary opacity-50" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700">
              No orders yet
            </h2>
            <p className="text-gray-400 text-sm max-w-xs">
              You haven't placed any orders. Start shopping and your orders will
              appear here.
            </p>
            <Button
              data-ocid="orders.primary_button"
              onClick={() => onNavigate("home")}
              className="flipkart-gradient text-white font-bold px-8"
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, idx) => (
              <div
                key={order.id}
                data-ocid={`orders.item.${idx + 1}`}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Order Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-purple-50 border-b border-purple-100">
                  <div>
                    <p className="text-sm font-bold text-primary">
                      Order #{order.id}
                    </p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    {order.status}
                  </span>
                </div>

                {/* Items */}
                <div className="px-4 py-3 space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-gray-700">
                        {item.name}
                        <span className="text-gray-400 ml-1">
                          x{item.quantity}
                        </span>
                      </span>
                      <span className="font-medium text-gray-800">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    <span className="font-medium text-gray-600">
                      Deliver to:
                    </span>{" "}
                    {order.address}
                  </div>
                  <p className="text-sm font-bold text-primary ml-2 whitespace-nowrap">
                    ₹{order.total.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
