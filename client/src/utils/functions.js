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