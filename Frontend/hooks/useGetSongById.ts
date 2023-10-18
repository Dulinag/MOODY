import { useEffect, useMemo, useState } from "react";


import { Song } from "@/types";
import { dummyData } from "@/data/dummydata";

const useSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | any>({});

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchSong = async () => {
    const data = dummyData.filter((song) => id === song.id)

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