import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch,connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  FlatList,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
  TouchableHighlight,
  SafeAreaView,
  PermissionsAndroid,
  NativeModules,
} from 'react-native';
import {getWishListProducts, removeWishlistItem,AddToCart, addToCart } from '../../actions'
import { currentCustomer} from '../../actions';
import {Spinner} from '../common'
import { translate } from '../../i18n';
import CartBadge from '../cart/CartBadge';
import CommonStyle from '../../utils/CommonStyle'
import GlobalStyles,{W,H,StatusbarHeight,WINDOW_HEIGHT} from '../../utils/GlobalStyles'

import {
  NAVIGATION_HOME_SCREEN_PATH
} from '../../navigation/routes';

 import styles from './styles.js';
import PropTypes from 'prop-types';
import {
  NAVIGATION_HOME_PRODUCT_PATH,
} from '../../navigation/routes';
import {
  setCurrentProduct,
} from '../../actions';

const SuccessScreen = ({
  currentCustomer: _currentCustomer,
  navigation,
  currencySymbol,
  currencyRate,
  setCurrentProduct: _setCurrentProduct,
}) => {

 

const dispatch = useDispatch();

const loading = useSelector(state => state.wishlist.loading);
  useEffect(()=>{
 
  },[]);

  






  return (
     <View style={[styles.ContainerStyle]}>

<Text style={[CommonStyle.xlPrimarySemiBold,CommonStyle.marginTop40]}>
       {'Order No: #'}{navigation.state.params.orderNo}
      </Text>
<Image style={[CommonStyle.Icon200,CommonStyle.marginTop40]} source={require("./.././../../resources/icons/nodata/store_empty.png")} />
      
      <Image style={[CommonStyle.Icon60,CommonStyle.marginTop20]} source={require("./.././../../resources/icons/checked.png")} />

      <Text style={[CommonStyle.xlPrimarySemiBold,CommonStyle.marginTop40]}>
        {'  Thank you'}
      </Text>

      <Text style={[CommonStyle.mGreyRegular,CommonStyle.marginTop20]}>
         Order has been successfully placed. 
      </Text>

      <TouchableOpacity
        style={[CommonStyle.marginTop15]}
         onPress={() => navigation.navigate(NAVIGATION_HOME_SCREEN_PATH)}
      >
        <Text style={[CommonStyle.lPrimarySemiBold,CommonStyle.underline]}>
          {translate('common.continueShopping')}
        </Text>
      </TouchableOpacity>
             

     </View>
       
  );
  
};
SuccessScreen['navigationOptions'] = screenProps => ({
  headerShown: false,
  tabBarVisible:false,
});



SuccessScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  setCurrentProduct: PropTypes.func.isRequired,
  currentCustomer: PropTypes.func.isRequired,
};

SuccessScreen.defaultProps = {};
const mapStateToProps = state => {
  const {
    currency: {
      displayCurrencySymbol: currencySymbol,
      displayCurrencyExchangeRate: currencyRate,
    },
  } = state.magento;

  return {
    currencyRate,
    currencySymbol,
  };
}

export default connect(mapStateToProps, {
  currentCustomer,
  setCurrentProduct,
})(SuccessScreen);

