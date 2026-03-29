import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { backendInterface as FullBackend } from "../backend.d";
import type { Order, OrderItem, Product, RepairBooking } from "../backend.d";
import { useActor } from "./useActor";

function getTypedActor(actor: unknown): FullBackend | null {
  return (actor as FullBackend) ?? null;
}

export function useProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const a = getTypedActor(actor);
      if (!a) return [];
      return a.getProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProductsByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: async () => {
      const a = getTypedActor(actor);
      if (!a) return [];
      if (category === "All") return a.getProducts();
      return a.getProductsByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePlaceOrder() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      customerName,
      phone,
      address,
      items,
      total,
    }: {
      customerName: string;
      phone: string;
      address: string;
      items: OrderItem[];
      total: bigint;
    }) => {
      const a = getTypedActor(actor);
      if (!a) throw new Error("Not connected");
      return a.placeOrder(customerName, phone, address, items, total);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}

export function useSubmitRepairBooking() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      customerName,
      phone,
      deviceModel,
      issue,
    }: {
      customerName: string;
      phone: string;
      deviceModel: string;
      issue: string;
    }) => {
      const a = getTypedActor(actor);
      if (!a) throw new Error("Not connected");
      return a.submitRepairBooking(customerName, phone, deviceModel, issue);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["repair-bookings"] }),
  });
}

export function useOrders() {
  const { actor, isFetching } = useActor();
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const a = getTypedActor(actor);
      if (!a) return [];
      return a.getOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRepairBookings() {
  const { actor, isFetching } = useActor();
  return useQuery<RepairBooking[]>({
    queryKey: ["repair-bookings"],
    queryFn: async () => {
      const a = getTypedActor(actor);
      if (!a) return [];
      return a.getRepairBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: bigint; status: string }) => {
      const a = getTypedActor(actor);
      if (!a) throw new Error("Not connected");
      return a.updateOrderStatus(id, status);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}

export function useUpdateBookingStatus() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: bigint; status: string }) => {
      const a = getTypedActor(actor);
      if (!a) throw new Error("Not connected");
      return a.updateBookingStatus(id, status);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["repair-bookings"] }),
  });
}

export function useAddProduct() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      description,
      price,
      category,
      imageUrl,
    }: {
      name: string;
      description: string;
      price: bigint;
      category: string;
      imageUrl: string;
    }) => {
      const a = getTypedActor(actor);
      if (!a) throw new Error("Not connected");
      return a.addProduct(name, description, price, category, imageUrl);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      name,
      description,
      price,
      category,
      imageUrl,
      inStock,
    }: {
      id: bigint;
      name: string;
      description: string;
      price: bigint;
      category: string;
      imageUrl: string;
      inStock: boolean;
    }) => {
      const a = getTypedActor(actor);
      if (!a) throw new Error("Not connected");
      return a.updateProduct(
        id,
        name,
        description,
        price,
        category,
        imageUrl,
        inStock,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      const a = getTypedActor(actor);
      if (!a) throw new Error("Not connected");
      return a.deleteProduct(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}
