"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { useCreateUser } from "@/hooks/api/use-user";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

const signUpSchema = z.object({
  fname: z.string().min(2, "이름은 2자 이상 입력해주세요.").max(10, "이름은 10자 이하로 입력해주세요."),
  email: z.string().email("유효한 이메일을 입력해주세요."),
  password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다."),
});

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fname: "",
    email: "",
    password: "",
  });
  const { mutate, isPending, isSuccess, isError } = useCreateUser();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = signUpSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    mutate({
      name: form.fname,
      email: form.email,
      password: form.password,
      type: 'staff',
      status: 'pending',
    });
  };
  
  useEffect(() => {
    if (isSuccess) {
      toast.success("회원가입 요청이 성공적으로 완료되었습니다! 관리자 승인 후 로그인 가능합니다.");
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    }
  }, [isSuccess, router]);

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
          <div>
            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                Sign Up
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                관리자 계정 정보를 입력해주세요. 
                <br/>계정 승인 이후 로그인이 가능합니다.
              </p>
            </div>
            <div>
             
              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* <!-- Name --> */}
                    <div className="sm:col-span-1">
                      <Label>
                        Name<span className="text-error-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="fname"
                        name="fname"
                        placeholder="Enter your name"
                        defaultValue={form.fname}
                        onChange={handleChange}
                      />
                      {errors.fname && <div className="text-error-500 text-xs mt-1">{errors.fname}</div>}
                    </div>
                   
                  </div>
                  {/* <!-- Email --> */}
                  <div>
                    <Label>
                      Email<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      defaultValue={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className="text-error-500 text-xs mt-1">{errors.email}</div>}
                  </div>
                  {/* <!-- Password --> */}
                  <div>
                    <Label>
                      Password<span className="text-error-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        defaultValue={form.password}
                        onChange={handleChange}
                      />
                      {errors.password && <div className="text-error-500 text-xs mt-1">{errors.password}</div>}
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
                  {/* <!-- Button --> */}
                  <div>
                    <button
                      className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                      disabled={isPending}
                    >
                      {isPending ? "요청 중..." : "관리자 계정 생성 요청"}
                    </button>
                  </div>
                  {isError && (
                    <div className="text-error-500 text-sm">관리자 가입 요청 중 오류가 발생했습니다.</div>
                  )}
                </div>
              </form>

              <div className="mt-5">
                <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                  이미 계정이 있으신가요? 
                  <Link
                    href="/signin"
                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    로그인
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
