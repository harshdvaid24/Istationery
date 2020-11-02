import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  FlatList,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
  TouchableHighlight,
  SafeAreaView,
  Alert,
  PermissionsAndroid,
  NativeModules,
} from 'react-native';


import { W, H } from '../../utils/GlobalStyles';
import CommonStyle from '../../utils/CommonStyle';
import GlobalStyle from '../../utils/GlobalStyles';
// import styles from './styles';
import { AddressItem } from './AddressItem';

const AddressListScreen = props => {

  AddressListScreen['navigationOptions'] = screenProps => ({
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {screenProps.navigation.goBack() }}
        >
        <Image style={[CommonStyle.Icon25,CommonStyle.marginLR20]} source={require("./.././../../resources/icons/back.png")} />
        </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity
        style={[CommonStyle.paddingLR20,CommonStyle.paddingTB20]}
        onPress={() => {screenProps.navigation.goBack() }}
        >
            <Text style={[CommonStyle.lPrimarySemiBold]}>Add</Text>
        </TouchableOpacity>
    ),
    headerBackTitle: ' ',
    headerTitle:'My Addresses',
    headerStyle: {
      backgroundColor:GlobalStyle.colorSet.White,
      height: H(50),
      elevation: 0,
      borderBottomColor:'transparent',
    }
});



  const [WishlistItems, setWishlistItems] = useState([
    {id:1,productName:"New machine HP 15 series",price:20},
    {id:1,productName:"machine",price:20},
     {id:1,productName:"New machine HP 15 series and not play",price:20},
  ])
  

  const [isOpen, setIsOpen] = useState(false);
 
 
 
  const onOptionPressed =(optionId) => {
    console.log('onOptionPressed',optionId);
    setSelectedCustomer(optionId);
    
     setIsOpen(true);
   
   
 }





  //useEffect
  // useEffect(() => {
  //   setPackageListData(props.Data);
    
  // });
  return (
     <View style={[CommonStyle.marginBottom20,{backgroundColor:GlobalStyle.colorSet.mainBgColor}]}>

             
      <FlatList
          data={WishlistItems}
          onRefresh={() => dispatch(get_Employees(Token))}
          refreshing={false}
          // ListFooterComponent={renderFooter}
          removeClippedSubviews={false}
          extraData={props.state}
          // contentContainerStyle={{paddingHorizontal: W(10)}}
          numColumns={1}
          showsHorizontalScrollIndicator={false}
          renderItem={item => {
            return <AddressItem item={item} onOptionPressed={onOptionPressed} navigation={props.navigation} />;
          }}
          // keyExtractor={item => item.id.toString()}
          keyExtractor={(item, index) => index.toString()}
        />
             

     </View>
       
  );
};
export default AddressListScreen;
