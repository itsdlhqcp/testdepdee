"use client";
import { SignInForm } from "../components/signinForm";
import { Providers } from "@/components/providers";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

export default function Signin() {
  return (
    <>
      <div className="w-screen h-screen grid grid-cols-2 grid-rows-3">
        <div className="bg-[url(/photos/authCouple.png)] bg-no-repeat bg-center bg-cover row-span-3"></div>
        <div className="bg-[url(/photos/Fork.png)] bg-no-repeat bg-center bg-cover"></div>
        <div className="bg-[url(/photos/couple-phone.png)] bg-no-repeat bg-center bg-cover"></div>
        <div className="bg-[url(/photos/burger.png)] bg-no-repeat bg-center bg-cover"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-[100dvw] h-[100dvh] fixed center-div"
        >
          <Providers>
            <SignInForm />
          </Providers>
        </motion.div>
      </div>
      <Toaster />
    </>
  );
}
