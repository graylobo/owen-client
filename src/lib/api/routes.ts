type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type RouteDefinition = { url: string; method: HTTPMethod };
export type RouteObject = { [key: string]: RouteDefinition | RouteObject };

export const API_ROUTES = {
  auth: {
    signIn: { url: "/authentication/sign-in", method: "POST" },
  },
  users: {
    create: { url: "/users", method: "POST" },
    findAll: { url: "/users", method: "GET" },
    update: { url: "/users", method: "PATCH" },
  },
} as const satisfies RouteObject;
