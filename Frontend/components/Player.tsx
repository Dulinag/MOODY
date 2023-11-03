"use client";
import { useState, useEffect } from 'react';
import usePlayer from "@/hooks/usePlayer";
import useGetSongById from '@/hooks/useGetSongById';
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import PlayerContent from '@/components/PlayerContent'
import useLoadArtistById from "@/hooks/useLoadArtistById";

const Player = () => {
    const player = usePlayer();
    const { song } = useGetSongById(player.activeId);
    const artist = useLoadArtistById(player.activeId);
    const [songUrl, setSongUrl] = useState(null);
    useEffect(() => {
        const loadSongUrl = async () => {
            const url = await useLoadSongUrl(player.activeId);
            setSongUrl(url);
        };

        loadSongUrl();
    }, [player.activeId]);

    if (!song || !songUrl || !player.activeId) {
        return null;
    }
    return (
        <div
            className="
        fixed 
        bottom-0 
        bg-black
        w-full 
        py-2 
        h-[85px] 
        px-4
      "
        >
            <PlayerContent
                song={song}
                key={songUrl || ''}
                songUrl={songUrl || ''}
                artist = {artist || ''} />
        </div>
    );
}

export default Player;