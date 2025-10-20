import axios from "axios";

export type UserDto = {
  id: number;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
}

const API_ROOT = import.meta.env.VITE_API_BASE_URL ? (import.meta.env.VITE_API_BASE_URL as string).replace(/\/orders\/?$/i, '') : "http://127.0.0.1:5121/api";
const API_KEY = import.meta.env.VITE_API_KEY ?? "72709624631";

const api = axios.create({
  baseURL: `${API_ROOT}/users`,
  headers: { "Content-Type": "application/json", "X-API-KEY": API_KEY },
});

export async function getUserById(id: number): Promise<UserDto> {
  const res = await api.get<UserDto>(`/${id}`);
  return res.data;
}
