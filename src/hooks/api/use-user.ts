import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createUser,
  findAllUsers,
  updateUserStatus,
} from "@/services/user/user.service";
import { CreateUserDto, User } from "@/services/user/user.dto";

export function useCreateUser() {
  return useMutation({
    mutationFn: (dto: CreateUserDto) => createUser(dto),
  });
}

export function useGetAllUsers<T = User[]>() {
  return useQuery<T>({
    queryKey: ["users"],
    queryFn: findAllUsers,
  });
}

export function useUpdateUserStatus() {
  return useMutation({
    mutationFn: ({
      userEmail,
      status,
    }: {
      userEmail: string;
      status: string;
    }) => updateUserStatus(userEmail, status),
  });
}
