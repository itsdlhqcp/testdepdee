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

// // Combined function to set token and phone verification status
// export async function setAuthCookies(token: string, isPhoneNumberVerified: boolean) {
//   const cookieStore = await cookies();

//   // Set token
//   cookieStore.set("token", token, {
//     httpOnly: true,
//     secure: false,
//     sameSite: "lax",
//     maxAge: 60 * 60 * 24 * 7,
//     path: "/",
//   });

//   // Set phone verification status
//   cookieStore.set("phone_verified", String(isPhoneNumberVerified), {
//     httpOnly: false, // frontend can read it
//     secure: false,
//     sameSite: "lax",
//     maxAge: 60 * 60 * 24 * 7, // 7 days, same as token
//     path: "/",
//   });

//   return true;
// }

// export async function getPhoneVerifiedCookie() {
//   const cookieStore = await cookies();
//   const value = cookieStore.get("phone_verified")?.value;
//   return value === "true"; // Convert string to boolean
// }

// export async function setUserCookies(email: string, phone: string, referralCode: string) {
//   const cookieStore = await cookies();

//   cookieStore.set("email", email, {
//     httpOnly: false,
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

// export async function getUserCookie(name: "email" | "phone" | "referral_code") {
//   const cookieStore = await cookies();
//   return cookieStore.get(name)?.value;
// }



"use server";
import { cookies } from "next/headers";

// Set token cookie
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

// Get token cookie
export async function getCookie() {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}

// Set token cookie (alias for setTokenCookie)
export async function setTokenCookie(token: string) {
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

// Get phone verification status
export async function getPhoneVerifiedCookie() {
  const cookieStore = await cookies();
  const value = cookieStore.get("phone_verified")?.value;
  return value === "true"; // Convert string to boolean
}

// Original function - requires all three values
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

// New function - stores only values that are provided (accepts null)
export async function setUserCookiesOptional(
  email: string | null,
  phone: string | null,
  referralCode: string | null
) {
  const cookieStore = await cookies();

  if (email) {
    cookieStore.set("email", email, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  }

  if (phone) {
    cookieStore.set("phone", phone, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  }

  if (referralCode) {
    cookieStore.set("referral_code", referralCode, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  }

  return true;
}

// Get individual user cookie
export async function getUserCookie(name: "email" | "phone" | "referral_code") {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}

// Delete token cookie
export async function deleteTokenCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  return true;
}

// Delete all user cookies (logout)
export async function deleteAllUserCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("email");
  cookieStore.delete("phone");
  cookieStore.delete("referral_code");
  cookieStore.delete("phone_verified");
  return true;
}