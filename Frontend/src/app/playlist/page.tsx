"use client"
import React, {useState, useEffect} from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar"
import Header from "@/components/Header";
import PageContent from '@/components/PageContent';
import { Playlists } from "@/types";

const PlaylistPage = () => {
    const [playlists, setPlaylists] = useState<Playlists[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const playlistData = await fetch('http://localhost:5000/playlists');
      const data = await playlistData.json();
      setPlaylists(data);
    };

    fetchPlaylists();
  }, []);

    return (
      <>
        <div className="    
                bg-neutral-700
                rounded-lg
                h-full
                w-full
                overflow-hidden
                overflow-y-auto
                ">
                <Header>     
                  <div className="flex justify-start ">
                    <Avatar >
                      <AvatarImage  src='./images/playlist.png' />
                      <AvatarFallback>Playlist Avatar</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col w-full ">
                      <p className="
                        text-xl 
                        text-center 
                        font-semibold
                        flex
                        justify-start
                        ">Playlists
                      </p>
                      <h1 className="
                      text-6xl 
                      flex 
                      items-center
                      ml-5
                      " >{}</h1>
                    </div>
                  </div>
                </Header>  
                <div className="mt-2 mb-7 px-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-white text-2xl font-semibold">
                      Your Songs
                    </h2>
                </div>
                  <div >
                    {playlists.map((playlist, index) => (
                        <div key={index}>
                        {playlist.id}
                        </div>
                    ))}
                  </div>
                </div>
        </div>
      </>
    )

  }
  
  export default PlaylistPage