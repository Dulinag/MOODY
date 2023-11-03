"use client";

import Image from "next/image";
import { Playlists } from "@/types";

interface MediaItemProps {
  data: Playlists;
}

const MediaItem: React.FC<MediaItemProps> = ({
  data
}) => {



  return ( 
    <div
      
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
          src={ "/images/playlist.png" }
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