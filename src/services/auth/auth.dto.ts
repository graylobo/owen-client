import { signInSchema } from "@/components/auth/SignInForm";
import { z } from "zod";


export type SignInDto = z.infer<typeof signInSchema>;
