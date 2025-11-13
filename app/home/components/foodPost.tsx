"use client";
import React, { useState, useEffect, useRef } from "react";
import type Player from "video.js/dist/types/player";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  UserPlus,
  MapPin,
  Clock,
} from "lucide-react";

interface VideoJsPlayerProps {
  src: string;
}

function VideoJsPlayer({ src }: VideoJsPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    const loadVideoJs = async () => {
      const videojs = (await import("video.js")).default;

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/video.js/8.10.0/video-js.min.css";
      document.head.appendChild(link);

      if (!playerRef.current && videoRef.current) {
        playerRef.current = videojs(videoRef.current, {
          controls: true,
          responsive: true,
          fluid: true,
          // width: 650,
          // height: 530,
          preload: "auto",
          playbackRates: [0.5, 1, 1.5, 2],
        });
      }
    };

    loadVideoJs();

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player className="w-full h-full">
      <video ref={videoRef} className="video-js vjs-big-play-centered">
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

export function FoodPost() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(100);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="max-full mx-auto bg-white rounded-3xl shadow-sm border border-gray-200 ring-1 ring-brand">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src="https://placehold.co/48x48/8b5cf6/ffffff?text=J"
            alt="Jenifer"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">Jenifer</span>
              <img src={"/green-verified.svg"} alt="green-verified" />
              <span className="px-2 py-0.5 text-xs font-medium text-orange-600 bg-orange-50 rounded-full border border-orange-200">
                Foodie
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>
                Diet | Favourite Cuisine | Favourite Dish | Types of Enthusiast
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
              <span className="flex flex-row gap-1 items-center justify-center">
                <MapPin className="w-[12px] h-[12px]" /> Coimbatore
              </span>
              <span className="flex flex-row gap-1 items-center justify-center">
                <Clock className="w-[12px] h-[12px]" /> 50 min ago
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-4 py-1.5 text-sm font-medium text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition">
            <UserPlus className="w-4 h-4" />
            Follow
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition">
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 text-sm leading-relaxed">
          A luxurious twist on a classic comfort dish! This pasta is tossed in a
          silky, rich truffle cream sauce made with sautéed wild mushrooms,
          garlic, and a hint of parmesan. Each bite melts in your mouth with
          earthy truffle aroma and buttery smoothness. Perfect for a cozy dinner
          or a classy weekend treat — simple, elegant, and absolutely
          irresistible! Each bite melts in your mouth with earthy truffle aroma
          and buttery{" "}
          <span className="text-blue-600 cursor-pointer">...more</span>
        </p>
      </div>

      {/* Video Player */}
      <div className="w-full center-div">
        {/*https://trippldee.com/getfile/images/bellimages/ERCs8Akhnz47SsTT1X5EpbJQ8PZLoX8c8CB7NDSN.mp4*/}
        <VideoJsPlayer src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" />
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-600 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="text-red-500">❤️</span>
            <span className="text-blue-500">👍</span>
            {likeCount}
          </span>
          <span>👁 144</span>
        </div>
        <div className="flex items-center gap-4">
          <span>3 Comments</span>
          <span>20 Shares</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-around px-4 py-2 border-t border-gray-200">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition ${
            liked ? "text-red-500" : "text-gray-600"
          }`}
        >
          <Heart className={`w-5 h-5 ${liked ? "fill-red-500" : ""}`} />
          <span className="font-medium">Like</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-50 transition">
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium">Comment</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-50 transition">
          <Share2 className="w-5 h-5" />
          <span className="font-medium">Share</span>
        </button>
      </div>
    </div>
  );
}
