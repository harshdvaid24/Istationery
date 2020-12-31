import React, { useEffect, useContext } from 'react';
import { View, Text,StyleSheet, FlatList,Platform,TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Price } from '../common';
import { orderProductDetail } from '../../actions';
import { getProductThumbnailFromAttribute } from '../../helper/product';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import { priceSignByCode } from '../../helper/price';
import CommonStyle from './../../utils/CommonStyle'
import GlobalStyles,{W,H,StatusbarHeight,WINDOW_HEIGHT} from './../../utils/GlobalStyles'

const OrderScreen = ({
  products,
  navigation,
  orderProductDetail: _orderProductDetail,
}) => {
  const theme = useContext(ThemeContext);
  const currencySymbol = priceSignByCode(navigation.state.params.item.order_currency_code);

  useEffect(() => {
    navigation.state.params.item.items.forEach((item) => {
      if (!(item.sku in products)) {
        _orderProductDetail(item.sku);
      }
    });
  }, []);

  const image = (item) => {
    if (products[item.sku]) {
      return getProductThumbnailFromAttribute(products[item.sku]);
    }
  };

  const renderItem = item => (
    <View style={styles.itemContainer(theme)}>
      <View style={[styles.row,CommonStyle.paddingLR10,CommonStyle.alignContentLR]}>
        <FastImage style={styles.imageStyle(theme)} resizeMode="contain" source={{ uri: image(item.item) }} />
        <View style={[]}>
        <Text   numberOfLines={1} style={[CommonStyle.lBlackBold]}>{item.item.name}</Text>
          <Text style={[CommonStyle.mGreyBold,CommonStyle.marginTop5]}>{`${translate('common.sku')}: ${item.item.sku}`}</Text>
          <View style={[styles.row,CommonStyle.marginTop5,CommonStyle.HorizontalCenter]}>
              <Text numberOfLines={1} style={[CommonStyle.mGreyBold]}>
              {`Qty:`}
              </Text>
              <Text  style={[CommonStyle.mGreyBold]}>
              {` ${item.item.qty_ordered}`}
              </Text>
          </View>
         <View style={[styles.row,CommonStyle.marginTop10]}>
              <Text style={[CommonStyle.lBlackBold]}>
                {currencySymbol} {item.item.price.toFixed(3)}
             </Text>

          </View>
         
          {/* <View style={styles.row}>
            <Text type="label">{`${translate('common.subTotal')}: `}</Text>
            <Price
              basePrice={item.item.row_total}
              currencyRate={1}
              currencySymbol={currencySymbol}
            />
          </View> */}
        </View>
      </View>
    </View>
  );

  const { item } = navigation.state.params;

  return (
    <View style={styles.container(theme)}>
      <FlatList
        data={[...item.items]}
        renderItem={renderItem}
        keyExtractor={(_item, index) => index.toString()}
      />

      <View style={[styles.bottomSection]}>
        <View style={[CommonStyle.FlexRow,CommonStyle.marginTB5,CommonStyle.alignContentLR]}>
         <Text style={[CommonStyle.mGreyBold]}>{`${translate('orderListItem.status')}:`}</Text>
         <Text style={[CommonStyle.mBlackBold]}>{`${item.status}`}</Text>
        </View>
        <View style={[CommonStyle.FlexRow,CommonStyle.marginTB5,CommonStyle.alignContentLR]}>
            <Text style={[CommonStyle.mGreyBold]}>
                {`${translate('common.subTotal')}: `}
              </Text>
              <Price
                basePrice={item.subtotal}
                currencyRate={1}
                currencySymbol={currencySymbol}
              />
        </View>

        <View style={[CommonStyle.FlexRow,CommonStyle.marginTB5,CommonStyle.alignContentLR]}>
            <Text style={[CommonStyle.mGreyBold]}>
              {`${translate('orderListItem.shippingAndHandling')}: `}
            </Text>
            <Price
              basePrice={item.shipping_amount}
              currencyRate={1}
              currencySymbol={currencySymbol}
            />
        </View>

       

        <View style={[CommonStyle.FlexRow,CommonStyle.marginTB10,CommonStyle.alignContentLR]}>
            <Text style={[CommonStyle.xlBlackBold]}>
              {`${translate('common.grandTotal')}: `}
            </Text>

            {/* <Text style={[CommonStyle.xlBlackBold]}>
              {currencySymbol} {item.total_due.toFixed(3)}
            </Text> */}
            <Text style={[CommonStyle.xlBlackBold]}>
              {currencySymbol} {(item.subtotal+item.shipping_amount).toFixed(3)}
            </Text>


            {/* <Price
              basePrice={item.total_due}
              currencyRate={1}
              currencySymbol={currencySymbol}
            /> */}
        </View>
      </View>
    </View>
  );
};

OrderScreen.navigationOptions = ({ navigation }) => ({
  title: `${translate('common.order')} # ${navigation.state.params.item.increment_id}`,
    headerLeft: () => (
    <TouchableOpacity
      onPress={() => {navigation.goBack() }}
      >
      <FastImage style={[CommonStyle.Icon25,CommonStyle.marginLR20]} source={require("./.././../../resources/icons/back.png")} />
      </TouchableOpacity>
  ),
  headerStyle: {
    backgroundColor:GlobalStyles.colorSet.white,
    marginTop:Platform.OS === 'ios' ? 0 : (WINDOW_HEIGHT>770)? H(27) : H(StatusbarHeight),
    // height: H(40),
    height: H(60),
    elevation: 0,
     borderWidth:0,
   borderBottomColor:'transparent',
  }
});

// OrderScreen.navigationOptions = (navigation) => ({
//   title: `${translate('common.order')} # ${navigation.state.params.item.increment_id}`,
//   headerLeft: () => (
//     <TouchableOpacity
//       onPress={() => {props.navigation.goBack() }}
//       >
//       <Image style={[CommonStyle.Icon25,CommonStyle.marginLR20]} source={require("./.././../../resources/icons/back.png")} />
//       </TouchableOpacity>
//   ),
//   headerStyle: {
//     backgroundColor:GlobalStyles.colorSet.white,
//     marginTop:Platform.OS === 'ios' ? 0 : (WINDOW_HEIGHT>770)? H(27) : H(StatusbarHeight),
//     // height: H(40),
//     height: H(60),
//     elevation: 0,
//      borderWidth:0,
//    borderBottomColor:'transparent',
//   }
// });

const styles = StyleSheet.create({
  container: theme => ({
    backgroundColor: theme.colors.background,
    // padding: theme.spacing.large,
    flex: 1,
  }),
  itemContainer: theme => ({
    backgroundColor: theme.colors.surface,
    borderRadius: theme.dimens.borderRadius,
    padding: theme.spacing.small,
    marginVertical:1,
    // borderBottomWidth: 1,
    borderColor: theme.colors.border,
    flex: 1,
  }),
  row: {
    flexDirection: 'row',
  },
  bottomSection:{
    backgroundColor:GlobalStyles.colorSet.white,
    padding:W(20)
  },
  imageStyle: theme => ({
    width: theme.dimens.orderImageWidth,
    height: theme.dimens.orderImageHeight,
  }),
});

OrderScreen.propTypes = {
  products: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  orderProductDetail: PropTypes.func.isRequired,
};

OrderScreen.defaultProps = {};

const mapStateToProps = ({ account, magento }) => {
  const { products } = account;
  return {
    products,
  };
};

export default connect(mapStateToProps, {
  orderProductDetail,
})(OrderScreen);
