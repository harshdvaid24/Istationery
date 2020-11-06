import React from 'react';
import { View , TouchableOpacity,Image} from 'react-native';
import AddAccountAddress from './AddAccountAddress';
import { translate } from '../../i18n';
import CommonStyle from './../../utils/CommonStyle'
import GlobalStyles,{W,H} from './../../utils/GlobalStyles'
const AddressScreen = () => (
  <View style={{ flex: 1 }}>
    <AddAccountAddress />
  </View>
);

AddressScreen.navigationOptions = (props) => ({
  title: translate('addAccountAddress.title'),
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {props.navigation.goBack() }}
      >
      <Image style={[CommonStyle.Icon25,CommonStyle.marginLR20]} source={require("./.././../../resources/icons/back.png")} />
      </TouchableOpacity>
  ),
});

export default AddressScreen;
