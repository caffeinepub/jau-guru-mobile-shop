import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;

export interface Product {
    id: bigint;
    name: string;
    description: string;
    price: bigint;
    category: string;
    imageUrl: string;
    inStock: boolean;
    rating: bigint;
}

export interface OrderItem {
    productId: bigint;
    name: string;
    quantity: bigint;
    price: bigint;
}

export interface Order {
    id: bigint;
    customerName: string;
    phone: string;
    address: string;
    items: OrderItem[];
    total: bigint;
    status: string;
}

export interface RepairBooking {
    id: bigint;
    customerName: string;
    phone: string;
    deviceModel: string;
    issue: string;
    status: string;
}

export type UserRole = { admin: null } | { user: null } | { guest: null };

export interface backendInterface {
    _initializeAccessControlWithSecret(userSecret: string): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    isCallerAdmin(): Promise<boolean>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;

    getProducts(): Promise<Product[]>;
    getProductsByCategory(category: string): Promise<Product[]>;
    getProduct(id: bigint): Promise<Option<Product>>;
    addProduct(name: string, description: string, price: bigint, category: string, imageUrl: string): Promise<bigint>;
    updateProduct(id: bigint, name: string, description: string, price: bigint, category: string, imageUrl: string, inStock: boolean): Promise<boolean>;
    deleteProduct(id: bigint): Promise<boolean>;

    placeOrder(customerName: string, phone: string, address: string, items: OrderItem[], total: bigint): Promise<bigint>;
    getOrders(): Promise<Order[]>;
    updateOrderStatus(id: bigint, status: string): Promise<boolean>;

    submitRepairBooking(customerName: string, phone: string, deviceModel: string, issue: string): Promise<bigint>;
    getRepairBookings(): Promise<RepairBooking[]>;
    updateBookingStatus(id: bigint, status: string): Promise<boolean>;
}
