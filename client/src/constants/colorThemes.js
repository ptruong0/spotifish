export const THEMES = {
  'classic': {
    colors: [
      // orange #F19A68
      'invert(68%) sepia(9%) saturate(2475%) hue-rotate(335deg) brightness(100%) contrast(90%)',
      // gray #9EB0B4
      'invert(76%) sepia(16%) saturate(216%) hue-rotate(143deg) brightness(89%) contrast(88%)',
      // teal #64D0B6
      'invert(70%) sepia(80%) saturate(245%) hue-rotate(115deg) brightness(93%) contrast(84%)',
      //  mauve #BA8397
      'invert(73%) sepia(12%) saturate(1022%) hue-rotate(289deg) brightness(78%) contrast(81%)',
      // dark green #76A99D
      'invert(74%) sepia(7%) saturate(1313%) hue-rotate(116deg) brightness(84%) contrast(87%)',
      // purple #9B89CD
      'invert(52%) sepia(83%) saturate(223%) hue-rotate(215deg) brightness(94%) contrast(84%)',
      // magenta #D254A7
      'invert(41%) sepia(46%) saturate(782%) hue-rotate(268deg) brightness(100%) contrast(90%)',
      // light green #B8D9A9
      'invert(95%) sepia(11%) saturate(812%) hue-rotate(43deg) brightness(89%) contrast(89%)',
      // gold #C39A2F
      'invert(59%) sepia(99%) saturate(334%) hue-rotate(6deg) brightness(88%) contrast(86%)',
      // pink #ED9D9D
      'invert(62%) sepia(44%) saturate(316%) hue-rotate(314deg) brightness(103%) contrast(94%)'
    ],
    textColor: '#FFFFFF'
  },
  'cotton candy': {
    colors: [
      // cdb4db
      'invert(99%) sepia(23%) saturate(7307%) hue-rotate(186deg) brightness(88%) contrast(93%)',
      // ffc8dd
      'invert(82%) sepia(7%) saturate(1132%) hue-rotate(291deg) brightness(99%) contrast(106%)',
      // ffafcc
      'invert(81%) sepia(98%) saturate(2250%) hue-rotate(284deg) brightness(101%) contrast(105%)',
      // bde0fe
      'invert(88%) sepia(63%) saturate(5196%) hue-rotate(173deg) brightness(101%) contrast(99%)',
      // a2d2ff
      'invert(81%) sepia(74%) saturate(2358%) hue-rotate(178deg) brightness(102%) contrast(106%)',

    ],
    textColor: '#000000'
  }
}
// filter code generated through https://codepen.io/sosuke/pen/Pjoqqp

export const THEME_OPTIONS = Object.keys(THEMES)


export const getNumThemeColors = (theme) => {
  return THEMES[theme].colors.length;
}

export const modToColor = (mod, theme) => {
  return THEMES[theme].colors[mod];
}

export const getThemeTextColor = (theme) => {
  return THEMES[theme].textColor;
}