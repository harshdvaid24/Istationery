import React, { useContext,useState } from 'react';
import { ScrollView, View,TouchableOpacity,Image } from 'react-native';
import { connect } from 'react-redux';
import CheckoutSection from './CheckoutSection';
import { Spinner, ModalSelect, Button, Text, Input, Price } from '../common';
import CheckoutCustomerAccount from './CheckoutCustomerAccount';
import CheckoutShippingMethod from './CheckoutShippingMethod';
import CheckoutPaymentMethod from './CheckoutPaymentMethod';
import CheckoutTotals from './CheckoutTotals';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import CommonStyle from '../../utils/CommonStyle'
import GlobalStyle,{W,H} from '../../utils/GlobalStyles'

const Title = ({title}) => {
  return(
  <View style={{flex:1,marginLeft:20  }}>
      <Text type="heading" bold >{title}</Text>
  </View>
  )
  
} 
const Checkout = ({
  navigation,
  activeSection: _activeSection,
}) => {
  const theme = useContext(ThemeContext);
  // const [activeSection, setactiveState] = useState(_activeSection)
  const activeSection = Number(_activeSection);
  // console.log('FROM CHECKOUT PAGE',activeSection)
  // const activateNewSection = (sectionNumber) =>{
  //   setactiveState(sectionNumber)
  // }

  return (
    <ScrollView style={styles.container(theme)}>
      <CheckoutSection
        title={translate('checkout.customerAccount')}
        number="1"
        expanded={activeSection === 1}
      >
        <CheckoutCustomerAccount />
      </CheckoutSection>
      <CheckoutSection
        title={translate('checkout.shippingMethod')}
        number="2"
        expanded={activeSection === 2}
      >
      {/* {activeSection == 2 && */}
        <CheckoutShippingMethod />
      {/* } */}
      </CheckoutSection>
      <CheckoutSection
        title={translate('checkout.paymentMethod')}
        number="3"
        expanded={activeSection === 3}
      >
      {/* {activeSection == 3 &&   */}
        <CheckoutPaymentMethod navigation={navigation} />
        {/* } */}
      </CheckoutSection>
      <CheckoutSection
        title={translate('checkout.summary')}
        number="4"
        expanded={activeSection === 4}
      >
      {/* {activeSection == 4 &&  */}
        <CheckoutTotals navigation={navigation} />
      {/* } */}
      </CheckoutSection>
    </ScrollView>
  );
};
Checkout['navigationOptions'] = screenProps => ({
  headerTitle: () => <Title title={translate('checkout.title')} />,
  title: translate('checkout.title'),
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {screenProps.navigation.goBack() }}
      >
      <Image style={[CommonStyle.Icon25,CommonStyle.marginLR20]} source={require("./.././../../resources/icons/back.png")} />
      </TouchableOpacity>
  ),
  headerBackTitle: ' ',
  headerStyle: {
    backgroundColor:GlobalStyle.colorSet.white,
    height: 50,
    elevation: 0,
    borderBottomColor:'transparent',
  }
});


const styles = {
  container: theme => ({
    backgroundColor: theme.colors.white,
    flex: 1,
  }),
};

const mapStateToProps = ({ checkout }) => {
  const { activeSection } = checkout;

  return {
    activeSection,
  };
};

export default connect(mapStateToProps)(Checkout);
