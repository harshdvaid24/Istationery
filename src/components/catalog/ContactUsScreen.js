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
import GlobalStyle,{W,H,StatusbarHeight,WINDOW_HEIGHT} from './../../utils/GlobalStyles'
import { WebView } from 'react-native-webview';
 
export const ContactUsScreen = props => {
  
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);
 

  // const onIncrement = () => {
  //   let q = qty+1;
  //   if(q>10){
  //     alert("Maximum 10 Items can be purchased at a same time.");
  //   }
  //   else {
  //     setQty(q);
  //     dispatch(updateProductQtyInput(q, product.id));
  //   }
    
  // }
 
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
         <WebView source={{ uri: 'https://staging.istationery.com/mobile-contact-us' }}  scalesPageToFit={true} />
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

ContactUsScreen['navigationOptions'] = screenProps => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {screenProps.navigation.goBack() }}
      >
      <Image style={[CommonStyle.Icon25,CommonStyle.marginLR20]} source={require("./.././../../resources/icons/back.png")} />
      </TouchableOpacity>
  ),
  headerBackTitle: ' ',
  headerTitle:'Contact Us',
  headerStyle: {
    backgroundColor:'white',
    marginTop:Platform.OS === 'ios' ? (WINDOW_HEIGHT>812)?H(0):0 : H(StatusbarHeight),
    height: H(40),
    elevation: 0,
     borderWidth:0,
  }
});
