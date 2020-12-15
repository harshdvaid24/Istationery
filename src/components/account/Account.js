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
import { logout, currentCustomer,wishListItem,getOrdersForCustomer } from '../../actions';
import { NAVIGATION_ORDERS_PATH,
  NAVIGATION_ADDRESS_PATH,
  NAVIGATION_SEARCH_SCREEN_PATH,NAVIGATION_WISHLIST_PATH, NAVIGATION_CHANGE_PASSWORD_PATH } from '../../navigation/routes';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import CartBadge from '../../components/cart/CartBadge';
import CommonStyle from './../../utils/CommonStyle'
import GlobalStyles,{W,H,StatusbarHeight,WINDOW_HEIGHT} from './../../utils/GlobalStyles'

const Account = ({
  customer,
  orders,
  navigation,
  customerId,
  currentCustomer: _currentCustomer,
  wishlistItem:_wishlistItem,
  getOrdersForCustomer:_getOrdersForCustomer,
  logout: _logout,
  total:total
}) => {
  const theme = useContext(ThemeContext);
  //console.log(total);
  console.log("useEffect:Account:total",total);
  useEffect(() => {
    //console
    // ComponentDidMount
   console.log("useEffect:Account:");
   console.log("useEffect:customer:",customer);
    if (!customer) {
      console.log("useEffect:!customer:",customer);
      _currentCustomer();
    }
    else {
      _wishlistItem();
      _getOrdersForCustomer(customerId);
      // const unsun
      const unsubscribe = navigation.addListener('didFocus', () => {
        _wishlistItem();
        _getOrdersForCustomer(customerId);
      });
      // _wishlistItem();
      // _getOrdersForCustomer(customerId);
    }
  },[]);

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
      <View style={[,CommonStyle.FlexRow]}>
          <View style={[CommonStyle.width25p,styles.imageContainer,]}>
          <Image style={[CommonStyle.Icon60]} source={require("./.././../../resources/icons/account/profile.png")} />
                      
          </View>
            <View style={[CommonStyle.width85p,styles.profileNameContainer,]}>
                  <View style={[CommonStyle.FlexRow,styles.HeaderNameContainer,CommonStyle.HorizontalCenter]}>
                    <Text style={[CommonStyle.lBlackSemiBold]}>Hi.... </Text>
                      <Text style={[CommonStyle.lBlackSemiBold]}>
                        {firstname}
                        {' '}
                        {lastname}
                      </Text>
                  </View>

                  <View style={[CommonStyle.marginLR20]}>
                    {/* <Text style={[CommonStyle.lGreyRegular]}>Email : </Text> */}
                      <Text numberOfLines={1} style={[CommonStyle.sGreyRegular]}>
                        {email}
                      </Text>
                  </View>
            </View>
      </View>
    );
  };

  const openOrders = () => {
    navigation.navigate(NAVIGATION_ORDERS_PATH);
  };

  const openAddAddress = () => {
    navigation.navigate(NAVIGATION_ADDRESS_PATH);
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
     {console.log("total:",total)}
     <View style={[CommonStyle.FlexRow,CommonStyle.paddingLR5,CommonStyle.HorizontalCenter,]}>
        
     <TouchableOpacity onPress={openOrders}
          style={[CommonStyle.FlexRow,styles.squareContainer]}>
            <View style={[CommonStyle.HorizontalCenter,CommonStyle.VerticalCenter]}>
               <Image style={[CommonStyle.Icon30]} source={require("./.././../../resources/icons/account/orders.png")} />
               <Text style={[CommonStyle.sGreyRegular,CommonStyle.marginTop10]}>
                 {translate('account.myOrdersButton')} {`(${orders?orders.length:0})`} 
                </Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={openWishlist}
          style={[CommonStyle.FlexRow,styles.squareContainer]}>
            <View style={[CommonStyle.HorizontalCenter,CommonStyle.VerticalCenter]}>
               <Image style={[CommonStyle.Icon30]} source={require("./.././../../resources/icons/account/coupon.png")} />
               <Text style={[CommonStyle.sGreyRegular,CommonStyle.marginTop10]}>
                  Vouchers
                </Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={openWishlist}
          style={[CommonStyle.FlexRow,styles.squareContainer]}>
            <View style={[CommonStyle.HorizontalCenter,CommonStyle.VerticalCenter]}>
               <Image style={[CommonStyle.Icon30]} source={require("./.././../../resources/icons/account/wishlist.png")} />
                 <Text style={[CommonStyle.sGreyRegular,CommonStyle.marginTop10]}>
                  Wishlist
                   {` (${total}) `}
                </Text>
            </View>
        </TouchableOpacity>

       


      

        


     </View>
      <TouchableOpacity onPress={openWishlist}
      style={[CommonStyle.FlexRow,styles.HeaderSubContainer,CommonStyle.marginTop2,CommonStyle.alignContentLR,CommonStyle.HorizontalCenter]}>
            <View style={[CommonStyle.FlexRow,CommonStyle.HorizontalCenter,CommonStyle.VerticalCenter]}>
               <Image style={[CommonStyle.Icon20]} source={require("./.././../../resources/icons/account/wishlist.png")} />
                 <Text style={[CommonStyle.lGreyRegular,CommonStyle.marginLR10]}>
                  My Wishlist
                   {` (${total}) `}
                </Text>
            </View>
          
            <Image style={[CommonStyle.Icon20]} source={require("./.././../../resources/icons/right.png")} />
        </TouchableOpacity>

        <TouchableOpacity onPress={openOrders}
      style={[CommonStyle.FlexRow,styles.HeaderSubContainer,CommonStyle.marginTop2,CommonStyle.alignContentLR,CommonStyle.HorizontalCenter]}>
            <View style={[CommonStyle.FlexRow,CommonStyle.HorizontalCenter,CommonStyle.VerticalCenter]}>
               <Image style={[CommonStyle.Icon20]} source={require("./.././../../resources/icons/account/orders.png")} />
                 <Text style={[CommonStyle.mGreyRegular,CommonStyle.marginLR10]}>
                 {translate('account.myOrdersButton')} {`(${orders?orders.length:0})`} 
                </Text>
            </View>
            <Image style={[CommonStyle.Icon20]} source={require("./.././../../resources/icons/right.png")} />
        </TouchableOpacity>

        

        <TouchableOpacity onPress={openAddAddress}
      style={[CommonStyle.FlexRow,styles.HeaderSubContainer,CommonStyle.marginTop2,CommonStyle.alignContentLR,CommonStyle.HorizontalCenter]}>
            <View style={[CommonStyle.FlexRow,CommonStyle.HorizontalCenter,CommonStyle.VerticalCenter]}>
               <Image style={[CommonStyle.Icon20]} source={require("./.././../../resources/icons/account/addresses.png")} />
                 <Text style={[CommonStyle.mGreyRegular,CommonStyle.marginLR10]}>
                 {translate('account.myAddressButton')}
                </Text>
            </View>
            <Image style={[CommonStyle.Icon20]} source={require("./.././../../resources/icons/right.png")} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onContactUs}
      style={[CommonStyle.FlexRow,styles.HeaderSubContainer,CommonStyle.marginTop2,CommonStyle.alignContentLR,CommonStyle.HorizontalCenter]}>
            <View style={[CommonStyle.FlexRow,CommonStyle.HorizontalCenter,CommonStyle.VerticalCenter]}>
               <Image style={[CommonStyle.Icon20]} source={require("./.././../../resources/icons/account/contactUs.png")} />
                 <Text style={[CommonStyle.mGreyRegular,CommonStyle.marginLR10]}>
                 Contact Us
                </Text>
            </View>
            <Image style={[CommonStyle.Icon20]} source={require("./.././../../resources/icons/right.png")} />
        </TouchableOpacity>

      
        <TouchableOpacity onPress={onLogoutPress}
             style={[CommonStyle.FlexRow,styles.HeaderSubContainer,CommonStyle.marginTop20,CommonStyle.alignContentLR,CommonStyle.HorizontalCenter]}>
            <View style={[CommonStyle.FlexRow,CommonStyle.HorizontalCenter,CommonStyle.VerticalCenter]}>
               <Image style={[CommonStyle.Icon20]} source={require("./.././../../resources/icons/account/exit.png")} />
                 <Text style={[CommonStyle.mGreyRegular,CommonStyle.marginLR10]}>
                 Logout
                </Text>
            </View>
            {/* <Image style={[CommonStyle.Icon20]} source={require("./.././../../resources/icons/right.png")} /> */}
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={openResetPassword}
      style={[CommonStyle.FlexRow,styles.HeaderSubContainer,CommonStyle.marginTop2,CommonStyle.alignContentLR,CommonStyle.HorizontalCenter]}>
            <Text style={[CommonStyle.lGreyRegular]}>
              Reset password
            </Text>
            <Image style={[CommonStyle.Icon20]} source={require("./.././../../resources/icons/right.png")} />
        </TouchableOpacity> */}
       
    </View>
  );
};


