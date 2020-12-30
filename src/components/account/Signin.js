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

import {
  NAVIGATION_SIGNIN_PATH,
  NAVIGATION_LOGIN_PATH,
  NAVIGATION_HOME_SCREEN_PATH
} from '../../navigation/routes';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';

// This file name should be Signup
const Signin = ({
  loading,
  error,
  success,
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
  const lastnameInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const onCreateAccountPress = () => {
    // TODO: add password validation check
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
      <View style={[{marginTop:10}]}>
      <Button
        // disabled={
        //   firstname === ''
        //   || lastname === ''
        //   || email === ''
        //   || password === ''
        // }
        onPress={onCreateAccountPress}
      >
        {'Signup'}
      </Button>

<TouchableOpacity   onPress={onSigninPress} style={styles.linkButton(theme)}>
<Text style={styles.linkTitleButton(theme)}>{'Already have an account?  '}</Text>
<Text style={styles.linkTitleButton(theme)}>{'Login'}</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>{navigation.navigate(NAVIGATION_HOME_SCREEN_PATH)}} style={styles.link(theme)}>
        <Text style={styles.linkSkip}>Skip to continue shopping</Text>
        </TouchableOpacity>
  </View>
    );
  };

  const renderMessages = () => {
    if (error) {
      return <Text style={styles.error(theme)}>{error}</Text>;
    }

    if (success) {
      return <Text style={styles.success(theme)}>{success}</Text>;
    }
  };

  return (
    <View style={styles.container(theme)}>
         <Text style={[styles.Title(theme)]}> SignUp </Text>
      <Input
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        placeholder={translate('common.firstName')}
        returnKeyType="next"
        autoCorrect={false}
        value={firstname}
        editable={!loading}
        onChangeText={setFirstname}
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
      <View />
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

Signin.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  signIn: PropTypes.func.isRequired,
};

Signin.defaultProps = {
  error: null,
  success: null,
};

const mapStateToProps = ({ customerAuth }) => {
  const { error, success, loading } = customerAuth;

  return { error, success, loading };
};

export default connect(mapStateToProps, { signIn,ResetError })(Signin);
