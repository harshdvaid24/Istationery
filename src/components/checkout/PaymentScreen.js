/**
 * Created by Dima Portenko on 14.05.2020
 */
import React, { useContext, useState, useEffect } from 'react';
import { ScrollView,StatusBar,TouchableOpacity,SafeAreaView, StyleSheet, View,Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import HTML from 'react-native-render-html';
import { Button, Input, Price, Spinner, Text } from '../common';
import { ThemeContext } from '../../theme';

import CommonStyle from '../../utils/CommonStyle'
import GlobalStyle,{W,H} from '../../utils/GlobalStyles'
import { WebView } from 'react-native-webview';
import { magentoOptions } from '../../config/magento';
import { NAVIGATION_PAYMENT_SUCCESS_PATH } from '../../navigation/routes';
export const PaymentScreen = props => {
  
   const URL_CHECKOUT_SUCCESS = `${magentoOptions.url}benefit/hosted/success/`;


 const navigationStateChangedHandler = ({ url }) => {
    console.log('Url :-', url);

    console.log('Url URL_CHECKOUT_SUCCESS:-',URL_CHECKOUT_SUCCESS);

    if (url == URL_CHECKOUT_SUCCESS) {
      console.log('Url URL_CHECKOUT_SUCCESS:-');
      props.navigation.navigate(NAVIGATION_PAYMENT_SUCCESS_PATH, { orderNo:"or9499999" });
      // this.props.navigation.navigate('Thankyou', { isPaymentFailed: false, orderNo: this.props.navigation.state.params.orderNo });
    } else  {
      // this.props.navigation.navigate('NAVIGATION_PAYMENT_SUCCESS_PATH', { isPaymentFailed: true });
    } 
  };

  PaymentScreen['navigationOptions'] = screenProps => ({
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {props.navigation.goBack() }}
        >
        <Image style={[CommonStyle.Icon25,CommonStyle.marginLR20]} source={require("./.././../../resources/icons/back.png")} />
        </TouchableOpacity>
    ),
    headerBackTitle: ' ',
    headerTitle:'Payment',
    headerStyle: {
      backgroundColor:GlobalStyle.colorSet.white,
      height: 50,
      elevation: 0,
      borderBottomColor:'transparent',
    }
});
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);
 

 console.log("props",props);
  const tempURL = (props.navigation.state.params) ? props.navigation.state.params.orderId:'';
   const url = "https://staging.istationery.com/benefit/hosted/redirect?orderId="+tempURL;

//  console.log("payment URL-----:",url);
  return (
    <View
        style={{
          height: '100%',
          backgroundColor: GlobalStyle.colorSet.white,
        }}>
       <StatusBar
                  translucent
                  backgroundColor="#F5F5F5"
                  barStyle="dark-content"
                />
    
    <View style={{ height: '100%', backgroundColor: GlobalStyle.colorSet.white }}>
    <SafeAreaView style={{ flex: 1 }}>
         <WebView
           source={{ uri: url }}
           scalesPageToFit={true}
           onNavigationStateChange={navigationStateChangedHandler}
            />
    </SafeAreaView>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: GlobalStyle.colorSet.white,
  }),
 

});

