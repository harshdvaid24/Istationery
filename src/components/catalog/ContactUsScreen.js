/**
 * Created by Dima Portenko on 14.05.2020
 */
import React, { useContext, useState, useEffect } from 'react';
import { ScrollView,StatusBar,TouchableOpacity, StyleSheet, View,Image } from 'react-native';
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
    <ScrollView style={styles.container(theme)}>
       <StatusBar
                  translucent
                  backgroundColor="transparent"
                  barStyle="dark-content"
                />
    
         <WebView source={{ uri: 'https://staging.istationery.com/contact' }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: GlobalStyle.colorSet.white,
  }),
  textStyle: theme => ({
    color:theme.colors.black,
    padding: theme.spacing.small,
    textAlign: 'center',
  }),
  qtyAddCartContanier:{
    paddingHorizontal:20,
    marginTop:30,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  qtyContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  inputContainer: theme => ({
    width: 60,
    alignSelf: 'center',
    // marginBottom: theme.spacing.extraLarge,
  }),
  buttonStyle: theme => ({
    alignSelf: 'center',
    marginTop: 20,
    width: theme.dimens.WINDOW_WIDTH * 0.9,
  }),
  modalStyle: theme => ({
    alignSelf: 'center',
    width: theme.dimens.WINDOW_WIDTH * 0.9,
    marginBottom: theme.spacing.large,
  }),
 
  descriptionTitleStyle: theme => ({
    color:theme.colors.black,
    fontSize:16,
    marginTop:30,
  }),
  descriptionStyle: theme => ({
    marginHorizontal:20,
    padding: theme.spacing.large,
    lineHeight: 25,
  }),
  productDetailTitle: {
    marginBottom: 4,
  },
  errorStyle: theme => ({
    textAlign: 'center',
    padding: theme.spacing.small,
    color: theme.colors.error,
  }),
  priceContainer: {
    alignSelf: 'center',
  },
  stockcontainer:{
    flexDirection:'row',
    justifyContent:'center'
  },
  PriceQuantityConatiner: {
    marginLeft: W(20),
    marginRight: W(20),
    height: H(42),
    borderTopWidth: 1,
    borderTopColor: GlobalStyle.colorSet.BorderGrey,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyle.colorSet.BorderGrey,
  },
  QuantityConatiner: {
    width: W(180),
    height: H(42),
    // borderWidth: 1,
    // borderColor: GlobalStyle.colorSet.black,
  },
  QuantitySubMainContainer: {
    borderWidth: 0,
    height: H(42),
    flexDirection:'row',
    borderWidth:1,
    borderColor:GlobalStyle.colorSet.BorderGrey,
    borderRadius:H(7),
    backgroundColor:GlobalStyle.colorSet.white
  },
  FavourateButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: W(10),
    marginLeft: W(10),
    marginRight: W(10)
  },

  plusButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: W(10),
    paddingRight: W(10)
  },
  plusButtonImage: {
    height: H(22),
    width: H(22),
  },
  productQuantityContainer: {
    width: W(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  productQuantityText: {
    fontSize: W(16),
    fontFamily: GlobalStyle.fontSet.SemiBold,
    color: GlobalStyle.colorSet.bgBlack,
  },
  minusButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: W(10),
    paddingRight: W(10)
  },
  minusButtonImage: {
    height: H(22),
    width: H(22),
  },


});

