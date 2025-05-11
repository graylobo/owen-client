export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  type: "staff";
  status: "pending";
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: "staff" | "administrator" | "platform_owner";
  status: "active" | "inactive" | "pending";
  createdAt?: string;
  updatedAt?: string;
}
