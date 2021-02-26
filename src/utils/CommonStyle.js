import { StyleSheet, Platform, StatusBar } from 'react-native';
import GlobalStyle from './GlobalStyles';
import { W, H } from './GlobalStyles';
 
const CommonStyle = StyleSheet.create({
  topPadding: {
    paddingTop: Platform.OS == 'ios' ? 0 : H(47),
  },
  HomeTopPadding: {
    paddingTop: Platform.OS == 'ios' ? 0 : H(27),
  },
  container: {
    flex: 1,
    backgroundColor: GlobalStyle.colorSet.white,
    // paddingLeft: W(20),
    // paddingRight: W(20),
  },
  container20: {
    flex: 1,
    backgroundColor: GlobalStyle.colorSet.whiteLight,
    paddingLeft: W(20),
    paddingRight: W(20),
  },
  container15: {
    flex: 1,
    // backgroundColor: GlobalStyle.colorSet.white,
    paddingLeft: W(15),
    paddingRight: W(15),
  },
  PlainContainer: {
    flex: 1,
    backgroundColor: GlobalStyle.colorSet.white,
  },

  SimpleContainer:{
    backgroundColor:'#fff',width: '100%', height: '100%'
  },

  darkContainer:{
    backgroundColor:GlobalStyle.colorSet.darkWhite,width: '100%', height: '100%'
  },

  FlexRow: {
    flexDirection: 'row',
  },
  FlexRowCenter:{
    flexDirection: 'row',
    alignItems:'center'
  },
  FlexCol: {
    flexDirection: 'column',
    width: '50%'
  },
  FlexReverseRow: {
    flexDirection: 'row-reverse',
  },
  FlexWrap: {
    flexWrap: 'wrap',
  },

  containerPaddingLR: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: GlobalStyle.colorSet.white,
    paddingLeft: W(47),
    paddingRight: W(47),
  },
  ContainerCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GlobalStyle.colorSet.white,
  },
  VerticalCenter: {
    justifyContent: 'center',
  },

  HorizontalCenter: {
    alignItems: 'center',
  },
  alignLeft: {
    alignSelf: 'flex-start',
  },
  alignRight: {
    alignSelf: 'flex-end',
  },

  alignItemsLeft: {
    alignItems: 'flex-start',
  },
  alignItemsRight: {
    alignItems: 'flex-end',
  },

  alignSelfTop: {
    alignSelf: 'flex-start',
  },
  alignSelfBottom: {
    alignSelf: 'flex-end',
  },

  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },

  alignContentLR: {
    justifyContent: 'space-between',
  },

  LoginContainer: {
    // width:'100%',
    marginTop: H(30),
    marginBottom: H(80),
    paddingBottom:H(40),
    alignItems: 'center',
    borderWidth: 0,
    borderRadius:W(50),
    marginHorizontal:W(27),
    backgroundColor: GlobalStyle.colorSet.white,
  },
  SignUpContainer: {
    marginTop: H(30),
    marginBottom: H(20),
    paddingBottom:H(20),
    alignItems: 'center',
    borderWidth: 0,
    borderRadius:W(50),
    marginHorizontal:W(27),
    backgroundColor: GlobalStyle.colorSet.white,
  },

  SimpleCardWithBorderRadius:{
    paddingBottom:H(40),
    alignItems: 'center',
    borderWidth: 0,
    borderRadius:W(50),
    marginHorizontal:W(27),
    backgroundColor: GlobalStyle.colorSet.white,
  },

  LoginTitleView: {
    marginTop:H(200),
    paddingLeft: W(27),
    paddingRight: W(27),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  SignUpTitleView: {
    marginTop:H(80),
    paddingLeft: W(27),
    paddingRight: W(27),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  LoginTitle: {
    fontSize: W(30),
    fontFamily: GlobalStyle.fontSet.SemiBold,
    color: GlobalStyle.colorSet.white,
  },
  BusinessTitle: {
    fontSize: W(22),
    fontFamily: GlobalStyle.fontSet.SemiBold,
    color: GlobalStyle.colorSet.btnPrimary,
  },
  LoginSubTitle: {
    fontSize: W(16),
    fontFamily: GlobalStyle.fontSet.Regular,
    color: GlobalStyle.colorSet.white,
    textAlign: 'center',
  },
  SignUpSubTitle: {
    fontSize: W(16),
    fontFamily: GlobalStyle.fontSet.Regular,
    color: GlobalStyle.colorSet.white,
    textAlign: 'center',
  },
  LoginSubBoldTitle: {
    fontSize: W(16),
    fontFamily: GlobalStyle.fontSet.SemiBold,
    color: GlobalStyle.colorSet.white,
    textAlign: 'center',
  },

  Links: {
    fontSize: W(16),
    fontFamily: GlobalStyle.fontSet.Regular,
    color: GlobalStyle.colorSet.white,
    textDecorationLine: 'underline',
  },

  underline:{
    textDecorationLine: 'underline',
  },

  BtnFacebook: {
    width: '100%',
    backgroundColor: GlobalStyle.colorSet.BtnFB,
    height: W(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: W(3),
  },

  BtnOTP: {
    width: '100%',
    backgroundColor: GlobalStyle.colorSet.btnPrimary,
    height: W(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: W(20),
  },
  Icon10: {
    height: W(10),
    width: W(10),
  },
  Icon15: {
    height: W(15),
    width: W(15),
  },
  Icon20: {
    height: W(20),
    width: W(20),
  },
  Icon25: {
    height: W(25),
    width: W(25),
  },
  Icon30: {
    height: W(30),
    width: W(30),
  },
  Icon40: {
    height: W(40),
    width: W(40),
  },
  Icon60: {
    height: W(60),
    width: W(60),
  },
  Icon100: {
    height: W(100),
    width: W(100),
  },
  Icon150: {
    height: W(150),
    width: W(150),
  },
  Icon200: {
    height: W(200),
    width: W(200),
  },
  BtnOTPText: {
    fontSize: W(16),
    fontFamily: GlobalStyle.fontSet.Bold,
    color: GlobalStyle.colorSet.white,
  },
  BtnOTPTextAlreadyReg: {
    fontSize: W(14),
    color: GlobalStyle.colorSet.grey,
    fontFamily:GlobalStyle.fontSet.SemiBold
  },
  greyLinkButton: {
    fontSize: W(14),
    color: GlobalStyle.colorSet.grey,
    fontFamily:GlobalStyle.fontSet.SemiBold,
    textDecorationLine:'underline'
  },

  BlackLinkButton: {
    fontSize: W(14),
    color: GlobalStyle.colorSet.black,
    fontFamily:GlobalStyle.fontSet.SemiBold,
    textDecorationLine:'underline'
  },
  BtnOTPTextSignIn: {
    fontSize: W(16),
    fontFamily: GlobalStyle.fontSet.Bold,
    color: GlobalStyle.colorSet.white,
  },

  BtnFacebookText: {
    fontSize: W(15),
    fontFamily: GlobalStyle.fontSet.Regular,
    color: GlobalStyle.colorSet.white,
  },
  MTitle: {
    fontSize: W(14),
    fontFamily: GlobalStyle.fontSet.Regular,
    color: GlobalStyle.colorSet.black,
  },
  MTitleGrey: {
    fontSize: W(14),
    fontFamily: GlobalStyle.fontSet.Regular,
    color: GlobalStyle.colorSet.LightGrey,
  },
  MLinkGrey: {
    fontSize: W(14),
    fontFamily: GlobalStyle.fontSet.SemiBold,
    color: GlobalStyle.colorSet.LightGrey,
  },
  XLBTitle: {
    fontSize: W(18),
    fontFamily: GlobalStyle.fontSet.Bold,
    color: GlobalStyle.colorSet.black,
  },
  XLBlackTitle: {
    fontSize: W(30),
    fontFamily: GlobalStyle.fontSet.AmericanTypewriter,
    color: GlobalStyle.colorSet.black,
  },
  LBTitle: {
    fontSize: W(18),
    fontFamily: GlobalStyle.fontSet.SemiBold,
    color: GlobalStyle.colorSet.black,
  },
  LBTitleGrey: {
    fontSize: W(18),
    fontFamily: GlobalStyle.fontSet.SemiBold,
    color: GlobalStyle.colorSet.LightGrey,
  },
  MBTitle: {
    fontSize: W(16),
    fontFamily: GlobalStyle.fontSet.SemiBold,
    color: GlobalStyle.colorSet.black,
  },

  MBlueTitle: {
    fontSize: W(14),
    fontFamily: GlobalStyle.fontSet.SemiBold,
    color: GlobalStyle.colorSet.btnBlue,
    textDecorationLine: 'underline'
  },

  LWhiteTitle: {
    fontSize: W(16),
    fontFamily: GlobalStyle.fontSet.Bold,
    color: GlobalStyle.colorSet.white,
    marginLeft: W(5),
    marginRight: W(5),
  },
  MWhiteTitle: {
    fontSize: W(14),
    fontFamily: GlobalStyle.fontSet.Bold,
    color: GlobalStyle.colorSet.white,
    marginLeft: W(5),
    marginRight: W(5),
  },
  MredTitle: {
    fontSize: W(14),
    fontFamily: GlobalStyle.fontSet.Bold,
    color: GlobalStyle.colorSet.txtRed,
    marginLeft: W(5),
    marginRight: W(5),
  },
  LredTitle: {
    fontSize: W(16),
    fontFamily: GlobalStyle.fontSet.Bold,
    color: GlobalStyle.colorSet.txtRed,
    marginLeft: W(5),
    marginRight: W(5),
  },
  LWhiteTitle: {
    fontSize: W(16),
    fontFamily: GlobalStyle.fontSet.Bold,
    color: GlobalStyle.colorSet.white,
    marginLeft: W(5),
    marginRight: W(5),
  },
  MredSBTitle: {
    fontSize: W(14),
    fontFamily: GlobalStyle.fontSet.SemiBold,
    color: GlobalStyle.colorSet.txtRed,
    marginLeft: W(5),
    marginRight: W(5),
  },
  SredSBTitle: {
    fontSize: W(13),
    fontFamily: GlobalStyle.fontSet.SemiBold,
    color: GlobalStyle.colorSet.txtRed,
    marginLeft: W(5),
    marginRight: W(5),
  },

  MredSBLink: {
    fontSize: W(14),
    textDecorationLine: 'underline',
    fontFamily: GlobalStyle.fontSet.SemiBold,
    color: GlobalStyle.colorSet.txtRed,
    marginLeft: W(5),
    marginRight: W(5),
  },

  LredSBLink: {
    fontSize: W(16),
    // textDecorationLine: 'underline',
    fontFamily: GlobalStyle.fontSet.SemiBold,
    color: GlobalStyle.colorSet.txtRed,
    marginLeft: W(5),
    marginRight: W(5),
  },

  SimpleInput: {
    // height: H(45),
    // marginHorizontal:W(20),
    // justifyContent:'center',
    // fontFamily: GlobalStyle.fontSet.Regular,
    borderBottomWidth: 0.9,
    borderWidth:0,
    borderBottomColor: GlobalStyle.colorSet.BorderGrey,
    borderRadius:W(1),
  },
  SimpleInputWithoutMargin: {
    height: H(45),
    fontSize: W(16),
    justifyContent:'center',
    fontFamily: GlobalStyle.fontSet.Regular,
    borderBottomWidth: 0.9,
    borderWidth:0,
    borderBottomColor: GlobalStyle.colorSet.BorderGrey,
    borderRadius:W(1),
    color: GlobalStyle.colorSet.black,
    // backgroundColor: 'white',
    marginTop: W(15),
    paddingLeft:W(15),
  },
 
  SimpleInputFixedWidth: {
    height: H(45),
    fontSize: W(16),
    justifyContent:'center',
    fontFamily: GlobalStyle.fontSet.Regular,
    borderBottomWidth: 0.9,
    borderWidth:0,
    borderBottomColor: GlobalStyle.colorSet.BorderGrey,
    borderRadius:W(1),
    color: GlobalStyle.colorSet.black,
    width:W(120),
    // backgroundColor: 'white',
     marginTop: W(15),
    // paddingLeft:W(15),
  },
  SimpleSmallInput: {
    height: H(45),
    fontSize: W(16),
    justifyContent:'center',
    fontFamily: GlobalStyle.fontSet.Regular,
    borderBottomWidth: 0.9,
    borderWidth:0,
    borderBottomColor: GlobalStyle.colorSet.BorderGrey,
    borderRadius:W(1),
    marginHorizontal:W(10),
    color: GlobalStyle.colorSet.black,
    // backgroundColor: 'white',
    marginTop: W(15),
  },
  SimpleDatePicker: {
    height: H(45),
    justifyContent:'center',
    alignItems:'flex-start',
    fontFamily: GlobalStyle.fontSet.Regular,
    borderBottomWidth: 0.9,
    borderWidth:0,
    borderBottomColor: GlobalStyle.colorSet.BorderGrey,
    borderRadius:W(1),
    color: GlobalStyle.colorSet.black,
    // backgroundColor: 'white',
    marginTop: W(15),
    paddingLeft:W(5),
  },
  Dropdown: {
    // height: H(75),
    fontSize: W(16),
    fontFamily: GlobalStyle.fontSet.Regular,
    borderBottomWidth: 0.9,
    color: GlobalStyle.colorSet.white,
    // backgroundColor: 'white',
    borderBottomColor: GlobalStyle.colorSet.appBlack,
     marginTop: W(15),
    paddingLeft:W(15),
    width: '100%',
  },
  CustomTextInput: {
    marginLeft: W(55),
    height: W(40),
    fontSize: W(16),
    fontFamily: GlobalStyle.fontSet.Regular,
    borderBottomWidth: 0.9,
    color: GlobalStyle.colorSet.white,
    // backgroundColor: 'white',
    borderBottomColor: GlobalStyle.colorSet.appBlack,
    marginTop: W(15),
    width: '80%',
  },

  // Navigation header title
  HeaderTitle: {
    height: H(38),
    paddingLeft: W(10),
    width: '80%',
    justifyContent: 'center'
  },

  DriverTextInput: {
    height: W(40),
    fontSize: W(16),
    fontFamily: GlobalStyle.fontSet.Regular,
    borderBottomWidth: 0.9,
    color: GlobalStyle.colorSet.white,
    // backgroundColor: 'white',
    borderBottomColor: GlobalStyle.colorSet.appBlack,
    marginTop: W(15),
    width: '90%',
  },


  CountryInput: {
    // paddingLeft: W(20),
    fontSize: W(14),
    justifyContent: 'center',
    maxWidth: W(60),
    // height: W(50),
    color: GlobalStyle.colorSet.white,
    fontFamily: GlobalStyle.fontSet.Regular,
    marginTop: Platform.OS === 'ios' ? W(27) : W(17),
  },
  CountryCodeView: {
    height:H(35),
     alignItems: 'center',
    flexDirection:'row'
    },

  TextAlineLeft: {
    textAlign: 'left',
  },
  TextAlineRight: {
    textAlign: 'right',
  },
  TextAlineCenter: {
    textAlign: 'center',
  },
  AlignItemsStart: {
    alignItems: 'flex-start',
  },
  AlignItemsEnd: {
    alignItems: 'flex-end',
  },
  ColorTxtRed: {
    color: GlobalStyle.colorSet.txtRed,
  },
  ColorTxtGrey: {
    color: GlobalStyle.colorSet.grey,
  },
  ColorWhite: {
    color: GlobalStyle.colorSet.white,
  },
  BGColorRed: {
    backgroundColor: GlobalStyle.colorSet.btnRed,
  },
  BGColorWhite: {
    backgroundColor: GlobalStyle.colorSet.white,
  },
  BGColorBlack: {
    backgroundColor: GlobalStyle.colorSet.black,
  },
  border1: {
    borderColor: GlobalStyle.colorSet.black,
    borderWidth: 1,
  },
  borderGrey: {
    borderColor: GlobalStyle.colorSet.black,
    borderWidth: 1,
  },
  borderPrimary2: {
    borderColor: GlobalStyle.colorSet.btnPrimary,
    borderWidth: 2,
  },
  SelectedGrey: {
    backgroundColor:GlobalStyle.colorSet.whiteLight,
    
  },
  borderBottomGrey: {
    borderBottomColor: GlobalStyle.colorSet.BorderGrey,
    borderBottomWidth: 2,
  },
  borderBottomAppBlack: {
    borderBottomColor: GlobalStyle.colorSet.appBlack,
    borderBottomWidth: 1,
  },
  borderRadius2: {
    borderRadius: 2
  },
  borderRadius5: {
    borderRadius: 5
  },
  borderRadius7: {
    borderRadius: 7
  },
  borderRadius10: {
    borderRadius: 10
  },
  borderRadius20: {
    borderRadius: 20
  },
  borderRadius30: {
    borderRadius: 30
  },
  borderRadius40: {
    borderRadius: 40
  },
  headerContainer: {
    height: Platform.OS === 'ios' ? H(53) : H(83),
    borderColor: GlobalStyle.colorSet.black,
    borderWidth: 1,
    elevation: 0,
    shadowOpacity: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    borderBottomColor: GlobalStyle.colorSet.white,
    borderBottomWidth: 0,

    backgroundColor: GlobalStyle.colorSet.white,
    // flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    // flexDirection: 'row',
  },

  HeaderSec: {
    height: H(38),
    width: '90%',
    alignItems: 'center'
  },

  headerContainerCart: {
    height: H(80),
    backgroundColor: GlobalStyle.colorSet.white,
    paddingTop: Platform.OS === 'ios' ? W(20) : W(20),
    flexDirection: 'row',
  },
  headerTransparentContainer: {
    // position: 'absolute',
    height: Platform.OS === 'ios' ? H(53) : H(83),
    borderColor: GlobalStyle.colorSet.black,
    borderWidth: 1,
    elevation: 0,
    shadowOpacity: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,

    backgroundColor: 'red',
    // flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    // flexDirection: 'row',
  },

  headerWhiteContainer: {
    height: Platform.OS === 'ios' ? H(80) : H(83),
    // borderColor: GlobalStyle.colorSet.black,
    // borderWidth: 1,
    backgroundColor: GlobalStyle.colorSet.white,
    paddingTop: Platform.OS === 'ios' ? H(28) : StatusBar.currentHeight,
  },

  HeaderLeftBtn: {
    marginBottom: W(5),
    paddingVertical: W(10),
    paddingHorizontal: W(25)
  },
  headerTransparentLeftBtn: {
    marginBottom: W(5),
    paddingVertical: W(10),
    paddingHorizontal: W(25)
  },

  TransparentHeader: {
    position: 'absolute',
    height: H(50),
    top: Platform.OS == 'ios' ? 10 : H(50),
    justifyContent: 'center',
    // borderWidth: W(1),
    // borderColor: GlobalStyle.colorSet.BorderGrey,
  },

  BottomBtnSection: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: H(70),
    backgroundColor: GlobalStyle.colorSet.white,
  },

  BottomSaveBtnSection: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: H(80),
    backgroundColor: GlobalStyle.colorSet.white,
  },
  BottomPrimaryColorSaveBtnSection: {
    position: 'absolute',
    bottom: H(20),
    width: '90%',
    height: H(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:W(10),
    backgroundColor: GlobalStyle.colorSet.btnPrimary,
  },
  BottomRedButton: {
    height: H(50),
    width: W(127),
    borderRadius: W(3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyle.colorSet.btnRed,
  },
  PrimaryBtn:{
    height: H(40),
    width: W(277),
    borderRadius: W(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  PrimaryBtnSmall:{
    height: H(40),
    // width: W(277),
    marginHorizontal:W(20),
    borderRadius: W(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  BottomRedFullButton: {
    height: H(50),
    width: '100%',
    borderRadius: W(3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyle.colorSet.btnRed,
  },

  TransparentBackBtn: {
    height: H(40),
    width: H(40),
    top: H(39),
    position: 'absolute',
    // backgroundColor: 'white',
    left: H(20),
    justifyContent: 'center',
  },

  // height: H(18), width: H(10)



  DrawerToggle: {
    position:'absolute',
    top:W(40),
    left:W(30)
   },

   DrowDownWithInputContainer:{
    height:H(55),
    flexDirection:'row',
    alignItems:'center'
   },
   DropdownContainer:{
    height:H(58),
    // paddingRight:W(10),
    alignSelf:'flex-end',
    justifyContent:'flex-end'
   },
   SmallDropdownContainer:{
    height:H(55),
    paddingRight:W(10),
    alignSelf:'flex-end',
    justifyContent:'flex-end'
   },
   DropdownWithBorder:{
    borderBottomColor: GlobalStyle.colorSet.BorderGrey,
    borderBottomWidth: 0.9,
    // flexDirection:'row',
    width:'100%',
    paddingBottom:H(10),
   },
   smallDropdownWithBorder:{
    borderBottomColor: GlobalStyle.colorSet.BorderGrey,
    borderBottomWidth: 1,
    // flexDirection:'row',
    width:'100%',
    paddingBottom:H(10),
   },
   DropdownIcon:{
    position:'absolute',
    right:W(10),
    top:H(3),
    height:W(15),
    width:W(15)
   },
   DropDownText:{
    fontSize: W(16),
    fontFamily: GlobalStyle.fontSet.SemiBold,
    color: GlobalStyle.colorSet.black,
    // marginLeft:W(10)
   },
   DropDownDisabledText:{
    fontSize: W(16),
    fontFamily: GlobalStyle.fontSet.Regular,
    color: GlobalStyle.colorSet.BorderGrey,
   },


   card:{
    //  width:"100%",
     marginVertical:H(5),
     elevation:0,
     borderRadius:W(5),
     backgroundColor:'#fff',
     padding:W(15)
    },
    smallCard:{
      width:"100%",
      marginVertical:H(5),
      elevation:0,
      borderRadius:W(5),
      backgroundColor:'#fff',
      padding:W(5)
    },
    SelectableButton:{
      flexDirection:'row',
      width: "100%",
      marginRight:W(20),
      borderRadius:W(5),
      justifyContent:'space-between',
      alignItems:'center',
      color:GlobalStyle.colorSet.btnPrimary,
      backgroundColor:GlobalStyle.colorSet.white,
      borderColor:GlobalStyle.colorSet.BorderGrey,
      borderWidth:1,
      padding:W(10),
      
     },
     ActiveSelectableButton:{
      flexDirection:'row',
      width: "90%",
      marginRight:W(20),
      borderRadius:W(5),
      justifyContent:'space-between',
      alignItems:'center',
      color:GlobalStyle.colorSet.white,
      backgroundColor:GlobalStyle.colorSet.btnPrimary,
      borderColor:GlobalStyle.colorSet.btnPrimary,
      borderWidth:2,
      padding:W(10),
      
     },
     SelectableButtonTxt:{
       fontSize:W(14),
       fontFamily:GlobalStyle.fontSet.SemiBold,
       color:GlobalStyle.colorSet.grey,
     },
     ActiveSelectableButtonTxt:{
      fontSize:W(14),
      fontFamily:GlobalStyle.fontSet.SemiBold,
      color:GlobalStyle.colorSet.white,
     },

     

   
  //  Spalsh screen
  
  spalshView: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: GlobalStyle.colorSet.white,
  },

width10p:{width:'10%'},
width15p:{width:'15%'},
width20p:{width:'20%'},
width25p:{width:'25%'},
width30p:{width:'30%'},
width35p:{width:'35%'},
width40p:{width:'40%'},
width45p:{width:'45%'},
width50p:{width:'50%'},
width60p:{width:'60%'},
width70p:{width:'70%'},
width75p:{width:'75%'},
width80p:{width:'80%'},
width85p:{width:'85%'},
width90p:{width:'90%'},
width100p:{width:'100%'},

  marginTop2: { marginTop: H(2) },
  marginTop5: { marginTop: H(5) },
  marginTop10: { marginTop: W(10) },
  marginTop20: { marginTop: W(20) },
  marginTop30: { marginTop: W(30) },
  marginTop40: { marginTop: W(40) },
  marginTop50: { marginTop: W(50) },
  marginTop55: { marginTop: W(55) },
  marginTop60: { marginTop: H(60) },

  marginTop15: { marginTop: W(15) },
  marginTop25: { marginTop: W(25) },
  marginTop35: { marginTop: W(35) },
  marginTop45: { marginTop: W(45) },

  marginBottom2: { marginBottom: W(2)},
  marginBottom5: { marginBottom: W(5) },
  marginBottom10: { marginBottom: W(10) },
  marginBottom20: { marginBottom: W(20) },
  marginBottom30: { marginBottom: W(30) },
  marginBottom40: { marginBottom: W(40) },

  marginBottom15: { marginBottom: W(15) },
  marginBottom25: { marginBottom: W(25) },
  marginBottom35: { marginBottom: W(35) },
  marginBottom45: { marginBottom: W(45) },

  marginLR5: { marginLeft: W(5), marginRight: W(5) },
  marginLR10: { marginLeft: W(10), marginRight: W(10) },
  marginLR15: { marginLeft: W(15), marginRight: W(15) },
  marginLR20: { marginLeft: W(20), marginRight: W(20) },
  marginLR30: { marginLeft: W(30), marginRight: W(30) },
  marginLR40: { marginLeft: W(40), marginRight: W(40) },
  marginLR50: { marginLeft: W(50), marginRight: W(50) },
  marginL10: { marginLeft: W(10)},
  marginL20: { marginLeft: W(20)},

  marginTB2: { marginTop: W(2), marginBottom: W(2) },
  marginTB5: { marginTop: W(5), marginBottom: W(5) },
  marginTB10: { marginTop: W(10), marginBottom: W(10) },
  marginTB20: { marginTop: W(20), marginBottom: W(20) },
  marginTB30: { marginTop: W(30), marginBottom: W(30) },
  marginTB40: { marginTop: W(40), marginBottom: W(40) },
  marginTB50: { marginTop: W(50), marginBottom: W(50) },

  // Padding
  paddingTop10: { paddingTop: W(10) },
  paddingTop20: { paddingTop: W(20) },
  paddingTop30: { paddingTop: W(30) },
  paddingTop40: { paddingTop: W(40) },
  paddingTop50: { paddingTop: W(50) },

  paddingTop15: { paddingTop: W(15) },
  paddingTop25: { paddingTop: W(25) },
  paddingTop35: { paddingTop: W(35) },
  paddingTop45: { paddingTop: W(45) },

  paddingBottom10: { paddingBottom: W(10) },
  paddingBottom20: { paddingBottom: W(20) },
  paddingBottom30: { paddingBottom: W(30) },
  paddingBottom40: { paddingBottom: W(40) },

  paddingBottom15: { paddingBottom: W(15) },
  paddingBottom25: { paddingBottom: W(25) },
  paddingBottom35: { paddingBottom: W(35) },
  paddingBottom45: { paddingBottom: W(45) },

  paddingL10: { paddingLeft: W(10)},
  paddingL15: { paddingLeft: W(15)},
  paddingTB5: { paddingTop: W(5), paddingBottom: W(5) },
  paddingTB10: { paddingTop: W(10), paddingBottom: W(10) },
  paddingTB15: { paddingTop: H(15), paddingBottom: H(15) },
  paddingTB20: { paddingTop: W(20), paddingBottom: W(20) },
  paddingTB30: { paddingTop: W(30), paddingBottom: W(30) },
  paddingTB40: { paddingTop: W(40), paddingBottom: W(40) },
  paddingTB50: { paddingTop: W(50), paddingBottom: W(50) },


  paddingLR5: { paddingLeft: W(5), paddingRight: W(5) },
  paddingLR10: { paddingLeft: W(10), paddingRight: W(10) },
  paddingLR15: { paddingLeft: W(15), paddingRight: W(15) },
  paddingLR20: { paddingLeft: W(20), paddingRight: W(20) },
  paddingLR30: { paddingLeft: W(30), paddingRight: W(30) },
  paddingLR40: { paddingLeft: W(40), paddingRight: W(40) },
  paddingLR50: { paddingLeft: W(50), paddingRight: W(50) },


//  Text


//Black
xsBlackRegular:{
  fontSize: W(10),
  fontFamily: GlobalStyle.fontSet.Regular,
  color: GlobalStyle.colorSet.black,
},
sBlackRegular:{
  fontSize: W(12),
  fontFamily: GlobalStyle.fontSet.Regular,
  color: GlobalStyle.colorSet.black,
},

mBlackRegular:{
  fontSize: W(14),
  fontFamily: GlobalStyle.fontSet.Regular,
  color: GlobalStyle.colorSet.black,
},

lBlackRegular:{
  fontSize: W(16),
  fontFamily: GlobalStyle.fontSet.Regular,
  color: GlobalStyle.colorSet.black,
},

xlBlackRegular:{
  fontSize: W(18),
  fontFamily: GlobalStyle.fontSet.Regular,
  color: GlobalStyle.colorSet.black,
},



// primary
sPrimaryRegular:{
  fontSize: W(12),
  fontFamily: GlobalStyle.fontSet.Regular,
  color: GlobalStyle.colorSet.btnPrimary,
},

mPrimaryRegular:{
  fontSize: W(14),
  fontFamily: GlobalStyle.fontSet.Regular,
  color: GlobalStyle.colorSet.btnPrimary,
},

lPrimaryRegular:{
  fontSize: W(16),
  fontFamily: GlobalStyle.fontSet.Regular,
  color: GlobalStyle.colorSet.btnPrimary,
},

xlPrimaryRegular:{
  fontSize: W(18),
  fontFamily: GlobalStyle.fontSet.Regular,
  color: GlobalStyle.colorSet.btnPrimary,
},
xxlPrimaryRegular:{
  fontSize: W(26),
  fontFamily: GlobalStyle.fontSet.Regular,
  color: GlobalStyle.colorSet.btnPrimary,
},



mRedRegular:{
  fontSize: W(14),
  fontFamily: GlobalStyle.fontSet.Regular,
  color: GlobalStyle.colorSet.red,
},

// grey
xsGreyRegular:{
  fontSize: W(10),
  fontFamily: GlobalStyle.fontSet.Regular,
  color: GlobalStyle.colorSet.LightGrey,
},
sGreyRegular:{
  fontSize: W(12),
  fontFamily: GlobalStyle.fontSet.Regular,
  color: GlobalStyle.colorSet.LightGrey,
},

mGreyRegular:{
  fontSize: W(14),
  fontFamily: GlobalStyle.fontSet.Regular,
  color: GlobalStyle.colorSet.LightGrey,
},

lGreyRegular:{
  fontSize: W(16),
  fontFamily: GlobalStyle.fontSet.Regular,
  color: GlobalStyle.colorSet.LightGrey,
},
xlGreyRegular:{
  fontSize: W(18),
  fontFamily: GlobalStyle.fontSet.Regular,
  color: GlobalStyle.colorSet.LightGrey,
},
xxlGreyRegular:{
  fontSize: W(20),
  fontFamily: GlobalStyle.fontSet.Regular,
  color: GlobalStyle.colorSet.LightGrey,
},






// semi bold

//Black
sBlackSemiBold:{
  fontSize: W(12),
  fontFamily: GlobalStyle.fontSet.SemiBold,
  color: GlobalStyle.colorSet.black,
},

mBlackSemiBold:{
  fontSize: W(14),
  fontFamily: GlobalStyle.fontSet.SemiBold,
  color: GlobalStyle.colorSet.black,
},

lBlackSemiBold:{
  fontSize: W(16),
  fontFamily: GlobalStyle.fontSet.SemiBold,
  color: GlobalStyle.colorSet.black,
},

xlBlackSemiBold:{
  fontSize: W(18),
  fontFamily: GlobalStyle.fontSet.SemiBold,
  color: GlobalStyle.colorSet.black,
},



// primary
xsPrimarySemiBold:{
  fontSize: W(10),
  fontFamily: GlobalStyle.fontSet.SemiBold,
  color: GlobalStyle.colorSet.btnPrimary,
},
sPrimarySemiBold:{
  fontSize: W(12),
  fontFamily: GlobalStyle.fontSet.SemiBold,
  color: GlobalStyle.colorSet.btnPrimary,
},

mPrimarySemiBold:{
  fontSize: W(14),
  fontFamily: GlobalStyle.fontSet.SemiBold,
  color: GlobalStyle.colorSet.btnPrimary,
},

lPrimarySemiBold:{
  fontSize: W(16),
  fontFamily: GlobalStyle.fontSet.SemiBold,
  color: GlobalStyle.colorSet.btnPrimary,
},

xlPrimarySemiBold:{
  fontSize: W(18),
  fontFamily: GlobalStyle.fontSet.SemiBold,
  color: GlobalStyle.colorSet.btnPrimary,
},

xxlPrimarySemiBold:{
  fontSize: W(26),
  fontFamily: GlobalStyle.fontSet.SemiBold,
  color: GlobalStyle.colorSet.btnPrimary,
},



// grey
sGreySemiBold:{
  fontSize: W(12),
  fontFamily: GlobalStyle.fontSet.SemiBold,
  color: GlobalStyle.colorSet.LightGrey,
},

mGreySemiBold:{
  fontSize: W(14),
  fontFamily: GlobalStyle.fontSet.SemiBold,
  color: GlobalStyle.colorSet.LightGrey,
},

lGreySemiBold:{
  fontSize: W(16),
  fontFamily: GlobalStyle.fontSet.SemiBold,
  color: GlobalStyle.colorSet.LightGrey,
},

xlGreySemiBold:{
  fontSize: W(18),
  fontFamily: GlobalStyle.fontSet.SemiBold,
  color: GlobalStyle.colorSet.LightGrey,
},




// bold


//Black
sBlackBold:{
  fontSize: W(12),
  fontFamily: GlobalStyle.fontSet.Bold,
  color: GlobalStyle.colorSet.black,
},

mBlackBold:{
  fontSize: W(14),
  fontFamily: GlobalStyle.fontSet.Bold,
  color: GlobalStyle.colorSet.black,
},

lBlackBold:{
  fontSize: W(16),
  fontFamily: GlobalStyle.fontSet.Bold,
  color: GlobalStyle.colorSet.black,
},
xlBlackBold:{
  fontSize: W(20),
  fontFamily: GlobalStyle.fontSet.Bold,
  color: GlobalStyle.colorSet.black,
},
xxlBlackBold:{
  fontSize: W(22),
  fontFamily: GlobalStyle.fontSet.Bold,
  color: GlobalStyle.colorSet.black,
},



// primary
sPrimaryBold:{
  fontSize: W(12),
  fontFamily: GlobalStyle.fontSet.Bold,
  color: GlobalStyle.colorSet.btnPrimary,
},

mPrimaryBold:{
  fontSize: W(14),
  fontFamily: GlobalStyle.fontSet.Bold,
  color: GlobalStyle.colorSet.btnPrimary,
},

lPrimaryBold:{
  fontSize: W(16),
  fontFamily: GlobalStyle.fontSet.Bold,
  color: GlobalStyle.colorSet.btnPrimary,
},

xlPrimaryBold:{
  fontSize: W(18),
  fontFamily: GlobalStyle.fontSet.Bold,
  color: GlobalStyle.colorSet.btnPrimary,
},


// Secondary
sSecondaryBold:{
  fontSize: W(12),
  fontFamily: GlobalStyle.fontSet.Bold,
  color: GlobalStyle.colorSet.btnSecondary,
},

mSecondaryBold:{
  fontSize: W(14),
  fontFamily: GlobalStyle.fontSet.Bold,
  color: GlobalStyle.colorSet.btnSecondary,
},

lSecondaryBold:{
  fontSize: W(16),
  fontFamily: GlobalStyle.fontSet.Bold,
  color: GlobalStyle.colorSet.btnSecondary,
},

xlSecondaryBold:{
  fontSize: W(18),
  fontFamily: GlobalStyle.fontSet.Bold,
  color: GlobalStyle.colorSet.btnSecondary,
},


// grey
sGreyBold:{
  fontSize: W(12),
  fontFamily: GlobalStyle.fontSet.Bold,
  color: GlobalStyle.colorSet.LightGrey,
},

mGreyBold:{
  fontSize: W(14),
  fontFamily: GlobalStyle.fontSet.Bold,
  color: GlobalStyle.colorSet.LightGrey,
},

lGreyBold:{
  fontSize: W(16),
  fontFamily: GlobalStyle.fontSet.Bold,
  color: GlobalStyle.colorSet.LightGrey,
},

xlGreyBold:{
  fontSize: W(18),
  fontFamily: GlobalStyle.fontSet.Bold,
  color: GlobalStyle.colorSet.LightGrey,
},


// white
mWhitleSemiBold:{
  fontSize: W(14),
  fontFamily: GlobalStyle.fontSet.SemiBold,
  color: GlobalStyle.colorSet.white,
},

// white
sWhiteSemiBold:{
  fontSize: W(12),
  fontFamily: GlobalStyle.fontSet.SemiBold,
  color: GlobalStyle.colorSet.white,
},


mLightRed:{
  fontSize: W(14),
  fontFamily: GlobalStyle.fontSet.Regular,
  color: GlobalStyle.colorSet.lightRed,
},
mLightGreen:{
  fontSize: W(14),
  fontFamily: GlobalStyle.fontSet.Regular,
  color: GlobalStyle.colorSet.green,
},


textareaContainer: {
  marginHorizontal:W(20),
  height: H(80),
  padding: W(5),
  borderBottomWidth: 0.9,
  borderWidth:0,
  borderBottomColor: GlobalStyle.colorSet.BorderGrey,
  backgroundColor: GlobalStyle.colorSet.white,
},
textarea: {
  fontSize:W(16),
  textAlignVertical: 'top',  // hack android
  height: H(80),
  color: '#333',
},

searchBar:{
  elevation:0,
  borderWidth:0,
  borderRadius:7,
  borderColor:GlobalStyle.colorSet.BorderGrey,
  backgroundColor:GlobalStyle.colorSet.mainBgColorSemiTransparent
},

FixedLabel:{
  fontFamily:GlobalStyle.colorSet.LightGrey,
  fontSize:W(15),
  color:GlobalStyle.colorSet.LightGrey,
  position:'absolute',
  top:0,
  left:W(10)
 },


//  buttons
rectBtn:{
  height: H(25),
  width: W(110),
  borderRadius: H(2),
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: GlobalStyle.colorSet.btnPrimary,
},

countCircle:{
  borderRadius:H(24)/2,
  height:H(24),
  width:H(24),
  backgroundColor:GlobalStyle.colorSet.btnPrimary,
  justifyContent:'center',
  alignItems:'center'
},
headerTitle:{
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop:H(5),
  minHeight: H(40),
  width: W(230),
}

});

export default CommonStyle;
