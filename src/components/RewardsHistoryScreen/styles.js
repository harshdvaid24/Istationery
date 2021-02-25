import { StyleSheet } from 'react-native';
import GlobalStyle from '../../utils/GlobalStyles';
import { W, H } from '../../utils/GlobalStyles';

const styles = StyleSheet.create({
 cardRow:{
    flex:1,
    width:W(370),
    // justifyContent:'center',
    backgroundColor:GlobalStyle.colorSet.white,
    marginVertical:H(1),
    paddingVertical:H(20),
    paddingHorizontal:W(20)
},
ItemTextContainer:{
  // width:W(320),
  marginLeft:W(20)
},
emptyListContainerStyle:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: GlobalStyle.colorSet.darkWhite,
},
headerRight:{
  flexDirection:'row',
  alignItems:'center'
},
});

export default styles;
