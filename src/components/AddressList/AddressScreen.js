import React, { useState, useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
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
import {getAddress} from '../../actions'

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


const dispatch = useDispatch();
const customer = useSelector(state=>state.account.customer)
const AddressList = useSelector(state=>state.account.address)
const Loading = useSelector(state=>state.account.loading);
console.log(Loading);
useEffect(() => {
  dispatch(getAddress(customer.id))
},[])
  // const [AddressListItems, setAddressListItems] = useState(AddressList)
  

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
          data={AddressList}
          onRefresh={() => dispatch(getAddress(customer.id))}
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
        }
export default AddressListScreen;
