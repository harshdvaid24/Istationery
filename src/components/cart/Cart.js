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
  Text,
  Dimensions,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { cartItemProduct, refreshCart, removeCouponFromCart,addCouponToCart,getCartTotal } from '../../actions';
import CartListItem from './CartListItem';
import NavigationService from '../../navigation/NavigationService';
import CommonStyle from './../../utils/CommonStyle'
import GlobalStyle,{W,H,StatusbarHeight,WINDOW_HEIGHT,WINDOW_WIDTH} from './../../utils/GlobalStyles'
import {
  NAVIGATION_CHECKOUT_PATH,
  NAVIGATION_HOME_SCREEN_PATH,
} from '../../navigation/routes';
import { Button, Price,Spinner } from '../common';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {NAVIGATION_SEARCH_SCREEN_PATH} from '../../navigation/routes'
import { ScrollView } from 'react-native-gesture-handler';


class Cart extends Component {
  static contextType = ThemeContext;
  static navigationOptions = ({ navigation }) => ({
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {navigation.goBack() }}
        >
        <Image style={[CommonStyle.Icon25,CommonStyle.marginTB10,CommonStyle.marginLR20]} source={require("./.././../../resources/icons/back.png")} />
        </TouchableOpacity>
    ),
    title: 'My Cart'.toUpperCase(),
    headerRight: () => (
      <View style={[styles.headerRight]}>
      <TouchableOpacity
        style={[CommonStyle.paddingLR20]}
        onPress={() => {navigation.navigate(NAVIGATION_SEARCH_SCREEN_PATH) }}
        >
        <View style={[CommonStyle.marginTop5]}><Image style={CommonStyle.Icon25} source={require('../../../resources/icons/Search.png')} resizeMode='contain'/></View>
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
        <View style={[styles.PriceContainer]}>
        <View style={[styles.totalPriceContainer,]}>
          <Text style={[CommonStyle.lBlackRegular]}>
            {`${translate('common.total')} : `}
          </Text>

          <Text style={[CommonStyle.lBlackRegular]}>
            { this.props.currencySymbol} {parseFloat(sum).toFixed(2)}
          </Text>
          {/* <Price
            currencyRate={this.props.currencyRate}
            currencySymbol={this.props.currencySymbol}
            basePrice={sum}
          /> */}
        </View>


          {this.props.cartTotals&& this.props.cartTotals.coupon_code &&
            <View style={[styles.totalPriceContainer,CommonStyle.paddingTop10]}>
                <Text style={[CommonStyle.xlBlackSemiBold]}>
                    {`${translate('common.grandTotal')} : `}
                </Text>
          
                <Text style={[CommonStyle.xlBlackSemiBold]}>
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

      <Image style={[CommonStyle.Icon100]} source={require("./../../../resources/icons/empty.png")} />

        <Text  style={[CommonStyle.xlGreyRegular,CommonStyle.marginTop20]}>
          {translate('cart.emptyMessage')}
        </Text>
        <TouchableOpacity
          onPress={() => navigate(NAVIGATION_HOME_SCREEN_PATH)}
        >
          <Text style={[CommonStyle.lPrimarySemiBold,CommonStyle.marginTop10,CommonStyle.underline]}>
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
      <View style={[styles.container(theme),]}>
      <KeyboardAwareScrollView
       extraHeight={H(150)}
       extraScrollHeight={0}
       >
          <StatusBar
                  translucent
                  backgroundColor="#F5F5F5"
                  barStyle="dark-content"
                />

        <View style={[styles.content,]}>
          <ScrollView>

         
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
           </ScrollView>
        </View>
     
     
        {
              this.props.couponLoading
                ? (
                  <View style={[styles.footer,]}>
                    <Spinner />
                  </View>
                )
                : (
       <View style={[styles.footer,]}>
      
          <View style={[CommonStyle.FlexRow,CommonStyle.paddingLR10,CommonStyle.HorizontalCenter ]}>
          {
            (this.props.cartTotals.coupon_code)?
          <Text style={[CommonStyle.mPrimaryRegular]}>Coupon code {this.props.cartTotals.coupon_code}  is applied</Text>:
            <View style={styles.couponInputContainer(theme)}>
              <TextInput
                style={[CommonStyle.mBlackRegular]}
                editable={!this.props?.totals?.coupon_code}
                value={this.state.couponCodeInput}
                placeholder="Coupon Code"
                keyboardType="default"
                placeholderTextColor={'#858585'}
                onChangeText={value => this.setState({ couponCodeInput: value })}
              />
            </View> }
            <View style={[CommonStyle.marginLR20]}>
                     {
                       (this.props?.totals?.coupon_code)?
                       <TouchableOpacity onPress={this.couponAction} style={styles.RemoveButtonStyle}>
                          <Text style={[CommonStyle.mPrimarySemiBold]}>  {'Remove'} </Text>
                      </TouchableOpacity>:
                      <TouchableOpacity onPress={this.couponAction} style={styles.RemoveButtonStyle}>
                          <Text style={[CommonStyle.mPrimarySemiBold]}>  {'Apply'} </Text>
                      </TouchableOpacity>
                    } 
                  </View>
               
          </View>
          
              <View style={[CommonStyle.FlexRow,CommonStyle.alignContentLR,CommonStyle.HorizontalCenter,CommonStyle.paddingTB10,CommonStyle.paddingLR10]}>
                    {this.renderTotals()}
                    <TouchableOpacity onPress={this.onPressAddToCheckout} style={styles.buttonStyle}>
                                    <Text style={[CommonStyle.mWhitleSemiBold]}> {translate('cart.checkoutButton')} </Text> 
                          </TouchableOpacity>
              </View>
          
             
        </View>
        )}
        </KeyboardAwareScrollView>
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
  headerRight:{
    flexDirection:'row',
    alignItems:'center'
  },
  containerStyle: theme => ({
    backgroundColor: theme.colors.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  content: {
    height:WINDOW_HEIGHT-H(150),
    paddingBottom:H(100)
  },
  totals: theme => ({
    paddingTop: theme.spacing.small,
  }),
  PriceContainer:{
    justifyContent: 'center',
    //  alignItems: 'center',
  },
  totalPriceContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  buttonTextStyle: theme => ({
    padding: theme.spacing.large,
    top: 0,
    color: theme.colors.secondary,
  }),
  footer: {
   position:'absolute',
   width:WINDOW_WIDTH,
   height:H(100),
   paddingVertical:H(10),
   backgroundColor:GlobalStyle.colorSet.WhiteGrey,
   bottom:0
  },
  buttonStyle:{
    borderRadius:3,
    height:H(35),
    width: W(150),
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:GlobalStyle.colorSet.btnPrimary
  },
  CouponButtonStyle:{
    borderRadius:3,
    height:H(30),
    width: W(100),
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:GlobalStyle.colorSet.btnPrimary
  },
  RemoveButtonStyle:{
    borderRadius:3,
    height:H(30),
    width: W(100),
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:GlobalStyle.colorSet.white
  },
  CouponButtonStyle:{
    borderRadius:3,
    height:H(30),
    width: W(100),
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:GlobalStyle.colorSet.btnPrimary
  },
  couponInputContainer: theme => ({
    borderWidth: 1,
    height:H(30),
    justifyContent:'center',
    alignItems:'center',
    borderRadius:3,
    borderColor: GlobalStyle.colorSet.BorderGrey,
    width: W(200),
    marginHorizontal:W(20)
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
