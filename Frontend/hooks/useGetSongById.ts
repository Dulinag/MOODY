import { useEffect, useMemo, useState } from "react";
import { getSongs } from "@/src/app/api/songs/route"

import { Song } from "@/types";

const useSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | any>({});

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchSong = async () => {
    const songData = await getSongs();
    const data = songData.filter((song) => id === song.song_id)

    setSong(data);
    setIsLoading(false);
    }

    fetchSong();
  }, [id]);

  return useMemo(() => ({
    isLoading,
    song
  }), [isLoading, song]);
};

export default useSongById;