type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type RouteDefinition = { url: string; method: HTTPMethod };
export type RouteObject = { [key: string]: RouteDefinition | RouteObject };

export const API_ROUTES = {
  
  users: {
    create: { url: "/users", method: "POST" },
  },
 
} as const satisfies RouteObject;

