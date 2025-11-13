// "use server";
// import axios from "axios";
// import type { Inputs } from "@/app/(auth)/components/signupForm";
// import type { Inputs as InputsSignIn } from "@/app/(auth)/components/signinForm";

// export async function registerUser(formData: Inputs) {
//   console.log("REGISTER USER");
//   try {
//     const response = await axios.post(
//       `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
//       formData,
//     );
//     console.log("Success response:", response.data);
//     return { success: true, data: response.data };
//   } catch (err) {
//     console.log(err.response.data);
//     return {
//       success: false,
//       message: err.response.data.message,
//       errors: err.response.data.errors,
//     };
//   }
// }

// export async function loginUser(formData: InputsSignIn) {
//   try {
//     const response = await axios.post<Welcome>(
//       `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
//       formData,
//     );
//     console.log("Success response:", response.data);
//     return { success: true, data: response.data };
//   } catch (err) {
//     console.log(err.response.data.message);
//     return {
//       success: false,
//       message: err.response.data.message,
//       errors: err.response.data.errors,
//     };
//   }
// }

// export async function verifyOTP(formData: unknown) {
//   console.log(formData);
//   try {
//     const res = await axios.post(
//       `${process.env.NEXT_PUBLIC_API_URL}/auth/validate-otp`,
//       formData,
//     );
//     console.log(res);
//     return res;
//   } catch (err) {
//     console.log(err.response.data);
//     return err.response.data;
//   }
// }


// export async function logoutUser() {
//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL}/user/logout`,
//     );
//     console.log("Logout success:", response.data);
//     return { success: true, data: response.data };
//   } catch (err) {
//     console.log("Logout error:", err.response?.data);
//     return {
//       success: false,
//       message: err.response?.data?.message || "Logout failed",
//     };
//   }
// }

// // try {
// //   const response = await axios.post(
// //     `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
// //     formData,
// //   );
// //   console.log("Success response:", response.data);
// //   return response.data;
// // } catch (err) {
// //   console.log(err.response.data);
// //   const error = new Error(err.response.data);
// //   throw error;
// // }


"use server";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import type { Inputs } from "@/app/(auth)/components/signupForm";
import type { Inputs as InputsSignIn } from "@/app/(auth)/components/signinForm";

// export async function registerUser(formData: Inputs) {
//   console.log("REGISTER USER","formdata",formData);
//   try {
//     const response = await axios.post(
//       `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
//       formData,
//     );
//     console.log("Success response:", response.data);
//     return { success: true, data: response.data };
//   } catch (err: any) {
//     console.log(err.response.data);
//     return {
//       success: false,
//       message: err.response.data.message,
//       errors: err.response.data.errors,
//     };
//   }
// }


export async function registerUser(formData: Inputs) {
  console.log("REGISTER USER", "formdata", formData);

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      formData,
    );
    console.log("Success response:", response.data);
    return { success: true, data: response.data };
  } catch (err) {
    const error = err as AxiosError<{ message?: string; errors?: unknown }>;

    console.log(error.response?.data);

    return {
      success: false,
      message: error.response?.data?.message || "Registration failed",
      errors: error.response?.data?.errors || null,
    };
  }
}


// export async function setUsername(username: string) {
//   console.log("SET USERNAME");
//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) {
//       return {
//         success: false,
//         message: "Authentication token not found",
//       };
//     }

//     const response = await axios.patch(
//       `${process.env.NEXT_PUBLIC_API_URL}/user/set-user-name`,
//       { user_name: username },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     console.log("Username set successfully:", response.data);
//     return { 
//       success: true, 
//       data: response.data,
//       username: response.data.data.user_identifier 
//     };
//   } catch (err: any) {
//     console.log("Set username error:", err.response?.data);
//     return {
//       success: false,
//       message: err.response?.data?.message || "Failed to set username",
//       errors: err.response?.data?.errors,
//     };
//   }
// }

export async function setUsername(username: string) {
  console.log("SET USERNAME");

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return {
        success: false,
        message: "Authentication token not found",
      };
    }

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/set-user-name`,
      { user_name: username },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Username set successfully:", response.data);
    return { 
      success: true, 
      data: response.data,
      username: response.data?.data?.user_identifier,
    };

  } catch (err) {
    // ✅ Type-safe cast instead of `any`
    const error = err as AxiosError<{ message?: string; errors?: unknown }>;

    console.log("Set username error:", error.response?.data);

    return {
      success: false,
      message: error.response?.data?.message || "Failed to set username",
      errors: error.response?.data?.errors || null,
    };
  }
}

// export async function loginUser(formData: InputsSignIn) {
//   try {
//     const response = await axios.post<Welcome>(
//       `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
//       formData,
//     );
//     console.log("Success response:", response.data);
//     return { success: true, data: response.data };
//   } catch (err) {
//     console.log(err.response.data.message);
//     return {
//       success: false,
//       message: err.response.data.message,
//       errors: err.response.data.errors,
//     };
//   }
// }

export async function loginUser(formData: InputsSignIn) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      formData,
    );
    console.log("Success response:", response.data);
    return { success: true, data: response.data };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data?.message);
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
        errors: err.response?.data?.errors || null,
      };
    } else {
      console.error("Unknown error:", err);
      return {
        success: false,
        message: "An unexpected error occurred",
      };
    }
  }
}

export async function verifyOTP(formData: Record<string, unknown>) {
  console.log(formData);
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/validate-otp`,
      formData
    );
    console.log(res);
    return { success: true, data: res.data };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // ✅ Type-safe, Axios-specific
      console.log("Verify OTP error:", err.response?.data);
      return {
        success: false,
        message: err.response?.data?.message || "OTP verification failed",
        errors: err.response?.data?.errors || null,
      };
    }

    // ✅ Handles all other unexpected errors
    console.error("Unexpected error:", err);
    return {
      success: false,
      message: "An unexpected error occurred during OTP verification",
    };
  }
}

// export async function verifyOTP(formData: Record<string, unknown>) {
//   console.log(formData);
//   try {
//     const res = await axios.post(
//       `${process.env.NEXT_PUBLIC_API_URL}/auth/validate-otp`,
//       formData
//     );
//     console.log(res);
//     return { success: true, data: res.data };
//   } catch (err) {
//     // ✅ Type-safe cast
//     const error = err as AxiosError<{ message?: string; errors?: unknown }>;
//     console.log("Verify OTP error:", error.response?.data);

//     return {
//       success: false,
//       message: error.response?.data?.message || "OTP verification failed",
//       errors: error.response?.data?.errors || null,
//     };
//   }
// }

export async function logoutUser() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    console.log("Logout success: Token removed");
    return { success: true, message: "Logged out successfully" };
  } catch (err) {
    console.log("Logout error:", err);
    return {
      success: false,
      message: "Logout failed",
    };
  }
}
