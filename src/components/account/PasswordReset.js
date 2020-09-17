import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Spinner,
  Button,
  Text,
  Input,
} from '../common';
import FastImage from 'react-native-fast-image';
import { initiatePasswordReset,ResetError, updatePasswordResetUI } from '../../actions';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';

const PasswordReset = ({
  loading,
  error,
  navigation,
  success, ResetError:_ResetError,
  initiatePasswordReset: _initiatePasswordReset,
  updatePasswordResetUI: _updatePasswordResetUI,
}) => {
  const theme = useContext(ThemeContext);
  const [email, setEmail] = useState('');

  useEffect(() => (() => {
    // componentWillUnmount
    _updatePasswordResetUI();
  }), []);

  const onResetPress = () => {
    if(email=='')
    {
      alert('Email should not be empty.');
    }
    else{
      _initiatePasswordReset(email);
    }
    
  };

  const onSigninPress = () => {
    console.log("onSigninPress");
    _ResetError("");
    navigation.goBack();
  };

  const renderMessages = () => {
    if (error) {
      return <Text style={styles.error(theme)}>{error}</Text>;
    }
  

    if (success) {
      return <Text style={styles.success(theme)}>{success}</Text>;
    }
  };

  const renderButtons = () => {
    if (loading) {
      return <Spinner style={{ marginTop: theme.spacing.extraLarge }} />;
    }

    return (
      <View style={[{marginTop:10}]}>
      <Button
        // disabled={email === ''}
        onPress={onResetPress}
      >
        {translate('passwordReset.resetButton')}
      </Button>
    
      </View>
    );
  };

  return (
    <View style={styles.container(theme)}>
      <TouchableOpacity  onPress={onSigninPress} style={{position:'absolute',top:30,left:30}}>
      <FastImage
          style={{height:40,width:40}}
          resizeMode="contain"
          source={require('./../../../resources/icons/back.png')}
        />
      </TouchableOpacity>
     <Text style={[styles.Title(theme)]}> Recover Password </Text>
      <Input
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        keyboardType="email-address"
        placeholder={translate('common.email')}
        autoCorrect={false}
        containerStyle={styles.emailOffset(theme)}
        value={email}
        editable={!loading}
        onSubmitEditing={onResetPress}
        onChangeText={setEmail}
      />
      {renderButtons()}
      {renderMessages()}
    </View>
  );
};

PasswordReset.navigationOptions = {
  header:null
};

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: theme.colors.tabBarBackground,
    alignItems: 'center',
   justifyContent:'center'
  }),
  title: theme => ({
    marginBottom: theme.spacing.medium,
  }),
  description: {
    textAlign: 'center',
  },
  emailOffset: theme => ({
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
    marginTop: theme.spacing.extraLarge,
  }),
  success: theme => ({
    color: theme.colors.success,
    width: theme.dimens.WINDOW_WIDTH * 0.85,
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
    fontSize:18,
    fontWeight:'bold',
    textDecoration:'underline',
    color: theme.colors.secondary,
  }),
  linkTitle: {
    // textAlign: 'center',
  },
  Title: theme => ({
    color: theme.colors.secondary,
    fontSize:28,
    marginBottom:30,
    fontWeight:'bold'
  }),
});

PasswordReset.propTypes = {
  loading: PropTypes.bool.isRequired,
  success: PropTypes.oneOfType([PropTypes.string, null]),
  error: PropTypes.oneOfType([PropTypes.string, null]),
  initiatePasswordReset: PropTypes.func.isRequired,
  updatePasswordResetUI: PropTypes.func.isRequired,

};

PasswordReset.defaultProps = {
  success: null,
  error: null,
};

const mapStateToProps = ({ customerAuth }) => {
  const {
    resetLoading: loading,
    resetPasswordErrorMessage: error,
    resetPasswordSuccessMessage: success,
  } = customerAuth;

  return {
    loading,
    success,
    error,
  };
};

export default connect(mapStateToProps, {
  initiatePasswordReset,
  updatePasswordResetUI,
  ResetError
})(PasswordReset);
