export const arrayToString = (arr) => {
  let result = '';
  for (let x of arr) {
    result += x;
    result += ', '

  }
  result = result.replace(/,\s*$/, "");  
  return result;
}

export const findMyTopTrackForArtist = (artistID, myTopTracks) => {
  for (let track of myTopTracks) {
    for (let artist of track.artists) {
      if (artist.id === artistID) {
        return track.name;
      }
    }
  }
  return 'N/A';
}

export const truncate = (str, maxLen) => {
  return str.length > maxLen ? str.substring(0, maxLen) + '...' : str;
}

export const getArtistInfoFromId = (topArtists, artistId) => {
  if (topArtists) {
    console.log(topArtists)
    for (let i = 0; i < topArtists.length; i++) {
      if (topArtists[i].id === artistId) {
        return [i, topArtists[i]];
      }
    }
  }
  return [null, { id: artistId }];
}