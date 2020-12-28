import React, { useState, useEffect } from 'react';
import {
  View,
  Platform,
  NativeModules, Keyboard
} from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
import { W, H } from '../../../utils/GlobalStyles';
import CommonStyle from '../../../utils/CommonStyle';
import Strings from '../../../utils/strings';
import styles from './styles';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const ProductDetailScreenLoader = props => {

  return (
    <SkeletonPlaceholder>

      {/* ----------- ProductTitle --------------*/}
      <View style={[Strings.getLanguage() == 'en'
                ? CommonStyle.alignItemsLeft
                : CommonStyle.alignItemsRight]}>
          <View
            style={[CommonStyle.marginTB10,CommonStyle.marginLR20,{ width: W(190), height: W(20), borderRadius: 4 }]}
          />

        <View
            style={[CommonStyle.marginTB10,CommonStyle.marginLR20,{ width: W(150), height: W(10), borderRadius: 4 }]}
          />
      </View>

      {/* -----End------ ProductTitle --------------*/}
    

  {/* ----------- Product Image --------------*/}
        <View style={[CommonStyle.marginLR10,CommonStyle.marginTB20,CommonStyle.paddingTop10,{ flexDirection: "row", justifyContent:'center',alignItems: "center" }]}>
              <View
                style={[CommonStyle.marginLR10,{
                  height: H(140),
                  width: W(157),
                  borderRadius: 4 }]}
              />
        </View>
 {/* -----End------  Product Image --------------*/}


{/* ----------- Product Price and quantity --------------*/}
 <View style={[CommonStyle.marginLR20,CommonStyle.marginTB40,CommonStyle.paddingTop40,
        Strings.getLanguage() == 'en' ? CommonStyle.FlexRow : CommonStyle.FlexReverseRow,
        {justifyContent:'space-between',alignItems: "center" }]}>
            <View
              style={[CommonStyle.marginLR5,{
                height: W(30),
                width: W(80) ,
                borderRadius: 4 }]}
            />

            <View
              style={[CommonStyle.marginLR5,{
                height: W(30),
                width: W(170) ,
                borderRadius: 4 }]}
            />     
  </View>

 {/* -----End------  Product Price and quantity --------------*/}




{/* ----------- Product Modifiers --------------*/}

    <View style={[CommonStyle.paddingTop10,CommonStyle.paddingLR20,
    { flexWrap:'wrap',flexDirection: "row",justifyContent:'center',alignItems: "center",width:'100%' }]}>
              <View
                style={[CommonStyle.marginLR20,CommonStyle.marginTB20,{
                  height: H(50),
                  width: H(64),
                  borderRadius: 4 }]}
              />

              <View
                style={[CommonStyle.marginLR20,CommonStyle.marginTB20,{
                height: H(50),
                  width: H(64),
                  borderRadius: 4 }]}
              />
              <View
                style={[CommonStyle.marginLR20,CommonStyle.marginTB20,{
                height: H(50),
                  width: H(64),
                  borderRadius: 4 }]}
              />

           <View
                style={[CommonStyle.marginLR20,CommonStyle.marginTB20,{
                  height: H(50),
                  width: H(64),
                  borderRadius: 4 }]}
              />

              <View
                style={[CommonStyle.marginLR20,CommonStyle.marginTB20,{
                height: H(50),
                  width: H(64),
                  borderRadius: 4 }]}
              />
              <View
                style={[CommonStyle.marginLR20,CommonStyle.marginTB20,{
                height: H(50),
                  width: H(64),
                  borderRadius: 4 }]}
              />
              
    </View>

{/* ------end----- Product Modifiers --------------*/}





{/* ---------Bottom total and submit button */}
 <View style={[CommonStyle.marginLR10,CommonStyle.marginTB20,Strings.getLanguage() == 'en'
                ? CommonStyle.FlexRow
                : CommonStyle.FlexReverseRow,{ justifyContent:'flex-end',alignItems: "center" }]}>
       <View
        style={[CommonStyle.marginLR20,Strings.getLanguage() == 'en'
        ? CommonStyle.alignItemsLeft
        : CommonStyle.alignItemsRight,{
          height: W(50), width: W(70),
          borderRadius: 4 }]}
      >
        <View
        style={[CommonStyle.marginLR10,{
         height: W(20), width: W(60),
          borderRadius: 4 }]}
      />

      <View
        style={[CommonStyle.marginLR10,CommonStyle.marginTop10,{
         height: W(15), width: W(45),
          borderRadius: 4 }]}
      />
      
      </View>

       <View
        style={[CommonStyle.marginLR10,{
         height: W(60), width: W(130),
          borderRadius: 4 }]}
      />
 </View>

 {/* ----End-----Bottom total and submit button */}
</SkeletonPlaceholder>
  );
};
export default ProductDetailScreenLoader;
