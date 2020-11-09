import React,{useState,useEffect,useRef,useContext} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { View ,
  StyleSheet,
  Image,Platform,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView} from 'react-native';
import moduleName from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    Spinner,
    Button,
    Text,
    Input,
  } from '../common';
import { addAddress,getAddress } from '../../actions';
import { translate } from '../../i18n';
import { W, H } from '../../utils/GlobalStyles';
import GlobalStyle from '../../utils/GlobalStyles';
import CommonStyle from '../../utils/CommonStyle';
import { ThemeContext } from '../../theme';
import {NAVIGATION_ADDRESS_SCREEN_PATH} from '../../navigation/routes'
import country from '../../utils/Country.json';
import ModalSelector from 'react-native-modal-selector';
const AddAddress = ({navigation}) => {
 
  console.log("navigation:",navigation);
  const dispatch = useDispatch();


const theme = useContext(ThemeContext);
const customer = useSelector(state=>state.account.customer)
const success = useSelector(state=>state.account.success);
const addressDetails = navigation.state.params?navigation.state.params.address:null;
 

 useEffect(() => {
  console.log("use effect:sucess:",success);
  if(success)
  {
    clearInput();
    dispatch(getAddress(customer.id));
    navigation.navigate(NAVIGATION_ADDRESS_SCREEN_PATH);
  }
}, [success]);

const clearInput = () => {
  setAddressId('');
  setfirstName('');
  setlastName('');
  setcity('');
  setstreet('');
  settelephone('');
  setpostcode('');
  setregion('');
  setcountryName('Bahrain');
  setcountryCode('BH');
}
 const [address_id, setAddressId] = useState(addressDetails?addressDetails.address_id:'');
    const [firstName, setfirstName] = useState(addressDetails?addressDetails.firstname:'');
    const [lastName, setlastName] = useState(addressDetails?addressDetails.lastname:'')
    const [city, setcity] = useState(addressDetails?addressDetails.city:'');
    // const [company, setcompany] = useState(addressDetails?addressDetails.firstname:'');
    const [street, setstreet] = useState(addressDetails?addressDetails.street:'')
    const [telephone, settelephone] = useState(addressDetails?addressDetails.phone:'');
    const [postcode, setpostcode] = useState(addressDetails?addressDetails.pincode:'');
    const [region, setregion] = useState(addressDetails?addressDetails.region:'');
    // const [state, setstate] = useState(addressDetails?addressDetails.firstname:'')

    const [countryName, setcountryName] = useState(addressDetails?addressDetails.country:'Bahrain');
    let selectedCoountryCode; 
    if(addressDetails){
      selectedCoountryCode = country.reduce((code, item) => {
        if (item.name === addressDetails.country){code = item.code}
        return code
      }, null);
      console.log("selectedCoountryCode:",selectedCoountryCode);
    }
    const [countryCode, setcountryCode] = useState(addressDetails?selectedCoountryCode:'BH');

    //References
    const lastnameInput = useRef(null);
    const streetInput = useRef(null);
    const cityInput = useRef(null);
    const postCodeInput = useRef(null);
    const companyInput = useRef(null);
    const regionInput = useRef(null);
    const telephoneInput = useRef(null);
    const stateInput = useRef(null);

    const onAddAddressPress = () => {
      // TODO: add password validation check
      // _ResetError("");
      if(firstName=='')
      {
        alert('Firstname should not be empty.');
      }
      else if(lastName=='')
      {
        alert('Lastname should not be empty.');
      }
      else if(street=='')
      {
        alert('Street should not be empty.');
      }
      else if(city=='')
      {
        alert('City should not be empty.');
      }
      else if(postcode=='')
      {
        alert('Postal code should not be empty.');
      }
      else if(region=='')
      {
        alert('Region should not be empty.');
      }
      // else if(state=='')
      // {
      //   alert('State should not be empty.');
      // }  
      // else if(company=='')
      // {
      //   alert('Password should not be empty.');
      // }
      else if(telephone=='')
      {
        alert('Telephone should not be empty.');
      }
     
      else {

        if(addressDetails){
          const customerSendData = {
            parameters: {
               customer_id: customer.id,
               address_id:address_id,
               email:customer.email,
              country_Id:countryCode,
              city,
              street,
              telephone,
              postcode,
              firstname: firstName,
              lastname: lastName,
              region
            },
          };
          dispatch(addAddress(customerSendData));
          // dispatch(addAddress(customerSendData)).then((data) => {
          //   console.log('addAddress:data:',data);
          // });
        }
        else {
          const customerSendData = {
            parameters: {
               customer_id: customer.id,
              email:customer.email,
              // company,
              country_Id:countryCode,
              city,
              street,
              telephone,
              postcode,
              firstname: firstName,
              lastname: lastName,
              region
            },
          };
          dispatch(addAddress(customerSendData));
        }

      }

     
    };

    const renderButtons = () => {
      // if (loading) {
      //   return <Spinner />;
      // }
  
      return (
        <View style={[CommonStyle.marginTop15,CommonStyle.HorizontalCenter,]}>
        <Button
          onPress={onAddAddressPress}>
          {'Add'}
        </Button>
        </View>
      )
    }
  
  
  

    // if(success)
    // {
    //   navigation.navigate(NAVIGATION_ADDRESS_SCREEN_PATH);
    // }

    return (
      <View
      style={[
        styles.container,
      ]}>
      <KeyboardAwareScrollView
       extraHeight={H(120)}
       extraScrollHeight={0}
       >
       
              <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="dark-content"
              />

     <Input
       autoCapitalize="none"
       underlineColorAndroid="transparent"
       placeholder={translate('common.firstName')}
       returnKeyType="next"
       autoCorrect={false}
       value={firstName}
       //editable={!loading}
       onChangeText={setfirstName}
       onSubmitEditing={() => { lastnameInput.current.focus(); }}
       containerStyle={styles.inputContainer(theme)}
     />
     <Input
       autoCapitalize="none"
       underlineColorAndroid="transparent"
       placeholder={translate('common.lastName')}
       autoCorrect={false}
       returnKeyType="next"
       value={lastName}
       //editable={!loading}
       onChangeText={setlastName}
       assignRef={(input) => { lastnameInput.current = input; }}
       onSubmitEditing={() => { telephoneInput.current.focus(); }}
       containerStyle={styles.inputContainer(theme)}
     />
      {/* <Input
       autoCapitalize="none"
       underlineColorAndroid="transparent"
       placeholder={translate('common.company')}
       returnKeyType="next"
       autoCorrect={false}
       value={company}
      // editable={!loading}
       onChangeText={setcompany}
       assignRef={(input) => { companyInput.current = input; }}
       onSubmitEditing={() => {telephoneInput .current.focus(); }}
       containerStyle={styles.inputContainer(theme)}
     /> */}

    <Input
       autoCapitalize="none"
       underlineColorAndroid="transparent"
       placeholder={translate('common.telephone')}
       autoCorrect={false}
       value={telephone}
       //editable={!loading}
       onChangeText={settelephone}
       assignRef={(input) => { telephoneInput.current = input; }}
       onSubmitEditing={() => {streetInput.current.focus();}}
       containerStyle={styles.inputContainer(theme)}
     />
    
     <Input
       autoCapitalize="none"
       underlineColorAndroid="transparent"
       placeholder={translate('common.street')}
       returnKeyType="next"
       autoCorrect={false}
       value={street}
      // editable={!loading}
       onChangeText={setstreet}
       assignRef={(input) => { streetInput.current = input; }}
       onSubmitEditing={() => { cityInput.current.focus(); }}
       containerStyle={styles.inputContainer(theme)}
     />
      <Input
       autoCapitalize="none"
       underlineColorAndroid="transparent"
       placeholder={translate('common.city')}
       returnKeyType="next"
       autoCorrect={false}
       value={city}
      // editable={!loading}
       onChangeText={setcity}
       assignRef={(input) => { cityInput.current = input; }}
       onSubmitEditing={() => { postCodeInput.current.focus(); }}
       containerStyle={styles.inputContainer(theme)}
     />
      <Input
       autoCapitalize="none"
       underlineColorAndroid="transparent"
       placeholder={translate('common.postcode')}
       returnKeyType="next"
       autoCorrect={false}
       value={postcode}
      // editable={!loading}
       onChangeText={setpostcode}
       assignRef={(input) => { postCodeInput.current = input; }}
       onSubmitEditing={() => { regionInput.current.focus(); }}
       containerStyle={styles.inputContainer(theme)}
     />
      <Input
       autoCapitalize="none"
       underlineColorAndroid="transparent"
       placeholder={translate('common.region')}
       returnKeyType="next"
       autoCorrect={false}
       value={region}
      // editable={!loading}
       onChangeText={setregion}
       assignRef={(input) => { regionInput.current = input; }}
      //  onSubmitEditing={() => { stateInput.current.focus(); }}
       containerStyle={styles.inputContainer(theme)}
     />
       {/* <Input
       autoCapitalize="none"
       underlineColorAndroid="transparent"
       placeholder={translate('common.state')}
       returnKeyType="next"
       autoCorrect={false}
       value={state}
       //editable={!loading}
       onChangeText={setstate}
       assignRef={(input) => { stateInput.current = input; }}
      //  onSubmitEditing={() => { telephoneInput.current.focus(); }}
       containerStyle={styles.inputContainer(theme)}
     /> */}
      <ModalSelector
                data={country}
                style={[styles.dropdownContainer(theme),]}
                initValue="Select country!"
                keyExtractor={item => item.name}
                labelExtractor={item => item.name}
                accessible={true}
                scrollViewAccessibilityLabel={'Scrollable options'}
                cancelButtonAccessibilityLabel={'Cancel Button'}
                onChange={option => {
                  setcountryCode(option.code);
                  setcountryName(option.name);

                }}>
                <View style={[CommonStyle.CountryCodeView,]}>
                <Input
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    placeholder={''}
                    returnKeyType="next"
                    autoCorrect={false}
                    value={countryName}
                    editable={false}
                    containerStyle={styles.dropdown(theme)}
                  />
                   <Image style={[CommonStyle.Icon15,CommonStyle.marginLR10]} source={require("./.././../../resources/icons/down.png")} />
                </View>
              </ModalSelector>

    
     {renderButtons()}
     {/* {renderMessages()} */}
     
     </KeyboardAwareScrollView>
      </View>
    )
}
AddAddress['navigationOptions'] = screenProps => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {screenProps.navigation.goBack() }}
      >
      <Image style={[CommonStyle.Icon25,CommonStyle.marginLR20]} source={require("./.././../../resources/icons/back.png")} />
      </TouchableOpacity>
  ),
  headerBackTitle: ' ',
  headerTitle:'Add Address',
  headerStyle: {
    backgroundColor:GlobalStyle.colorSet.White,
    height: H(50),
    elevation: 0,
    borderBottomColor:'transparent',
  }
});
const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: theme.colors.tabBarBackground,
      alignItems: 'center',
      justifyContent:'center',
      paddingHorizontal:W(20),
       paddingTop: H(10),
       paddingBottom:H(30)
    },
    loginContainer :theme => ({
      flex: 1,
      backgroundColor: theme.colors.white,
      alignItems: 'center',
      justifyContent:'center',
    }),
    dropdownContainer: theme => ({
      backgroundColor:theme.colors.background,
      width: "100%",
      justifyContent:'center',
      marginVertical:H(10),
      height:H(45),
      borderWidth:0,
      borderRadius:5,
      paddingLeft:10,
    
    }),
    dropdown: theme => ({
      backgroundColor:theme.colors.background,
      width:"85%",
      height:H(45),
    }),
    inputContainer: theme => ({
      backgroundColor:theme.colors.background,
      width: "100%",
      marginVertical:10,
      height:H(45),
      borderWidth:0,
      borderRadius:5,
      paddingLeft:10
    }),
    buttonMargin: theme => ({
      marginTop: theme.spacing.large,
    }),
    error: theme => ({
      color: theme.colors.error,
      width: theme.dimens.WINDOW_WIDTH * 0.85,
      textAlign: 'center',
      marginTop: theme.spacing.large,
    }),
    success: theme => ({
      color: theme.colors.success,
      width: theme.dimens.WINDOW_WIDTH * 0.85,
      textAlign: 'center',
      marginTop: theme.soacing.extraLarge,
    }),
    link: theme => ({
      marginTop: theme.spacing.large,
    }),
    linkButton: theme => ({
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'center',
      marginTop: 30,
    }),
    linkTitleButton:theme => ({
      textAlign: 'center',
      fontSize:20,
      fontWeight:'bold',
      color: theme.colors.secondary,
    }),
    linkSkip:{
      textDecorationLine:'underline',
      textAlign: 'center',
      fontSize:12
    },
    Title: theme => ({
      color: theme.colors.secondary,
      fontSize:28,
      marginBottom:30,
      fontWeight:'bold'
    }),
  });
export default AddAddress
