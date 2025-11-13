"use client";

import { verifyOTP } from "@/serverActions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { OTPInput, SlotProps } from "input-otp";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const emailOTPSchema = z.object({
  emailOTP: z
    .string("Please Enter the OTP")
    .min(4, "Verification code must be 4 digits"),
});

const phoneOTPSchema = z.object({
  phoneOTP: z
    .string("Please Enter the OTP")
    .min(4, "Verification code must be 4 digits"),
});

const usernameSchema = z.object({
  username: z.string().min(4, "Username must be at least 4 characters"),
});

export default function VerifyCard() {
  const [userData, setUserData] = useState({
    email: null as string | null,
    phone: null as string | null,
  });
  const [emailVerified, setEmailVerified] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const localEmail = localStorage.getItem("email");
    const localPhone = localStorage.getItem("phone");

    if (!localEmail || !localPhone) {
      toast.error("Email or PhoneNumber not found, redirecting...");
      setTimeout(() => {
        router.push("/signup");
      }, 2000);
      return;
    }

    setUserData({
      email: localEmail,
      phone: localPhone,
    });
  }, [router]);

  const handleNextClick = () => {
    router.push("/signin");
  };

  return (
    <div className="w-fit h-fit bg-white/10 font-fira backdrop-blur-xl rounded-2xl border border-white/30 p-[30px] flex flex-col items-center justify-center gap-[30px]">
      {/* Email OTP Section */}
      {userData.email && <EmailOTP email={userData.email} onVerifySuccess={() => setEmailVerified(true)} />}
      {/* Phone Number OTP Section */}
      {userData.phone && <PhoneOTP phone_number={userData.phone} />}
      {/* Add Username Section */}
      {/*<Username />*/}
      
      {/* Next Button - Active only after email verification */}
      <button
        onClick={handleNextClick}
        disabled={!emailVerified}
        className="w-[320px] py-3 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-all cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={`w-[48px] h-[56px] flex items-center justify-center text-lg font-medium rounded-md border transition-all duration-150 bg-white/80 text-black
        ${props.isActive ? "border-orange-500 ring-2 ring-orange-500/40" : "border-gray-300"}
      `}
    >
      {props.char ?? ""}
    </div>
  );
}

function EmailOTP({ email, onVerifySuccess }: { email: string; onVerifySuccess: () => void }) {
  type Inputs = z.infer<typeof emailOTPSchema>;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(emailOTPSchema),
    mode: "onSubmit",
  });

  const mutation = useMutation({
    mutationFn: (formData: Inputs) => {
      const data = {
        email: email as string,
        otp: formData.emailOTP,
      };
      return verifyOTP(data);
    },
    onSuccess: (data) => {
      const { success, message } = data;
      if (success) {
        toast.success(message);
        // Trigger callback to enable Next button
        onVerifySuccess();
      } else {
        toast.error(message);
      }
    },
    onError: (error) => {
      toast.error("An error occurred during verification");
      console.error(error);
    },
  });

  const onSubmit = (data: Inputs) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4"
    >
      <h2 className="text-2xl font-semibold text-orange-500">Email OTP</h2>
      <Controller
        control={control}
        name="emailOTP"
        render={({ field: { onChange, value } }) => (
          <OTPInput
            onChange={onChange}
            maxLength={6}
            containerClassName="flex gap-4"
            className="focus-visible:outline-none focus-visible:ring-0"
            render={({ slots }) => (
              <div className="flex gap-4">
                {slots.map((slot, i) => (
                  <Slot key={i} {...slot} />
                ))}
              </div>
            )}
          />
        )}
      />
      {errors.emailOTP?.message && (
        <span className="text-red-600">{errors.emailOTP.message}</span>
      )}
      <button
        type="button"
        disabled={mutation.isPending}
        className="text-sm text-orange-500 hover:underline mt-1 disabled:text-gray-500"
      >
        Resend OTP
      </button>
      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-[320px] py-3 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-all cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed relative overflow-hidden"
      >
        {mutation.isPending ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Verifying...</span>
          </div>
        ) : (
          "Verify"
        )}
      </button>
    </form>
  );
}

function PhoneOTP({ phone_number }: { phone_number: string }) {
  type Inputs = z.infer<typeof phoneOTPSchema>;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(phoneOTPSchema),
    mode: "onSubmit",
  });

  const mutation = useMutation({
    mutationFn: (formData: Inputs) => {
      const data = {
        phone_number: phone_number as string,
        otp: formData.phoneOTP,
      };
      return verifyOTP(data);
    },
    onSuccess: (data) => {
      const { success, message } = data;
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    },
    onError: (error) => {
      toast.error("An error occurred during verification");
      console.error(error);
    },
  });

  const onSubmit = (data: Inputs) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4 mt-4"
    >
      <h2 className="text-2xl font-semibold text-orange-500">
        Phone Number OTP
      </h2>
      <Controller
        control={control}
        name="phoneOTP"
        render={({ field: { onChange, value } }) => (
          <OTPInput
            onChange={onChange}
            maxLength={4}
            containerClassName="flex gap-4"
            className="focus-visible:outline-none focus-visible:ring-0"
            render={({ slots }) => (
              <div className="flex gap-4">
                {slots.map((slot, i) => (
                  <Slot key={i} {...slot} />
                ))}
              </div>
            )}
          />
        )}
      />
      {errors.phoneOTP?.message && (
        <span className="text-red-600">{errors.phoneOTP.message}</span>
      )}
      <button
        type="button"
        disabled={mutation.isPending}
        className="text-sm text-orange-500 hover:underline mt-1 disabled:text-gray-500"
      >
        Resend OTP
      </button>
      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-[320px] py-3 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-all cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed relative overflow-hidden"
      >
        {mutation.isPending ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Verifying...</span>
          </div>
        ) : (
          "Verify"
        )}
      </button>
    </form>
  );
}

function Username() {
  type Inputs = z.infer<typeof usernameSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(usernameSchema),
    mode: "onSubmit",
  });

  const onSubmit = (data: Inputs) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-3 mt-4 w-full"
    >
      <h2 className="text-2xl font-semibold text-orange-500">Add Username</h2>
      <p className="text-sm text-gray-600 text-center">
        You can use this for login either than using
      </p>
      <input
        {...register("username")}
        type="text"
        placeholder="Email / Phone-number"
        className="w-[80%] px-4 py-3 rounded-md border border-white/30 bg-white text-black placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      {errors.username?.message && (
        <span className="text-red-600">{errors.username.message}</span>
      )}
      <div className="flex gap-4 mt-2">
        <button
          type="submit"
          className="px-6 py-2 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-all"
        >
          Save
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-white/20 text-white font-medium rounded-md hover:bg-white/30 transition-all"
        >
          Skip
        </button>
      </div>
    </form>
  );
}