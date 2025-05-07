import { SignInDto } from "@/services/auth/auth.dto";
import { signIn } from "@/services/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from '@/store/useUserStore';

export function useSignIn() {
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: (dto: SignInDto) => signIn(dto),
    onSuccess: (data) => {
      setUser(data.user);
    },
  });
}

  