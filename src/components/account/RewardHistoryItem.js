import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { H } from '../../utils/GlobalStyles'

const RewardHistoryItem = ({item}) => {
    return (
        <View style={{flexDirection:'row',width:'95%',marginLeft:'2.5%',borderBottomWidth:1,paddingVertical:H(10),justifyContent:'space-between'}}>
            <Text>{item.action_date}</Text>
            <Text>{item.amount}</Text>
            <Text>{item.comment}</Text>
            <Text>{item.action}</Text>
            <Text>{item.points_left}</Text>

        </View>
    )
}

export default RewardHistoryItem

const styles = StyleSheet.create({})
