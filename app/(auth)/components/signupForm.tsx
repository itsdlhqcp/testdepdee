// // "use client";

// import Link from "next/link";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, Controller } from "react-hook-form";
// import { PhoneInput } from "react-international-phone";
// import "react-international-phone/style.css";
// import { useMutation } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { registerUser } from "@/serverActions/auth";

// const signUpSchema = z
//   .object({
//     name: z.string().min(3, "Name should be at least 3 characters"),
//     email: z.string().email("Invalid email address"),
//     account_type: z.string().min(1, "Please select a user type"),
//     phone_number: z.string().min(13, "Enter full phone number with country code"),
//     password: z.string().min(8, "Password must be at least 8 characters"),
//     password_confirmation: z.string(),
//   })
//   .refine((data) => data.password === data.password_confirmation, {
//     message: "Passwords do not match",
//     path: ["password_confirmation"],
//   });

// export type Inputs = z.infer<typeof signUpSchema>;

// export function SignUpForm() {
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm<Inputs>({
//     resolver: zodResolver(signUpSchema),
//     mode: "onChange",
//   });

//   const mutation = useMutation({
//     mutationFn: registerUser,
//     onSuccess: (data) => {
//       if (data.success) {
//         console.log(data.message);
//         // Store email and phone in localStorage
//         const { country_code, phone_number, email } = data.data.data[0];
//         toast.success(data.data.message || "Registered successfully!");
//         localStorage.setItem("email", email);
//         localStorage.setItem("phone", `${country_code}${phone_number}`);
//         // Icon stays on during redirect
//         setTimeout(() => {
//           router.push("/verify");
//         }, 1000);
//       } else {
//         console.log(data.message);
//         Object.values(data.errors || {}).forEach((val: any) =>
//           toast.error(val)
//         );
//       }
//     },
//     onError: (err: any) => {
//       console.log(err.message);
//       toast.error(err.message || "Something went wrong");
//     },
//   });

//   const onSubmit = (data: Inputs) => mutation.mutate(data);

//   return (
//     <motion.form
//       initial={{ opacity: 0, y: 15 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, ease: "easeOut" }}
//       onSubmit={handleSubmit(onSubmit)}
//       className="w-fit h-fit bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 p-[30px] flex flex-col items-center gap-[26px] mt-74 mb-14"
//     >
//       <div>
//         <h2 className="text-brand font-inter font-semibold text-3xl center-div">
//           Trippldee
//         </h2>
//         <span className="text-black font-inter font-normal text-[20px] center-div">
//           Welcome to Trippldee, please create your account.
//         </span>
//       </div>

//       {/* Toggle */}
//       <div className="w-full h-[60px] flex items-center justify-center bg-[#fff3e5] rounded-full p-2 transition-all">
//         <button
//           type="button"
//           className="bg-white flex-1 text-[#fd5f08] font-medium rounded-full h-full shadow-sm"
//         >
//           Sign Up
//         </button>
//         <Link
//           href="/signin"
//           className="flex-1 text-black font-medium text-center px-6 py-2 hover:bg-white/40 rounded-full transition"
//         >
//           Login
//         </Link>
//       </div>

//       {/* Fields */}
//       <div className="grid gap-4 w-full">
//         {[
//           { label: "Full Name", name: "name", type: "text", placeholder: "Enter your full name" },
//           { label: "Email Address", name: "email", type: "email", placeholder: "Enter your email" },
//         ].map((f) => (
//           <div key={f.name} className="flex flex-col gap-[6px]">
//             <label className="font-fira text-[16px] font-medium">{f.label}</label>
//             <input
//               {...register(f.name as keyof Inputs)}
//               type={f.type}
//               placeholder={f.placeholder}
//               className="w-full bg-[#fff3e5] h-[50px] text-black rounded-xl border border-[#c7b8a2] px-4 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fd5f08]/30"
//             />
//             {errors[f.name as keyof Inputs] && (
//               <span className="text-red-500 text-sm">
//                 {errors[f.name as keyof Inputs]?.message as string}
//               </span>
//             )}
//           </div>
//         ))}

//         {/* Account Type */}
//         <div className="flex flex-col gap-[6px]">
//           <label className="font-fira text-[16px] font-medium">Choose User Type</label>
//           <select
//             {...register("account_type")}
//             className="w-full bg-[#fff3e5] h-[50px] text-black rounded-xl border border-[#c7b8a2] px-4 focus:outline-none focus:ring-2 focus:ring-[#fd5f08]/30 appearance-none"
//           >
//             <option value="">Account-type</option>
//             <option value="acc.user">User</option>
//             <option value="acc.organization">Organization</option>
//           </select>
//           {errors.account_type && (
//             <span className="text-red-500 text-sm">{errors.account_type.message}</span>
//           )}
//         </div>

//         {/* Phone Number */}
//         <div className="flex flex-col gap-[6px]">
//           <label className="font-fira text-[16px] font-medium">Phone number</label>
//           <Controller
//             control={control}
//             name="phone_number"
//             render={({ field: { onChange } }) => (
//               <PhoneInput
//                 onChange={onChange}
//                 defaultCountry="in"
//                 inputStyle={{
//                   width: "100%",
//                   height: "50px",
//                   borderRadius: "12px",
//                   background: "#fff3e5",
//                 }}
//               />
//             )}
//           />
//           {errors.phone_number && (
//             <span className="text-red-500 text-sm">{errors.phone_number.message}</span>
//           )}
//         </div>

//         {/* Passwords */}
//         {["password", "password_confirmation"].map((name, idx) => (
//           <div key={name} className="flex flex-col gap-[6px]">
//             <label className="font-fira text-[16px] font-medium">
//               {idx === 0 ? "Password" : "Confirm Password"}
//             </label>
//             <input
//               {...register(name as keyof Inputs)}
//               type="password"
//               placeholder="Enter your Password"
//               className="w-full bg-[#fff3e5] h-[50px] text-black rounded-xl border border-[#c7b8a2] px-4 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fd5f08]/30"
//             />
//             {errors[name as keyof Inputs] && (
//               <span className="text-red-500 text-sm">
//                 {errors[name as keyof Inputs]?.message as string}
//               </span>
//             )}
//           </div>
//         ))}
//       </div>

//       <button
//         disabled={mutation.isPending}
//         type="submit"
//         className="w-full rounded-[12px] h-[50px] bg-brand text-white font-medium transition-all duration-200 hover:bg-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//       >
//         {mutation.isPending && (
//           <svg
//             className="w-5 h-5 animate-spin"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             />
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//             />
//           </svg>
//         )}
//         <span>
//           {mutation.isPending ? "Creating Account..." : "Create Account"}
//         </span>
//       </button>

//       <h4 className="font-inter font-normal text-[20px] ">
//         Already have an account?{" "}
//         <Link className="text-brand hover:underline" href="/signin">
//           Login here
//         </Link>
//       </h4>
//     </motion.form>
//   );
// }






// // "use client";

// // import Link from "next/link";
// // import { z } from "zod";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { useForm, Controller } from "react-hook-form";
// // import { PhoneInput } from "react-international-phone";
// // import "react-international-phone/style.css";
// // import { useMutation } from "@tanstack/react-query";
// // import toast from "react-hot-toast";
// // import { useRouter } from "next/navigation";
// // import { motion } from "framer-motion";
// // import { registerUser } from "@/serverActions/auth";

// // const signUpSchema = z
// //   .object({
// //     name: z.string().min(3, "Name should be at least 3 characters"),
// //     email: z.string().email("Invalid email address"),
// //     account_type: z.string().min(1, "Please select a user type"),
// //     phone_number: z.string().min(13, "Enter full phone number with country code"),
// //     password: z.string().min(8, "Password must be at least 8 characters"),
// //     password_confirmation: z.string(),
// //   })
// //   .refine((data) => data.password === data.password_confirmation, {
// //     message: "Passwords do not match",
// //     path: ["password_confirmation"],
// //   });

// // export type Inputs = z.infer<typeof signUpSchema>;

// // export function SignUpForm() {
// //   const router = useRouter();

// //   const {
// //     register,
// //     handleSubmit,
// //     control,
// //     formState: { errors },
// //   } = useForm<Inputs>({
// //     resolver: zodResolver(signUpSchema),
// //     mode: "onSubmit", // Changed from "onChange" to "onSubmit"
// //   });

// //   const mutation = useMutation({
// //     mutationFn: registerUser,
// //     onSuccess: (data) => {
// //       if (data.success) {
// //         console.log(data.message);
// //         // Store email and phone in localStorage
// //         const { country_code, phone_number, email } = data.data.data[0];
// //         toast.success(data.data.message || "Registered successfully!");
// //         localStorage.setItem("email", email);
// //         localStorage.setItem("phone", `${country_code}${phone_number}`);
// //         // Icon stays on during redirect
// //         setTimeout(() => {
// //           router.push("/verify");
// //         }, 1000);
// //       } else {
// //         console.log(data.message);
// //         Object.values(data.errors || {}).forEach((val: any) =>
// //           toast.error(val)
// //         );
// //       }
// //     },
// //     onError: (err: any) => {
// //       console.log(err.message);
// //       toast.error(err.message || "Something went wrong");
// //     },
// //   });

// //   const onSubmit = (data: Inputs) => mutation.mutate(data);

// //   return (
// //     <motion.form
// //       initial={{ opacity: 0, y: 15 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.4, ease: "easeOut" }}
// //       onSubmit={handleSubmit(onSubmit)}
// //       className="w-fit h-fit bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 p-[30px] flex flex-col items-center gap-[26px] mt-74 mb-14"
// //     >
// //       <div>
// //         <h2 className="text-brand font-inter font-semibold text-3xl center-div">
// //           Trippldee
// //         </h2>
// //         <span className="text-black font-inter font-normal text-[20px] center-div">
// //           Welcome to Trippldee, please create your account.
// //         </span>
// //       </div>

// //       {/* Toggle */}
// //       <div className="w-full h-[60px] flex items-center justify-center bg-[#fff3e5] rounded-full p-2 transition-all">
// //         <button
// //           type="button"
// //           className="bg-white flex-1 text-[#fd5f08] font-medium rounded-full h-full shadow-sm"
// //         >
// //           Sign Up
// //         </button>
// //         <Link
// //           href="/signin"
// //           className="flex-1 text-black font-medium text-center px-6 py-2 hover:bg-white/40 rounded-full transition"
// //         >
// //           Login
// //         </Link>
// //       </div>

// //       {/* Fields */}
// //       <div className="grid gap-4 w-full">
// //         {[
// //           { label: "Full Name", name: "name", type: "text", placeholder: "Enter your full name" },
// //           { label: "Email Address", name: "email", type: "email", placeholder: "Enter your email" },
// //         ].map((f) => (
// //           <div key={f.name} className="flex flex-col gap-[6px]">
// //             <label className="font-fira text-[16px] font-medium">{f.label}</label>
// //             <input
// //               {...register(f.name as keyof Inputs)}
// //               type={f.type}
// //               placeholder={f.placeholder}
// //               className="w-full bg-[#fff3e5] h-[50px] text-black rounded-xl border border-[#c7b8a2] px-4 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fd5f08]/30"
// //             />
// //             {errors[f.name as keyof Inputs] && (
// //               <span className="text-red-500 text-sm">
// //                 {errors[f.name as keyof Inputs]?.message as string}
// //               </span>
// //             )}
// //           </div>
// //         ))}

// //         {/* Account Type */}
// //         <div className="flex flex-col gap-[6px]">
// //           <label className="font-fira text-[16px] font-medium">Choose User Type</label>
// //           <select
// //             {...register("account_type")}
// //             className="w-full bg-[#fff3e5] h-[50px] text-black rounded-xl border border-[#c7b8a2] px-4 focus:outline-none focus:ring-2 focus:ring-[#fd5f08]/30 appearance-none"
// //           >
// //             <option value="">Account-type</option>
// //             <option value="acc.user">User</option>
// //             <option value="acc.organization">Organization</option>
// //           </select>
// //           {errors.account_type && (
// //             <span className="text-red-500 text-sm">{errors.account_type.message}</span>
// //           )}
// //         </div>

// //         {/* Phone Number */}
// //         <div className="flex flex-col gap-[6px]">
// //           <label className="font-fira text-[16px] font-medium">Phone number</label>
// //           <Controller
// //             control={control}
// //             name="phone_number"
// //             render={({ field: { onChange } }) => (
// //               <PhoneInput
// //                 onChange={onChange}
// //                 defaultCountry="in"
// //                 inputProps={{
// //                   placeholder: "Enter your Mobile no"
// //                 }}
// //                 inputStyle={{
// //                   width: "100%",
// //                   height: "50px",
// //                   borderRadius: "12px",
// //                   background: "#fff3e5",
// //                 }}
// //               />
// //             )}
// //           />
// //           {errors.phone_number && (
// //             <span className="text-red-500 text-sm">{errors.phone_number.message}</span>
// //           )}
// //         </div>

// //         {/* Passwords */}
// //         {["password", "password_confirmation"].map((name, idx) => (
// //           <div key={name} className="flex flex-col gap-[6px]">
// //             <label className="font-fira text-[16px] font-medium">
// //               {idx === 0 ? "Password" : "Confirm Password"}
// //             </label>
// //             <input
// //               {...register(name as keyof Inputs)}
// //               type="password"
// //               placeholder="Enter your Password"
// //               className="w-full bg-[#fff3e5] h-[50px] text-black rounded-xl border border-[#c7b8a2] px-4 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fd5f08]/30"
// //             />
// //             {errors[name as keyof Inputs] && (
// //               <span className="text-red-500 text-sm">
// //                 {errors[name as keyof Inputs]?.message as string}
// //               </span>
// //             )}
// //           </div>
// //         ))}
// //       </div>

// //       <button
// //         disabled={mutation.isPending}
// //         type="submit"
// //         className="w-full rounded-[12px] h-[50px] bg-brand text-white font-medium transition-all duration-200 hover:bg-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
// //       >
// //         {mutation.isPending && (
// //           <svg
// //             className="w-5 h-5 animate-spin"
// //             xmlns="http://www.w3.org/2000/svg"
// //             fill="none"
// //             viewBox="0 0 24 24"
// //           >
// //             <circle
// //               className="opacity-25"
// //               cx="12"
// //               cy="12"
// //               r="10"
// //               stroke="currentColor"
// //               strokeWidth="4"
// //             />
// //             <path
// //               className="opacity-75"
// //               fill="currentColor"
// //               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
// //             />
// //           </svg>
// //         )}
// //         <span>
// //           {mutation.isPending ? "Creating Account..." : "Create Account"}
// //         </span>
// //       </button>

// //       <h4 className="font-inter font-normal text-[20px] ">
// //         Already have an account?{" "}
// //         <Link className="text-brand hover:underline" href="/signin">
// //           Login here
// //         </Link>
// //       </h4>
// //     </motion.form>
// //   );
// // }





// // "use client";

// // import Link from "next/link";
// // import { z } from "zod";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { useForm, Controller } from "react-hook-form";
// // import { PhoneInput } from "react-international-phone";
// // import "react-international-phone/style.css";
// // import { useMutation } from "@tanstack/react-query";
// // import toast from "react-hot-toast";
// // import { useRouter } from "next/navigation";
// // import { motion } from "framer-motion";
// // import { registerUser } from "@/serverActions/auth";

// // const signUpSchema = z
// //   .object({
// //     name: z.string().min(3, "Name should be at least 3 characters"),
// //     email: z.string().email("Invalid email address"),
// //     account_type_alias: z.string().min(1, "Please select a user type"),
// //     phone_number: z.string().min(13, "Enter full phone number with country code"),
// //     password: z.string().min(8, "Password must be at least 8 characters"),
// //     password_confirmation: z.string(),
// //   })
// //   .refine((data) => data.password === data.password_confirmation, {
// //     message: "Passwords do not match",
// //     path: ["password_confirmation"],
// //   });

// // export type Inputs = z.infer<typeof signUpSchema>;

// // export function SignUpForm() {
// //   const router = useRouter();

// //   const {
// //     register,
// //     handleSubmit,
// //     control,
// //     formState: { errors },
// //   } = useForm<Inputs>({
// //     resolver: zodResolver(signUpSchema),
// //     mode: "onSubmit",
// //     defaultValues: {
// //       name: "",
// //       email: "",
// //       account_type_alias: "",
// //       phone_number: "",
// //       password: "",
// //       password_confirmation: "",
// //     },
// //   });

// //   const mutation = useMutation({
// //     mutationFn: registerUser,
// //     onSuccess: (data) => {
// //       if (data.success) {
// //         console.log(data.message);
// //         // Store email and phone in localStorage
// //         const { country_code, phone_number, email } = data.data.data[0];
// //         toast.success(data.data.message || "Registered successfully!");
// //         localStorage.setItem("email", email);
// //         localStorage.setItem("phone", `${country_code}${phone_number}`);
// //         // Icon stays on during redirect
// //         setTimeout(() => {
// //           router.push("/verify");
// //         }, 1000);
// //       } else {
// //         console.log(data.message);
// //         Object.values(data.errors || {}).forEach((val: any) =>
// //           toast.error(val)
// //         );
// //       }
// //     },
// //     onError: (err: any) => {
// //       console.log(err.message);
// //       toast.error(err.message || "Something went wrong");
// //     },
// //   });

// //   const onSubmit = (data: Inputs) => {
// //     mutation.mutate(data);
// //   };

// //   return (
// //     <motion.form
// //       initial={{ opacity: 0, y: 15 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.4, ease: "easeOut" }}
// //       onSubmit={handleSubmit(onSubmit)}
// //       className="w-fit h-fit bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 p-[30px] flex flex-col items-center gap-[26px] mt-74 mb-14"
// //     >
// //       <div>
// //         <h2 className="text-brand font-inter font-semibold text-3xl center-div">
// //           Trippldee
// //         </h2>
// //         <span className="text-black font-inter font-normal text-[20px] center-div">
// //           Welcome to Trippldee, please create your account.
// //         </span>
// //       </div>

// //       {/* Toggle */}
// //       <div className="w-full h-[60px] flex items-center justify-center bg-[#fff3e5] rounded-full p-2 transition-all">
// //         <button
// //           type="button"
// //           className="bg-white flex-1 text-[#fd5f08] font-medium rounded-full h-full shadow-sm"
// //         >
// //           Sign Up
// //         </button>
// //         <Link
// //           href="/signin"
// //           className="flex-1 text-black font-medium text-center px-6 py-2 hover:bg-white/40 rounded-full transition"
// //         >
// //           Login
// //         </Link>
// //       </div>

// //       {/* Fields */}
// //       <div className="grid gap-4 w-full">
// //         {[
// //           { label: "Full Name", name: "name", type: "text", placeholder: "Enter your full name" },
// //           { label: "Email Address", name: "email", type: "email", placeholder: "Enter your email" },
// //         ].map((f) => (
// //           <div key={f.name} className="flex flex-col gap-[6px]">
// //             <label className="font-fira text-[16px] font-medium">{f.label}</label>
// //             <input
// //               {...register(f.name as keyof Inputs)}
// //               type={f.type}
// //               placeholder={f.placeholder}
// //               className="w-full bg-[#fff3e5] h-[50px] text-black rounded-xl border border-[#c7b8a2] px-4 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fd5f08]/30"
// //             />
// //             {errors[f.name as keyof Inputs] && (
// //               <span className="text-red-500 text-sm">
// //                 {errors[f.name as keyof Inputs]?.message as string}
// //               </span>
// //             )}
// //           </div>
// //         ))}

// //         {/* Account Type - FIXED VERSION */}
// //         <div className="flex flex-col gap-[6px]">
// //           <label className="font-fira text-[16px] font-medium">Choose User Type</label>
// //           <Controller
// //             control={control}
// //             name="account_type_alias"
// //             render={({ field: { onChange, value } }) => (
// //               <select
// //                 value={value}
// //                 onChange={onChange}
// //                 className="w-full bg-[#fff3e5] h-[50px] text-black rounded-xl border border-[#c7b8a2] px-4 focus:outline-none focus:ring-2 focus:ring-[#fd5f08]/30 appearance-none"
// //               >
// //                 <option value="" disabled>Select Account Type</option>
// //                 <option value="acc.user">User</option>
// //                 <option value="acc.organization">Organization</option>
// //               </select>
// //             )}
// //           />
// //           {errors.account_type_alias && (
// //             <span className="text-red-500 text-sm">{errors.account_type_alias.message}</span>
// //           )}
// //         </div>

// //         {/* Phone Number */}
// //         <div className="flex flex-col gap-[6px]">
// //           <label className="font-fira text-[16px] font-medium">Phone number</label>
// //           <Controller
// //             control={control}
// //             name="phone_number"
// //             render={({ field: { onChange } }) => (
// //               <PhoneInput
// //                 onChange={onChange}
// //                 defaultCountry="in"
// //                 inputProps={{
// //                   placeholder: "Enter your Mobile no"
// //                 }}
// //                 inputStyle={{
// //                   width: "100%",
// //                   height: "50px",
// //                   borderRadius: "12px",
// //                   background: "#fff3e5",
// //                 }}
// //               />
// //             )}
// //           />
// //           {errors.phone_number && (
// //             <span className="text-red-500 text-sm">{errors.phone_number.message}</span>
// //           )}
// //         </div>

// //         {/* Passwords */}
// //         {["password", "password_confirmation"].map((name, idx) => (
// //           <div key={name} className="flex flex-col gap-[6px]">
// //             <label className="font-fira text-[16px] font-medium">
// //               {idx === 0 ? "Password" : "Confirm Password"}
// //             </label>
// //             <input
// //               {...register(name as keyof Inputs)}
// //               type="password"
// //               placeholder="Enter your Password"
// //               className="w-full bg-[#fff3e5] h-[50px] text-black rounded-xl border border-[#c7b8a2] px-4 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fd5f08]/30"
// //             />
// //             {errors[name as keyof Inputs] && (
// //               <span className="text-red-500 text-sm">
// //                 {errors[name as keyof Inputs]?.message as string}
// //               </span>
// //             )}
// //           </div>
// //         ))}
// //       </div>

// //       <button
// //         disabled={mutation.isPending}
// //         type="submit"
// //         className="w-full rounded-[12px] h-[50px] bg-brand text-white font-medium transition-all duration-200 hover:bg-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
// //       >
// //         {mutation.isPending && (
// //           <svg
// //             className="w-5 h-5 animate-spin"
// //             xmlns="http://www.w3.org/2000/svg"
// //             fill="none"
// //             viewBox="0 0 24 24"
// //           >
// //             <circle
// //               className="opacity-25"
// //               cx="12"
// //               cy="12"
// //               r="10"
// //               stroke="currentColor"
// //               strokeWidth="4"
// //             />
// //             <path
// //               className="opacity-75"
// //               fill="currentColor"
// //               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
// //             />
// //           </svg>
// //         )}
// //         <span>
// //           {mutation.isPending ? "Creating Account..." : "Create Account"}
// //         </span>
// //       </button>

// //       <h4 className="font-inter font-normal text-[20px] ">
// //         Already have an account?{" "}
// //         <Link className="text-brand hover:underline" href="/signin">
// //           Login here
// //         </Link>
// //       </h4>
// //     </motion.form>
// //   );
// // }




// "use client";

// import Link from "next/link";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, Controller } from "react-hook-form";
// import { PhoneInput } from "react-international-phone";
// import "react-international-phone/style.css";
// import { useMutation } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { registerUser } from "@/serverActions/auth";

// const signUpSchema = z
//   .object({
//     name: z.string().min(3, "Name should be at least 3 characters"),
//     email: z.string().email("Invalid email address"),
//     account_type_alias: z.string().min(1, "Please select a user type"),
//     phone_number: z.string().min(13, "Enter full phone number with country code"),
//     password: z.string().min(8, "Password must be at least 8 characters"),
//     password_confirmation: z.string(),
//   })
//   .refine((data) => data.password === data.password_confirmation, {
//     message: "Passwords do not match",
//     path: ["password_confirmation"],
//   });

// export type Inputs = z.infer<typeof signUpSchema>;

// export function SignUpForm() {
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm<Inputs>({
//     resolver: zodResolver(signUpSchema),
//     mode: "onSubmit",
//     defaultValues: {
//       name: "",
//       email: "",
//       account_type_alias: "",
//       phone_number: "",
//       password: "",
//       password_confirmation: "",
//     },
//   });

//   const mutation = useMutation({
//     mutationFn: registerUser,
//     onSuccess: (data) => {
//       console.log("REGISTER RESPONSE:", data);

//       if (data?.success) {
//         // Handle different backend data structures safely
//         const user =
//           data?.data?.data?.[0] || // array format
//           data?.data?.data ||      // nested object format
//           data?.data || {};        // direct object format

//         const { email, phone_number, country_code } = user;

//         toast.success(data?.message || "Registered successfully!");

//         if (email) localStorage.setItem("email", email);
//         if (phone_number)
//           localStorage.setItem(
//             "phone",
//             country_code ? `${country_code}${phone_number}` : phone_number
//           );

//         setTimeout(() => {
//           router.push("/verify");
//         }, 1000);
//       } else {
//         console.log("REGISTER ERROR:", data);
//         const errors = data?.errors || {};
//         if (Object.keys(errors).length > 0) {
//           Object.values(errors).forEach((val: any) => {
//             if (Array.isArray(val)) {
//               val.forEach((msg) => toast.error(msg));
//             } else toast.error(String(val));
//           });
//         } else {
//           toast.error(data?.message || "Registration failed");
//         }
//       }
//     },
//     onError: (err: any) => {
//       console.log("REGISTER EXCEPTION:", err);
//       toast.error(err.message || "Something went wrong");
//     },
//   });

//   const onSubmit = (data: Inputs) => {
//     console.log("REGISTER USER formdata", data);
//     mutation.mutate(data);
//   };

//   return (
//     <motion.form
//       initial={{ opacity: 0, y: 15 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, ease: "easeOut" }}
//       onSubmit={handleSubmit(onSubmit)}
//       className="w-fit h-fit bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 p-[30px] flex flex-col items-center gap-[26px] mt-74 mb-14"
//     >
//       <div>
//         <h2 className="text-brand font-inter font-semibold text-3xl center-div">
//           Trippldee
//         </h2>
//         <span className="text-black font-inter font-normal text-[20px] center-div">
//           Welcome to Trippldee, please create your account.
//         </span>
//       </div>

//       {/* Toggle */}
//       <div className="w-full h-[60px] flex items-center justify-center bg-[#fff3e5] rounded-full p-2 transition-all">
//         <button
//           type="button"
//           className="bg-white flex-1 text-[#fd5f08] font-medium rounded-full h-full shadow-sm"
//         >
//           Sign Up
//         </button>
//         <Link
//           href="/signin"
//           className="flex-1 text-black font-medium text-center px-6 py-2 hover:bg-white/40 rounded-full transition"
//         >
//           Login
//         </Link>
//       </div>

//       {/* Fields */}
//       <div className="grid gap-4 w-full">
//         {[ 
//           { label: "Full Name", name: "name", type: "text", placeholder: "Enter your full name" },
//           { label: "Email Address", name: "email", type: "email", placeholder: "Enter your email" },
//         ].map((f) => (
//           <div key={f.name} className="flex flex-col gap-[6px]">
//             <label className="font-fira text-[16px] font-medium">{f.label}</label>
//             <input
//               {...register(f.name as keyof Inputs)}
//               type={f.type}
//               placeholder={f.placeholder}
//               className="w-full bg-[#fff3e5] h-[50px] text-black rounded-xl border border-[#c7b8a2] px-4 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fd5f08]/30"
//             />
//             {errors[f.name as keyof Inputs] && (
//               <span className="text-red-500 text-sm">
//                 {errors[f.name as keyof Inputs]?.message as string}
//               </span>
//             )}
//           </div>
//         ))}

//         {/* Account Type */}
//         <div className="flex flex-col gap-[6px]">
//           <label className="font-fira text-[16px] font-medium">Choose User Type</label>
//           <Controller
//             control={control}
//             name="account_type_alias"
//             render={({ field: { onChange, value } }) => (
//               <select
//                 value={value}
//                 onChange={onChange}
//                 className="w-full bg-[#fff3e5] h-[50px] text-black rounded-xl border border-[#c7b8a2] px-4 focus:outline-none focus:ring-2 focus:ring-[#fd5f08]/30 appearance-none"
//               >
//                 <option value="" disabled>
//                   Select Account Type
//                 </option>
//                 <option value="acc.user">User</option>
//                 <option value="acc.organization">Organization</option>
//               </select>
//             )}
//           />
//           {errors.account_type_alias && (
//             <span className="text-red-500 text-sm">{errors.account_type_alias.message}</span>
//           )}
//         </div>

//         {/* Phone Number */}
//         <div className="flex flex-col gap-[6px]">
//           <label className="font-fira text-[16px] font-medium">Phone number</label>
//           <Controller
//             control={control}
//             name="phone_number"
//             render={({ field: { onChange, value } }) => (
//               <PhoneInput
//                 value={value}
//                 onChange={onChange}
//                 defaultCountry="in"
//                 inputProps={{ placeholder: "Enter your Mobile no" }}
//                 inputStyle={{
//                   width: "100%",
//                   height: "50px",
//                   borderRadius: "12px",
//                   background: "#fff3e5",
//                 }}
//               />
//             )}
//           />
//           {errors.phone_number && (
//             <span className="text-red-500 text-sm">{errors.phone_number.message}</span>
//           )}
//         </div>

//         {/* Passwords */}
//         {["password", "password_confirmation"].map((name, idx) => (
//           <div key={name} className="flex flex-col gap-[6px]">
//             <label className="font-fira text-[16px] font-medium">
//               {idx === 0 ? "Password" : "Confirm Password"}
//             </label>
//             <input
//               {...register(name as keyof Inputs)}
//               type="password"
//               placeholder="Enter your Password"
//               className="w-full bg-[#fff3e5] h-[50px] text-black rounded-xl border border-[#c7b8a2] px-4 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fd5f08]/30"
//             />
//             {errors[name as keyof Inputs] && (
//               <span className="text-red-500 text-sm">
//                 {errors[name as keyof Inputs]?.message as string}
//               </span>
//             )}
//           </div>
//         ))}
//       </div>

//       <button
//         disabled={mutation.isPending}
//         type="submit"
//         className="w-full rounded-[12px] h-[50px] bg-brand text-white font-medium transition-all duration-200 hover:bg-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//       >
//         {mutation.isPending && (
//           <svg
//             className="w-5 h-5 animate-spin"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//             />
//           </svg>
//         )}
//         <span>{mutation.isPending ? "Creating Account..." : "Create Account"}</span>
//       </button>

//       <h4 className="font-inter font-normal text-[20px] ">
//         Already have an account?{" "}
//         <Link className="text-brand hover:underline" href="/signin">
//           Login here
//         </Link>
//       </h4>
//     </motion.form>
//   );
// }



"use client";

import Link from "next/link";
import { unknown, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { registerUser } from "@/serverActions/auth";

const signUpSchema = z
  .object({
    name: z.string().min(3, "Name should be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    account_type_alias: z.string().min(1, "Please select a user type"),
    phone_number: z.string().min(13, "Enter full phone number with country code"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type Inputs = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(signUpSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      account_type_alias: "",
      phone_number: "",
      password: "",
      password_confirmation: "",
    },
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("REGISTER RESPONSE:", data);

      if (data?.success) {
        toast.success(data?.message || "Registered successfully!");

        setTimeout(() => {
          router.push("/verify");
        }, 1000);
      } else {
        console.log("REGISTER ERROR:", data);
        const errors = data?.errors || {};
        if (Object.keys(errors).length > 0) {
          Object.values(errors).forEach((val: unknown) => {
            if (Array.isArray(val)) {
              val.forEach((msg) => toast.error(msg));
            } else toast.error(String(val));
          });
        } else {
          toast.error(data?.message || "Registration failed");
        }
      }
    },
    onError: (err: Error) => {
      console.log("REGISTER EXCEPTION:", err);
      toast.error(err.message || "Something went wrong");
    },
  });

  const onSubmit = (data: Inputs) => {
    console.log("REGISTER USER formdata", data);
    
    // Store email and phone number in localStorage
    if (data.email) {
      localStorage.setItem("email", data.email);
    }
    if (data.phone_number) {
      localStorage.setItem("phone", data.phone_number);
    }
    
    mutation.mutate(data);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onSubmit={handleSubmit(onSubmit)}
      className="w-fit h-fit bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 p-[30px] flex flex-col items-center gap-[26px] mt-74 mb-14"
    >
      <div>
        <h2 className="text-brand font-inter font-semibold text-3xl center-div">
          Trippldee
        </h2>
        <span className="text-black font-inter font-normal text-[20px] center-div">
          Welcome to Trippldee, please create your account.
        </span>
      </div>

      {/* Toggle */}
      <div className="w-full h-[60px] flex items-center justify-center bg-[#fff3e5] rounded-full p-2 transition-all">
        <button
          type="button"
          className="bg-white flex-1 text-[#fd5f08] font-medium rounded-full h-full shadow-sm"
        >
          Sign Up
        </button>
        <Link
          href="/signin"
          className="flex-1 text-black font-medium text-center px-6 py-2 hover:bg-white/40 rounded-full transition"
        >
          Login
        </Link>
      </div>

      {/* Fields */}
      <div className="grid gap-4 w-full">
        {[ 
          { label: "Full Name", name: "name", type: "text", placeholder: "Enter your full name" },
          { label: "Email Address", name: "email", type: "email", placeholder: "Enter your email" },
        ].map((f) => (
          <div key={f.name} className="flex flex-col gap-[6px]">
            <label className="font-fira text-[16px] font-medium">{f.label}</label>
            <input
              {...register(f.name as keyof Inputs)}
              type={f.type}
              placeholder={f.placeholder}
              className="w-full bg-[#fff3e5] h-[50px] text-black rounded-xl border border-[#c7b8a2] px-4 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fd5f08]/30"
            />
            {errors[f.name as keyof Inputs] && (
              <span className="text-red-500 text-sm">
                {errors[f.name as keyof Inputs]?.message as string}
              </span>
            )}
          </div>
        ))}

        {/* Account Type */}
        <div className="flex flex-col gap-[6px]">
          <label className="font-fira text-[16px] font-medium">Choose User Type</label>
          <Controller
            control={control}
            name="account_type_alias"
            render={({ field: { onChange, value } }) => (
              <select
                value={value}
                onChange={onChange}
                className="w-full bg-[#fff3e5] h-[50px] text-black rounded-xl border border-[#c7b8a2] px-4 focus:outline-none focus:ring-2 focus:ring-[#fd5f08]/30 appearance-none"
              >
                <option value="" disabled>
                  Select Account Type
                </option>
                <option value="acc.user">User</option>
                <option value="acc.organization">Organization</option>
              </select>
            )}
          />
          {errors.account_type_alias && (
            <span className="text-red-500 text-sm">{errors.account_type_alias.message}</span>
          )}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-[6px]">
          <label className="font-fira text-[16px] font-medium">Phone number</label>
          <Controller
            control={control}
            name="phone_number"
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                value={value}
                onChange={onChange}
                defaultCountry="in"
                inputProps={{ placeholder: "Enter your Mobile no" }}
                inputStyle={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "12px",
                  background: "#fff3e5",
                }}
              />
            )}
          />
          {errors.phone_number && (
            <span className="text-red-500 text-sm">{errors.phone_number.message}</span>
          )}
        </div>

        {/* Passwords */}
        {["password", "password_confirmation"].map((name, idx) => (
          <div key={name} className="flex flex-col gap-[6px]">
            <label className="font-fira text-[16px] font-medium">
              {idx === 0 ? "Password" : "Confirm Password"}
            </label>
            <input
              {...register(name as keyof Inputs)}
              type="password"
              placeholder="Enter your Password"
              className="w-full bg-[#fff3e5] h-[50px] text-black rounded-xl border border-[#c7b8a2] px-4 py-2 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fd5f08]/30"
            />
            {errors[name as keyof Inputs] && (
              <span className="text-red-500 text-sm">
                {errors[name as keyof Inputs]?.message as string}
              </span>
            )}
          </div>
        ))}
      </div>

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
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        <span>{mutation.isPending ? "Creating Account..." : "Create Account"}</span>
      </button>

      <h4 className="font-inter font-normal text-[20px] ">
        Already have an account?{" "}
        <Link className="text-brand hover:underline" href="/signin">
          Login here
        </Link>
      </h4>
    </motion.form>
  );
}