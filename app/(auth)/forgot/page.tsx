import ForgotPasswordCard from "@/components/ForgotPasswordCard";
import { Providers } from "@/components/providers";
import { Toaster } from "react-hot-toast";

export default function ForgotPassword() {
  return (
    <div className="w-screen h-screen grid grid-cols-2 grid-rows-3">
      <div className="bg-[url(/photos/authCouple.png)] bg-no-repeat bg-center bg-cover row-span-3"></div>
      <div className="bg-[url(/photos/Fork.png)] bg-no-repeat bg-center bg-cover"></div>
      <div className="bg-[url(/photos/couple-phone.png)] bg-no-repeat bg-center bg-cover"></div>
      <div className="bg-[url(/photos/burger.png)] bg-no-repeat bg-center bg-cover"></div>
      
      {/* Fixed centering div - using Tailwind utilities instead of custom class */}
      <div className="w-[100dvw] h-[100dvh] fixed inset-0 flex items-center justify-center z-10">
        <Providers>
          <ForgotPasswordCard />
        </Providers>
      </div>
      
      <Toaster />
    </div>
  );
}