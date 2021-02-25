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
import {Spinner} from '../common'
import { translate } from '../../i18n';
import CartBadge from '../cart/CartBadge';
import CommonStyle from '../../utils/CommonStyle'
import GlobalStyles,{W,H,StatusbarHeight,WINDOW_HEIGHT} from '../../utils/GlobalStyles'
import { getRewardHistory } from '../../actions';

import {
  NAVIGATION_SEARCH_SCREEN_PATH
} from '../../navigation/routes';

 import styles from './styles';
import { Item } from './Item';

const RewardHistoryScreen = (props) => {

const dispatch = useDispatch();
const customerData = useSelector(state => state.account.customer);
const historyData = useSelector(state => state.account.reward_history)
const loading = useSelector(state => state.wishlist.loading);

useEffect(()=>{
  const unsubscribe = props.navigation.addListener('didFocus', () => {
    dispatch(getRewardHistory(customerData?.id))
  });
},[])




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

 if (historyData && historyData.length) {
  if(loading)
  {
    return <Spinner/>
  }
  return (
     <View style={[CommonStyle.paddingTB20,styles.emptyListContainerStyle]}>

             
      <FlatList
          data={historyData}
          // onRefresh={() => dispatch(getWishListProducts())}
          // refreshing={false}
          // ListFooterComponent={renderFooter}
          removeClippedSubviews={false}
          // extraData={props.state}
          // contentContainerStyle={{paddingHorizontal: W(10)}}
          numColumns={1}
          showsHorizontalScrollIndicator={false}
          renderItem={item => {
            return <Item item={item}/>;
          }}
          // keyExtractor={item => item.id.toString()}
          keyExtractor={(item, index) => index.toString()}
        />
             

     </View>
       
  );
  }
  return renderEmptyOrderList();
};
RewardHistoryScreen['navigationOptions'] = screenProps => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {screenProps.navigation.goBack() }}
      >
      <Image style={[CommonStyle.Icon25,CommonStyle.marginTB10,CommonStyle.marginLR20]} source={require("./.././../../resources/icons/back.png")} />
      </TouchableOpacity>
  ),
  title: 'Rewards history'.toUpperCase(),
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


export default RewardHistoryScreen

