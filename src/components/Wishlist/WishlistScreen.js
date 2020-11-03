import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { translate } from '../../i18n';
import { W, H } from '../../utils/GlobalStyles';
import CommonStyle from '../../utils/CommonStyle';
import GlobalStyle from '../../utils/GlobalStyles';
 import styles from './styles';
import { WishlistItem } from './WishlistItem';

const WishlistScreen = props => {
  // const { currencyRate, currencySymbol, products } = useSelector(
  //   state => mapStateToProps(state),
  // );
 
  WishlistScreen['navigationOptions'] = screenProps => ({
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {screenProps.navigation.goBack() }}
        >
        <Image style={[CommonStyle.Icon25,CommonStyle.marginLR20]} source={require("./.././../../resources/icons/back.png")} />
        </TouchableOpacity>
    ),
    headerBackTitle: ' ',
    headerTitle:'My Wishlist',
    headerStyle: {
      backgroundColor:GlobalStyle.colorSet.white,
      height: H(50),
      elevation: 0,
      borderBottomColor:'transparent',
    }
});

const dispatch = useDispatch();
const WishlistItems = useSelector(state=>state.wishlist.products.products);
const error = useSelector(state=>state.wishlist.error);
const is_in_stock = useSelector(state=>state.wishlist.is_in_stock)

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
};

 if (WishlistItems && WishlistItems.length) {
  return (
     <View style={[CommonStyle.marginBottom20,styles.emptyListContainerStyle]}>

             
      <FlatList
          data={WishlistItems}
          onRefresh={() => dispatch(getWishListProducts())}
          refreshing={false}
          // ListFooterComponent={renderFooter}
          removeClippedSubviews={false}
          extraData={props.state}
          // contentContainerStyle={{paddingHorizontal: W(10)}}
          numColumns={1}
          showsHorizontalScrollIndicator={false}
          renderItem={item => {
            return <WishlistItem item={item}  onAddToCartOption={onAddToCartClick} onOptionPressed={onOptionPressed} navigation={props.navigation} />;
          }}
          // keyExtractor={item => item.id.toString()}
          keyExtractor={(item, index) => index.toString()}
        />
             

     </View>
       
  );
  }
  return renderEmptyOrderList();
};
// const mapStateToProps = state => {
//   const {
//     currency: {
//       displayCurrencySymbol: currencySymbol,
//       displayCurrencyExchangeRate: currencyRate,
//     },
//   } = state.magento;

//   const { products } = state.wishlist;

//   return {
//     currencyRate,
//     currencySymbol,
//     products 
//   };
// }
export default WishlistScreen;
