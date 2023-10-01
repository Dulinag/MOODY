"use client";

import usePlayer from "@/hooks/usePlayer";
import useGetSongById from '@/hooks/useGetSongById';
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import PlayerContent from '@/components/PlayerContent'


const Player = () => {
    const player = usePlayer();
    const { song } = useGetSongById(player.activeId);
    const songUrl = useLoadSongUrl(player.activeId);

    if (!song || !songUrl || !player.activeId) {
        return null;
    }
    console.log(song)
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
                key={songUrl}
                songUrl={songUrl} />
        </div>
    );
}

export default Player;