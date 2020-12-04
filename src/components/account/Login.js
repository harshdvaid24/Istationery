import React, { useState, useEffect,useContext, useRef } from 'react';
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
  Input,
  Text,
} from '../common';
import { auth,ResetError } from '../../actions/CustomerAuthActions';
import {
  NAVIGATION_SIGNIN_PATH,
  NAVIGATION_RESET_PASSWORD_PATH,
  NAVIGATION_HOME_SCREEN_PATH
} from '../../navigation/routes';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import FastImage from 'react-native-fast-image';
import {H} from '../../utils/GlobalStyles'



  
function Login ({
  loading,
  error,
  success,
  navigation,
  auth: _auth,
  ResetError:_ResetError
}) {
  const theme = useContext(ThemeContext);
  // Internal State
  const [email, setEmail] = useState('dummy.bhupendra@gmail.com');
  const [password, setPassword] = useState('Abcd@1234');
  // Reference
  const passwordInput = useRef();

   useEffect(() => {
    ResetError("");
   }, [])
  const onLoginPress = () => {
    if(email=='')
    {
      alert('Email should not be empty.');
    }
    else if(password=='')
    {
      alert('Password should not be empty.');
    }
    else {
      _auth(email, password);
    }
  
  };

  const onSigninPress = () => {
    console.log("onSigninPress");
    _ResetError("");
    navigation.navigate(NAVIGATION_SIGNIN_PATH);
  };

  const passwordForget = () => {
    console.log("passwordForget");
    _ResetError("");
    navigation.navigate(NAVIGATION_RESET_PASSWORD_PATH);
  };

  const renderButtons = () => {
    if (loading) {
      return <Spinner />;
    }

    return (
      <View style={[{marginTop:10}]}>
        <Button
          // disabled={email === '' || password === ''}
          onPress={onLoginPress}
        >
          {translate('login.loginButton')}
        </Button>
      
       

        <TouchableOpacity onPress={passwordForget} style={styles.link(theme)}>
          <Text style={styles.linkTitle}>{translate('login.forgetPassword')}</Text>
        </TouchableOpacity>


        <TouchableOpacity   onPress={onSigninPress} style={styles.linkButton(theme)}>
           <Text style={styles.linkTitleButton(theme)}>{'New user?  '}</Text>
          <Text style={styles.linkTitleButton(theme)}>{translate('login.signupButton')}</Text>
        </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate(NAVIGATION_HOME_SCREEN_PATH)}} style={styles.link(theme)}>
        <Text style={styles.linkSkip}>Skip to continue shopping</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderMessages = () => {
    console.log("renderMessages:",error);
    if (error) {
      return <Text style={styles.error(theme)}>{error}</Text>;
    }

    if (success) {
      return <Text style={styles.success(theme)}>{success}</Text>;
    }
  };

  return (
    <View style={styles.container(theme)}>
    <View style={{height:'30%',width:'60%',marginTop:H(50),justifyContent:'center',alignItems:'center'}}>
    <FastImage
          style={{height:'100%',width:"100%"}}
          resizeMode="center"
          source={require('../../../resources/icons/logo.png')}
        />
    </View>
    <View style={styles.container(theme)}>
      <Text style={[styles.Title(theme)]}> Login </Text>
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
        onSubmitEditing={() => passwordInput.current.focus()}
        containerStyle={styles.inputContainer(theme)}
        textContentType="emailAddress"
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
        onSubmitEditing={onLoginPress}
        assignRef={(input) => { passwordInput.current = input; }}
        containerStyle={styles.inputContainer(theme)}
        textContentType="password"
      />
      {renderButtons()}
      {renderMessages()}
    </View>
    </View>
  );
};

Login.navigationOptions = {
  header:null
};

const styles = StyleSheet.create({
  container: theme => ({
    //flex: 1,
    backgroundColor: theme.colors.tabBarBackground,
    alignItems: 'center',
    justifyContent:'center',
  }),
  loginContainer :theme => ({
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent:'center',
   // paddingTop: theme.dimens.WINDOW_HEIGHT * 0.1,
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
    width: theme.dimens.WINDOW_WIDTH * 0.85,
    color: theme.colors.success,
    textAlign: 'center',
    marginTop: theme.spacing.extraLarge,
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
  linkTitle: {
    textDecorationLine:'underline',
     textAlign: 'center',
  },
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

const mapStateToProps = ({ customerAuth }) => {
  const { error, success, loading } = customerAuth;

  return { error, success, loading };
};

Login.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  auth: PropTypes.func.isRequired,
};

Login.defaultProps = {
  error: null,
  success: null,
  loading: false,
};

export default connect(mapStateToProps, { auth,ResetError })(Login);
