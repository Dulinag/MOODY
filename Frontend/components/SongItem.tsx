"use client";

import Image from "next/image";
import { Song } from "@/types";
import PlayButton from "./PlayButton";
import useLoadArtistById from "@/hooks/useLoadArtistById";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({
  data,
  onClick
}) => {

  return ( 
    <div
      onClick={() => onClick(data.song_id)} 
      className="
        relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-1 bg-neutral-400/5 cursor-pointer 
        hover:bg-neutral-400/10 transition p-2 
      "
    >
      <div 
        className="
        relative 
        aspect-square 
        w-full
        h-full 
        rounded-md 
        overflow-hidden
        "
      >
        <Image
          className="object-cover"
          src={data.image_url || '/images/placeholder.gif'}
          fill
          alt="Image"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">
          {data.title}
        </p>
        <p 
          className="
            text-neutral-400 
            text-sm 
            pb-4 
            w-full 
            truncate
          "
        >
          By {useLoadArtistById(data.artist_id)}
        </p>
      </div>
      <div 
        className="
          absolute 
          bottom-24 
          right-5
        "
      >
        <PlayButton />
      </div>
    </div>
   );
}
 
export default SongItem;