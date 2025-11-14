// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const cookieStore = await cookies();

//     const email = cookieStore.get("email")?.value;
//     const phone = cookieStore.get("phone")?.value;
//     const referral_code = cookieStore.get("referral_code")?.value;

//     return NextResponse.json({
//       email: email || null,
//       phone: phone || null,
//       referral_code: referral_code || null,
//     });
//   } catch (error) {
//     console.error("Error reading cookies:", error);
//     return NextResponse.json(
//       { error: "Failed to read cookies" },
//       { status: 500 }
//     );
//   }
// }



import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const email = cookieStore.get("email")?.value;
    const phone = cookieStore.get("phone")?.value;
    const referral_code = cookieStore.get("referral_code")?.value;
    const phone_verified = cookieStore.get("phone_verified")?.value;
    const token = cookieStore.get("token")?.value;

    return NextResponse.json({
      email: email || null,
      phone: phone || null,
      referral_code: referral_code || null,
      phone_verified: phone_verified || null,
      token: token || null,
    });
  } catch (error) {
    console.error("Error reading cookies:", error);
    return NextResponse.json(
      { error: "Failed to read cookies" },
      { status: 500 }
    );
  }
}