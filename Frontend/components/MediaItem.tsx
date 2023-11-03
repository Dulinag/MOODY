"use client";

import Image from "next/image";
import { Playlists } from "@/types";

interface MediaItemProps {
  data: Playlists;
  onClick?: (id: string) => void
}

const MediaItem: React.FC<MediaItemProps> = ({
  data,
  onClick,
}) => {

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
    // Gotta play music here later
    return;
  };


  return ( 
    <div
      onClick={handleClick}
      className="
        flex 
        items-center 
        gap-x-4 
        cursor-pointer 
        hover:bg-neutral-800/50 
        w-full 
        p-2 
        rounded-md
      "
    >
      <div 
        className="
          relative 
          rounded-md 
          min-h-[48px] 
          min-w-[48px] 
          overflow-hidden
        "
      >
        <Image
          fill={true}
          src={data.image_url || "/images/placeholder.gif" }
          alt="MediaItem"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{data.name}</p>
        <p className="text-neutral-400 text-sm truncate">
          {data.created_by}
        </p>
      </div>
    </div>
  );
}
 
export default MediaItem;