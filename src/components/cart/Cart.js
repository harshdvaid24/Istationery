import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import { cartItemProduct, refreshCart } from '../../actions';
import CartListItem from './CartListItem';
import NavigationService from '../../navigation/NavigationService';
import {
  NAVIGATION_CHECKOUT_PATH,
  NAVIGATION_HOME_SCREEN_PATH,
} from '../../navigation/routes';
import { Button, Text, Price } from '../common';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';

const LogoTitle = ( ) => {
  return(
  <View style={{flex:1,justifyContent:'center',paddingHorizontal:30,alignItems:'flex-start'}}>
    <Text style={{fontSize:20,fontWeight:'bold',color:'#0e0a1f'}}>
      Cart
    </Text>
  </View>
  )
  
} 

class Cart extends Component {
  static contextType = ThemeContext;
  static navigationOptions = ({ navigation }) => ({
    // title: translate('home.title'),
    headerTitle: () => <LogoTitle />,
    headerBackTitle: ' ',
    headerLeft:null,
    headerRight:null,
    headerStyle: {
      backgroundColor:'#fff',
      height: 60,
      elevation: 0,
    }
  });


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

    let sum = 0;
    if (items) {
      items.forEach((item) => {
        sum += item.price * item.qty;
      });
    }

    if (sum > 0) {
      return (
        <View style={[styles.totalPriceContainer]}>
          <Text style={[{marginTop:10,fontSize:18,color:'#0e0a1f',fontWeight:'bold'}]} type="heading">
            {`${translate('common.total')} : `}
          </Text>

          <Text style={[{marginTop:10,fontSize:18,color:'#0e0a1f',fontWeight:'bold'}]} type="heading">
            { this.props.currencySymbol} {sum}
          </Text>
          {/* <Price
            currencyRate={this.props.currencyRate}
            currencySymbol={this.props.currencySymbol}
            basePrice={sum}
          /> */}
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
                  backgroundColor="transparent"
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
        <View style={footer(theme)}>
          {this.renderTotals()}
          <Button
            onPress={this.onPressAddToCheckout}
            style={buttonStyle(theme)}
          >
            {translate('cart.checkoutButton')}
          </Button>
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
});

const mapStateToProps = ({ cart, magento }) => {
  const { products } = cart;
  const {
    currency: {
      displayCurrencySymbol: currencySymbol,
      displayCurrencyExchangeRate: currencyRate,
    },
  } = magento;
  return {
    products,
    currencyRate,
    currencySymbol,
    cart: cart.quote,
    refreshing: cart.refreshing,
  };
};

export default connect(mapStateToProps, { cartItemProduct, refreshCart })(Cart);
