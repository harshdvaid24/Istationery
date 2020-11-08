import React,{useState,useEffect,useRef,useContext} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { View , StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import moduleName from 'react'
import {
    Spinner,
    Button,
    Text,
    Input,
  } from '../common';

import { addAddress } from '../../actions';
import { translate } from '../../i18n';
import { W, H } from '../../utils/GlobalStyles';
import GlobalStyle from '../../utils/GlobalStyles';
import CommonStyle from '../../utils/CommonStyle';
import { ThemeContext } from '../../theme';
import {NAVIGATION_ADDRESS_SCREEN_PATH} from '../../navigation/routes'
  

const AddAddress = props => {
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
const theme = useContext(ThemeContext);
const customer = useSelector(state=>state.account.customer)
const success = useSelector(state=>state.account.success)
console.log(props.navigation.getParam('item'));
const dispatch = useDispatch();
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('')
    const [city, setcity] = useState('');
    const [countryId, setcountryId] = useState("BH");
    const [company, setcompany] = useState('');
    const [street, setstreet] = useState('')
    const [telephone, settelephone] = useState('');
    const [postcode, setpostcode] = useState('');
    const [region, setregion] = useState('');
    const [state, setstate] = useState('')


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
      else if(state=='')
      {
        alert('State should not be empty.');
      }  
      // else if(company=='')
      // {
      //   alert('Password should not be empty.');
      // }
      else if(telephone=='')
      {
        alert('Telephone should not be empty.');
      }
     
      else {
        const customerSendData = {
          parameters: {
            customer_id: customer.id,
            email:customer.email,
            company,
            country_Id:countryId,
            city,
            street,
            telephone,
            postcode,
            firstname: firstName,
            lastname: lastName,
            region,
            email:customer.email,
          },
        };
        dispatch(addAddress(customerSendData));
      }

     
    };

    const renderButtons = () => {
      // if (loading) {
      //   return <Spinner />;
      // }
  
      return (
        <View style={[{marginTop:10}]}>
        <Button
          onPress={onAddAddressPress}>
          {'Add Address'}
        </Button>
        </View>
      )
    }
  

    // if(success)
    // {
    //   navigation.navigate(NAVIGATION_ADDRESS_SCREEN_PATH);
    // }

    return (
      <ScrollView keyboardShouldPersistTaps='always'>
        <View style={styles.container(theme)}>
        <Text style={[styles.Title(theme)]}> Add Address </Text>
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
       onSubmitEditing={() => { companyInput.current.focus(); }}
       containerStyle={styles.inputContainer(theme)}
     />
      <Input
       autoCapitalize="none"
       underlineColorAndroid="transparent"
       placeholder={translate('common.company')}
       returnKeyType="next"
       autoCorrect={false}
       value={company}
      // editable={!loading}
       onChangeText={setcompany}
       assignRef={(input) => { companyInput.current = input; }}
       onSubmitEditing={() => { streetInput.current.focus(); }}
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
       keyboardType="number-pad"
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
       onSubmitEditing={() => { stateInput.current.focus(); }}
       containerStyle={styles.inputContainer(theme)}
     />
       <Input
       autoCapitalize="none"
       underlineColorAndroid="transparent"
       placeholder={translate('common.state')}
       returnKeyType="next"
       autoCorrect={false}
       value={state}
       //editable={!loading}
       onChangeText={setstate}
       assignRef={(input) => { stateInput.current = input; }}
       onSubmitEditing={() => { telephoneInput.current.focus(); }}
       containerStyle={styles.inputContainer(theme)}
     />
     <Input
       autoCapitalize="none"
       underlineColorAndroid="transparent"
       placeholder={translate('common.telephone')}
       keyboardType="numeric"
       autoCorrect={false}
       value={telephone}
       //editable={!loading}
       onChangeText={settelephone}
       assignRef={(input) => { telephoneInput.current = input; }}
       onSubmitEditing={onAddAddressPress}
       containerStyle={styles.inputContainer(theme)}
     />
     {renderButtons()}
     {/* {renderMessages()} */}
     <View />
   </View>
   </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: theme => ({
      flex: 1,
      backgroundColor: theme.colors.tabBarBackground,
      alignItems: 'center',
      paddingTop: theme.dimens.WINDOW_HEIGHT * 0.1,
    }),
    loginContainer :theme => ({
      flex: 1,
      backgroundColor: theme.colors.white,
      alignItems: 'center',
      justifyContent:'center',
    }),
    inputContainer: theme => ({
      backgroundColor:theme.colors.background,
      width: theme.dimens.WINDOW_WIDTH * 0.7,
      marginVertical:10,
      height:45,
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
