import ResetPasswordCard from "@/components/ResetPasswordCard";
import { Providers } from "@/components/providers";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

export default function ResetPassword() {
  return (
    <div className="w-screen h-screen grid grid-cols-2 grid-rows-3">
      <div className="bg-[url(/photos/authCouple.png)] bg-no-repeat bg-center bg-cover row-span-3"></div>
      <div className="bg-[url(/photos/Fork.png)] bg-no-repeat bg-center bg-cover"></div>
      <div className="bg-[url(/photos/couple-phone.png)] bg-no-repeat bg-center bg-cover"></div>
      <div className="bg-[url(/photos/burger.png)] bg-no-repeat bg-center bg-cover"></div>
      
      {/* Fixed centering div - using Tailwind utilities instead of custom class */}
      <div className="w-[100dvw] h-[100dvh] fixed inset-0 flex items-center justify-center z-10">
        <Providers>
          <Suspense fallback={
            <div className="w-fit h-fit bg-white/10 font-fira backdrop-blur-xl rounded-2xl border border-white/30 p-[30px] flex flex-col items-center justify-center gap-[30px]">
              <div className="text-center">
                <h2 className="text-brand font-inter font-semibold text-3xl mb-2">
                  Trippldee
                </h2>
                <p className="text-sm text-black/80 max-w-[320px]">
                  Loading...
                </p>
              </div>
            </div>
          }>
            <ResetPasswordCard />
          </Suspense>
        </Providers>
      </div>
      
      <Toaster />
    </div>
  );
}

