import React,{useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import { NAVIGATION_SEARCH_SCREEN_PATH } from '../../navigation/routes';
import CommonStyle from '../../utils/CommonStyle';
import GlobalStyle, { H, StatusbarHeight, WINDOW_HEIGHT } from '../../utils/GlobalStyles';
import CartBadge from '../cart/CartBadge';
import RewardHistoryItem from './RewardHistoryItem';
import {useSelector,useDispatch} from 'react-redux'
import { getRewardHistory } from '../../actions';

const RewardHistoryScreen = ({navigation}) => {

    const data = [{date:'4/25/2019',change:'-35.00',comment:'Order #350000', action:'Order Paid', left:'95.00'}]
    const dispatch = useDispatch()
    const customerData = useSelector(state => state.account.customer);
    const historyData = useSelector(state => state.account.reward_history)
    console.log('from view',historyData);

    useEffect(()=>{
      const unsubscribe = navigation.addListener('didFocus', () => {
        dispatch(getRewardHistory(customerData?.id))
      });
    },[])
    return (
        <View>
           <View style={{flexDirection:'row',width:'95%',marginLeft:'2.5%',justifyContent:'space-between',borderBottomWidth:1,marginTop:H(10),paddingVertical:H(10),borderTopWidth:1}}>
            <Text>Date</Text>
            <Text>Change</Text>
            <Text>Comment</Text>
            <Text>Action</Text>
            <Text>Points Left</Text>

        </View>
            <FlatList
              data={historyData}
              renderItem={({item})=><RewardHistoryItem item={item}/>}
            />
        </View>
    )
}

RewardHistoryScreen['navigationOptions'] = screenProps => ({
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {screenProps.navigation.goBack() }}
        >
        <Image style={[CommonStyle.Icon25,CommonStyle.marginTB10,CommonStyle.marginLR20]} source={require("./.././../../resources/icons/back.png")} />
        </TouchableOpacity>
    ),
    title: 'My Reward History'.toUpperCase(),
    headerStyle: {
      backgroundColor:'white',
      marginTop:Platform.OS === 'ios' ? (WINDOW_HEIGHT>812)?H(0):0 : H(StatusbarHeight),
      height: H(40),
      elevation: 0,
       borderWidth:0,
    //  borderBottomColor:'transparent',
    },
  
  });

export default RewardHistoryScreen

const styles = StyleSheet.create({})
