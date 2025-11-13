import React from "react";
import { Smile, MapPin, Image as ImageIcon } from "lucide-react";

export function PostForm() {
  return (
    <div className="w-full mx-auto bg-brand-white rounded-2xl flex flex-col gap-3 ring-1 ring-brand p-[20px]">
      <div className="flex items-center gap-3">
        <img
          src="https://placehold.co/48x48/78f432/fffff?text=U"
          alt="User avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <input
          type="text"
          placeholder="What’s on your mind about food, Shalini Sri?"
          className="flex-1 text-gray-700 bg-gray-100 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div className="flex justify-around border-t border-gray-500 pt-[18px] text-sm text-gray-600">
        <button className="flex items-center gap-2 hover:text-orange-500 transition cursor-pointer">
          <MapPin size={18} />
          <span>Location</span>
        </button>
        <button className="flex items-center gap-2 hover:text-orange-500 transition cursor-pointer">
          <ImageIcon size={18} />
          <span>Photo/Videos</span>
        </button>
        <button className="flex items-center gap-2 hover:text-orange-500 transition cursor-pointer">
          <Smile size={18} />
          <span>Feelings/activity</span>
        </button>
      </div>
    </div>
  );
}
