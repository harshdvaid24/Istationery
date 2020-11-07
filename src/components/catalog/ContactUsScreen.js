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
 
export const ContactUsScreen = props => {
  


 
  ContactUsScreen['navigationOptions'] = screenProps => ({
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {props.navigation.goBack() }}
        >
        <Image style={[CommonStyle.Icon25,CommonStyle.marginLR20]} source={require("./.././../../resources/icons/back.png")} />
        </TouchableOpacity>
    ),
    headerBackTitle: ' ',
    headerTitle:'Cotact Us',
    headerStyle: {
      backgroundColor:GlobalStyle.colorSet.white,
      height: 50,
      elevation: 0,
      borderBottomColor:'transparent',
    }
});
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
                  backgroundColor="transparent"
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
