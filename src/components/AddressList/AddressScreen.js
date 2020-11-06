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
import {getAddress, deleteAddress} from '../../actions';
import { translate } from '../../i18n';

import { W, H } from '../../utils/GlobalStyles';
import CommonStyle from '../../utils/CommonStyle';
import GlobalStyle from '../../utils/GlobalStyles';
import styles from './styles';
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
const error = useSelector(state=>state.account.error)
console.log(Loading);
useEffect(() => {
  dispatch(getAddress(customer.id))
},[])
  // const [AddressListItems, setAddressListItems] = useState(AddressList)
  

  const [isOpen, setIsOpen] = useState(false);
 
 
 
  const onOptionPressed =(optionId) => {
    dispatch(deleteAddress(customer.id,optionId));
    if(error)
    {
      alert('Something went wrong!')
    }
    // console.log('onOptionPressed',optionId);
    // setSelectedCustomer(optionId);
    
    //  setIsOpen(true);
   
   
 }
 const renderEmptyAddressList = () => {
  return (
    <View style={[styles.emptyListContainerStyle]}>
      <Text style={[CommonStyle.lGreyRegular]}>
        {translate('AddressListScreen.noAddresslistMessage')}
      </Text>
      {/* <TouchableOpacity
        onPress={() => navigate(NAVIGATION_HOME_SCREEN_PATH)}
      >
        <Text type="heading"  style={styles.buttonTextStyle(theme)}>
          {translate('common.continueShopping')}
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};




  //useEffect
  // useEffect(() => {
  //   setPackageListData(props.Data);
    
  // });
  if (AddressList && AddressList.length) {
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
  return renderEmptyAddressList();

        }
export default AddressListScreen;
