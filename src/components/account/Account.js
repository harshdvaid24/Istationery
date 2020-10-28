import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../common';
import { logout, currentCustomer } from '../../actions';
import { NAVIGATION_ORDERS_PATH, NAVIGATION_ADDRESS_SCREEN_PATH,NAVIGATION_RESET_PASSWORD_PATH } from '../../navigation/routes';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import CommonStyle from './../../utils/CommonStyle'
import GlobalStyles,{W,H} from './../../utils/GlobalStyles'

const Account = ({
  customer,
  navigation,
  currentCustomer: _currentCustomer,
  logout: _logout,
}) => {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    // ComponentDidMount
    if (!customer) {
      _currentCustomer();
    }
  }, []);

  const onLogoutPress = () => {
    _logout();
  };

  const renderCustomerData = () => {
    if (!customer) {
      return (
        <ActivityIndicator
          size="large"
          color={theme.colors.secondary}
          style={styles.activity(theme)}
        />
      );
    }

    const { email, firstname, lastname } = customer;
    return (
      <View style={[CommonStyle.width100p,styles.HeaderContainer]}>
        <View style={[CommonStyle.FlexRow,styles.HeaderSubContainer,CommonStyle.HorizontalCenter]}>
           <Text style={[CommonStyle.LBTitle]}>Name : </Text>
            <Text style={[CommonStyle.lGreySemiBold]}>
              {firstname}
              {' '}
              {lastname}
            </Text>
        </View>

        <View style={[CommonStyle.FlexRow,styles.HeaderSubContainer,CommonStyle.HorizontalCenter]}>
           <Text style={[CommonStyle.LBTitle]}>Email : </Text>
            <Text style={[CommonStyle.lGreySemiBold]}>
               {email}
            </Text>
        </View>
      </View>
    );
  };

  const openOrders = () => {
    navigation.navigate(NAVIGATION_ORDERS_PATH);
  };

  const openAddAddress = () => {
    navigation.navigate(NAVIGATION_ADDRESS_SCREEN_PATH);
  };

  const openResetPassword = () =>{
    navigation.navigate(NAVIGATION_RESET_PASSWORD_PATH);
  }

  return (
    <View style={styles.container(theme)}>
      {renderCustomerData()}
      <TouchableOpacity onPress={onLogoutPress}
      style={[CommonStyle.FlexRow,styles.HeaderSubContainer,CommonStyle.marginTop2,CommonStyle.alignContentLR,CommonStyle.HorizontalCenter]}>
            <Text style={[CommonStyle.LBTitle]}>
                Logout
            </Text>
            <Image style={[CommonStyle.Icon20]} source={require("./.././../../resources/icons/right.png")} />
        </TouchableOpacity>

        <TouchableOpacity onPress={openOrders}
      style={[CommonStyle.FlexRow,styles.HeaderSubContainer,CommonStyle.marginTop2,CommonStyle.alignContentLR,CommonStyle.HorizontalCenter]}>
            <Text style={[CommonStyle.LBTitle]}>
            {translate('account.myOrdersButton')}
            </Text>
            <Image style={[CommonStyle.Icon20]} source={require("./.././../../resources/icons/right.png")} />
        </TouchableOpacity>

        <TouchableOpacity onPress={openAddAddress}
      style={[CommonStyle.FlexRow,styles.HeaderSubContainer,CommonStyle.marginTop2,CommonStyle.marginBottom2,CommonStyle.alignContentLR,CommonStyle.HorizontalCenter]}>
            <Text style={[CommonStyle.LBTitle]}>
            {translate('account.myAddressButton')}
            </Text>
            <Image style={[CommonStyle.Icon20]} source={require("./.././../../resources/icons/right.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={openResetPassword}
      style={[CommonStyle.FlexRow,styles.HeaderSubContainer,CommonStyle.marginTop2,CommonStyle.marginBottom2,CommonStyle.alignContentLR,CommonStyle.HorizontalCenter]}>
            <Text style={[CommonStyle.LBTitle]}>
            {translate('login.forgetPassword')}
            </Text>
            <Image style={[CommonStyle.Icon20]} source={require("./.././../../resources/icons/right.png")} />
        </TouchableOpacity>
   
    </View>
  );
};

Account.navigationOptions = {
  title: translate('account.title'),
};

const styles = StyleSheet.create({
  HeaderContainer:  {
    backgroundColor: GlobalStyles.colorSet.white,
    paddingVertical:W(10),
  },
  HeaderSubContainer:  {
    backgroundColor: GlobalStyles.colorSet.white,
    paddingVertical:W(10),
    paddingLeft:W(20),
    paddingRight:W(20),
  },
  container: theme => ({
    // flex: 1,
    backgroundColor: theme.colors.background,
    // alignItems: 'center',
    paddingTop: theme.spacing.large,
  }),
  activity: theme => ({
    padding: theme.spacing.large,
  }),
  center: {
    textAlign: 'center',
  },
  textContainer: theme => ({
    marginBottom: theme.spacing.large,
  }),
  buttonMargin: theme => ({
    marginTop: theme.spacing.large,
  }),
});

Account.propTypes = {
  customer: PropTypes.object,
  navigation: PropTypes.object.isRequired,
  currentCustomer: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

Account.defaultProps = {
  customer: null,
};

const mapStateToProps = ({ account }) => {
  const { customer } = account;
  return { customer };
};

export default connect(mapStateToProps, { logout, currentCustomer })(Account);