Account['navigationOptions'] = screenProps => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {screenProps.navigation.navigate('Home') }}
      >
      <Image style={[CommonStyle.Icon25,CommonStyle.marginTB10,CommonStyle.marginLR20]} source={require("./.././../../resources/icons/back.png")} />
      </TouchableOpacity>
  ),
  title:  translate('account.title').toUpperCase(),
  headerRight: () => (
    <View style={[styles.headerRight]}>
    <TouchableOpacity
      style={[CommonStyle.paddingLR10]}
      onPress={() => {screenProps.navigation.navigate(NAVIGATION_SEARCH_SCREEN_PATH) }}
      >
      <View style={[CommonStyle.marginTop5]}><Image style={CommonStyle.Icon25} source={require('../../../resources/icons/Search.png')} resizeMode='contain'/></View>
    </TouchableOpacity>
    <TouchableOpacity
      style={[CommonStyle.paddingLR10]}
      onPress={() => {screenProps.navigation.navigate('Cart') }}
      >

      <CartBadge color={GlobalStyles.colorSet.btnPrimary} />
    </TouchableOpacity>
    </View>
  ),
  headerStyle: {
    backgroundColor:'white',
    marginTop:Platform.OS === 'ios' ? (WINDOW_HEIGHT>812)?H(0):0 : H(StatusbarHeight),
    height: H(40),
    elevation: 0,
     borderWidth:0,
  //  borderBottomColor:'transparent',
  },

});
    

