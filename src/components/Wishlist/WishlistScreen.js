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
import {Spinner} from '../common'
import { translate } from '../../i18n';
import CartBadge from '../../components/cart/CartBadge';
import CommonStyle from './../../utils/CommonStyle'
import GlobalStyles,{W,H,StatusbarHeight,WINDOW_HEIGHT} from './../../utils/GlobalStyles'

import {
  NAVIGATION_SEARCH_SCREEN_PATH
} from '../../navigation/routes';

 import styles from './styles';
import { WishlistItem } from './WishlistItem';
import PropTypes from 'prop-types';
import {
  NAVIGATION_HOME_PRODUCT_PATH,
} from '../../navigation/routes';
import {
  setCurrentProduct,
} from '../../actions';

const WishlistScreen = ({
  navigation,
  currencySymbol,
  currencyRate,
  setCurrentProduct: _setCurrentProduct,
}) => {
  // const { currencyRate, currencySymbol, products } = useSelector(
  //   state => mapStateToProps(state),
  // );
 
 

const dispatch = useDispatch();
const WishlistItems = useSelector(state=>state.wishlist.products.products);
const error = useSelector(state=>state.wishlist.error);
const is_in_stock = useSelector(state=>state.wishlist.is_in_stock)
const loading = useSelector(state => state.wishlist.loading);

  useEffect(()=>{
    dispatch(getWishListProducts());
  },[]);

  
  const onOptionPressed =(optionId) => {
    dispatch(removeWishlistItem(optionId));
    if(error)
    {
      alert('Something went wrong!')
    }
 }

 const onProductSelect = (productItem) =>{
   console.log("onProductSelect:",productItem);
   _setCurrentProduct({product:productItem});
    navigation.navigate(NAVIGATION_HOME_PRODUCT_PATH, {
    title: productItem.name,
    product:productItem,
  });
}


 const onAddToCartClick = (id,sku) =>{
   dispatch(AddToCart(sku));
   if(!is_in_stock)
   {
    alert('Item is out of stock');
   }
  //  const is_in_stock =  await AddToCart(sku);
  //  console.log('IS_IN_STOCK',is_in_stock);
  //  if(is_in_stock)
  //  {
    // alert('it is available')
  //  }
  //  else{
    //  alert('item is not available');
  //  }
 }

 const renderEmptyOrderList = () => {
  if(loading)
  {
    return <Spinner/>
  }
  else 
{
  return (
    <View style={[styles.emptyListContainerStyle]}>
      <Text style={[CommonStyle.lGreyRegular]}>
        {translate('WishlistScreen.noWishlistMessage')}
      </Text>
      {/* <TouchableOpacity
        onPress={() => navigate(NAVIGATION_HOME_SCREEN_PATH)}
      >
        <Text type="heading"  style={styles.buttonTextStyle(theme)}>
          {translate('common.continueShopping')}
        </Text>
      </TouchableOpacity> */}
    </View>
  );
    }
};

 if (WishlistItems && WishlistItems.length) {
  if(loading)
  {
    return <Spinner/>
  }
  return (
     <View style={[CommonStyle.marginBottom20,styles.emptyListContainerStyle]}>

             
      <FlatList
          data={WishlistItems}
          onRefresh={() => dispatch(getWishListProducts())}
          refreshing={false}
          // ListFooterComponent={renderFooter}
          removeClippedSubviews={false}
          // extraData={props.state}
          // contentContainerStyle={{paddingHorizontal: W(10)}}
          numColumns={1}
          showsHorizontalScrollIndicator={false}
          renderItem={item => {
            return <WishlistItem item={item}  onProduct={onProductSelect} onOptionPressed={onOptionPressed} navigation={navigation} />;
          }}
          // keyExtractor={item => item.id.toString()}
          keyExtractor={(item, index) => index.toString()}
        />
             

     </View>
       
  );
  }
  return renderEmptyOrderList();
};
WishlistScreen['navigationOptions'] = screenProps => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {screenProps.navigation.goBack() }}
      >
      <Image style={[CommonStyle.Icon25,CommonStyle.marginTB10,CommonStyle.marginLR20]} source={require("./.././../../resources/icons/back.png")} />
      </TouchableOpacity>
  ),
  title: 'My Wishlist'.toUpperCase(),
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



WishlistScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  setCurrentProduct: PropTypes.func.isRequired,

};

WishlistScreen.defaultProps = {};
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
  setCurrentProduct,
})(WishlistScreen);

