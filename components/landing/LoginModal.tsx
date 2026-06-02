// components/landing/LoginModal.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

type LoginModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "test@gmail.com",
      password: "password123",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.status) {
        toast.error(result.message || "Login failed");
        return;
      }

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("roleId", result.user?.roleId || "");

      toast.success("Login successful");

      reset();
      onOpenChange(false);

      router.push("/dashboard");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Login failed:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          w-[82vw]
          max-w-[1050px]
          overflow-hidden
          bg-[#080812]
          p-0
          text-white
          shadow-2xl
          sm:max-w-[1150px]
          lg:w-[60vw]
          xl:w-[55vw]
        "
      >
        <div className="min-h-[420px]">
          <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12">
            <div className="w-full max-w-md">
              <DialogHeader className="mb-8">
                <DialogTitle className="text-4xl font-black leading-tight text-white">
                  Login to AnimeStreamer
                </DialogTitle>

                <p className="mt-3 text-base leading-7 text-slate-400">
                  Enter your email and password to access your account.
                </p>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Email Address
                  </label>

                  <div
                    className={`flex h-14 items-center rounded-2xl border px-4 transition ${
                      errors.email
                        ? "border-red-500/70 bg-red-500/10"
                        : "border-white/10 bg-white/10 focus-within:border-fuchsia-500/70"
                    }`}
                  >
                    <Mail className="mr-3 h-5 w-5 text-slate-400" />

                    <Input
                      type="email"
                      placeholder="test@gmail.com"
                      {...register("email")}
                      className="h-full border-0 bg-transparent text-white shadow-none placeholder:text-slate-500 focus-visible:ring-0"
                    />
                  </div>

                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Password
                  </label>

                  <div
                    className={`flex h-14 items-center rounded-2xl border px-4 transition ${
                      errors.password
                        ? "border-red-500/70 bg-red-500/10"
                        : "border-white/10 bg-white/10 focus-within:border-fuchsia-500/70"
                    }`}
                  >
                    <Lock className="mr-3 h-5 w-5 text-slate-400" />

                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="password123"
                      {...register("password")}
                      className="h-full border-0 bg-transparent text-white shadow-none placeholder:text-slate-500 focus-visible:ring-0"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="ml-3 cursor-pointer text-slate-400 transition hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex cursor-pointer items-center gap-2 text-slate-400">
                    <input
                      type="checkbox"
                      className="h-4 w-4 cursor-pointer accent-fuchsia-500"
                    />
                    Remember me
                  </label>

                  <button
                    type="button"
                    className="cursor-pointer font-semibold text-fuchsia-400 transition hover:text-fuchsia-300"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-14 w-full cursor-pointer rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-base font-bold text-white shadow-lg shadow-fuchsia-500/25 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Checking..." : "Login"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}