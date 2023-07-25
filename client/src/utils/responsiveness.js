import { RESOLUTIONS, MOBILE_WIDTH, TABLET_WIDTH } from "../constants/settings"

export const toggleMenu = (component, currentState, resolution, setShow, forceTrue) => {
  // for mobile resolution, showing one component hides all other components
  if (resolution === RESOLUTIONS.mobile && !currentState) {
      let newShow = {
        info: false,
        sidebar: false,
        settings: false
      }
      newShow[component] = true
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
    //
    setShow((prevState) => ({
      ...prevState,
      [component]: forceTrue ? true : !prevState[component]
    }))
  }
}

export const determineResolution = (resolution, setResolution) => {
  if (window.innerWidth < MOBILE_WIDTH) {
    if (resolution !== RESOLUTIONS.mobile) {
      setResolution(RESOLUTIONS.mobile)
    }
  } else if (window.innerWidth < TABLET_WIDTH) {
    if (resolution !== RESOLUTIONS.tablet) {
      setResolution(RESOLUTIONS.tablet)
    }
  } else {
    if (resolution !== RESOLUTIONS.desktop) {
      setResolution(RESOLUTIONS.desktop)
    }
  }
}