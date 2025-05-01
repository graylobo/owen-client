import { SignInDto } from "@/services/auth/auth.dto";
import { signIn } from "@/services/auth/auth.service";
import { useMutation } from "@tanstack/react-query";

 
 export function useSignIn() {
    return useMutation({
      mutationFn: (dto: SignInDto) => signIn(dto),
    });
  }

  