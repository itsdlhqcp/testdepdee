// "use server";

// import { cookies } from "next/headers";

// export async function setCookie(token: string) {
//   const cookieStore = await cookies();
//   cookieStore.set("token", token, {
//     httpOnly: true,
//     secure: false,
//     sameSite: "lax",
//     maxAge: 60 * 60 * 24 * 7,
//     path: "/",
//   });
//   return true;
// }

// export async function getCookie() {
//   const cookieStore = await cookies();
//   return cookieStore.get("token")?.value;
// }



// // serverActions/cookies.ts
// "use server";
// import { cookies } from "next/headers";

// export async function setCookie(token: string) {
//   const cookieStore = await cookies();
//   cookieStore.set("token", token, {
//     httpOnly: true,
//     secure: false,
//     sameSite: "lax",
//     maxAge: 60 * 60 * 24 * 7,
//     path: "/",
//   });
//   return true;
// }

// export async function getCookie() {
//   const cookieStore = await cookies();
//   return cookieStore.get("token")?.value;
// }

// // New functions to store user data
// export async function setUserCookies(email: string, phone: string, referralCode: string) {
//   const cookieStore = await cookies();

//   cookieStore.set("email", email, {
//     httpOnly: false, // Not sensitive, can be accessed by client if needed
//     secure: false,
//     sameSite: "lax",
//     maxAge: 60 * 60 * 24 * 7,
//     path: "/",
//   });

//   cookieStore.set("phone", phone, {
//     httpOnly: false,
//     secure: false,
//     sameSite: "lax",
//     maxAge: 60 * 60 * 24 * 7,
//     path: "/",
//   });

//   cookieStore.set("referral_code", referralCode, {
//     httpOnly: false,
//     secure: false,
//     sameSite: "lax",
//     maxAge: 60 * 60 * 24 * 7,
//     path: "/",
//   });

//   return true;
// }


// export async function setPhoneVerifiedCookie(isVerified: boolean) {
//   const cookieStore = await cookies();

//   cookieStore.set("phone_verified", String(isVerified), {
//     httpOnly: false,   // frontend can read it
//     secure: false,
//     sameSite: "lax",
//     maxAge: 60 * 60 * 1, 
//     path: "/",
//   });

//   return true;
// }


// export async function getPhoneVerifiedCookie() {
//   const cookieStore = await cookies();
//   return cookieStore.get("phone_verified")?.value;
// }



// export async function getUserCookie(name: "email" | "phone" | "referral_code") {
//   const cookieStore = await cookies();
//   return cookieStore.get(name)?.value;
// }




"use server";
import { cookies } from "next/headers";

export async function setCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return true;
}

export async function getCookie() {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}

// Combined function to set token and phone verification status
export async function setAuthCookies(token: string, isPhoneNumberVerified: boolean) {
  const cookieStore = await cookies();

  // Set token
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  // Set phone verification status
  cookieStore.set("phone_verified", String(isPhoneNumberVerified), {
    httpOnly: false, // frontend can read it
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days, same as token
    path: "/",
  });

  return true;
}

export async function getPhoneVerifiedCookie() {
  const cookieStore = await cookies();
  const value = cookieStore.get("phone_verified")?.value;
  return value === "true"; // Convert string to boolean
}

export async function setUserCookies(email: string, phone: string, referralCode: string) {
  const cookieStore = await cookies();

  cookieStore.set("email", email, {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  cookieStore.set("phone", phone, {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  cookieStore.set("referral_code", referralCode, {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return true;
}

export async function getUserCookie(name: "email" | "phone" | "referral_code") {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}