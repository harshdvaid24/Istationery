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

export const AddressItem = ({ item, onOptionPressed, navigation }) => {
  // console.log('ThumbnailItemV:', item);
  console.log('AddressList:',item.item);
 
  const OnOptionPressed = () => {
  onOptionPressed(item.item.id);
  };



  return (
    <View style={[styles.cardRow,CommonStyle.alignContentLR]}>
      <View style={[CommonStyle.FlexRow]}>
           
              <View  style={[styles.ItemTextContainer]}>
                    <Text numberOfLines={1} style={[CommonStyle.lBlackRegular]}>{item.item.firstname} {item.item.lastname}</Text> 
                    <View style={[CommonStyle.marginTop5]}>
                      <Text>{item.item.street},{item.item.city},{item.item.region}, </Text>
                      <Text>{item.item.country},{item.item.pincode} </Text>
                    </View>
                    <TouchableOpacity style={[CommonStyle.rectBtn,CommonStyle.marginTop20]}>
                      <Text style={[CommonStyle.mWhitleSemiBold]}>
                       Edit
                      </Text>
                    </TouchableOpacity>
                    {/* {item.item.default_billing && <Text>Default</Text>} */}
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
