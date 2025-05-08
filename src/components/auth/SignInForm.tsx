"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { useSignIn } from "@/hooks/api/use-auth";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("유효한 이메일을 입력해주세요."),
  password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다."),
});

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { mutate, isPending, isSuccess, isError } = useSignIn();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = signInSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    mutate(form);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("로그인 되었습니다.");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
    if (isError) {
      toast.error("로그인에 실패했습니다. 이메일 또는 비밀번호를 확인하세요.");
    }
  }, [isSuccess, isError, router]);

  return (
    <>
      <div className="flex flex-col flex-1 lg:w-1/2 w-full">
        <div className="w-full max-w-md sm:pt-10 mx-auto mb-5"></div>
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
          <div>
            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                OWEN FOOD LOGIN
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                계정 정보를 입력 해주세요!
              </p>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <Label>
                      Email <span className="text-error-500">*</span>{" "}
                    </Label>
                    <Input
                      placeholder="info@gmail.com"
                      type="email"
                      name="email"
                      defaultValue={form.email}
                      onChange={handleChange}
                      disabled={isPending || isSuccess}
                    />
                    {errors.email && (
                      <div className="text-error-500 text-xs mt-1">
                        {errors.email}
                      </div>
                    )}
                  </div>
                  <div>
                    <Label>
                      Password <span className="text-error-500">*</span>{" "}
                    </Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        name="password"
                        defaultValue={form.password}
                        onChange={handleChange}
                        disabled={isPending || isSuccess}
                      />
                      {errors.password && (
                        <div className="text-error-500 text-xs mt-1">
                          {errors.password}
                        </div>
                      )}
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      >
                        {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                        ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                        )}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Button
                      className="w-full"
                      size="sm"
                      disabled={isPending || isSuccess}
                    >
                      {isPending ? "로그인 중..." : "로그인"}
                    </Button>
                  </div>
                </div>
              </form>
              <div className="mt-5">
                <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                  <Link
                    href="/signup"
                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    관리자 계정 생성 요청
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
