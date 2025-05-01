import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/services/user/user.service";
import { CreateUserDto } from "@/services/user/user.dto";
export function useCreateUser() {
    return useMutation({
      mutationFn: (dto: CreateUserDto) => createUser(dto),
      
    });
  }
  