import { StyleSheet } from 'react-native';
import GlobalStyle from '../../utils/GlobalStyles';
import { W, H } from '../../utils/GlobalStyles';

const styles = StyleSheet.create({
 mainContainar:{
    flex:1,
    width:W(340),
    // justifyContent:'center',
    backgroundColor:GlobalStyle.colorSet.white,
},
Row:{
  flex:1,
  width:W(340),
  flexDirection:'row',
  // justifyContent:'center',
  backgroundColor:GlobalStyle.colorSet.white,
  marginVertical:H(2),
},
Col1:{
  flex:1,
  width:W(170),
  height:H(35),
  justifyContent:'center',
  backgroundColor:GlobalStyle.colorSet.BorderGrey,
  marginHorizontal:H(2),
  paddingHorizontal:H(10),
  borderTopLeftRadius:W(5),
  borderBottomLeftRadius:W(5),
},
Col2:{
  flex:1,
  width:W(170),
  height:H(35),
  justifyContent:'center',
  backgroundColor:GlobalStyle.colorSet.BorderGrey,
  marginHorizontal:H(2),
  paddingHorizontal:H(10),
  borderTopRightRadius:W(5),
  borderBottomRightRadius:W(5),
},
ItemTextContainer:{
  // width:W(320),
  marginLeft:W(20)
},
emptyListContainerStyle:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: GlobalStyle.colorSet.white,
},
headerRight:{
  flexDirection:'row',
  alignItems:'center'
},
  Rewardstitle:{
    justifyContent: 'center',
    alignItems: 'center',
    width:W(340),
    height:H(40),
    borderRadius:W(5),
    backgroundColor: GlobalStyle.colorSet.btnPrimary,
  },
  graphSec:{
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    width:W(340),
    height:H(140),
    borderRadius:W(5),
    backgroundColor: GlobalStyle.colorSet.BorderGrey,
    marginBottom:H(20)
  },
  Icon:{
    width:W(160),
    height:H(80),
  }

});

export default styles;
