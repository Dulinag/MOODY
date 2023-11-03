export interface Song {
    song_id: string;
    title: string;
    artist_id: string;
    image_url: string;
    song_url: string;
    created_at: string;
  }

export interface Playlists{
  id: string;
  name: string;
  created_by: string;
  songs: number[];
}