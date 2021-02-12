import React, { useRef, useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Spinner,
  Button,
  Text,
  Input,
} from '../common';
import { signIn,ResetError } from '../../actions';
import FastImage from 'react-native-fast-image';
import {
  NAVIGATION_SIGNIN_PATH,
  NAVIGATION_LOGIN_PATH,
  NAVIGATION_HOME_SCREEN_PATH
} from '../../navigation/routes';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import GlobalStyle, { H, W } from '../../utils/GlobalStyles';
import CommonStyle from '../../utils/CommonStyle';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
  IsValidateEmail,
  isEmptyField,
  checkPhoneNumber,
  checkOnlyAlphabatic,
  validPasswordLength,
  validWebsite,
  showAlert,
  DateFomat
} from './../../utils/commonFunction';

// This file name should be Signup
const Signin = ({
  loading,
  error,
  success,
  customer,
  navigation,
  signIn: _signIn,
  ResetError:_ResetError
}) => {
  const theme = useContext(ThemeContext);
  // Internal State
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Reference
  const firstnameInput = useRef(null);
  const lastnameInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const onCreateAccountPress = () => {
    // TODO: add password validation check
    var pswdRegX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  
   


    _ResetError("");
    if(firstname=='')
    {
      alert('Firstname should not be empty.');
    }
    else if(lastname=='')
    {
      alert('Lastname should not be empty.');
    }
    else if(email=='')
    {
      alert('Email should not be empty.');
    }
    else if(password=='')
    {
      alert('Password should not be empty.');
    }
    else {
       
         if (!IsValidateEmail(email)) {
          alert("Email is Invalid");
        }
      

       else if(!pswdRegX.test(password)){
        alert('Password should have minimum 8 characters, at least one number,one alphabet,one special character.')
      }
      else {
        const customer = {
          customer: {
            email,
            firstname,
            lastname,
          },
          password,
        };
        _signIn(customer);
      }
     
    }

   
  };


  const onSigninPress = () => {
    console.log("onSigninPress");
    _ResetError("");
    navigation.navigate(NAVIGATION_LOGIN_PATH);
  };


  const renderButtons = () => {
    if (loading) {
      return <Spinner />;
    }

    return (
      <View style={[CommonStyle.marginTop20,]}>
         <View style={[CommonStyle.marginLR50,CommonStyle.marginBottom20]}>
          <Text style={[CommonStyle.sBlackRegular]}>
             By creating an account you agree to the privacy policy and to the terms of use
          </Text>
        </View>
          <View style={[CommonStyle.FlexRow,CommonStyle.VerticalCenter]}>
                <Button
              // disabled={
              //   firstname === ''
              //   || lastname === ''
              //   || email === ''
              //   || password === ''
              // }
              onPress={onCreateAccountPress}
            >
              {'Register'}
            </Button>
          </View>
     

<TouchableOpacity   onPress={onSigninPress} style={[styles.linkButton,CommonStyle.marginTop40]}>
<Text style={[CommonStyle.mBlackBold]}>{'Already have an account?  '}</Text>
</TouchableOpacity>
{/* <TouchableOpacity onPress={()=>{navigation.navigate(NAVIGATION_HOME_SCREEN_PATH)}} style={styles.link(theme)}>
        <Text style={styles.linkSkip}>Skip to continue shopping</Text>
        </TouchableOpacity> */}
  </View>
    );
  };

  const renderMessages = () => {
    if (error) {
      return <Text style={styles.error(theme)}>{error}</Text>;
    }

    // if(customer){
    //   navigation.navigate(NAVIGATION_LOGIN_PATH);
    // }

    if (success) {
      // navigation.navigate(NAVIGATION_LOGIN_PATH);
      return <Text style={styles.success(theme)}>{success}</Text>;
    }
  };

  return (
    <View style={styles.container(theme)}>
     <KeyboardAwareScrollView
       extraHeight={H(120)}
       extraScrollHeight={120}
       >
        <View style={[styles.loginContainer(theme)]}>
     <FastImage
          style={[{height:H(80),width:W(140)},CommonStyle.marginBottom20]}
          resizeMode="contain"
          source={require('../../../resources/icons/logo.png')}
        />

         <Text style={[styles.Title(theme)]}> Create an account </Text>
      <Input
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        placeholder={translate('common.firstName')}
        returnKeyType="next"
        autoCorrect={false}
        value={firstname}
        editable={!loading}
        onChangeText={setFirstname}
        assignRef={(input) => { firstnameInput.current = input; }}
        onSubmitEditing={() => { lastnameInput.current.focus(); }}
        containerStyle={styles.inputContainer(theme)}
      />
      <Input
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        placeholder={translate('common.lastName')}
        autoCorrect={false}
        returnKeyType="next"
        value={lastname}
        editable={!loading}
        onChangeText={setLastname}
        assignRef={(input) => { lastnameInput.current = input; }}
        onSubmitEditing={() => { emailInput.current.focus(); }}
        containerStyle={styles.inputContainer(theme)}
      />
      <Input
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        placeholder={translate('common.email')}
        keyboardType="email-address"
        returnKeyType="next"
        autoCorrect={false}
        value={email}
        editable={!loading}
        onChangeText={setEmail}
        assignRef={(input) => { emailInput.current = input; }}
        onSubmitEditing={() => { passwordInput.current.focus(); }}
        containerStyle={styles.inputContainer(theme)}
      />
      <Input
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        secureTextEntry
        placeholder={translate('common.password')}
        autoCorrect={false}
        value={password}
        editable={!loading}
        onChangeText={setPassword}
        assignRef={(input) => { passwordInput.current = input; }}
        onSubmitEditing={onCreateAccountPress}
        containerStyle={styles.inputContainer(theme)}
      />
      {renderButtons()}
      {renderMessages()}
        </View>
      <View />
      </KeyboardAwareScrollView>
    </View>
  );
};

Signin.navigationOptions = {
  header:null
};

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
  linkButton:{
    borderWidth:0.8,
    borderColor:GlobalStyle.colorSet.BorderGrey,
    borderRadius:2,
    paddingHorizontal:W(10),
    paddingVertical:H(7),
    alignItems:'center',
    justifyContent:'center',
  },
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

Signin.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  customer:PropTypes.oneOfType(PropTypes.string, null),
  signIn: PropTypes.func.isRequired,
};

Signin.defaultProps = {
  error: null,
  success: null,
  customer:null
};

const mapStateToProps = ({ customerAuth }) => {
  const { error, success, loading,customer } = customerAuth;

  return { error, success, loading,customer };
};

export default connect(mapStateToProps, { signIn,ResetError })(Signin);
