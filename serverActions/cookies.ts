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
