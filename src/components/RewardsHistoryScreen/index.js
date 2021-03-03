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
import ProgressCircle from 'react-native-progress-circle'

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
import GlobalStyle from '../../utils/GlobalStyles';

const RewardHistoryScreen = (props) => {
console.log("RewardHistoryScreen:",props);
const dispatch = useDispatch();
const customerData = useSelector(state => state.account.customer);
const historyData = useSelector(state => state.account.reward_history)
const loading = useSelector(state => state.account.loading);

const [total, setTotal] = useState(0);
const [usedPoints, setUsedPoints] = useState(0);
const currentBalance = props.navigation?.state?.params?.bal;

const [BalPercentage, setBalPercentage] = useState(0)
const [usedPercentage, setUsedPercentage] = useState(0)


useEffect(()=>{
  const unsubscribe = props.navigation.addListener('didFocus', () => {
    dispatch(getRewardHistory(customerData?.id))
  });
    let temp_total = 0;
    let temp_usedPoints = 0;

  
  if(historyData.length!=0){
   
    historyData.map((Item)=>{
      if(Item.amount<0){
        temp_usedPoints=temp_usedPoints+Math.abs(Item.amount); 
      }
    })
    setUsedPoints(temp_usedPoints);
    setTotal(temp_usedPoints+parseInt(currentBalance));
    setBalPercentage((parseInt(currentBalance)/total)*100);
    setUsedPercentage((usedPoints/total)*100);
  }




},[historyData])




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

      <View style={[CommonStyle.VerticalCenter,CommonStyle.HorizontalCenter,CommonStyle.marginTB20]}>
        <Image style={[styles.Icon,CommonStyle.marginBottom20]} resizeMode={'contain'} source={require("./.././../../resources/icons/rewardpoint.png")} />
        <Text style={[CommonStyle.lBlackSemiBold]}>REWARDS POINTS</Text>
      </View>

        <View style={[styles.graphSec]}>
            <View style={[CommonStyle.marginLR10]}>
                <ProgressCircle
                      percent={BalPercentage}
                      radius={H(55)}
                      borderWidth={8}
                      color={GlobalStyles.colorSet.btnPrimary}
                      shadowColor={GlobalStyle.colorSet.white}
                      bgColor={GlobalStyle.colorSet.BorderGrey}
                  >
                     <Text style={[CommonStyle.xsBlackRegular]}>Current Balance</Text>
                     <Text style={[CommonStyle.xlBlackSemiBold]}>{parseInt(currentBalance)}</Text>
                     {/* <Text style={[CommonStyle.xlBlackSemiBold]}>{parseInt(total)}</Text> */}
                  </ProgressCircle>
            </View>

            <View style={[CommonStyle.marginLR10]}>
                <ProgressCircle
                      percent={usedPercentage}
                      radius={H(55)}
                      borderWidth={8}
                      color={GlobalStyles.colorSet.btnPrimary}
                      shadowColor={GlobalStyle.colorSet.white}
                      bgColor={GlobalStyle.colorSet.BorderGrey}
                  >
                     <Text style={[CommonStyle.xsBlackRegular]}>Used Point</Text>
                     <Text style={[CommonStyle.xlBlackSemiBold]}>{usedPoints}</Text>
                  </ProgressCircle>
            </View>
             
        </View>

      <View style={[styles.Rewardstitle,CommonStyle.marginBottom5]}>
        <Text style={[CommonStyle.LWhiteTitle]}>Expiring Points Breakdown</Text>
      </View>
             
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

