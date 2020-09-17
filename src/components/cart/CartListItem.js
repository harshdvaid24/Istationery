import React, { useContext } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProductThumbnailFromAttribute } from '../../helper/product';
import { Spinner, Text, Price } from '../common';
import { removeFromCartLoading, removeFromCart } from '../../actions';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';

const CartListItem = ({
  item,
  cart,
  products,
  currencyRate,
  currencySymbol,
  removeFromCartLoading: _removeFromCartLoading,
  removeFromCart: _removeFromCart,
}) => {
  const theme = useContext(ThemeContext);

  const image = () => {
    if (products && products[item.sku]) {
      return getProductThumbnailFromAttribute(products[item.sku]);
    }
  };

  const onPressRemoveItem = () => {
    Alert.alert(
      translate('cartListItem.removeItemDialogTitle'),
      `${translate('cartListItem.removeItemDialogMessage')}: ${item.name}`,
      [
        { text: translate('common.cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: translate('common.ok'), onPress: () => performRemoveItem() },
      ],
      { cancelable: true },
    );
  };

  const performRemoveItem = () => {
    _removeFromCartLoading(item.item_id);

    _removeFromCart({
      cart,
      item,
    });
  };

  const imageUri = image();

  return (
    <View style={styles.container(theme)}>
      <FastImage style={styles.imageStyle(theme)} resizeMode="contain" source={{ uri: imageUri }} />
      <View style={styles.infoStyle}>
        <Text numberOfLines={1} style={styles.ItemTitleStyle(theme)}>{item.name}</Text>
        <Text style={styles.textStyle(theme)}>
          {`${translate('common.quantity')}: ${item.qty}`}
        </Text>
        <View style={styles.textStyle(theme)}>
          <Price
            basePrice={item.price}
            currencySymbol={currencySymbol}
            currencyRate={currencyRate}
          />
        </View>
     
      </View>
      <View style={styles.removeContainer}>
        {cart.removingItemId === item.item_id
          ? (
            <View style={styles.spinnerWrapper(theme)}>
              <Spinner />
            </View>
          )
          : (
            <TouchableOpacity
              style={styles.iconStyle}
              onPress={onPressRemoveItem}
            >
              <View style={styles.iconWrapper(theme)}>
                <Icon
                  name="md-trash"
                  type="ionicon"
                  color="#104E8B"
                />
              </View>

            </TouchableOpacity>
          )
          }
      </View>
    </View>
  );
};

const styles = {
  container: theme => ({
    flexDirection: 'row',
    flex: 1,
    marginVertical:1,
    borderColor: theme.colors.border,
    // borderBottomWidth: 1,
    backgroundColor: theme.colors.surface,
  }),
  iconStyle:{
    padding:10
  },
  infoStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 2,
    padding:10
  },
  textStyle: theme => ({
    flex: 1,
    fontSize:14,
  }),
  ItemTitleStyle: theme => ({
   fontSize:16,
   color:theme.colors.captionText,
   fontWeight:'bold',
   flex: 1
  }),
  imageStyle: theme => ({
    marginVertical: theme.spacing.small,
    height: theme.dimens.cartItemImageHeight,
    flex: 1,
    width: null,
  }),
  iconWrapper: theme => ({
    alignSelf: 'flex-end',
    marginRight: 20,
  }),
  removeContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: 50,
  },
  spinnerWrapper: theme => ({
    marginRight: theme.spacing.small,
  }),
};

CartListItem.propTypes = {
  products: PropTypes.object,
  item: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  removeFromCartLoading: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

CartListItem.defaultProps = {
  products: {},
};

const mapStateToProps = ({ cart }) => {
  const { products } = cart;
  return {
    cart,
    products,
  };
};

export default connect(mapStateToProps, { removeFromCartLoading, removeFromCart })(CartListItem);
