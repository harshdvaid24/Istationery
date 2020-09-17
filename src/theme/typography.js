import { Platform } from 'react-native';
import colors from './colors';
import GlobalStyle from './../utils/GlobalStyles';

const fontFamily = Platform.select({ android: 'sans-serif', ios: 'Helvetica' });
const fontWeightRegular = 'normal';
const fontWeightSemiBold = '600';
const fontWeightBold = 'bold';

const appbarTitleTextColor = colors.appbarTint;
const titleTextColor = colors.titleText;
const bodyTextColor = colors.bodyText;
const captionTextColor = colors.captionText;

export default {
  /**
   * Title is reserved for the title of a screen(Toolbar)
   * and the titles of Modal dialogs.
   */
  titleText: {
    fontFamily:GlobalStyle.fontSet.Regular,
    color: appbarTitleTextColor,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: fontWeightRegular,
  },
  titleTextSemiBold: {
    fontFamily:GlobalStyle.fontSet.SemiBold,
    color: appbarTitleTextColor,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: fontWeightSemiBold,
  },
  /**
   * Use the Heading style for card titles.
   */
  headingText: {
    fontFamily:GlobalStyle.fontSet.Regular,
    color: titleTextColor,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: fontWeightRegular,
  },
  headingTextBold: {
    fontFamily:GlobalStyle.fontSet.SemiBold,
    color: titleTextColor,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: fontWeightBold,
  },
  /**
   * Use the Subheading style to denote new sections within cards.
   */
  subheadingText: {
    fontFamily:GlobalStyle.fontSet.Regular,
    color: titleTextColor,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: fontWeightRegular,
  },
  subheadingTextBold: {
    fontFamily:GlobalStyle.fontSet.Bold,
    color: titleTextColor,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: fontWeightBold,
  },
  /**
   * The Body text style is used widely throughout the UI.
   * Any text that isn’t a title, heading, subheading, label
   * or caption would generally use the Body style.
   */
  bodyText: {
    fontFamily:GlobalStyle.fontSet.Regular,
    color: bodyTextColor,
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: fontWeightRegular,
  },
  bodyTextBold: {
    fontFamily:GlobalStyle.fontSet.Bold,
    color: bodyTextColor,
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: fontWeightBold,
  },
  /**
   * Use labels with form field and input elements to
   * signify the element’s function to the user.
   */
  labelText: {
    fontFamily:GlobalStyle.fontSet.Regular,
    color: titleTextColor,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: fontWeightRegular,
  },
  labelTextBold: {
    fontFamily:GlobalStyle.fontSet.Bold,
    color: titleTextColor,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: fontWeightBold,
  },
  /**
   * Use the Caption style for help/hint text.
   * It’s used with some form fields which require a description,
   * and can also be used stand-alone within a card when necessary.
   */
  captionText: {
    fontFamily:GlobalStyle.fontSet.Regular,
    color: captionTextColor,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: fontWeightRegular,
  },
  captionTextBold: {
    fontFamily:GlobalStyle.fontSet.Bold,
    color: captionTextColor,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: fontWeightBold,
  },
  /**
   * Use this style to change <Input /> element text style
   */
  inputText: {
    fontSize: 18,
    color: colors.titleText,
  },
};
