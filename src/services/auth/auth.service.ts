'use server'

import { api } from "@/lib/api/axios";
import { API_ROUTES } from "@/lib/api/routes";
import { SignInDto } from "@/services/auth/auth.dto";


export async function signIn(dto: SignInDto) {
  const { data } = await api.post(API_ROUTES.auth.signIn.url, dto);
  return data;
}


