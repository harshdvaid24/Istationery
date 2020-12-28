import { StyleSheet } from 'react-native';
import GlobalStyle from '../../utils/GlobalStyles';
import { W, H,WINDOW_HEIGHT,WINDOW_WIDTH } from '../../utils/GlobalStyles';

const styles = StyleSheet.create({
  ContainerStyle:{
    flex:1,
    backgroundColor: GlobalStyle.colorSet.mainBgColor,
    justifyContent: 'center',
    alignItems: 'center',
    width:WINDOW_WIDTH,
     position: 'absolute',
     top: 0,
     bottom:0,
     height:WINDOW_HEIGHT
  }
});

export default styles;
