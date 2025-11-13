import { Metadata } from "next";
import { Navbar } from "../home/components/navbar";

export const metadata: Metadata = {
  title: "Branch Registration",
};

export default function BranchRegLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative max-w-screen min-h-screen bg-[#FFE7DD] flex flex-col justify-center items-center gap-10 pb-10">
      <div className="w-full bg-white px-[60px]">
        <Navbar />
      </div>
      {children}
    </div>
  );
}
