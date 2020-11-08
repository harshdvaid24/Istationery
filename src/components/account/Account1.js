import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '../common';
import { logout, currentCustomer } from '../../actions';
import { NAVIGATION_ORDERS_PATH,
   NAVIGATION_ADDRESS_SCREEN_PATH,
   NAVIGATION_RESET_PASSWORD_PATH,NAVIGATION_WISHLIST_PATH, NAVIGATION_CHANGE_PASSWORD_PATH } from '../../navigation/routes';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import CommonStyle from './../../utils/CommonStyle'
import GlobalStyles,{W,H,StatusbarHeight} from './../../utils/GlobalStyles'

import {
  getOrdersForCustomer,
} from '../../actions';

const Account = ({
  customer,
  orders,
  customerId,
  getOrdersForCustomer: _getOrdersForCustomer,
  navigation,
  currentCustomer: _currentCustomer,
  logout: _logout,
}) => {
  const theme = useContext(ThemeContext);
  
  useEffect(() => {
    // ComponentDidMount
    console.log("useEffect(() => {");
    _getOrdersForCustomer(customerId);
    if (!customer) {
      _currentCustomer();
    }
  }, []);

  const onLogoutPress = () => {
    _logout();
  };

  const onContactUs = () => {
  navigation.navigate('ContactUsScreen');
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
        <View style={[CommonStyle.FlexRow,styles.HeaderNameContainer,CommonStyle.HorizontalCenter]}>
           <Text style={[CommonStyle.lGreyRegular]}>Name : </Text>
            <Text style={[CommonStyle.lGreyRegular]}>
              {firstname}
              {' '}
              {lastname}
            </Text>
        </View>

        <View style={[CommonStyle.FlexRow,styles.HeaderNameContainer,CommonStyle.HorizontalCenter]}>
           <Text style={[CommonStyle.lGreyRegular]}>Email : </Text>
            <Text style={[CommonStyle.lGreyRegular]}>
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
    navigation.navigate(NAVIGATION_CHANGE_PASSWORD_PATH);
  }

  const openWishlist = () =>{
    navigation.navigate(NAVIGATION_WISHLIST_PATH);
  }

  

  return (
    <View style={styles.container(theme)}>
      {renderCustomerData()}
     
      <TouchableOpacity onPress={openWishlist}
      style={[CommonStyle.FlexRow,styles.HeaderSubContainer,CommonStyle.marginTop2,CommonStyle.alignContentLR,CommonStyle.HorizontalCenter]}>
            <View style={[CommonStyle.FlexRow,CommonStyle.HorizontalCenter,CommonStyle.VerticalCenter]}>
               <Image style={[CommonStyle.Icon22]} source={require("./.././../../resources/icons/account/wishlist.png")} />
                 <Text style={[CommonStyle.lGreyRegular,CommonStyle.marginLR10]}>
                  My Wishlist 
                </Text>
                <View style={[CommonStyle.countCircle]}>
                    <Text style={[CommonStyle.sWhiteSemiBold]}>
                      10
                     </Text>
                </View>
            </View>
          
            <Image style={[CommonStyle.Icon20]} source={require("./.././../../resources/icons/right.png")} />
        </TouchableOpacity>

        <TouchableOpacity onPress={openOrders}
      style={[CommonStyle.FlexRow,styles.HeaderSubContainer,CommonStyle.marginTop2,CommonStyle.alignContentLR,CommonStyle.HorizontalCenter]}>
            <View style={[CommonStyle.FlexRow,CommonStyle.HorizontalCenter,CommonStyle.VerticalCenter]}>
               <Image style={[CommonStyle.Icon22]} source={require("./.././../../resources/icons/account/orders.png")} />
                 <Text style={[CommonStyle.lGreyRegular,CommonStyle.marginLR10]}>
                 {translate('account.myOrdersButton')}
                </Text>
                <View style={[CommonStyle.countCircle]}>
                    <Text style={[CommonStyle.sWhiteSemiBold]}>
                      99
                     </Text>
                </View>
            </View>
            <Image style={[CommonStyle.Icon20]} source={require("./.././../../resources/icons/right.png")} />
        </TouchableOpacity>

        

        <TouchableOpacity onPress={openAddAddress}
      style={[CommonStyle.FlexRow,styles.HeaderSubContainer,CommonStyle.marginTop2,CommonStyle.alignContentLR,CommonStyle.HorizontalCenter]}>
            <View style={[CommonStyle.FlexRow,CommonStyle.HorizontalCenter,CommonStyle.VerticalCenter]}>
               <Image style={[CommonStyle.Icon22]} source={require("./.././../../resources/icons/account/addresses.png")} />
                 <Text style={[CommonStyle.lGreyRegular,CommonStyle.marginLR10]}>
                 {translate('account.myAddressButton')}
                </Text>
            </View>
            <Image style={[CommonStyle.Icon20]} source={require("./.././../../resources/icons/right.png")} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onContactUs}
      style={[CommonStyle.FlexRow,styles.HeaderSubContainer,CommonStyle.marginTop2,CommonStyle.alignContentLR,CommonStyle.HorizontalCenter]}>
            <View style={[CommonStyle.FlexRow,CommonStyle.HorizontalCenter,CommonStyle.VerticalCenter]}>
               <Image style={[CommonStyle.Icon22]} source={require("./.././../../resources/icons/account/contactUs.png")} />
                 <Text style={[CommonStyle.lGreyRegular,CommonStyle.marginLR10]}>
                 Contact Us
                </Text>
            </View>
            <Image style={[CommonStyle.Icon20]} source={require("./.././../../resources/icons/right.png")} />
        </TouchableOpacity>

      
        {/* <TouchableOpacity onPress={openResetPassword}
      style={[CommonStyle.FlexRow,styles.HeaderSubContainer,CommonStyle.marginTop2,CommonStyle.alignContentLR,CommonStyle.HorizontalCenter]}>
            <Text style={[CommonStyle.lGreyRegular]}>
              Reset password
            </Text>
            <Image style={[CommonStyle.Icon20]} source={require("./.././../../resources/icons/right.png")} />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={onLogoutPress}
      style={[CommonStyle.FlexRow,styles.HeaderSubContainer,CommonStyle.marginTop2,CommonStyle.alignContentLR,CommonStyle.HorizontalCenter]}>
            <View style={[CommonStyle.FlexRow,CommonStyle.HorizontalCenter,CommonStyle.VerticalCenter]}>
               <Image style={[CommonStyle.Icon22]} source={require("./.././../../resources/icons/account/exit.png")} />
                 <Text style={[CommonStyle.lGreyRegular,CommonStyle.marginLR10]}>
                 Logout
                </Text>
            </View>
            <Image style={[CommonStyle.Icon20]} source={require("./.././../../resources/icons/right.png")} />
        </TouchableOpacity>
    </View>
  );
};

Account.navigationOptions = {
  title: translate('account.title'),
  headerStyle: {
    backgroundColor:GlobalStyles.colorSet.white,
    marginTop:Platform.OS === 'ios' ? 0 : H(StatusbarHeight),
    height: H(40),
    elevation: 0,
     borderBottomWidth:0.8,
     borderBottomColor:GlobalStyles.colorSet.BorderGrey,
  }
};

const styles = StyleSheet.create({
  HeaderContainer:  {
    backgroundColor: GlobalStyles.colorSet.white,
    paddingVertical:W(10),
  },
  HeaderNameContainer:  {
    backgroundColor: GlobalStyles.colorSet.white,
    paddingVertical:W(10),
    paddingLeft:W(20),
    paddingRight:W(20),
  },
  HeaderSubContainer:  {
    backgroundColor: GlobalStyles.colorSet.white,
    paddingVertical:W(20),
    paddingLeft:W(20),
    paddingRight:W(20),
  },
  container: theme => ({
    // flex: 1,
    backgroundColor: theme.colors.background,
    // alignItems: 'center',
    // paddingTop: theme.spacing.large,
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
  orders: PropTypes.arrayOf(PropTypes.object),
  customerId: PropTypes.number,
  getOrdersForCustomer: PropTypes.func.isRequired,
};

Account.defaultProps = {
  customer: null,
  orders: null,
  customerId: null,
};

const mapStateToProps = ({ account }) => {
  const { customer } = account;
  const customerId = account.customer ? account.customer.id : null;
  const orders = account.orderData ? account.orderData.items : [];
  return { customer, customerId,
    orders };
};

export default connect(mapStateToProps, { logout, currentCustomer,getOrdersForCustomer })(Account);