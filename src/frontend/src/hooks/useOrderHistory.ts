import { useEffect, useState } from "react";

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

function readOrders(): StoredOrder[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredOrder[];
    // Return newest first
    return parsed.slice().reverse();
  } catch {
    return [];
  }
}

export function useOrderHistory() {
  const [orders, setOrders] = useState<StoredOrder[]>([]);

  // Always refresh from localStorage when hook mounts
  useEffect(() => {
    setOrders(readOrders());
  }, []);

  function saveOrder(order: StoredOrder) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const existing: StoredOrder[] = raw
        ? (JSON.parse(raw) as StoredOrder[])
        : [];
      existing.push(order);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      setOrders(readOrders());
    } catch {
      // localStorage unavailable — silently skip
    }
  }

  function clearOrders() {
    localStorage.removeItem(STORAGE_KEY);
    setOrders([]);
  }

  return { orders, saveOrder, clearOrders };
}
