import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Keyboard,
  Image,
  TouchableOpacity,
  Platform,
  FlatList,
  StatusBar,
  Dimensions,
  ImageBackground,
  TouchableHighlight,
  SafeAreaView,
  Alert,
  PermissionsAndroid,
  NativeModules,
} from 'react-native';
import { W, H } from '../../utils/GlobalStyles';

import GlobalStyle from '../../utils/GlobalStyles';
import CommonStyle from '../../utils/CommonStyle';

import styles from './styles';

export const WishlistItem = ({ item, onOptionPressed, navigation }) => {
  // console.log('ThumbnailItemV:', item);
  // console.log('PackageItem:',item.item);
 
  const OnOptionPressed = () => {
  onOptionPressed(item.item.id);
  };



  return (
    <View style={[styles.cardRow,CommonStyle.alignContentLR]}>
      <View style={[CommonStyle.FlexRow]}>
            <Image
                  resizeMode="contain"
                  style={[CommonStyle.Icon100]}
                  source={{uri:'https://staging.istationery.com/pub/media/catalog/product/cache/8d91c3bb3302d1da0f0fa0ff37fb4476/d/g/dg1738.jpg'}}
                />
              <View  style={[styles.ItemTextContainer]}>
                    <Text numberOfLines={1} style={[CommonStyle.lBlackRegular]}>{item.item.productName}</Text> 
                    <View style={[CommonStyle.marginTop5]}>
                      <Text style={[CommonStyle.lGreySemiBold]}>{'BD '} {item.item.price} </Text>
                    </View>
                    <TouchableOpacity style={[CommonStyle.rectBtn,CommonStyle.marginTop20]}>
                      <Text style={[CommonStyle.mWhitleSemiBold]}>
                        Add to Cart
                      </Text>
                    </TouchableOpacity>
              </View>  
       
      </View>
     
        <TouchableOpacity onPress={OnOptionPressed}
          style={[CommonStyle.paddingLR20,CommonStyle.paddingTB20]}>
            <Image
                  resizeMode="contain"
                  style={[CommonStyle.Icon20]}
                  source={require('./../../../resources/icons/remove.png')}
                />
        </TouchableOpacity> 
    
    </View> 
  );
};
