import { Dimensions } from 'react-native';
import  {H,W} from './../utils/GlobalStyles';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default {
  /**
   * App level constants
   */
  WINDOW_WIDTH: screenWidth,
  WINDOW_HEIGHT: screenHeight,
  headerButtonSize: H(26),
  borderRadius: 2,
  defaultButtonWidth: screenWidth * 0.7,
  defaultButtonHeight: 40,
  defaultInputBoxHeight: 40,
  productListItemInBetweenSpace: 1,
  productListItemImageHeight: 100,
  /**
   * HomeScreen and it's component related constants
   */
  homeProductImageWidth:"100%" ,
  homeProductImageHeight: 120,
  /**
   * SeacrhScreen and it's component related constants
   */
  searchBarHeight: 55,
  searchBarBorderRadius: 25,
  /**
   * OrderScreen and it's component related constants
   */
  orderImageWidth: 100,
  orderImageHeight: 100,
  /**
   * CartScreen and it's component related constants
   */
  cartItemImageHeight: 80,
  /**
   * Product screen and it's component related constants
   */
  productDetailImageHeight: 300,
  /**
   * Checkout Screen and it's component related constants
   */
  checkouSectionHeaderHeight: 50,
};
