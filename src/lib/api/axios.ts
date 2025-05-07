"use server";
import axios from "axios";
import { cookies } from "next/headers";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  config.withCredentials = true;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(
    "request path:::",
    `${config.method?.toUpperCase()} ${config.baseURL}${config.url}`
  );
  return config;
});

api.interceptors.response.use(
  async (response) => {
    if (response.headers["set-cookie"]) {
      const cookieStore = await cookies();
      const setCookieHeader = response.headers["set-cookie"];
      const tokenMatch = setCookieHeader.find((cookie) =>
        cookie.startsWith("accessToken="),
      );
      if (tokenMatch) {
        const token = tokenMatch.split(";")[0].split("=")[1];
        cookieStore.set("accessToken", token, {
          httpOnly: true,
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        });
      }
    }
    return response;
  },
  (error) => {
    console.error(
      "error request path:::",
      `${error.request.method} ${error.config.baseURL}${error.request.path}`
    );
    return Promise.reject(error.response?.data.errorCode);
  }
);

export { api };
