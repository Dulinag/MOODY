import { Song } from "@/types";
import { getSongs } from "@/src/app/api/songs/route"

const useLoadSongUrl = async (id?: string) => {

  if (!id) {
    return '';
  }
  const songData = await getSongs();
  const data = songData.filter((song) => id === song.song_id)
  return data[0].song_url
};

export default useLoadSongUrl;