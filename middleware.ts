import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookie } from "./serverActions/cookies";

export async function middleware(request: NextRequest) {
  // Log the current request pathname
  console.log("Current path:", request.nextUrl.origin);
  const token = await getCookie();
  if (!token) {
    return NextResponse.redirect(request.nextUrl.origin + "/signin");
  }
}

export const config = {
  matcher: [
    // match all routes except static files and APIs
    "/((?!api|_next/static|_next/image|favicon.ico|signin|signup|verify|photos).*)",
  ],
};
