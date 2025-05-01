import { api } from "@/lib/api/axios";
import { API_ROUTES } from "../../lib/api/routes";
import { CreateUserDto } from "./user.dto";

export async function createUser(dto: CreateUserDto) {
  const { data } = await api.post(API_ROUTES.user.create.url, dto);
  return data;
}
