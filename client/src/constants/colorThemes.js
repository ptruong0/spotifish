
// list of themes
// filters used inside of hex codes to dynamically set colors of fish images
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
  },
  'spongebob': {
    colors: [ 
      // fff31d
      'invert(91%) sepia(40%) saturate(1478%) hue-rotate(334deg) brightness(105%) contrast(108%)',
      // fe9285
      'invert(54%) sepia(73%) saturate(419%) hue-rotate(315deg) brightness(115%) contrast(106%)',
      // b8dfd1
      'invert(100%) sepia(51%) saturate(624%) hue-rotate(77deg) brightness(92%) contrast(88%)',
      // f94a45
      'invert(47%) sepia(67%) saturate(6031%) hue-rotate(340deg) brightness(113%) contrast(96%)',
      // #ad7d4b
      'invert(50%) sepia(44%) saturate(448%) hue-rotate(350deg) brightness(95%) contrast(95%)'
    ],
    textColor: '#000000'
  },
  'pastel': {
    colors: [
      // ffadad
      'invert(100%) sepia(84%) saturate(6021%) hue-rotate(290deg) brightness(99%) contrast(104%)',
      // ffd6a5
      'invert(87%) sepia(51%) saturate(4834%) hue-rotate(296deg) brightness(108%) contrast(103%)',
      // fdffb6
      'invert(90%) sepia(27%) saturate(392%) hue-rotate(14deg) brightness(104%) contrast(107%)',
      // caffbf
      'invert(95%) sepia(6%) saturate(1673%) hue-rotate(52deg) brightness(99%) contrast(106%)',
      // 9bf6ff
      'invert(84%) sepia(37%) saturate(547%) hue-rotate(156deg) brightness(103%) contrast(102%)',
      // a0c4ff
      'invert(83%) sepia(14%) saturate(7287%) hue-rotate(186deg) brightness(105%) contrast(103%)',
      // bdb2ff
      'invert(68%) sepia(12%) saturate(5375%) hue-rotate(204deg) brightness(112%) contrast(109%)'
    ], 
    textColor: '#000000'
  },
  'vintage': {
    colors: [ 
      // cb997e
      'invert(68%) sepia(9%) saturate(1374%) hue-rotate(337deg) brightness(96%) contrast(82%)',
      // ddbea9
      'invert(80%) sepia(13%) saturate(506%) hue-rotate(341deg) brightness(97%) contrast(88%)',
      // ffe8d6
      'invert(99%) sepia(27%) saturate(1989%) hue-rotate(296deg) brightness(104%) contrast(102%)',
      // b7b7a4
      'invert(92%) sepia(9%) saturate(411%) hue-rotate(22deg) brightness(81%) contrast(84%)',
      // a5a58d
      'invert(70%) sepia(19%) saturate(263%) hue-rotate(22deg) brightness(91%) contrast(86%)'
    ],
    textColor: '#301f0d'
  }
}
// filter code generated through https://codepen.io/sosuke/pen/Pjoqqp

export const THEME_OPTIONS = Object.keys(THEMES)


// number of colors in theme set
export const getNumThemeColors = (theme) => {
  return THEMES[theme].colors.length;
}

// map mod to color
export const modToColor = (mod, theme) => {
  return THEMES[theme].colors[mod];
}

// text color of theme
export const getThemeTextColor = (theme) => {
  return THEMES[theme].textColor;
}