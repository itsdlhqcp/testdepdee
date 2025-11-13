"use client";
import { Pencil } from "lucide-react";

export function BranchesList() {
  const branches = [
    { name: "Six Sight Restaurant", city: "Coimbatore" },
    { name: "Six Sight Restaurant", city: "Chennai" },
    { name: "Six Sight Restaurant", city: "Bangalore" },
  ];

  return (
    <div className="bg-white max-h-fit flex-2 rounded-3xl p-8 shadow-md border border-orange-100">
      <h1 className="text-3xl font-bold text-center text-brand mb-8">
        Branches
      </h1>

      <div className="flex flex-col gap-6">
        {branches.map((branch, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-4"
          >
            {/* Image */}
            <img
              src="https://placehold.co/120x120"
              alt={branch.name}
              className="w-28 h-28 rounded-xl object-cover"
            />

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-lg font-semibold text-gray-800">
                {branch.name}
              </h2>
              <div className="mt-3">
                <span className="px-4 py-1 border border-brand text-brand rounded-full text-sm">
                  {branch.city}
                </span>
              </div>
            </div>

            {/* Edit icon */}
            <button className="text-brand hover:opacity-80 transition-colors">
              <Pencil size={22} />
            </button>
          </div>
        ))}
      </div>

      {/* Add Branch Button */}
      <div className="flex justify-center mt-10">
        <button className="border border-brand text-brand font-medium rounded-2xl px-6 py-3 hover:bg-brand hover:text-white transition-colors">
          Add more Branch
        </button>
      </div>
    </div>
  );
}
