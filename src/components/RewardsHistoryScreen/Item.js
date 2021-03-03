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
import {DateFomat3} from '../../utils/commonFunction';

import FastImage from 'react-native-fast-image';
import styles from './styles';

export const Item = ({item}) => {
  // console.log('PackageItem:',item.item.productItem);
  let sDate = new Date(item.item.action_date);
  // Date.parse("05/12/05 11:11:11")
  return (
    <View style={[styles.mainContainar]}>
    {
      (item.index==0)?
      <View style={[styles.Row]}>
              <View  style={[styles.Col1,CommonStyle.alignItemsRight]}>
                        <Text numberOfLines={1} style={[CommonStyle.mBlackRegular]}>Amount to Expire</Text> 
              </View> 
              <View  style={[styles.Col2,CommonStyle.alignItemsLeft]}>
                        <Text numberOfLines={1} style={[CommonStyle.mBlackRegular]}>Expiration Date</Text> 
              </View> 
             
      </View>:null}
      <View style={[styles.Row,CommonStyle.alignContentLR]}>
             
      <View  style={[styles.Col1,CommonStyle.alignItemsRight]}>
                        <View  style={[CommonStyle.FlexRow,CommonStyle.HorizontalCenter]}>
                           <Text numberOfLines={1} style={[CommonStyle.mGreyRegular]}>{parseFloat(item.item.amount).toFixed(2)}</Text>
                        </View>
              </View>  
              <View  style={[CommonStyle.alignItemsLeft,styles.Col2]}>
                        <Text numberOfLines={1} style={[CommonStyle.mGreyRegular]}>{DateFomat3(sDate)}</Text>       
              </View>  
             
            
      </View>
    </View> 
  );
};
