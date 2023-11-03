"use client"
import React, {useState, useEffect} from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar"
import Header from "@/components/Header";
import PageContent from '@/components/PageContent';
import { Playlists, Song } from "@/types";
import { useParams } from 'next/navigation'
import useGetSongById  from '@/hooks/useGetSongById';
import SongItem from '@/components/SongItem';
import useOnPlay from "@/hooks/useOnPlay";

const PlaylistPage = () => {
const [playlist, setPlaylist] = useState<Playlists | null>(null);
const [songs, setSongs] = useState<Song[]>([]);
let songIds = []; 
const onPlay = useOnPlay(songs)
const {id} = useParams()

    useEffect(() => {
        const fetchPlaylists = async () => {
            const playlistData = await fetch('http://localhost:5000/playlists');
            const data = await playlistData.json();
            const foundPlaylist = data.find(playlist => Number(playlist.id) === Number(id));
            setPlaylist(foundPlaylist);
            songIds = foundPlaylist.songs
        };

        const filterSongs = (songs, songIds) => {
            return songs.filter(song => {
              return songIds.includes(song.song_id); 
            });
          }

        const fetchSongs = async () => {
            const songData = await fetch('http://localhost:5000/songs');
            const datax = await songData.json();
            const filtered = filterSongs(datax,songIds);
            console.log(filtered)
            setSongs(filtered);
            };
        fetchPlaylists();
        fetchSongs();
       
    }, [id]);


    return (
      <>
      {playlist && 
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
                      <AvatarImage  src='/images/playlist.png' />
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
                      " >{playlist.name}</h1>
                    </div>
                  </div>
                </Header>  
                <div className="mt-2 mb-7 px-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-white text-2xl font-semibold">
                      Your Songs
                    </h2>
                </div>
                  <div className="
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
                ">
                  {songs.map((song) => (
                    <SongItem
                    onClick={(song_id: string) => onPlay(song_id)} 
                    key={song.song_id} 
                    data={song}
                    />
                ))}
                  </div>
                </div>
        </div>
        }
      </>
    )

  }
  
  export default PlaylistPage