const styles = StyleSheet.create({
  HeaderContainer:  {
    backgroundColor: GlobalStyles.colorSet.white,
    paddingVertical:W(10),  
  },
  headerRight:{
    flexDirection:'row',
    alignItems:'center'
  },
  imageContainer:  {
   justifyContent:"center",
   alignItems:'center',
  //  backgroundColor: GlobalStyles.colorSet.white,
  },
  profileNameContainer:{
    justifyContent:"center",
    marginVertical:H(20)
  },
  HeaderNameContainer:  {
    paddingVertical:W(10),
    paddingLeft:W(20),
    paddingRight:W(20),
  },
  HeaderSubContainer:  {
    backgroundColor: GlobalStyles.colorSet.white,
    paddingVertical:W(10),
    marginHorizontal:W(15),
    paddingLeft:W(20),
    paddingRight:W(20),
    borderColor:GlobalStyles.colorSet.BorderGrey,
    borderWidth:W(0.5)
  },
  squareContainer:  {
    height:H(80),
    width:W(120),
    justifyContent:"center",
    alignItems:'center',
    backgroundColor: GlobalStyles.colorSet.white,
    paddingVertical:W(10),
    paddingHorizontal:W(10),
    marginHorizontal:W(7),
    marginVertical:H(10)
  },
  container: theme => ({
     flex: 1,
    backgroundColor:GlobalStyles.colorSet.BorderGrey,
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
  logoutBtn:{
    position:'absolute',
    bottom:H(0),
    width:"100%"
  }
});

Account.propTypes = {
  customer: PropTypes.object,
  customerId: PropTypes.number,
  orders: PropTypes.arrayOf(PropTypes.object),
  navigation: PropTypes.object.isRequired,
  currentCustomer: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  wishListItem: PropTypes.func.isRequired,
  getOrdersForCustomer: PropTypes.func.isRequired,
};

Account.defaultProps = {
  customer: null,
  orders: null,
  total:null,
  customerId: null,
};

const mapStateToProps = ({ account,wishlist }) => {
  const { customer } = account;
  const customerId = account.customer ? account.customer.id : null;
  const {total} = wishlist;
  const orders = account.orderData ? account.orderData.items : [];
  return { customer,customerId,total,orders };
};

export default connect(mapStateToProps, { logout, currentCustomer,  wishlistItem:wishListItem, getOrdersForCustomer:getOrdersForCustomer, })(Account);
