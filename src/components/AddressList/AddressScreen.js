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
import {MAGENTO_ADD_ADDRESS_SUCCESS} from '../../actions/types'

import { W, H,StatusbarHeight,WINDOW_HEIGHT } from '../../utils/GlobalStyles';
import CommonStyle from '../../utils/CommonStyle';
import GlobalStyle from '../../utils/GlobalStyles';
import styles from './styles';
import { AddressItem } from './AddressItem';
import {ADD_ADDRESS_PATH,NAVIGATION_ACCOUNT_PATH} from '../../navigation/routes'
import {Spinner} from '../common'

const AddressListScreen = props => {
 


const dispatch = useDispatch();
const customer = useSelector(state=>state.account.customer)
const AddressList = useSelector(state=>state.account.address)
const Loading = useSelector(state=>state.account.loading);
const error = useSelector(state=>state.account.deleteError)
useEffect(() => {
  dispatch(getAddress(customer.id));
  dispatch({type:MAGENTO_ADD_ADDRESS_SUCCESS , payload:false})
},[])
  // const [AddressListItems, setAddressListItems] = useState(AddressList)
  

  const [isOpen, setIsOpen] = useState(false);
 
 
 
  const onRemove =(optionId) => {
    dispatch(deleteAddress(customer.id,optionId));
    if(error)
    {
      alert('Something went wrong!')
    }
    // console.log('onRemove',optionId);
    // setSelectedCustomer(optionId);
    
    //  setIsOpen(true);
   
   
 }

 const onEdit =(address) => {
  props.navigation.navigate(ADD_ADDRESS_PATH,{address:address})
}
 const renderEmptyAddressList = () => {
  if(Loading)
  {
    return <Spinner/>
  }
  
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
    if(Loading)
    {
      return <Spinner/>
    }
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
            return <AddressItem item={item} onRemove={onRemove} OnEdit={onEdit} navigation={props.navigation} />;
          }}
          // keyExtractor={item => item.id.toString()}
          keyExtractor={(item, index) => index.toString()}
        />
             

     </View>
       
  );
        }
  return renderEmptyAddressList();

        }
AddressListScreen.navigationOptions = screenProps => ({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {screenProps.navigation.navigate(NAVIGATION_ACCOUNT_PATH) }}
              >
              <Image style={[CommonStyle.Icon25,CommonStyle.marginTB10,CommonStyle.marginLR20]} source={require("./.././../../resources/icons/back.png")} />
              </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={[CommonStyle.paddingLR20,CommonStyle.paddingTB20]}
              onPress={() => {screenProps.navigation.navigate(ADD_ADDRESS_PATH) }}
              >
                  <Text style={[CommonStyle.lPrimarySemiBold]}>Add</Text>
              </TouchableOpacity>
          ),
          headerBackTitle: ' ',
          headerTitle:'My Addresses',
          headerStyle: {
            backgroundColor:GlobalStyle.colorSet.white,
            marginTop:Platform.OS === 'ios' ? 0 : (WINDOW_HEIGHT>770)? H(27) : H(StatusbarHeight),
            // height: H(40),
            height: H(60),
            elevation: 0,
             borderWidth:0,
           borderBottomColor:'transparent',
          }
      });
export default AddressListScreen;
