import React, { useRef, useState, useContext,useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect, useSelector,useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Spinner,
  Button,
  Text,
  Input,
} from '../common';
import {currentCustomer,changePassword,ResetError} from '../../actions'

import {
  NAVIGATION_HOME_SCREEN_PATH,
  NAVIGATION_ACCOUNT_STACK_PATH
} from '../../navigation/routes';
import { ThemeContext } from '../../theme';


const ChangePasswordScreen = ({
    customer,
    navigation,
    loading,
    error,
    success,
    changePassword:_changePassword,
    currentCustomer: _currentCustomer,
    ResetError:_ResetError
}) => {
  const theme = useContext(ThemeContext);
  const [password, setpassword] = useState('');
  const [newPassword, setnewPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const passwordInput = useRef(null);
  const newPasswordInput = useRef(null);
  const confirmPasswordInput = useRef(null);

 

    useEffect(() => {
        _currentCustomer();
        _ResetError('');
    }, [])
    const dataId = customer.id;
    const onChnagePress = () => {
      // TODO: add password validation check
      if(password=='')
      {
        alert('Current Password should not be empty.');
      }
      else if (newPassword == '')
      {
        alert('New Password should not be emopty,')
      }
      else if(confirmPassword=='')
      {
        alert('New Password should not be empty.');
      }
      else if(newPassword!==confirmPassword)
      {
        alert('New Password and confirm password should be same.');
      }
      else {
        const customer = {
          currentPassword: password,
          newPassword: newPassword,
          customer_id:dataId
        };
        _changePassword(customer);
      }
    };

  const renderButtons = () => {
    if (loading) {
      return <Spinner />;
    }
  return (
      <View style={[{marginTop:10}]}>
      <Button
        onPress={onChnagePress}
      >
        Change Password
      </Button>
      <TouchableOpacity onPress={()=>{navigation.navigate(NAVIGATION_HOME_SCREEN_PATH)}} style={styles.link(theme)}>
        <Text style={styles.linkSkip}>Skip to continue shopping</Text>
        </TouchableOpacity>
  </View>
    );
  }
  const renderMessages = () => {
    if (error) {
      return <Text style={styles.error(theme)}>{error}</Text>;
    }
    if(success){
      alert('Password is updated');
    }
  };

    return(
        <View style={styles.container(theme)}>
        <Text style={[styles.Title(theme)]}> Change password</Text>
     <Input
       autoCapitalize="none"
       underlineColorAndroid="transparent"
       secureTextEntry
       placeholder='Please Enter Current Password'
       autoCorrect={false}
       value={password}
       returnKeyType="next"
       editable={!loading}
       onChangeText={setpassword}
       assignRef={(input) => { passwordInput.current = input; }}
       onSubmitEditing={() => { newPasswordInput.current.focus(); }}
       containerStyle={styles.inputContainer(theme)}
     />
     <Input
       autoCapitalize="none"
       underlineColorAndroid="transparent"
       secureTextEntry
       placeholder='Please Enter new password'
       autoCorrect={false}
       value={newPassword}
       returnKeyType="next"
       editable={!loading}
       onChangeText={setnewPassword}
       assignRef={(input) => { newPasswordInput.current = input; }}
       onSubmitEditing={() => { confirmPasswordInput.current.focus(); }}
       containerStyle={styles.inputContainer(theme)}
     />
      <Input
       autoCapitalize="none"
       underlineColorAndroid="transparent"
       secureTextEntry
       placeholder='Please Enter new password again'
       autoCorrect={false}
       value={confirmPassword}
       editable={!loading}
       onChangeText={setconfirmPassword}
       assignRef={(input) => { confirmPasswordInput.current = input; }}
       onSubmitEditing={onChnagePress}
       containerStyle={styles.inputContainer(theme)}
     />
     {renderButtons()}
     {renderMessages()}
     <View />
   </View>
    )
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

ChangePasswordScreen.defaultProps = {
    customer: null,
    error: null,
    success: null,
    loading: false,
  };
  
  const mapStateToProps = ({ account,customerAuth }) => {
    const {customer} = account;
    const {error,success,loading} = customerAuth;
    return { customer,error,success,loading };
  };
  
  export default connect(mapStateToProps, { currentCustomer, changePassword, ResetError })(ChangePasswordScreen);
