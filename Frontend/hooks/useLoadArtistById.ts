import { artistData } from './../data/artistsdata';

const useLoadArtistById = (id?: string) => {
  if (!id) {
    return '';
  }
 
  const data = artistData.filter((artist) => Number(id) === artist.artist_id)
  if(data){
      return(data[0]['name'])
  }
};

export default useLoadArtistById;