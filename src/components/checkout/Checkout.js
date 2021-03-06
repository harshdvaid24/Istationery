import React, { useContext,useState } from 'react';
import { ScrollView, View,TouchableOpacity,Image,Text } from 'react-native';
import { connect } from 'react-redux';
import CheckoutSection from './CheckoutSection';
import CartBadge from '../../components/cart/CartBadge';
import { Spinner, ModalSelect, Button, Input, Price } from '../common';
import CheckoutCustomerAccount from './CheckoutCustomerAccount';
import CheckoutShippingMethod from './CheckoutShippingMethod';
import CheckoutPaymentMethod from './CheckoutPaymentMethod';
import CheckoutTotals from './CheckoutTotals';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';

import CommonStyle from './../../utils/CommonStyle'
import GlobalStyles,{W,H,StatusbarHeight,WINDOW_HEIGHT} from './../../utils/GlobalStyles'
import {
  NAVIGATION_SEARCH_SCREEN_PATH
} from '../../navigation/routes';

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
   const [stepOneCompleted, setstepOneCompleted] = useState(false);
   const [stepTwoCompleted, setstepTwoCompleted] = useState(false);
   const [stepThreeCompleted, setstepThreeCompleted] = useState(false);
   const [stepFourCompleted, setstepFourCompleted] = useState(false);
  const activeSection = Number(_activeSection);
  // console.log('FROM CHECKOUT PAGE',activeSection)
  // const activateNewSection = (sectionNumber) =>{
  //   setactiveState(sectionNumber)
  // }

  const activateNewSection = (completedSection) => {
    if(completedSection==1){
      setstepOneCompleted(true);
    }
    else  if(completedSection==2){
      setstepTwoCompleted(true);
    }
    else  if(completedSection==3){
      setstepThreeCompleted(true);
    }
    else{
      setstepFourCompleted(true);
    }
  } 

  return (
    <ScrollView style={styles.container(theme)}>
      <CheckoutSection
        title={translate('checkout.customerAccount')}
        number="1"
        expanded={activeSection === 1}
      >
        <CheckoutCustomerAccount activateNewSection={activateNewSection} />
      </CheckoutSection>
      <CheckoutSection
        title={translate('checkout.shippingMethod')}
        number="2"
        expanded={stepOneCompleted&&activeSection === 2}
      >
      {/* {activeSection == 2 && */}
        <CheckoutShippingMethod activateNewSection={activateNewSection} />
      {/* } */}
      </CheckoutSection>
      <CheckoutSection
        title={translate('checkout.paymentMethod')}
        number="3"
        expanded={stepTwoCompleted&&activeSection === 3}
      >
      {/* {activeSection == 3 &&   */}
        <CheckoutPaymentMethod activateNewSection={activateNewSection} navigation={navigation} />
        {/* } */}
      </CheckoutSection>
      <CheckoutSection
        title={translate('checkout.summary')}
        number="4"
        expanded={stepThreeCompleted&&activeSection === 4}
      >
      {/* {activeSection == 4 &&  */}
        <CheckoutTotals activateNewSection={activateNewSection} navigation={navigation} />
      {/* } */}
     
      </CheckoutSection>
     
    </ScrollView>
  );
};
Checkout['navigationOptions'] = screenProps => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {screenProps.navigation.goBack() }}
      >
      <Image style={[CommonStyle.Icon25,CommonStyle.marginTB10,CommonStyle.marginLR20]} source={require("./.././../../resources/icons/back.png")} />
      </TouchableOpacity>
  ),
  title: translate('checkout.title'),
  headerRight: () => (
    <View style={[styles.headerRight]}>
    <TouchableOpacity
      style={[CommonStyle.paddingLR10]}
      onPress={() => {screenProps.navigation.navigate(NAVIGATION_SEARCH_SCREEN_PATH) }}
      >
      <View style={[CommonStyle.marginTop5]}><Image style={CommonStyle.Icon25} source={require('../../../resources/icons/Search.png')} resizeMode='contain'/></View>
    </TouchableOpacity>
    <TouchableOpacity
      style={[CommonStyle.paddingLR10]}
      onPress={() => {screenProps.navigation.navigate('Cart') }}
      >

      <CartBadge color={GlobalStyles.colorSet.btnPrimary} />
    </TouchableOpacity>
    </View>
  ),
  headerStyle: {
    backgroundColor:'white',
    marginTop:Platform.OS === 'ios' ? (WINDOW_HEIGHT>812)?H(0):0 : H(StatusbarHeight),
    height: H(40),
    elevation: 0,
     borderWidth:0,
  //  borderBottomColor:'transparent',
  },

});


const styles = {
  container: theme => ({
    backgroundColor: theme.colors.white,
    flex: 1,
  }),
  headerRight:{
    flexDirection:'row',
    alignItems:'center'
  },
};

const mapStateToProps = ({ checkout }) => {
  const { activeSection } = checkout;

  return {
    activeSection,
  };
};

export default connect(mapStateToProps)(Checkout);
