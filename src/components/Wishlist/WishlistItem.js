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
import { magento } from '../../magento';
import GlobalStyle from '../../utils/GlobalStyles';
import CommonStyle from '../../utils/CommonStyle';
import FastImage from 'react-native-fast-image';
import styles from './styles';

export const WishlistItem = ({ item, onOptionPressed,onProduct, navigation }) => {
   console.log('ThumbnailItemV:', item);
  // console.log('PackageItem:',item.item.productItem);
 
  const OnOptionPressed = () => {
  onOptionPressed(item.item.wishlistId);
  };

  const onProductSelect = () =>{
    onProduct(item.item.productItem);
  }
 

  return (
    <View style={[styles.cardRow,CommonStyle.alignContentLR]}>
      <TouchableOpacity onPress={onProductSelect}
      style={[CommonStyle.FlexRow]}>
            <FastImage
                  resizeMode="contain"
                  style={[CommonStyle.Icon100]}
                  source={{uri:magento.getProductMediaUrl() + item.item.productItem.media_gallery_entries[0].file }}
                />
              <View  style={[styles.ItemTextContainer]}>
                    <Text numberOfLines={1} style={[CommonStyle.lBlackRegular]}>{item.item.productItem.name}</Text> 
                    <View style={[CommonStyle.marginTop5]}>
                      <Text style={[CommonStyle.mPrimarySemiBold]}>{'BD '} {parseFloat(item.item.productItem.price).toFixed(3)} </Text>
                    </View>
                    {/* <TouchableOpacity style={[CommonStyle.rectBtn,CommonStyle.marginTop20]} onPress={onAddToCart}>
                      <Text style={[CommonStyle.mWhitleSemiBold]}>
                        Add to Cart
                      </Text>
                    </TouchableOpacity> */}
              </View>  
       
      </TouchableOpacity>
     
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
