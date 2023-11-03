"use client";
import {useEffect, useState} from 'react';
import { Song } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";
import SongItem from "@/components/SongItem";
import { getSongs } from '@/src/app/api/songs/route'


const PageContent = () => {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch('http://localhost:5000/songs');
      const datax = await response.json();
      setSongs(datax);
    };

    fetchSongs();
  }, []);
  const onPlay = useOnPlay(songs);
  if (songs.length === 0) {
    return (
      <div className="mt-4 text-neutral-400">
        Loading Songs ...
      </div>
    )
  }

  return ( 
    <div 
      className="
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-4
        lg:grid-cols-4 
        xl:grid-cols-5 
        2xl:grid-cols-8 
        gap-x-4
        gap-y-4 
        mt-4
      "
    >
      {songs.map((song) => (
        <SongItem
          onClick={(song_id: string) => onPlay(song_id)} 
          key={song.song_id} 
          data={song}
        />
      ))}
    </div>
  );
}
export default PageContent;