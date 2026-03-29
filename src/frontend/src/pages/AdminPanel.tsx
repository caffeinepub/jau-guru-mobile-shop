import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  Shield,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import {
  useAddProduct,
  useDeleteProduct,
  useOrders,
  useProducts,
  useRepairBookings,
  useUpdateBookingStatus,
  useUpdateOrderStatus,
  useUpdateProduct,
} from "../hooks/useQueries";

const ADMIN_PHONE = "7077109109";
const ADMIN_PASSWORD = "Anup1234";

const ORDER_STATUSES = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];
const BOOKING_STATUSES = ["Pending", "In Progress", "Completed", "Cancelled"];
const CATEGORIES = ["Repair", "Accessories", "New Phones", "Used Phones"];

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  category: string;
  imageUrl: string;
  inStock: boolean;
}

const emptyForm: ProductFormData = {
  name: "",
  description: "",
  price: "",
  category: "Accessories",
  imageUrl: "",
  inStock: true,
};

interface AdminPanelProps {
  onNavigate: (page: string) => void;
}

export default function AdminPanel({ onNavigate }: AdminPanelProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Product dialog
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<ProductFormData>(emptyForm);

  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: orders, isLoading: ordersLoading } = useOrders();
  const { data: bookings, isLoading: bookingsLoading } = useRepairBookings();
  const updateOrderStatus = useUpdateOrderStatus();
  const updateBookingStatus = useUpdateBookingStatus();
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const handleLogin = () => {
    if (phone === ADMIN_PHONE && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid phone number or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPhone("");
    setPassword("");
    setLoginError("");
  };

  const openAddProduct = () => {
    setEditingProduct(null);
    setProductForm(emptyForm);
    setProductDialogOpen(true);
  };

  const openEditProduct = (p: Product) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name,
      description: p.description,
      price: Number(p.price).toString(),
      category: p.category,
      imageUrl: p.imageUrl,
      inStock: p.inStock,
    });
    setProductDialogOpen(true);
  };

  const handleSaveProduct = async () => {
    if (!productForm.name || !productForm.price) {
      toast.error("Name and price are required");
      return;
    }
    try {
      if (editingProduct) {
        await updateProduct.mutateAsync({
          id: editingProduct.id,
          name: productForm.name,
          description: productForm.description,
          price: BigInt(Math.round(Number(productForm.price))),
          category: productForm.category,
          imageUrl: productForm.imageUrl,
          inStock: productForm.inStock,
        });
        toast.success("Product updated!");
      } else {
        await addProduct.mutateAsync({
          name: productForm.name,
          description: productForm.description,
          price: BigInt(Math.round(Number(productForm.price))),
          category: productForm.category,
          imageUrl: productForm.imageUrl,
        });
        toast.success("Product added!");
      }
      setProductDialogOpen(false);
    } catch {
      toast.error("Failed to save product");
    }
  };

  const handleDeleteProduct = async (id: bigint) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct.mutateAsync(id);
      toast.success("Product deleted");
    } catch {
      toast.error("Failed to delete product");
    }
  };

  // Login screen
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div
          data-ocid="admin.panel"
          className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-md w-full"
        >
          {/* Header */}
          <div className="flipkart-gradient p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-white font-bold text-xl">
              Jau Guru Mobile Shop
            </h1>
            <p className="text-purple-200 text-sm mt-1">Admin Panel</p>
          </div>

          {/* Form */}
          <div className="p-6">
            <h2 className="text-gray-800 font-bold text-lg mb-5 text-center">
              Admin Login
            </h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="admin-phone">Phone Number</Label>
                <Input
                  id="admin-phone"
                  data-ocid="admin.input"
                  type="tel"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1"
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>
              <div>
                <Label htmlFor="admin-password">Password</Label>
                <Input
                  id="admin-password"
                  data-ocid="admin.input"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>

              {loginError && (
                <p
                  data-ocid="admin.error_state"
                  className="text-red-500 text-sm text-center"
                >
                  {loginError}
                </p>
              )}

              <Button
                data-ocid="admin.primary_button"
                onClick={handleLogin}
                className="w-full flipkart-gradient text-white font-bold h-11"
              >
                Login
              </Button>
            </div>

            <button
              type="button"
              data-ocid="admin.secondary_button"
              onClick={() => onNavigate("home")}
              className="mt-4 text-sm text-gray-500 hover:text-primary flex items-center gap-1 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="flipkart-gradient text-white py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate("home")}
              className="text-purple-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Shield className="w-6 h-6 text-yellow-400" />
            <div>
              <h1 className="font-bold text-lg">Admin Panel</h1>
              <p className="text-purple-200 text-xs">Jau Guru Mobile Shop</p>
            </div>
          </div>
          <Button
            data-ocid="admin.secondary_button"
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="text-white border-white/30 hover:bg-white/10 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-1" /> Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs defaultValue="products" data-ocid="admin.tab">
          <TabsList className="mb-4">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="bookings">Repair Bookings</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800">
                Products ({products?.length ?? 0})
              </h2>
              <Button
                data-ocid="admin.primary_button"
                onClick={openAddProduct}
                className="flipkart-gradient text-white gap-1"
                size="sm"
              >
                <Plus className="w-4 h-4" /> Add Product
              </Button>
            </div>
            {productsLoading ? (
              <div
                data-ocid="admin.loading_state"
                className="text-center py-12"
              >
                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
              </div>
            ) : (
              <div className="bg-white rounded-xl border overflow-hidden">
                <Table data-ocid="admin.table">
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(products || []).map((p, idx) => (
                      <TableRow
                        key={p.id.toString()}
                        data-ocid={`admin.row.${idx + 1}`}
                      >
                        <TableCell className="font-medium text-sm">
                          {p.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{p.category}</Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-primary">
                          ₹{Number(p.price).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              p.inStock
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }
                          >
                            {p.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-1 justify-end">
                            <Button
                              data-ocid={`admin.edit_button.${idx + 1}`}
                              size="sm"
                              variant="outline"
                              onClick={() => openEditProduct(p)}
                              className="h-7 px-2"
                            >
                              <Pencil className="w-3 h-3" />
                            </Button>
                            <Button
                              data-ocid={`admin.delete_button.${idx + 1}`}
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteProduct(p.id)}
                              className="h-7 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <h2 className="font-bold text-gray-800 mb-4">
              Orders ({orders?.length ?? 0})
            </h2>
            {ordersLoading ? (
              <div
                data-ocid="admin.loading_state"
                className="text-center py-12"
              >
                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
              </div>
            ) : (orders || []).length === 0 ? (
              <div
                data-ocid="admin.empty_state"
                className="bg-white rounded-xl border p-12 text-center text-gray-400"
              >
                <p>No orders yet</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border overflow-hidden">
                <Table data-ocid="admin.table">
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(orders || []).map((order, idx) => (
                      <TableRow
                        key={order.id.toString()}
                        data-ocid={`admin.row.${idx + 1}`}
                      >
                        <TableCell className="font-mono text-sm">
                          #{Number(order.id)}
                        </TableCell>
                        <TableCell className="font-medium">
                          {order.customerName}
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {order.phone}
                        </TableCell>
                        <TableCell className="font-semibold text-primary">
                          ₹{Number(order.total).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={order.status}
                            onValueChange={(value) =>
                              updateOrderStatus.mutate({
                                id: order.id,
                                status: value,
                              })
                            }
                          >
                            <SelectTrigger
                              data-ocid={`admin.select.${idx + 1}`}
                              className="w-36 h-8 text-xs"
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {ORDER_STATUSES.map((s) => (
                                <SelectItem key={s} value={s}>
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          {/* Repair Bookings Tab */}
          <TabsContent value="bookings">
            <h2 className="font-bold text-gray-800 mb-4">
              Repair Bookings ({bookings?.length ?? 0})
            </h2>
            {bookingsLoading ? (
              <div
                data-ocid="admin.loading_state"
                className="text-center py-12"
              >
                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
              </div>
            ) : (bookings || []).length === 0 ? (
              <div
                data-ocid="admin.empty_state"
                className="bg-white rounded-xl border p-12 text-center text-gray-400"
              >
                <p>No repair bookings yet</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border overflow-hidden">
                <Table data-ocid="admin.table">
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Device</TableHead>
                      <TableHead>Issue</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(bookings || []).map((b, idx) => (
                      <TableRow
                        key={b.id.toString()}
                        data-ocid={`admin.row.${idx + 1}`}
                      >
                        <TableCell className="font-mono text-sm">
                          #{Number(b.id)}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">
                              {b.customerName}
                            </p>
                            <p className="text-xs text-gray-400">{b.phone}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {b.deviceModel}
                        </TableCell>
                        <TableCell className="text-sm text-gray-500 max-w-xs truncate">
                          {b.issue}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={b.status}
                            onValueChange={(value) =>
                              updateBookingStatus.mutate({
                                id: b.id,
                                status: value,
                              })
                            }
                          >
                            <SelectTrigger
                              data-ocid={`admin.select.${idx + 1}`}
                              className="w-36 h-8 text-xs"
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {BOOKING_STATUSES.map((s) => (
                                <SelectItem key={s} value={s}>
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Product Dialog */}
      <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
        <DialogContent data-ocid="admin.dialog" className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Product Name *</Label>
              <Input
                data-ocid="admin.input"
                placeholder="e.g. iPhone 13 Screen Replacement"
                value={productForm.name}
                onChange={(e) =>
                  setProductForm((p) => ({ ...p, name: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                data-ocid="admin.textarea"
                placeholder="Product description..."
                value={productForm.description}
                onChange={(e) =>
                  setProductForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={2}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Price (₹) *</Label>
                <Input
                  data-ocid="admin.input"
                  type="number"
                  placeholder="e.g. 2999"
                  value={productForm.price}
                  onChange={(e) =>
                    setProductForm((p) => ({ ...p, price: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select
                  value={productForm.category}
                  onValueChange={(v) =>
                    setProductForm((p) => ({ ...p, category: v }))
                  }
                >
                  <SelectTrigger data-ocid="admin.select" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Image URL</Label>
              <Input
                data-ocid="admin.input"
                placeholder="https://example.com/image.jpg"
                value={productForm.imageUrl}
                onChange={(e) =>
                  setProductForm((p) => ({ ...p, imageUrl: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            {editingProduct && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={productForm.inStock}
                  onChange={(e) =>
                    setProductForm((p) => ({ ...p, inStock: e.target.checked }))
                  }
                  className="w-4 h-4 accent-primary"
                />
                <Label htmlFor="inStock">In Stock</Label>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              data-ocid="admin.cancel_button"
              variant="outline"
              onClick={() => setProductDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              data-ocid="admin.save_button"
              onClick={handleSaveProduct}
              disabled={addProduct.isPending || updateProduct.isPending}
              className="flipkart-gradient text-white"
            >
              {addProduct.isPending || updateProduct.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : editingProduct ? (
                "Update Product"
              ) : (
                "Add Product"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
