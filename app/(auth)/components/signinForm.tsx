"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { loginUser } from "@/serverActions/auth";
import { setCookie } from "@/serverActions/cookies";

const signinSchema = z.object({
login: z.string().email("Invalid email address"),
password: z.string().min(8, "Password must be at least 8 characters"),
});

export type Inputs = z.infer<typeof signinSchema>;

export function SignInForm() {
const router = useRouter();
const [progress, setProgress] = useState(0);

const {
register,
handleSubmit,
formState: { errors },
} = useForm<Inputs>({
resolver: zodResolver(signinSchema),
mode: "onChange",
});

const mutation = useMutation({
mutationFn: async (formData: Inputs) => loginUser(formData),
onSuccess: async (response) => {
  if (response.success) {
    toast.success(response.data?.message || "Login successful");
    const token = response.data?.data?.access_token;
    const isFirstLogin = response.data?.data?.is_first_login;
    console.log("is first user",response)
    
    if (token) {
      await setCookie(token);
      
      // Route based on is_first_login status
      if (isFirstLogin === true) {
        router.push("/addusername");
      } else {
        router.push("/home");
      }
    }
  } else {
    toast.error(response.message || "Invalid credentials");
  }
},
onError: () => {
  setProgress(0);
  toast.error("An unexpected error occurred. Please try again.");
},
});

const onSubmit = (data: Inputs) => {
mutation.mutate(data);
};

return (
<motion.form
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
  onSubmit={handleSubmit(onSubmit)}
  className="w-fit h-fit bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 p-[30px] flex flex-col justify-center items-center gap-[26px] transition-all"
>
  <div>
    <h2 className="text-brand font-inter font-semibold text-3xl center-div">
      Trippldee
    </h2>
    <span className="text-black font-inter font-normal text-[20px] center-div">
      Welcome to Trippldee, please login to your account.
    </span>
  </div>

  {/* Toggle */}
  <div className="w-full h-[60px] flex items-center justify-center bg-[#fff3e5] rounded-full p-2 transition-all">
    <Link
      href="/signup"
      className="flex-1 text-black font-medium px-6 py-2 text-center hover:bg-white/40 rounded-full transition"
    >
      Sign Up
    </Link>
    <button
      type="button"
      className="bg-white flex-1 text-[#fd5f08] font-medium rounded-full h-full shadow-sm"
    >
      Login
    </button>
  </div>

  {/* Email */}
  <div className="w-full flex flex-col gap-[10px]">
    <label className="font-fira text-[16px] font-medium">Email Address</label>
    <input
      {...register("login")}
      type="email"
      placeholder="Enter your email"
      className="w-full bg-[#fff3e5] h-[50px] text-black rounded-xl border border-[#c7b8a2] px-4 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fd5f08]/30"
    />
    {errors.login && (
      <span className="text-red-600 text-sm">{errors.login.message}</span>
    )}
  </div>

  {/* Password */}
  <div className="w-full flex flex-col gap-[10px]">
    <label className="font-fira text-[16px] font-medium">Password</label>
    <input
      {...register("password")}
      type="password"
      placeholder="Enter your Password"
      className="w-full bg-[#fff3e5] h-[50px] text-black rounded-xl border border-[#c7b8a2] px-4 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fd5f08]/30"
    />
    {errors.password && (
      <span className="text-red-600 text-sm">{errors.password.message}</span>
    )}
  </div>

  <Link className="text-brand hover:underline" href="/forgot">
    Forgot Password?
  </Link>

  <button
    disabled={mutation.isPending}
    type="submit"
    className="w-full rounded-[12px] h-[50px] bg-brand text-white font-medium transition-all duration-200 hover:bg-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
  >
    {mutation.isPending && (
      <svg
        className="w-5 h-5 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    )}
    <span>
      {mutation.isPending ? "Signing in..." : "Sign in"}
    </span>
  </button>

  <h4 className="font-inter font-normal text-[20px]">
    {"Don't have an account? "}
    <Link className="text-brand hover:underline" href="/signup">
      Create one
    </Link>
  </h4>
</motion.form>
);
}