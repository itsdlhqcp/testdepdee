// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import { z } from "zod";
// // import { sendPasswordResetLink } from "@/serverActions/auth";
// import { motion } from "framer-motion";
// import Link from "next/link";

// const forgotPasswordSchema = z.object({
//   email: z.string().email("Invalid email address"),
// });

// type Inputs = z.infer<typeof forgotPasswordSchema>;

// export default function ForgotPasswordCard() {
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Inputs>({
//     resolver: zodResolver(forgotPasswordSchema),
//     mode: "onSubmit",
//   });

//   // const mutation = useMutation({
//   //   mutationFn: async (formData: Inputs) => {
//   //     return await sendPasswordResetLink(formData.email);
//   //   },
//   //   onSuccess: (data: any) => {
//   //     if (data.success) {
//   //       toast.success(data.message || "Password reset link sent to your email!");
        
//   //       // Store email for verification page if needed
//   //       localStorage.setItem("reset_email", data.email || "");
        
//   //       setTimeout(() => {
//   //         router.push("/signin");
//   //       }, 2000);
//   //     } else {
//   //       toast.error(data.message || "Failed to send reset link");
        
//   //       // If there are specific field errors, show them
//   //       if (data.errors) {
//   //         Object.values(data.errors).forEach((val: any) =>
//   //           toast.error(val)
//   //         );
//   //       }
//   //     }
//   //   },
//   //   onError: (error: any) => {
//   //     toast.error(error.message || "An error occurred while sending reset link");
//   //     console.error(error);
//   //   },
//   // });

//   const onSubmit = (data: Inputs) => {
//     mutation.mutate(data);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 15 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, ease: "easeOut" }}
//       className="w-fit h-fit bg-white/10 font-fira backdrop-blur-xl rounded-2xl border border-white/30 p-[30px] flex flex-col items-center justify-center gap-[30px]"
//     >
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="flex flex-col items-center gap-4 w-full"
//       >
//         <div className="text-center">
//           <h2 className="text-brand font-inter font-semibold text-3xl mb-2">
//           Trippldee
//           </h2>
//           <p className="text-sm text-black/80 max-w-[320px]">
//             Enter your email address and we'll send you a link to reset your password
//           </p>
//         </div>

//         <div className="flex flex-col gap-2 w-full">
//           <label className="font-fira text-[16px] font-medium">Email Address</label>
//           <input
//             {...register("email")}
//             type="email"
//             placeholder="Enter your email"
//             className="w-[320px] bg-[#fff3e5] h-[50px] text-black rounded-xl border border-[#c7b8a2] px-4 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fd5f08]/30"
//           />

//           {errors.email?.message && (
//             <span className="text-red-500 text-sm">{errors.email.message}</span>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={mutation.isPending}
//           className="w-full h-[50px] bg-brand text-white font-medium rounded-xl hover:bg-orange-500 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//         >
//           {mutation.isPending ? (
//             <>
//               <svg
//                 className="w-5 h-5 animate-spin"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 />
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 />
//               </svg>
//               <span>Sending Link...</span>
//             </>
//           ) : (
//             "Get the Link"
//           )}
//         </button>
//       </form>

//       <div className="text-center">
//         <p className="text-sm text-black/80">
//           Remember your password?{" "}
//           <Link href="/signin" className="text-brand hover:underline font-medium">
//             Back to Login
//           </Link>
//         </p>
//       </div>

//       <p className="text-xs text-black/60 text-center max-w-[320px]">
//         Check your spam folder if you don't receive the email within a few minutes
//       </p>
//     </motion.div>
//   );
// }



// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import { z } from "zod";
// import { motion } from "framer-motion";
// import Link from "next/link";

// const forgotPasswordSchema = z.object({
//   email: z.string().email("Invalid email address"),
// });

// type Inputs = z.infer<typeof forgotPasswordSchema>;

// export default function ForgotPasswordCard() {
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Inputs>({
//     resolver: zodResolver(forgotPasswordSchema),
//     mode: "onSubmit",
//   });

//   const onSubmit = (data: Inputs) => {
//     toast.success("Password reset link sent to your email!");
//     setTimeout(() => {
//       router.push("/signin");
//     }, 2000);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 15 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, ease: "easeOut" }}
//       className="w-fit h-fit bg-white/10 font-fira backdrop-blur-xl rounded-2xl border border-white/30 p-[30px] flex flex-col items-center justify-center gap-[30px]"
//     >
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="flex flex-col items-center gap-4 w-full"
//       >
//         <div className="text-center">
//           <h2 className="text-brand font-inter font-semibold text-3xl mb-2">
//             Trippldee
//           </h2>
//           <p className="text-sm text-black/80 max-w-[320px]">
//             Enter your email address and we ll send you a link to reset your password
//           </p>
//         </div>

//         <div className="flex flex-col gap-2 w-full">
//           <label className="font-fira text-[16px] font-medium">Email Address</label>
//           <input
//             {...register("email")}
//             type="email"
//             placeholder="Enter your email"
//             className="w-[320px] bg-[#fff3e5] h-[50px] text-black rounded-xl border border-[#c7b8a2] px-4 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fd5f08]/30"
//           />

//           {errors.email?.message && (
//             <span className="text-red-500 text-sm">{errors.email.message}</span>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="w-full h-[50px] bg-brand text-white font-medium rounded-xl hover:bg-orange-500 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//         >
//           Get the Link
//         </button>
//       </form>

//       <div className="text-center">
//         <p className="text-sm text-black/80">
//           Remember your password?{" "}
//           <Link href="/signin" className="text-brand hover:underline font-medium">
//             Back to Login
//           </Link>
//         </p>
//       </div>

//       <p className="text-xs text-black/60 text-center max-w-[320px]">
//         Check your spam folder if you don t receive the email within a few minutes
//       </p>
//     </motion.div>
//   );
// }



"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { sendPasswordResetLink } from "@/serverActions/auth";


const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type Inputs = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordCard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: Inputs) => {
    setIsLoading(true);
    
    try {
      const result = await sendPasswordResetLink(data.email);
      
      if (result.success) {
        toast.success(result.message || "Password reset link sent to your email!");
        setTimeout(() => {
          router.push("/signin");
        }, 2000);
      } else {
        toast.error(result.message || "Failed to send reset link");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Forgot password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-fit h-fit bg-white/10 font-fira backdrop-blur-xl rounded-2xl border border-white/30 p-[30px] flex flex-col items-center justify-center gap-[30px]"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4 w-full"
      >
        <div className="text-center">
          <h2 className="text-brand font-inter font-semibold text-3xl mb-2">
            Trippldee
          </h2>
          <p className="text-sm text-black/80 max-w-[320px]">
            Enter your email address and well send you a link to reset your password
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="font-fira text-[16px] font-medium">Email Address</label>
          <input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            disabled={isLoading}
            className="w-[320px] bg-[#fff3e5] h-[50px] text-black rounded-xl border border-[#c7b8a2] px-4 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fd5f08]/30 disabled:opacity-50 disabled:cursor-not-allowed"
          />

          {errors.email?.message && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-[50px] bg-brand text-white font-medium rounded-xl hover:bg-orange-500 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? "Sending..." : "Get the Link"}
        </button>
      </form>

      <div className="text-center">
        <p className="text-sm text-black/80">
          Remember your password?{" "}
          <Link href="/signin" className="text-brand hover:underline font-medium">
            Back to Login
          </Link>
        </p>
      </div>

      <p className="text-xs text-black/60 text-center max-w-[320px]">
        Check your spam folder if you dont receive the email within a few minutes
      </p>
    </motion.div>
  );
}