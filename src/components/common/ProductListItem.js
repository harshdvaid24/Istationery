import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, Text,TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
// import { Text } from './Text';
import { Price } from './Price';
import { getProductThumbnailFromAttribute,getProductCustomAttributeValue } from '../../helper/product';
import { ThemeContext } from '../../theme';
import { finalPrice } from '../../helper/price';
import  CommonStyle from './../../utils/CommonStyle';
import  GlobalStyles,{H,W} from './../../utils/GlobalStyles';

const ProductListItem = ({
  product,
  onRowPress,
  currencySymbol,
  currencyRate,
  imageStyle,
  infoStyle,
  textStyle,
  priceStyle,
  viewContainerStyle,
  columnContainerStyle,
}) => {
  const theme = useContext(ThemeContext);
  const image = () => getProductThumbnailFromAttribute(product);
  const isInStock =  getProductCustomAttributeValue(product,'quantity_status');
  console.log("isInStock:",isInStock);
  

  return (
    <View style={[viewContainerStyle]}>
      <TouchableOpacity
        style={[styles.containerStyle(theme), columnContainerStyle]}
        onPress={() => { onRowPress(product); }}
      >

        <FastImage
          style={[styles.imageStyle(theme), imageStyle]}
          resizeMode="contain"
          source={{ uri: image() }}
        />
        <View style={[styles.infoStyle, infoStyle]}>
          <View style={[styles.productNameContainer]}>
              
             <Text numberOfLines={2} style={[styles.textStyle]}>{product.name}</Text>
          </View>
          <View style={[styles.productPriceContainer,CommonStyle.paddingLR15]}>
            {
              (isInStock=='1')?
           
            <Price
              style={styles.textStyle}
              basePrice={product.price}
              discountPrice={finalPrice(product.custom_attributes, product.price)}
              currencyRate={currencyRate}
              currencySymbol={currencySymbol}
            />: <Text numberOfLines={2} style={[styles.OutofStocktextStyle]}>{'Out Of Stock'}</Text>
            }
          </View>
        
        </View>
      </TouchableOpacity>
    </View>
  );
};

ProductListItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    sku: PropTypes.string.isRequired,
    type_id: PropTypes.string,
    price: PropTypes.number,
    custom_attributes: PropTypes.arrayOf(PropTypes.shape({
      attribute_code: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    })),
  }).isRequired,
  onRowPress: PropTypes.func,
  imageStyle: PropTypes.object,
  infoStyle: PropTypes.object,
  textStyle: PropTypes.object,
  priceStyle: PropTypes.object,
  viewContainerStyle: PropTypes.object,
  columnContainerStyle: PropTypes.object,
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
};

ProductListItem.defaultProps = {
  onRowPress: () => { },
  imageStyle: {},
  infoStyle: {},
  textStyle: {},
  priceStyle: {},
  viewContainerStyle: {},
  columnContainerStyle: {},
};

const styles = {
  containerStyle: theme => ({
    flexDirection: 'row',
    flex: 1,
    backgroundColor: theme.colors.surface,
  }),
  infoStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 2,
  },
  textStyle:{
    // fontSize:W(14),
    color:GlobalStyles.colorSet.appBlack
  },
  OutofStocktextStyle:{
    // fontSize:W(14),
    color:GlobalStyles.colorSet.red
  },
  imageStyle: theme => ({
    height: theme.dimens.productListItemImageHeight,
    margin: theme.spacing.small,
    // borderWidth: 1,
    borderColor: theme.colors.border,
    width: null,
  }),
  productNameContainer:{
    height:H(40),
    width:'100%',
    // flexDirection:'row',
    paddingHorizontal:W(15),
    // justifyContent:'center'
  },
  productPriceContainer:{
    height:H(35),
    width:'100%',
    // flexDirection:'row',
    paddingHorizontal:W(15),
    // justifyContent:'center'
  }
};

export { ProductListItem };
