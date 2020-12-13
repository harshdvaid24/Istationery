import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Dimensions,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { cartItemProduct, refreshCart, removeCouponFromCart,addCouponToCart,getCartTotal } from '../../actions';
import CartListItem from './CartListItem';
import NavigationService from '../../navigation/NavigationService';
import CommonStyle from './../../utils/CommonStyle'
import GlobalStyle,{W,H,StatusbarHeight,WINDOW_HEIGHT} from './../../utils/GlobalStyles'
import {
  NAVIGATION_CHECKOUT_PATH,
  NAVIGATION_HOME_SCREEN_PATH,
} from '../../navigation/routes';
import { Button, Text, Price,Spinner } from '../common';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import { Row, Spacer } from 'react-native-markup-kit';




class Cart extends Component {
  static contextType = ThemeContext;
  static navigationOptions = ({ navigation }) => ({
    // title: translate('home.title'),
    headerTitle:'Cart',
    // headerLeft: () => (
    //   <TouchableOpacity
    //     onPress={() => {navigation.goBack() }}
    //     >
    //     <Image style={[CommonStyle.Icon25,CommonStyle.marginLR20]} source={require("./.././../../resources/icons/back.png")} />
    //     </TouchableOpacity>
    // ),
    
    headerBackTitle: ' ',
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

  state = {
    couponCodeInput: '',
  };

  


  static propTypes = {
    cart: PropTypes.object,
    products: PropTypes.object,
    cartItemProduct: PropTypes.func,
    refreshCart: PropTypes.func,
    refreshing: PropTypes.bool,
  };

  static defaultProps = {
    cart: {},
    products: {},
    refreshing: false,
  };

  componentDidMount() {
    this.props.removeCouponFromCart(this.props.cart.id)
    this.updateCartItemsProducts();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.cart.items
      && this.props.cart.items
      && prevProps.cart.items.length !== this.props.cart.items.length
    ) {
      this.updateCartItemsProducts();
    }
  }

  onPressAddToCheckout = () => {
    NavigationService.navigate(NAVIGATION_CHECKOUT_PATH, {
      title: translate('cart.title'),
    });
  };

  onRefresh = () => {
    this.props.refreshCart();
  };

  updateCartItemsProducts = () => {
    const { items } = this.props.cart;
    // console.log('FROM_CART_MAIN_PAGE',this.props.cart.id)\
    this.props.getCartTotal(this.props.cart.id);

    if (!items) {
      return;
    }

    const { products } = this.props;

    items.forEach((item) => {
      if (!item.thumbnail) {
        if (!products[item.sku]) {
          this.props.cartItemProduct(item.sku);
        }
      }
    });
  };

  renderTotals() {
    const theme = this.context;
    const { items } = this.props.cart;
    const { totals } = styles;
    const sum = this.props.cartTotals.base_subtotal;
    // if (items) {
    //   items.forEach((item) => {
    //     sum += item.price * item.qty;
    //   });
    // }

    if (sum > 0) {
      return (
        <View>
        <View style={[styles.totalPriceContainer]}>
          <Text style={[{marginTop:10,fontSize:18,color:'#0e0a1f',fontWeight:'bold'}]} type="heading">
            {`${translate('common.total')} : `}
          </Text>

          <Text style={[{marginTop:10,fontSize:18,color:'#0e0a1f',fontWeight:'bold'}]} type="heading">
            { this.props.currencySymbol} {parseFloat(sum).toFixed(2)}
          </Text>
          {/* <Price
            currencyRate={this.props.currencyRate}
            currencySymbol={this.props.currencySymbol}
            basePrice={sum}
          /> */}
        </View>
          {this.props.cartTotals&& this.props.cartTotals.coupon_code &&
        <View style={[styles.totalPriceContainer]}>
        <Text style={[{marginTop:10,fontSize:18,color:'#0e0a1f',fontWeight:'bold'}]} type="heading">
            {`${translate('common.grandTotal')} : `}
          </Text>
          
        <Text style={[{marginTop:10,fontSize:18,color:'#0e0a1f',fontWeight:'bold'}]} type="heading">
            { this.props.currencySymbol} {parseFloat(this.props.cartTotals.base_subtotal_with_discount).toFixed(2)}
          </Text>
          </View>
          }
          </View>
      );
    }
  }

  renderEmptyCart = () => {
    const theme = this.context;
    const { navigate } = this.props.navigation;
    const {
      containerStyle,
      totals,
      buttonTextStyle,
    } = styles;


    return (
      <View style={containerStyle(theme)}>
        <Text type="heading" style={totals(theme)}>
          {translate('cart.emptyMessage')}
        </Text>
        <TouchableOpacity
          onPress={() => navigate(NAVIGATION_HOME_SCREEN_PATH)}
        >
          <Text type="heading" bold style={buttonTextStyle(theme)}>
            {translate('common.continueShopping')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  couponAction = () => {
    const {quote} = this.props;
    console.log('Checkout_Total_Page',quote.id);
    if (this.props.cartTotals.coupon_code) {
      this.props.removeCouponFromCart(quote.id);
      this.props.addCouponToCart(this.state.couponCodeInput,quote.id);
    } else {
      this.props.addCouponToCart(this.state.couponCodeInput,quote.id);
    }
  };

  renderItem = items => (
    <CartListItem
      expanded={false}
      item={items.item}
      currencyRate={this.props.currencyRate}
      currencySymbol={this.props.currencySymbol}
    />
  );

  renderCart = () => {
    const theme = this.context;
    const { items } = this.props.cart;
    const {
      container,
      content,
      footer,
      buttonStyle,
    } = styles;

    return (
      <View style={container(theme)}>
          <StatusBar
                  translucent
                  backgroundColor="#F5F5F5"
                  barStyle="dark-content"
                />

        <View style={content}>
          <FlatList
            refreshControl={(
              <RefreshControl
                refreshing={this.props.refreshing}
                onRefresh={this.onRefresh}
              />
            )}
            data={[...items]}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        {this.props.cartTotals.coupon_code&&<Text>{this.props.cartTotals.coupon_code} Coupon is applied</Text>}
        <Text></Text>
        <View style={[styles.row, { justifyContent: 'space-between' } ]}>
          <View style={styles.couponInputContainer(theme)}>
            <TextInput
              style={{ height: 50}}
              editable={!this.props?.totals?.coupon_code}
              value={this.state.couponCodeInput}
              placeholder="Coupon Code"
              onChangeText={value => this.setState({ couponCodeInput: value })}
            />
          </View>
          {
            this.props.couponLoading
              ? (
                <View style={{ width: 100 }}>
                  <Spinner />
                </View>
              )
              : (
                <View style={{marginRight:25}}>
                <Button onPress={this.couponAction} style={{ width: 100, alignSelf: 'auto' }}>
                  {!!this.props?.totals?.coupon_code ? 'Cancel' : 'Apply'}
                </Button>
                </View>
              )
          }
        </View>
        <View style={footer(theme)}>
          {this.renderTotals()}
          <View style={{marginLeft:20}}>
          <Button
            onPress={this.onPressAddToCheckout}
            style={buttonStyle(theme)}
          >
            {translate('cart.checkoutButton')}
          </Button>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { items } = this.props.cart;

    if (items && items.length) {
      return this.renderCart();
    }
    return this.renderEmptyCart();
  }
}

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: theme.colors.background,
  }),
  containerStyle: theme => ({
    backgroundColor: theme.colors.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  content: {
    flex: 1,
    marginTop:5
  },
  totals: theme => ({
    paddingTop: theme.spacing.small,
  }),
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: theme => ({
    padding: theme.spacing.large,
    top: 0,
    color: theme.colors.secondary,
  }),
  footer: theme => ({
    padding: theme.spacing.large,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }),
  buttonStyle: theme => ({
    borderRadius:3,
    height:50,
    width: theme.dimens.WINDOW_WIDTH * 0.5,
  }),
  couponInputContainer: theme => ({
    borderWidth: 1,
    borderColor: theme.colors.border,
    // padding: ,
    marginLeft:20,
    marginBottom:5,
    marginRight: 20,
    width: Dimensions.get('window').width - 100 - 30 - 90,
  }),
  row: {
    flexDirection: 'row',
    justifyContent:'center',
    marginTop:10
    // borderWidth:1,
  },
});

const mapStateToProps = ({ cart, magento,checkout }) => {
  const { products,cartId, couponLoading, couponError,quote,cartTotals } = cart;
  const {
    currency: {
      displayCurrencySymbol: currencySymbol,
      displayCurrencyExchangeRate: currencyRate,
    },
  } = magento;
  return {
    products,
    cartTotals,
    cartId,
    couponLoading,
    couponError,
    quote,
    currencyRate,
    currencySymbol,
    cart: cart.quote,
    refreshing: cart.refreshing,
  };
};

export default connect(mapStateToProps, { cartItemProduct, refreshCart,addCouponToCart,getCartTotal,removeCouponFromCart })(Cart);
