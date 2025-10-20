import axios from "axios";
import type { Task } from "../types";

export type OrderDto = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  shipping_adress: string;
  status: string;
  order_date: string;
}

const api = axios.create({
  // point directly to backend dev server
  baseURL: "http://localhost:5121/api/orders",
  headers: { "Content-Type": "application/json" },
});

export async function getAllOrders(): Promise<OrderDto[]> {
  const res = await api.get<OrderDto[]>("/");
  return res.data;
}

export async function getOrderById(id: number): Promise<OrderDto> {
  const res = await api.get<OrderDto>(`/${id}`);
  return res.data;
}

export async function createOrder(dto: Partial<OrderDto>) {
  const res = await api.post<OrderDto>("/", toBackendDto(dto));
  return res.data;
}

export async function updateOrder(id: number, dto: Partial<OrderDto>) {
  await api.put(`/${id}`, toBackendDto(dto));
}

function toBackendDto(dto: Partial<OrderDto>) {
  return {
    UserId: dto.userId ?? dto.userId,
    ProductId: dto.productId ?? dto.productId,
    Quantity: dto.quantity ?? dto.quantity,
    Shipping_adress: (dto as any).shipping_adress ?? (dto as any).shipping_adress,
    Status: (dto as any).status ?? (dto as any).status,
    Order_date: dto.order_date ?? dto.order_date,
  }
}

export async function deleteOrder(id: number) {
  await api.delete(`/${id}`);
}

export function orderToTask(order: OrderDto): Task {
  return {
    id: order.id,
    columnId: mapStatusToColumnId(order.status),
    content: `#${order.id} - P:${order.productId} Q:${order.quantity}`,
    region: extractRegionFromAddress(order.shipping_adress) ?? 'Unknown',
    customer: order.userId?.toString(),
    createdAt: order.order_date,
  } as Task;
}

function mapStatusToColumnId(status: string | null | undefined): number | string {
  if (!status) return "Beerkezo";
  const s = status.toLowerCase();
  if (s.includes("beérkez" ) || s.includes("beerkezo") || s.includes("new")) return "Beerkezo";
  if (s.includes("feldolgo" ) || s.includes("processing") ) return "feldolgozas alatt";
  if (s.includes("szallit") || s.includes("ready")) return "szallitasra kesz";
  if (s.includes("kiszallit") || s.includes("delivered") ) return "kiszallitva";
  return "Beerkezo";
}

// try to infer a Hungarian county from the shipping address using a simple keyword list
function extractRegionFromAddress(address?: string | null) {
  if (!address) return undefined
  const counties = [
    'Budapest','Pest','Fejér','Győr-Moson-Sopron','Vas','Veszprém','Veszprem','Zala','Somogy','Tolna','Baranya','Bács-Kiskun','Bács','Békés','Csongrád','Hajdú-Bihar','Jász-Nagykun-Szolnok','Heves','Nógrád','Komárom-Esztergom','Szabolcs-Szatmár-Bereg','Borsod-Abaúj-Zemplén','Pest megye'
  ]
  const lower = address.toLowerCase()
  for (const c of counties) {
    const token = c.toLowerCase()
    if (lower.includes(token)) return c
  }
  return undefined
}
