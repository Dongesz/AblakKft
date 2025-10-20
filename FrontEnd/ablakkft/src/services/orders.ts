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

const BASE = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:5121/api/orders";
const API_KEY = import.meta.env.VITE_API_KEY ?? "72709624631";

const api = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json", "X-API-KEY": API_KEY },
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
  // Only include properties that are defined on the incoming dto
  const out: any = {};
  if (dto.userId !== undefined) out.UserId = dto.userId;
  if (dto.productId !== undefined) out.ProductId = dto.productId;
  if (dto.quantity !== undefined) out.Quantity = dto.quantity;
  if ((dto as any).shipping_adress !== undefined) out.Shipping_adress = (dto as any).shipping_adress;
  if ((dto as any).status !== undefined) out.Status = (dto as any).status;
  if (dto.order_date !== undefined) out.Order_date = dto.order_date;
  return out;
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
    createdAt: (order.order_date) ? new Date(order.order_date).toISOString() : new Date().toISOString(),
  } as Task;
}

function mapStatusToColumnId(status: string | null | undefined): number | string {
  if (!status) return "Beerkezo";
  const s = status.toLowerCase();
  if (s.includes("beérkez") || s.includes("beerkezo") || s.includes("new") || s === 'new') return "Beerkezo";
  // check more specific "kiszallit" before the more generic "szallit" to avoid false matches
  if (s.includes("kiszallit") || s.includes("delivered") || s === 'delivered') return "kiszallitva";
  if (s.includes("feldolgo") || s.includes("processing") || s === 'in_progress' || s === 'in-progress' || s === 'in_progress') return "feldolgozas alatt";
  if (s.includes("szallit") || s.includes("ready") || s === 'ready') return "szallitasra kesz";
  return "Beerkezo";
}

// try to infer a Hungarian county from the shipping address using a simple keyword list
function extractRegionFromAddress(address?: string | null) {
  if (!address) return undefined
  const counties = [
    'Budapest',
    'Bács-Kiskun',
    'Baranya',
    'Békés',
    'Borsod-Abaúj-Zemplén',
    'Csongrád-Csanád',
    'Fejér',
    'Győr-Moson-Sopron',
    'Hajdú-Bihar',
    'Heves',
    'Jász-Nagykun-Szolnok',
    'Komárom-Esztergom',
    'Nógrád',
    'Pest',
    'Somogy',
    'Szabolcs-Szatmár-Bereg',
    'Tolna',
    'Vas',
    'Veszprém',
    'Zala'
  ]
  const lower = address.toLowerCase()
  for (const c of counties) {
    const token = c.toLowerCase()
    if (lower.includes(token)) return c
  }
  return undefined
}
