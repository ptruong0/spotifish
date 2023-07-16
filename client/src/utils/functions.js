import { MOBILE_WIDTH, RESOLUTIONS, TABLET_WIDTH } from "../constants/settings";

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

export const toggleMenu = (component, currentState, resolution, setShow) => {
  // for mobile resolution, showing one component hides all other components
  if (resolution === RESOLUTIONS.mobile && !currentState) {
      let newShow = {
        info: false,
        sidebar: false,
        settings: false
      };
      newShow[component] = true;
      setShow(newShow)
  } else if (resolution === RESOLUTIONS.tablet && !currentState) {
    // for tablet resolution, showing info hides other components
    // and showing settings/sidebar only hides info
    if (component === 'info') {
      setShow({
        info: true,
        sidebar: false,
        settings: false
      })
    } else {
      setShow((prevState) => ({
        ...prevState,
        info: false,
        [component]: !prevState[component]
      }))
    }
  } else {
    // flip the show switch for just the select component
    setShow((prevState) => ({
      ...prevState,
      [component]: !prevState[component]
    }))
  }
}