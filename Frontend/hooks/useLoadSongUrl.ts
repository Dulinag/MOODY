import { Song } from "@/types";
import { dummyData } from "@/data/dummydata";

const useLoadSongUrl = (id?: string) => {

  if (!id) {
    return '';
  }

  const data = dummyData.filter((song) => id === song.id)
  return data[0].song_path
};

export default useLoadSongUrl;