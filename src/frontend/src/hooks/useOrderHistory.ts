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

function saveOrder(order: StoredOrder) {
  const existing = getOrders();
  existing.push(order);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
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
  return { orders: getOrders(), saveOrder, clearOrders };
}
