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

const OrderListScreenLoader = props => {

  return (
    <SkeletonPlaceholder>


{/* ----------- Order list Item --------------*/}

<View style={[CommonStyle.marginTB10,{justifyContent:Strings.getLanguage() == 'en' ?'flex-start':'flex-end'}]}>
            <View style={[CommonStyle.marginTB10,Strings.getLanguage() == 'en' ? CommonStyle.FlexRow : CommonStyle.FlexReverseRow]}>
                      <View style={[{height: W(16), width: W(100) ,borderRadius: 4 }]}/>
            </View>
 
            <View style={[CommonStyle.marginTop5,Strings.getLanguage() == 'en' ? CommonStyle.FlexRow : CommonStyle.FlexReverseRow,
                   {justifyContent:'space-between'}]}>
                      <View
                        style={[{
                          height: W(12),
                          width: W(180) ,
                          borderRadius: 4 }]}
                      />   
                      <View
                        style={[{
                          height: W(15),
                          width: W(70) ,
                          borderRadius: 4 }]}
                      />     
              </View>

               <View style={[CommonStyle.marginTB5,Strings.getLanguage() == 'en' ? CommonStyle.FlexRow : CommonStyle.FlexReverseRow]}>
                        <View
                          style={[CommonStyle.marginLR5,{
                            height: W(12),
                            width: W(90) ,
                            borderRadius: 4 }]}
                        />

                        <View
                          style={[CommonStyle.marginLR5,{
                            height: W(12),
                            width: W(80) ,
                            borderRadius: 4 }]}
                        />  
                  
               </View>

                <View style={[CommonStyle.marginTB5,Strings.getLanguage() == 'en' ? CommonStyle.FlexRow : CommonStyle.FlexReverseRow]}>
                          <View
                            style={[CommonStyle.marginLR5,{
                              height: W(12),
                              width: W(80) ,
                              borderRadius: 4 }]}
                          />

                          <View
                            style={[CommonStyle.marginLR5,{
                              height: W(12),
                              width: W(30) ,
                              borderRadius: 4 }]}
                          />  
                            
                </View>
  </View>
{/* -----End------ Order list Item --------------*/}

 

{/* ----------- Order list Item --------------*/}

<View style={[CommonStyle.marginTB10,{justifyContent:Strings.getLanguage() == 'en' ?'flex-start':'flex-end'}]}>
            <View style={[CommonStyle.marginTB10,Strings.getLanguage() == 'en' ? CommonStyle.FlexRow : CommonStyle.FlexReverseRow]}>
                      <View style={[{height: W(16), width: W(100) ,borderRadius: 4 }]}/>
            </View>
 
            <View style={[CommonStyle.marginTop5,Strings.getLanguage() == 'en' ? CommonStyle.FlexRow : CommonStyle.FlexReverseRow,
                   {justifyContent:'space-between'}]}>
                      <View
                        style={[{
                          height: W(12),
                          width: W(180) ,
                          borderRadius: 4 }]}
                      />   
                      <View
                        style={[{
                          height: W(15),
                          width: W(70) ,
                          borderRadius: 4 }]}
                      />     
              </View>

               <View style={[CommonStyle.marginTB5,Strings.getLanguage() == 'en' ? CommonStyle.FlexRow : CommonStyle.FlexReverseRow]}>
                        <View
                          style={[CommonStyle.marginLR5,{
                            height: W(12),
                            width: W(90) ,
                            borderRadius: 4 }]}
                        />

                        <View
                          style={[CommonStyle.marginLR5,{
                            height: W(12),
                            width: W(80) ,
                            borderRadius: 4 }]}
                        />  
                  
               </View>

                <View style={[CommonStyle.marginTB5,Strings.getLanguage() == 'en' ? CommonStyle.FlexRow : CommonStyle.FlexReverseRow]}>
                          <View
                            style={[CommonStyle.marginLR5,{
                              height: W(12),
                              width: W(80) ,
                              borderRadius: 4 }]}
                          />

                          <View
                            style={[CommonStyle.marginLR5,{
                              height: W(12),
                              width: W(30) ,
                              borderRadius: 4 }]}
                          />  
                            
                </View>
  </View>
{/* -----End------ Order list Item --------------*/}



{/* ----------- Order list Item --------------*/}

<View style={[CommonStyle.marginTB10,{justifyContent:Strings.getLanguage() == 'en' ?'flex-start':'flex-end'}]}>
            <View style={[CommonStyle.marginTB10,Strings.getLanguage() == 'en' ? CommonStyle.FlexRow : CommonStyle.FlexReverseRow]}>
                      <View style={[{height: W(16), width: W(100) ,borderRadius: 4 }]}/>
            </View>
 
            <View style={[CommonStyle.marginTop5,Strings.getLanguage() == 'en' ? CommonStyle.FlexRow : CommonStyle.FlexReverseRow,
                   {justifyContent:'space-between'}]}>
                      <View
                        style={[{
                          height: W(12),
                          width: W(180) ,
                          borderRadius: 4 }]}
                      />   
                      <View
                        style={[{
                          height: W(15),
                          width: W(70) ,
                          borderRadius: 4 }]}
                      />     
              </View>

               <View style={[CommonStyle.marginTB5,Strings.getLanguage() == 'en' ? CommonStyle.FlexRow : CommonStyle.FlexReverseRow]}>
                        <View
                          style={[CommonStyle.marginLR5,{
                            height: W(12),
                            width: W(90) ,
                            borderRadius: 4 }]}
                        />

                        <View
                          style={[CommonStyle.marginLR5,{
                            height: W(12),
                            width: W(80) ,
                            borderRadius: 4 }]}
                        />  
                  
               </View>

                <View style={[CommonStyle.marginTB5,Strings.getLanguage() == 'en' ? CommonStyle.FlexRow : CommonStyle.FlexReverseRow]}>
                          <View
                            style={[CommonStyle.marginLR5,{
                              height: W(12),
                              width: W(80) ,
                              borderRadius: 4 }]}
                          />

                          <View
                            style={[CommonStyle.marginLR5,{
                              height: W(12),
                              width: W(30) ,
                              borderRadius: 4 }]}
                          />  
                            
                </View>
  </View>
{/* -----End------ Order list Item --------------*/}


{/* ----------- Order list Item --------------*/}

<View style={[CommonStyle.marginTB10,{justifyContent:Strings.getLanguage() == 'en' ?'flex-start':'flex-end'}]}>
            <View style={[CommonStyle.marginTB10,Strings.getLanguage() == 'en' ? CommonStyle.FlexRow : CommonStyle.FlexReverseRow]}>
                      <View style={[{height: W(16), width: W(100) ,borderRadius: 4 }]}/>
            </View>
 
            <View style={[CommonStyle.marginTop5,Strings.getLanguage() == 'en' ? CommonStyle.FlexRow : CommonStyle.FlexReverseRow,
                   {justifyContent:'space-between'}]}>
                      <View
                        style={[{
                          height: W(12),
                          width: W(180) ,
                          borderRadius: 4 }]}
                      />   
                      <View
                        style={[{
                          height: W(15),
                          width: W(70) ,
                          borderRadius: 4 }]}
                      />     
              </View>

               <View style={[CommonStyle.marginTB5,Strings.getLanguage() == 'en' ? CommonStyle.FlexRow : CommonStyle.FlexReverseRow]}>
                        <View
                          style={[CommonStyle.marginLR5,{
                            height: W(12),
                            width: W(90) ,
                            borderRadius: 4 }]}
                        />

                        <View
                          style={[CommonStyle.marginLR5,{
                            height: W(12),
                            width: W(80) ,
                            borderRadius: 4 }]}
                        />  
                  
               </View>

                <View style={[CommonStyle.marginTB5,Strings.getLanguage() == 'en' ? CommonStyle.FlexRow : CommonStyle.FlexReverseRow]}>
                          <View
                            style={[CommonStyle.marginLR5,{
                              height: W(12),
                              width: W(80) ,
                              borderRadius: 4 }]}
                          />

                          <View
                            style={[CommonStyle.marginLR5,{
                              height: W(12),
                              width: W(30) ,
                              borderRadius: 4 }]}
                          />  
                            
                </View>
  </View>
{/* -----End------ Order list Item --------------*/}



{/* ----------- Order list Item --------------*/}

<View style={[CommonStyle.marginTB10,{justifyContent:Strings.getLanguage() == 'en' ?'flex-start':'flex-end'}]}>
            <View style={[CommonStyle.marginTB10,Strings.getLanguage() == 'en' ? CommonStyle.FlexRow : CommonStyle.FlexReverseRow]}>
                      <View style={[{height: W(16), width: W(100) ,borderRadius: 4 }]}/>
            </View>
 
            <View style={[CommonStyle.marginTop5,Strings.getLanguage() == 'en' ? CommonStyle.FlexRow : CommonStyle.FlexReverseRow,
                   {justifyContent:'space-between'}]}>
                      <View
                        style={[{
                          height: W(12),
                          width: W(180) ,
                          borderRadius: 4 }]}
                      />   
                      <View
                        style={[{
                          height: W(15),
                          width: W(70) ,
                          borderRadius: 4 }]}
                      />     
              </View>

               <View style={[CommonStyle.marginTB5,Strings.getLanguage() == 'en' ? CommonStyle.FlexRow : CommonStyle.FlexReverseRow]}>
                        <View
                          style={[CommonStyle.marginLR5,{
                            height: W(12),
                            width: W(90) ,
                            borderRadius: 4 }]}
                        />

                        <View
                          style={[CommonStyle.marginLR5,{
                            height: W(12),
                            width: W(80) ,
                            borderRadius: 4 }]}
                        />  
                  
               </View>

                <View style={[CommonStyle.marginTB5,Strings.getLanguage() == 'en' ? CommonStyle.FlexRow : CommonStyle.FlexReverseRow]}>
                          <View
                            style={[CommonStyle.marginLR5,{
                              height: W(12),
                              width: W(80) ,
                              borderRadius: 4 }]}
                          />

                          <View
                            style={[CommonStyle.marginLR5,{
                              height: W(12),
                              width: W(30) ,
                              borderRadius: 4 }]}
                          />  
                            
                </View>
  </View>
{/* -----End------ Order list Item --------------*/}



{/* ----------- Order list Item --------------*/}

<View style={[CommonStyle.marginTB10,{justifyContent:Strings.getLanguage() == 'en' ?'flex-start':'flex-end'}]}>
            <View style={[CommonStyle.marginTB10,Strings.getLanguage() == 'en' ? CommonStyle.FlexRow : CommonStyle.FlexReverseRow]}>
                      <View style={[{height: W(16), width: W(100) ,borderRadius: 4 }]}/>
            </View>
 
            <View style={[CommonStyle.marginTop5,Strings.getLanguage() == 'en' ? CommonStyle.FlexRow : CommonStyle.FlexReverseRow,
                   {justifyContent:'space-between'}]}>
                      <View
                        style={[{
                          height: W(12),
                          width: W(180) ,
                          borderRadius: 4 }]}
                      />   
                      <View
                        style={[{
                          height: W(15),
                          width: W(70) ,
                          borderRadius: 4 }]}
                      />     
              </View>

               <View style={[CommonStyle.marginTB5,Strings.getLanguage() == 'en' ? CommonStyle.FlexRow : CommonStyle.FlexReverseRow]}>
                        <View
                          style={[CommonStyle.marginLR5,{
                            height: W(12),
                            width: W(90) ,
                            borderRadius: 4 }]}
                        />

                        <View
                          style={[CommonStyle.marginLR5,{
                            height: W(12),
                            width: W(80) ,
                            borderRadius: 4 }]}
                        />  
                  
               </View>

                <View style={[CommonStyle.marginTB5,Strings.getLanguage() == 'en' ? CommonStyle.FlexRow : CommonStyle.FlexReverseRow]}>
                          <View
                            style={[CommonStyle.marginLR5,{
                              height: W(12),
                              width: W(80) ,
                              borderRadius: 4 }]}
                          />

                          <View
                            style={[CommonStyle.marginLR5,{
                              height: W(12),
                              width: W(30) ,
                              borderRadius: 4 }]}
                          />  
                            
                </View>
  </View>
{/* -----End------ Order list Item --------------*/}

</SkeletonPlaceholder>
  );
};
export default OrderListScreenLoader;
