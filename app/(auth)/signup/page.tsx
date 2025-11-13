import type { Metadata } from "next";

import VerifyCard from "@/components/verifyCard";
import { SignUpForm } from "../components/signupForm";
import { Providers } from "@/components/providers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Sign up",
};

export default async function Signup() {
  return (
    <div className="w-screen min-h-screen grid grid-cols-2 grid-rows-3">
      <div className="bg-[url(/photos/authCouple.png)] bg-no-repeat bg-center bg-cover row-span-3"></div>
      <div className="bg-[url(/photos/Fork.png)] bg-no-repeat bg-center bg-cover"></div>
      <div className="bg-[url(/photos/couple-phone.png)] bg-no-repeat bg-center bg-cover"></div>
      <div className="bg-[url(/photos/burger.png)] bg-no-repeat bg-center bg-cover"></div>
      <div className="w-[100dvw] h-[100dvh] fixed flex items-center justify-center overflow-y-auto py-8 mt-10">
        <Providers>
          <SignUpForm />
        </Providers>
      </div>
      <Toaster />
    </div>
  );
}
