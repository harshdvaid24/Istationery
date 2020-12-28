import React, { useState, useEffect } from 'react';
import {
  View,
  Platform,
  NativeModules, Keyboard
} from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
import GlobalStyles,{ W, H,WINDOW_HEIGHT,WINDOW_WIDTH } from '../../../utils/GlobalStyles';
import CommonStyle from '../../../utils/CommonStyle';
import styles from './styles';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const HomeScreenLoader = props => {

  return (
    <SkeletonPlaceholder 
    highlightColor={GlobalStyles.colorSet.separatorGray}
    backgroundColor={GlobalStyles.colorSet.BorderGrey}>
  

<View style={[CommonStyle.marginLR10,CommonStyle.marginTop10,CommonStyle.marginBottom20,{ flexDirection: "row", alignItems: "center" }]}>
       <View
        style={[{
          height: WINDOW_HEIGHT * 0.25,
          width: WINDOW_WIDTH-W(20),
          borderRadius: 4 }]}
      />
 </View>

 <View style={[CommonStyle.marginLR10,CommonStyle.marginTop10,CommonStyle.marginBottom20,{ flexDirection: "row", alignItems: "center" }]}>
       <View
        style={[{
          height:H(140),
          width: WINDOW_WIDTH-W(20),
          borderRadius: 4 }]}
      />
 </View>


 <View style={[CommonStyle.marginLR10,CommonStyle.marginTB10,{ flexDirection: "row", alignItems: "center" }]}>
       <View
        style={[CommonStyle.marginLR5,{
            height:H(100),
           width: H(100) ,
          borderRadius: 4 }]}
      />

       <View
        style={[CommonStyle.marginLR5,{
            height:H(100),
           width: H(100),
          borderRadius: 4 }]}
      />

     <View
        style={[CommonStyle.marginLR5,{
            height:H(100),
           width: H(100) ,
          borderRadius: 4 }]}
      />

       <View
        style={[CommonStyle.marginLR5,{
            height:H(100),
           width: H(100),
          borderRadius: 4 }]}
      />
 </View>

 <View style={[CommonStyle.marginLR10,CommonStyle.marginTop10,CommonStyle.marginBottom20,{ flexDirection: "row", alignItems: "center" }]}>
       <View
        style={[{
          height:H(170),
          width: WINDOW_WIDTH-W(20),
          borderRadius: 4 }]}
      />
 </View>

 
</SkeletonPlaceholder>
  );
};
export default HomeScreenLoader;
