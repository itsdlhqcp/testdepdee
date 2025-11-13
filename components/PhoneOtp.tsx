"use client";

import { verifyOTP } from "@/serverActions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { OTPInput, SlotProps } from "input-otp";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const phoneOTPSchema = z.object({
  phoneOTP: z
    .string("Please Enter the OTP")
    .min(4, "Verification code must be 4 digits"),
});

export default function PhoneVerifyCard() {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const router = useRouter();

//   useEffect(() => {
//     const localPhone = localStorage.getItem("phone");

//     if (!localPhone) {
//       toast.error("Phone Number not found, redirecting...");
//       setTimeout(() => {
//         router.push("/signup");
//       }, 2000);
//       return;
//     }

//     setPhoneNumber(localPhone);
//   }, [router]);

  const handleNextClick = () => {
    router.push("/signin");
  };

  return (
    <div className="w-fit h-fit bg-white/10 font-fira backdrop-blur-xl rounded-2xl border border-white/30 p-[30px] flex flex-col items-center justify-center gap-[30px]">
      {/* Phone Number OTP Section */}
      {phoneNumber && (
        <PhoneOTP
          phone_number={phoneNumber}
          onVerifySuccess={() => setPhoneVerified(true)}
        />
      )}

      {/* Next Button - Active only after phone verification */}
      <button
        onClick={handleNextClick}
        disabled={!phoneVerified}
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

function PhoneOTP({
  phone_number,
  onVerifySuccess,
}: {
  phone_number: string;
  onVerifySuccess: () => void;
}) {
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