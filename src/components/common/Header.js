// libraries
import React, { useContext } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HeaderButtons, HeaderButton } from 'react-navigation-header-buttons';
import { ThemeContext } from '../../theme';
import CommonStyle from './../../utils/CommonStyle'
import GlobalStyle,{W,H,StatusbarHeight,WINDOW_HEIGHT} from './../../utils/GlobalStyles'

const MaterialHeaderButton = (props) => {
  const theme = useContext(ThemeContext);
  return (
    <HeaderButton
      IconComponent={MaterialIcons}
      iconSize={theme.dimens.headerButtonSize}
      color={GlobalStyle.colorSet.iconGrey}
      {...props}
    />
  );
};

export const MaterialHeaderButtons = (props) => {
  const theme = useContext(ThemeContext);
  return (
    <HeaderButtons
      HeaderButtonComponent={MaterialHeaderButton}
      OverflowIcon={<MaterialIcons name="more-vert" size={theme.dimens.headerButtonSize} color={GlobalStyle.colorSet.iconGrey} />}
      {...props}
    />
  );
};

export const { Item } = HeaderButtons;
