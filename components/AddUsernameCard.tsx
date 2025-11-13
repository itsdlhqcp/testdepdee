// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import { z } from "zod";

// const usernameSchema = z.object({
//   username: z.string().min(4, "Username must be at least 4 characters"),
// });

// type Inputs = z.infer<typeof usernameSchema>;

// export default function AddUsernameCard() {
//   const [userEmail, setUserEmail] = useState<string | null>(null);
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Inputs>({
//     resolver: zodResolver(usernameSchema),
//     mode: "onSubmit",
//   });

//   useEffect(() => {
//     const localEmail = localStorage.getItem("email");

//     if (!localEmail) {
//       toast.error("Session not found, redirecting...");
//       setTimeout(() => {
//         router.push("/signup");
//       }, 2000);
//       return;
//     }

//     setUserEmail(localEmail);
//   }, [router]);

//   const mutation = useMutation({
//     mutationFn: async (formData: Inputs) => {
//       // Replace this with your actual API call
//       // Example: return axios.post("/api/add-username", { username: formData.username, email: userEmail });
      
//       // Simulated API call
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           resolve({ success: true, message: "Username added successfully" });
//         }, 1000);
//       });
//     },
//     onSuccess: (data: any) => {
//       const { success, message } = data;
//       if (success) {
//         toast.success(message);
//         localStorage.setItem("username", data.username);
//         setTimeout(() => {
//           router.push("/signin");
//         }, 1500);
//       } else {
//         toast.error(message);
//       }
//     },
//     onError: (error) => {
//       toast.error("An error occurred while saving username");
//       console.error(error);
//     },
//   });

//   const onSubmit = (data: Inputs) => {
//     mutation.mutate(data);
//   };

//   const handleSkip = () => {
//     toast.success("Username setup skipped");
//     router.push("/signin");
//   };

//   return (
//     <div className="w-fit h-fit bg-white/10 font-fira backdrop-blur-xl rounded-2xl border border-white/30 p-[30px] flex flex-col items-center justify-center gap-[30px]">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="flex flex-col items-center gap-4 w-full"
//       >
//         <h2 className="text-2xl font-semibold text-orange-500">Add Username</h2>
//         <p className="text-sm text-white/80 text-center max-w-[320px]">
//           Create a unique username for easy login instead of using email or phone number
//         </p>
        
//         <input
//           {...register("username")}
//           type="text"
//           placeholder="Enter username"
//           className="w-[320px] px-4 py-3 rounded-md border border-white/30 bg-white/80 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
//         />
        
//         {errors.username?.message && (
//           <span className="text-red-500 text-sm">{errors.username.message}</span>
//         )}
        
//         <div className="flex gap-4 mt-2 w-full">
//           <button
//             type="submit"
//             disabled={mutation.isPending}
//             className="flex-1 py-3 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-all cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
//           >
//             {mutation.isPending ? (
//               <div className="flex items-center justify-center gap-2">
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 <span>Saving...</span>
//               </div>
//             ) : (
//               "Save"
//             )}
//           </button>
          
//           <button
//             type="button"
//             onClick={handleSkip}
//             disabled={mutation.isPending}
//             className="flex-1 py-3 bg-white/20 text-white font-medium rounded-md hover:bg-white/30 transition-all cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
//           >
//             Skip
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }



// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import { z } from "zod";
// import { setUsername } from "@/serverActions/auth";
// import { motion } from "framer-motion";

// const usernameSchema = z.object({
//   username: z
//     .string()
//     .min(4, "Username must be at least 4 characters")
//     .max(20, "Username must be less than 20 characters")
//     .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
// });

// type Inputs = z.infer<typeof usernameSchema>;

// export default function AddUsernameCard() {
//   const [userEmail, setUserEmail] = useState<string | null>(null);
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Inputs>({
//     resolver: zodResolver(usernameSchema),
//     mode: "onSubmit",
//   });

//   // useEffect(() => {
//   //   const localEmail = localStorage.getItem("email");

//   //   if (!localEmail) {
//   //     toast.error("Session not found, redirecting...");
//   //     setTimeout(() => {
//   //       router.push("/signup");
//   //     }, 2000);
//   //     return;
//   //   }

//   //   setUserEmail(localEmail);
//   // }, [router]);

//   // const mutation = useMutation({
//   //   mutationFn: async (formData: Inputs) => {
//   //     return await setUsername(formData.username);
//   //   },
//   //   onSuccess: (data: any) => {
//   //     if (data.success) {
//   //       toast.success(data.data.message || "Username added successfully!");
        
//   //       // Store the username from the response
//   //       if (data.username) {
//   //         localStorage.setItem("username", data.username);
//   //       }
        
//   //       // Clear temporary email/phone storage
//   //       localStorage.removeItem("email");
//   //       localStorage.removeItem("phone");
        
//   //       setTimeout(() => {
//   //         router.push("/signin");
//   //       }, 1500);
//   //     } else {
//   //       toast.error(data.message || "Failed to set username");
        
//   //       // If there are specific field errors, show them
//   //       if (data.errors) {
//   //         Object.values(data.errors).forEach((val: any) =>
//   //           toast.error(val)
//   //         );
//   //       }
//   //     }
//   //   },
//   //   onError: (error: any) => {
//   //     toast.error(error.message || "An error occurred while saving username");
//   //     console.error(error);
//   //   },
//   // });

//   const onSubmit = (data: Inputs) => {
//     mutation.mutate(data);
//   };

//   const handleSkip = () => {
//     // Clear temporary storage
//     localStorage.removeItem("email");
//     localStorage.removeItem("phone");
    
//     toast.success("Username setup skipped");
//     setTimeout(() => {
//       router.push("/home");
//     }, 1000);
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
//             Add Username
//           </h2>
//           <p className="text-sm text-black/80 max-w-[320px]">
//             Create a unique username for easy login instead of using email or phone number
//           </p>
//         </div>

//         {userEmail && (
//           <div className="text-xs text-black/60 bg-white/20 px-3 py-2 rounded-md">
//             Account: {userEmail}
//           </div>
//         )}

//         <div className="flex flex-col gap-2 w-full">
//           <label className="font-fira text-[16px] font-medium">Username</label>
//           <input
//             {...register("username")}
//             type="text"
//             placeholder="Enter username"
//             className="w-[320px] bg-[#fff3e5] h-[50px] text-black rounded-xl border border-[#c7b8a2] px-4 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fd5f08]/30"
//           />

//           {errors.username?.message && (
//             <span className="text-red-500 text-sm">{errors.username.message}</span>
//           )}
//         </div>

//         <div className="flex gap-4 mt-2 w-full">
//           <button
//             type="submit"
//             disabled={mutation.isPending}
//             className="flex-1 h-[50px] bg-brand text-white font-medium rounded-xl hover:bg-orange-500 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//           >
//             {mutation.isPending ? (
//               <>
//                 <svg
//                   className="w-5 h-5 animate-spin"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   />
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   />
//                 </svg>
//                 <span>Saving...</span>
//               </>
//             ) : (
//               "Save Username"
//             )}
//           </button>

//           <button
//             type="button"
//             onClick={handleSkip}
//             disabled={mutation.isPending}
//             className="flex-1 h-[50px] bg-white/20 backdrop-blur-sm text-black font-medium rounded-xl hover:bg-white/30 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed border border-white/30"
//           >
//             Skip
//           </button>
//         </div>
//       </form>

//       <p className="text-xs text-black/60 text-center max-w-[320px]">
//         You can also login using your email or phone number later
//       </p>
//     </motion.div>
//   );
// }


"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { setUsername } from "@/serverActions/auth";
import { motion } from "framer-motion";

const usernameSchema = z.object({
  username: z
    .string()
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
});

type Inputs = z.infer<typeof usernameSchema>;

export default function AddUsernameCard() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(usernameSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    const localEmail = localStorage.getItem("email");

    if (!localEmail) {
      toast.error("Session not found, redirecting...");
      setTimeout(() => {
        router.push("/signup");
      }, 2000);
      return;
    }

    setUserEmail(localEmail);
  }, [router]);

  const mutation = useMutation({
    mutationFn: async (formData: Inputs) => {
      return await setUsername(formData.username);
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.data.message || "Username added successfully!");
        
        // Store the username from the response
        if (data.username) {
          localStorage.setItem("username", data.username);
        }
        
        // Clear temporary email/phone storage
        localStorage.removeItem("email");
        localStorage.removeItem("phone");
        
        setTimeout(() => {
          router.push("/signin");
        }, 1500);
      } else {
        toast.error(data.message || "Failed to set username");
        
        // If there are specific field errors, show them
        if (data.errors) {
          Object.values(data.errors as { [key: string]: string }).forEach((val: string) => {
            toast.error(val);
          });
        }
      }
    },
    onError: (err: Error) => {
      console.log("REGISTER EXCEPTION:", err);
      toast.error(err.message || "Something went wrong");
    },
  });

  const onSubmit = (data: Inputs) => {
    mutation.mutate(data);
  };

  const handleSkip = () => {
    // Clear temporary storage
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    
    toast.success("Username setup skipped");
    setTimeout(() => {
      router.push("/home");
    }, 1000);
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
            Add Username
          </h2>
          <p className="text-sm text-black/80 max-w-[320px]">
            Create a unique username for easy login instead of using email or phone number
          </p>
        </div>

        {userEmail && (
          <div className="text-xs text-black/60 bg-white/20 px-3 py-2 rounded-md">
            Account: {userEmail}
          </div>
        )}

        <div className="flex flex-col gap-2 w-full">
          <label className="font-fira text-[16px] font-medium">Username</label>
          <input
            {...register("username")}
            type="text"
            placeholder="Enter username"
            className="w-[320px] bg-[#fff3e5] h-[50px] text-black rounded-xl border border-[#c7b8a2] px-4 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fd5f08]/30"
          />

          {errors.username?.message && (
            <span className="text-red-500 text-sm">{errors.username.message}</span>
          )}
        </div>

        <div className="flex gap-4 mt-2 w-full">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="flex-1 h-[50px] bg-brand text-white font-medium rounded-xl hover:bg-orange-500 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {mutation.isPending ? (
              <>
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
                <span>Saving...</span>
              </>
            ) : (
              "Save Username"
            )}
          </button>

          <button
            type="button"
            onClick={handleSkip}
            disabled={mutation.isPending}
            className="flex-1 h-[50px] bg-white/20 backdrop-blur-sm text-black font-medium rounded-xl hover:bg-white/30 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed border border-white/30"
          >
            Skip
          </button>
        </div>
      </form>

      <p className="text-xs text-black/60 text-center max-w-[320px]">
        You can also login using your email or phone number later
      </p>
    </motion.div>
  );
}