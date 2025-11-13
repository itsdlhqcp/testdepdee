import { Metadata } from "next";
import { BMI } from "./components/bmi";
import { MealPlan } from "./components/mealPlan";
import { Navbar } from "./components/navbar";
import { ProfileAnalytics } from "./components/profileAnalytics";
import { SidebarProfile } from "./components/sidebarProfile";
import { Diet } from "./components/diet";
import { RecipeCard } from "./components/recipeCard";
import { Upload } from "lucide-react";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-brand-white w-full h-[100dvh] flex flex-col px-[60px] overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Content Area (fills the rest of the screen) */}
      <div className="grid grid-cols-4 gap-[22px] mt-[20px] flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="space-y-[20px] overflow-y-auto h-full p-[1px] scrollbar-hide">
          <SidebarProfile />
          <ProfileAnalytics />
          <MealPlan />
          <BMI />
          <Diet />
        </aside>

        {/* Main Feed (scrollable) */}
        <main className="col-span-2 overflow-y-auto h-full p-[1px] scrollbar-hide">
          {children}
        </main>

        {/* Right Sidebar */}
        <aside className="w-full border-1 border-brand bg-brand-white overflow-y-auto h-full p-[40px] scrollbar-hide rounded-3xl space-y-[20px] ">
          <div className="w-full font-fira space-y-[16px]">
            <div className="text-brand flex justify-between items-center">
              <span className="text-[18px]">Recipes</span>
              <span className="font-inter text-[10px]">View all</span>
            </div>
            <button className="bg-brand rounded-3xl cursor-pointer w-full h-[30px] flex justify-center items-center p-5 text-brand-white gap-2">
              <Upload size={16} />
              Upload recipes
            </button>
          </div>
          {Array.from({ length: 20 }).map((_, idx) => (
            <RecipeCard key={idx} />
          ))}
        </aside>
      </div>
    </div>
  );
}
