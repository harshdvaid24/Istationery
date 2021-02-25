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
import {DateFomat2} from '../../utils/commonFunction';

import FastImage from 'react-native-fast-image';
import styles from './styles';

export const Item = ({item}) => {
   console.log('ThumbnailItemV:', item);
  // console.log('PackageItem:',item.item.productItem);
  let sDate = new Date(item.item.action_date);
  // Date.parse("05/12/05 11:11:11")
  return (
    <View style={[styles.cardRow]}>
      <View style={[CommonStyle.FlexRow,CommonStyle.alignContentLR]}>
              <View  style={[CommonStyle.width60p]}>
                        <Text numberOfLines={1} style={[CommonStyle.sGreyRegular]}>Date</Text> 
                        <Text numberOfLines={1} style={[CommonStyle.lBlackRegular,CommonStyle.marginTop5]}>{DateFomat2(sDate)}</Text> 
                        {/* <Text numberOfLines={1} style={[CommonStyle.lBlackRegular]}>{item.item.action_date}</Text>  */}
              </View> 
              <View  style={[CommonStyle.width40p]}>
                        <Text numberOfLines={1} style={[CommonStyle.sGreyRegular]}>Comment</Text> 
                        <Text numberOfLines={1} style={[CommonStyle.lBlackRegular,CommonStyle.marginTop5]}>{item.item.comment}</Text> 
              </View> 
             
      </View>
      <View style={[CommonStyle.FlexRow,CommonStyle.marginTop20,CommonStyle.alignContentLR]}>
             
              <View  style={[CommonStyle.FlexWrap,CommonStyle.width60p]}>
                        <Text numberOfLines={1} style={[CommonStyle.sGreyRegular]}>Action</Text> 
                        <Text numberOfLines={1} style={[CommonStyle.lBlackRegular,CommonStyle.marginTop5]}>{item.item.action}</Text> 
                         
              </View>  
             
              <View  style={[CommonStyle.width40p]}>
                        <Text numberOfLines={1} style={[CommonStyle.sGreyRegular]}>Points Left(Change)</Text> 

                        <View  style={[CommonStyle.FlexRow,CommonStyle.HorizontalCenter,CommonStyle.marginTop5]}>
                           <Text numberOfLines={1} style={[CommonStyle.lBlackSemiBold]}>{parseFloat(item.item.points_left).toFixed(2)}</Text>
                           {(item.item.amount.toString().includes('-'))?
                             <Text numberOfLines={1} style={[CommonStyle.mLightRed]}>{'   (-'}{parseFloat(item.item.amount).toFixed(2)}{')'}</Text>:
                           <Text numberOfLines={1} style={[CommonStyle.mLightGreen]}>{'   (+'}{parseFloat(item.item.amount).toFixed(2)}{')'}</Text>
                           } 
                        </View>
                      
              </View>  
      </View>
    </View> 
  );
};
