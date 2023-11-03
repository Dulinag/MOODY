"use client"
import {useState, useEffect } from 'react'
import { TbPlaylist } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'
import { dummyData } from '@/data/dummydata'
import MediaItem from './MediaItem'
import { getPlaylists } from '@/src/app/api/playlists/route'
import { Playlists } from "@/types";

const Library = () => {
  const [playlists, setPlaylists] = useState<Playlists[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const playlistData = await getPlaylists();
      console.log(playlistData)
      setPlaylists(playlistData);
    };

    fetchPlaylists();
  }, []);
    return (
    <div className="flex flex-col">
        <div className="flex items-center justify-between px-5 pt-4">
            <div className="inline-flex items-center gap-x-2">
                <TbPlaylist size={26} className="text-neutral-400" />
                <p className="text-neutral-400 font-medium text-md"> Your Playlists</p>
            </div>
            <AiOutlinePlus 
                onClick = {() => console.log('Logic for adding playlist here later')} size={20} className="text-neutral-400 cursor-pointer hover:text-white transition"/>
        </div>
        <div className="flex flex-col gap-y-2 mt-4 px-3">
            {playlists.map((item) => (
              <MediaItem 
              onClick ={() => (console.log('hi'))}
              key={item.id}
              data={item}/>
            ))}
        </div>
    </div>
  )
}

export default Library