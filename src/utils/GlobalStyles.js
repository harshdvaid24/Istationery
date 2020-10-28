import { Dimensions } from 'react-native';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

// MOCKUP_DEVICE_WIDTH
export const MOCKUP_DEVICE_WIDTH = 414;

// MOCKUP_DEVICE_HEIGHT
export const MOCKUP_DEVICE_HEIGHT = 736;

export const W = pixel => {
  return (pixel * WINDOW_WIDTH) / MOCKUP_DEVICE_WIDTH;
};

export const H = pixel => {
  return (pixel * WINDOW_HEIGHT) / MOCKUP_DEVICE_HEIGHT;
};

const _colorSet = {

 
  separatorGray: '#ECECEC',
  mainBgColor: '#F5F5F5',
  almostWhite:'#F7F7F7',
  black: '#323232',
  white: '#FFFFFF',
  whiteLight: '#f5f5f5',
  darkWhite:'#f9f8fb',
  WhiteGrey: '#fafafa',

  btnPrimary:'#ff9016',
  btnSecondary:'#850ef6',
  
  appBlack: '#686868',
  transparent: 'transparent',
  mainBgColorSemiTransparent: '#F5F5F5',
  green: '#00FF00',
  bgBlack: '#202023',
  grey: '#9392a7',
  LightGrey: '#757575',
  BorderGrey: '#e5e5e5',
};

const _fontSet = {
  bSize: 16,
  fsize: 15,
  mSize: 13,
  xSize: 11,
  // Regular: 'OpenSans-Regular',
  // Bold: 'OpenSans-Bold',
  // SemiBold: 'OpenSans-SemiBold',

  Regular :'Poppins-Regular',
  SemiBold : 'Poppins-SemiBold',
  Bold : 'Poppins-Bold',
  Black :'Poppins-Black',
  ExtraBold : 'Poppins-ExtraBold',
  Italic : 'Poppins-Italic',
  Light: 'Poppins-Light',
  Medium: 'Poppins-Medium',
  Thin: 'Poppins-Thin',
  ExtraLight: 'Poppins-ExtraLight',

  BlackItalic: 'Poppins-BlackItalic',
  SemiBoldItalic: 'Poppins-SemiBoldItalic',
  BoldItalic: 'Poppins-BoldItalic',
  ExtraBoldItalic: 'Poppins-ExtraBoldItalic',
  ExtraLightItalic: 'Poppins-ExtraLightItalic',
  LightItalic: 'Poppins-LightItalic',
  MediumItalic: 'Poppins-MediumItalic',
  ThinItalic: 'Poppins-ThinItalic',

  


};

const GlobalStyle = {
  colorSet: _colorSet,
  fontSet: _fontSet,
  windowW: WINDOW_WIDTH,
  windowH: WINDOW_HEIGHT,
  catItemSize: 90,
};

export default GlobalStyle;
