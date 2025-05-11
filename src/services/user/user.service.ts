"use server";
import { api } from "@/lib/api/axios";
import { API_ROUTES } from "../../lib/api/routes";
import { CreateUserDto } from "./user.dto";

export async function createUser(dto: CreateUserDto) {
  const { data } = await api.post(API_ROUTES.users.create.url, dto);
  return data;
}

export async function findAllUsers() {
  const { data } = await api.get(API_ROUTES.users.findAll.url);
  return data;
}

export async function updateUserStatus(userId: string, status: string) {
  const { data } = await api.patch(
    `${API_ROUTES.users.update.url}/${userId}/status`,
    { status }
  );
  return data;
}
