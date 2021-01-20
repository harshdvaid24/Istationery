import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import RadioForm from 'react-native-simple-radio-button';
import { Spinner, Button } from '../common';
import {
  checkoutSelectedPaymentChanged,
  checkoutSetActiveSection,
  getGuestCartPaymentMethods,
  checkoutCustomerNextLoading,
} from '../../actions';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';

class CheckoutPaymentMethod extends Component {
  static contextType = ThemeContext;

  componentDidMount() {
    const { payments, selectedPayment } = this.props;
    if (!selectedPayment && payments.length) {
      this.props.checkoutSelectedPaymentChanged(payments[0]);
    }
  }

  onPaymentSelect(payment) {
    console.log("onPaymentSelect:",payment);
    if(payment.code=='cashondelivery'){
      this.props.checkoutSelectedPaymentChanged(payment);
    }
    else{
      // alert(payment.code);
      let URL = "'https://staging.istationery.com/mobile-contact-us";
      this.props.navigation.navigate('PaymentScreen',{url:URL});
    }
    // this.props.checkoutSelectedPaymentChanged(payment);
  }

  onNextPressed = () => {
    const { cartId, selectedPayment } = this.props;
    // const payment = {
    // 	paymentMethod: {
    // 		// po_number: selectedPayment.code,
    // 		method: selectedPayment.code
    // 		// additional_data: [
    // 		// 	"string"
    // 		// ],
    // 		// extension_attributes: {
    // 		// 	agreement_ids: [
    // 		// 		"string"
    // 		// 	]
    // 		// }
    // 	}
    // };
    // this.props.placeGuestCartOrder(cartId, payment);
    this.props.checkoutCustomerNextLoading(true);
    // setTimeout(
    // 	() => {
    // this.props.checkoutCustomerNextLoading(false);
    this.props.getGuestCartPaymentMethods(cartId);
    this.props.activateNewSection(3);
    // this.props.onNextPress(4)
    // 	},
    // 	1000
    // );
    // this.props.checkoutSetActiveSection(4);
  }

  renderPaymentMethods() {
    const theme = this.context;
    const { payments } = this.props;
    if (!payments || !payments.length) {
      return <Text>{translate('checkout.noPaymentMethod')}</Text>;
    }

    const radioProps = payments.map(item => ({
      label: item.title,
      value: item,
    }));

    return (
      <RadioForm
        buttonColor={theme.colors.appbarTint}
        labelColor={theme.colors.bodyText}
        selectedLabelColor={theme.colors.titleText}
        style={styles.radioWrap}
        radio_props={radioProps}
        initial={0}
        buttonSize={10}
        animation={false}
        onPress={(value) => { this.onPaymentSelect(value); }}
      />
    );
  }

  renderButton() {
    const theme = this.context;
    const { payments, checkout } = this.props;
    if (!payments.length) {
      return <View />;
    }

    if (this.props.loading) {
      return (
        <View style={styles.nextButtonStyle}>
          <Spinner size="large" />
        </View>
      );
    }
    return (
      <View style={styles.nextButtonStyle}>
        <Button
          onPress={this.onNextPressed}
          style={styles.buttonStyle(theme)}
        >
              {translate('common.next')}
        </Button>
      </View>
    );
  }

  render() {
    const theme = this.context;
    return (
      <View style={styles.container(theme)}>
        {this.renderPaymentMethods()}
        {this.renderButton()}
      </View>
    );
  }
}

const styles = {
  container: theme => ({
    margin: theme.spacing.large,
    alignItems: 'flex-start',
  }),
  radioWrap: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  nextButtonStyle: {
    flex: 1,
    alignSelf: 'center',
  },
  buttonStyle: theme => ({
    marginVertical: theme.spacing.large,
    alignSelf: 'center',
    width: theme.dimens.WINDOW_WIDTH * 0.9,
  }),
};

const mapStateToProps = ({ cart, checkout }) => {
  const { cartId } = cart;
  const { payments, selectedPayment } = checkout;
  const { loading } = checkout.ui;
  return {
    cartId, payments, selectedPayment, loading,
  };
};

export default connect(mapStateToProps, {
  checkoutSelectedPaymentChanged,
  checkoutSetActiveSection,
  getGuestCartPaymentMethods,
  checkoutCustomerNextLoading,
})(CheckoutPaymentMethod);
