import React, { Component } from 'react';
import {
  Alert, View, StyleSheet, TextInput, Dimensions,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import {
  checkoutSelectedPaymentChanged,
  checkoutCustomerNextLoading,
  checkoutOrderPopupShown,
  placeGuestCartOrder,
  getCart,
  checkoutSetActiveSection,
  removeCouponFromCart,
  addCouponToCart,
} from '../../actions';
import { NAVIGATION_PAYMENT_PATH,NAVIGATION_PAYMENT_SUCCESS_PATH,NAVIGATION_HOME_STACK_PATH } from '../../navigation/routes';
import { Button, Spinner, Text, Price } from '../common';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import { priceSignByCode } from '../../helper/price';
import { Row, Spacer } from 'react-native-markup-kit';

class CheckoutTotals extends Component {
  static contextType = ThemeContext;

  state = {
    couponCodeInput: '',
  };

  onPlacePressed = () => {
    const { cartId, selectedPayment } = this.props;
    const payment = {
      paymentMethod: {
        // po_number: selectedPayment.code,
        method: selectedPayment.code,
        // additional_data: [
        // 	"string"
        // ],
        // extension_attributes: {
        // 	agreement_ids: [
        // 		"string"
        // 	]
        // }
      },
    };
    this.props.checkoutCustomerNextLoading(true);
    this.props.placeGuestCartOrder(cartId, payment);
  }

  goHome = () => {
    this.props.navigation.navigate(NAVIGATION_HOME_STACK_PATH);
  };

  renderTotals() {
    const {
      totals: {
        base_currency_code: baseCurrencyCode,
        base_subtotal: baseSubTotal,
        base_grand_total: grandTotal,
        base_shipping_incl_tax: shippingTotal,
      },
      baseCurrencySymbol,
      currencyCode,
      currencySymbol,
      currencyRate,
    } = this.props;

    return (
      <View style={styles.totalsStyle}>
        <View style={styles.row}>
          <View style={{}}>
              <Text >
                {`${translate('common.subTotal')}: `}
              </Text>
          </View>
         
          <Price
            basePrice={baseSubTotal}
            currencySymbol={currencySymbol}
            currencyRate={currencyRate}
          />
        </View>
        {
          !!this.props?.totals?.coupon_code && (
            <View style={[styles.row]}>
                <View style={{}}>
                  <Text>
                    {`${translate('common.discount')}: `}
                  </Text>
              </View>
              <Price
                basePrice={this.props?.totals?.discount_amount}
                currencySymbol={currencySymbol}
                currencyRate={currencyRate}
              />
            </View>
          )
        }
        <View style={styles.row}>
        <View style={{}}>
          <Text>
            {`${translate('common.shipping')}: `}
          </Text>
          </View>
          <Price
            basePrice={shippingTotal}
            currencySymbol={currencySymbol}
            currencyRate={currencyRate}
          />
        </View>
        <View style={styles.row}>
        <View style={{}}>
          <Text>
            {`${translate('common.total')}: `}
          </Text>
          </View>
          <Price
            basePrice={grandTotal}
            currencySymbol={currencySymbol}
            currencyRate={currencyRate}
          />
        </View>
        {
          baseCurrencyCode !== currencyCode && (
            <View style={styles.row}>
                   <View style={{}}>
              <Text>{`${translate('checkout.youWillBeCharged')}: `}</Text>
              </View>
              <Price
                basePrice={grandTotal}
                currencySymbol={baseCurrencySymbol || priceSignByCode(baseCurrencyCode)}
                currencyRate={1}
              />
            </View>
          )
        }
      </View>
    );
  }

  renderButton() {
    const theme = this.context;
    const { payments } = this.props;
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
          onPress={this.onPlacePressed}
          disable={this.props.loading}
          style={styles.buttonStyle(theme)}
        >
          {translate('checkout.placeOrderButton')}
        </Button>
      </View>
    );
  }

  componentDidMount() {
    if (this.props?.totals?.coupon_code) {
      this.setState({
        couponCodeInput: this.props?.totals?.coupon_code,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.orderId && this.props.orderId !== prevProps.orderId) {
      this.showPopup(translate('common.order'), translate('checkout.orderSuccessMessage'),this.props.orderId);
    }
    if (this.props.errorMessage && this.props.errorMessage !== prevProps.errorMessage) {
      this.showPopup(translate('errors.error'), this.props.errorMessage,);
    }
    if (this.props?.totals?.coupon_code !== prevProps?.totals?.coupon_code) {
      this.setState({
        couponCodeInput: this.props?.totals?.coupon_code,
      });
    }
  }

  showPopup(title, message,orderId) {
    this.props.checkoutSetActiveSection(1);
    this.props.getCart();

    const {  selectedPayment } = this.props;
   
       let PaymentMethod =  selectedPayment.code;
       console.log("PaymentMethod:",PaymentMethod);

       if(PaymentMethod=="cashondelivery")
       {
        this.props.navigation.navigate(NAVIGATION_PAYMENT_SUCCESS_PATH,{orderId:orderId});
       }
       else{
        this.props.navigation.navigate(NAVIGATION_PAYMENT_PATH,{orderId:orderId});
       }

   
    // this.props.navigation.navigate(NAVIGATION_PAYMENT_SUCCESS_PATH,{orderId});
    // this.props.checkoutOrderPopupShown();
    // Alert.alert(
    //   title,
    //   message,
    //   [{ text: translate('common.ok'), onPress: () => this.goHome() }],
    //   { cancelable: false },
    // );
  }

  couponAction = () => {
    const {quote} = this.props;
    if (!!this.props?.totals?.coupon_code) {
      this.props.removeCouponFromCart(quote.id);
    } else {
      this.props.addCouponToCart(this.state.couponCodeInput,quote.id);
    }
  };

  renderCoupon = () => {
    const theme = this.context;

    return (
      <View>
        {/* <View style={[styles.row, { justifyContent: 'space-between' } ]}>
          <View style={styles.couponInputContainer(theme)}>
            <TextInput
              // style={{ width: '100%' }}
              editable={!this.props?.totals?.coupon_code}
              value={this.state.couponCodeInput}
              placeholder="Coupon Code"
              onChangeText={value => this.setState({ couponCodeInput: value })}
            />
          </View>
          <Spacer size={50} />
          {
            this.props.couponLoading
              ? (
                <View style={{ width: 100 }}>
                  <Spinner />
                </View>
              )
              : (
                <Button onPress={this.couponAction} style={{ width: 100, alignSelf: 'auto' }}>
                  {!!this.props?.totals?.coupon_code ? 'Cancel' : 'Apply'}
                </Button>
              )
          }
        </View> */}
        {
          !!(this.props.couponError?.length) && (
            <Text style={{ color: 'red', marginBottom: 10, textAlign: 'center' }}>{this.props.couponError}</Text>
          )
        }
      </View>
    );
  };

  render() {
    const theme = this.context;
    return (
      <View style={styles.container(theme)}>
        {this.renderCoupon()}
        {this.renderTotals()}
        {this.renderButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    marginTop:30
  },
  row: {
    flexDirection: 'row',
    justifyContent:'center',
    marginTop:10
    // borderWidth:1,
  },
  totalsStyle: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  buttonStyle: theme => ({
    marginVertical: theme.spacing.large,
    alignSelf: 'center',
    width: theme.dimens.WINDOW_WIDTH * 0.9,
  }),
  couponInputContainer: theme => ({
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 20,
    padding: 10,
    width: Dimensions.get('window').width - 100 - 30 - 90,
  }),
});

const mapStateToProps = ({ cart, checkout, magento }) => {
  const { cartId, couponLoading, couponError,quote } = cart;
  const { loading } = checkout.ui;
  const {
    payments, selectedPayment, totals, orderId, errorMessage,
  } = checkout;
  const {
    base_currency_symbol: baseCurrencySymbol,
    displayCurrencyCode: currencyCode,
    displayCurrencySymbol: currencySymbol,
    displayCurrencyExchangeRate: currencyRate,
  } = magento.currency;
  return {
    cartId,
    payments,
    selectedPayment,
    totals,
    loading,
    orderId,
    errorMessage,
    baseCurrencySymbol,
    currencyCode,
    currencySymbol,
    currencyRate,
    couponError,
    couponLoading,
    quote
  };
};

export default connect(mapStateToProps, {
  checkoutSelectedPaymentChanged,
  checkoutCustomerNextLoading,
  checkoutSetActiveSection,
  checkoutOrderPopupShown,
  placeGuestCartOrder,
  getCart,
  addCouponToCart,
  removeCouponFromCart,
})(CheckoutTotals);
