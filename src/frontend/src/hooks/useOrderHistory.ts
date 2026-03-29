import { useState } from "react";

const STORAGE_KEY = "jau_guru_orders";

export interface StoredOrder {
  id: number;
  date: string;
  customerName: string;
  phone: string;
  address: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: string;
}

function getOrders(): StoredOrder[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredOrder[];
    return parsed.slice().reverse();
  } catch {
    return [];
  }
}

function clearOrders() {
  localStorage.removeItem(STORAGE_KEY);
}

export function useOrderHistory() {
  const [orders, setOrders] = useState<StoredOrder[]>(() => getOrders());

  function saveOrder(order: StoredOrder) {
    const existing = getOrders().slice().reverse(); // get in original insert order
    existing.push(order);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    setOrders(getOrders()); // re-read reversed for display
  }

  return { orders, saveOrder, clearOrders };
}
