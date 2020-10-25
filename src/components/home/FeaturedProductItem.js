import React, { useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text, Price } from '../common';
import { getProductThumbnailFromAttribute } from '../../helper/product';
import { ThemeContext } from '../../theme';
import { finalPrice } from '../../helper/price';
import { useSelector } from 'react-redux';
import  CommonStyle from './../../utils/CommonStyle';
import  GlobalStyles,{H,W} from './../../utils/GlobalStyles';

const FeaturedProductItem = ({
  onPress,
  currencySymbol,
  currencyRate,
  product,
}) => {
  const theme = useContext(ThemeContext);
  const [themeStyles, setThemeStyle] = useState({});
  const [imageURI, setImageURI] = useState('');
  const price = useMemo(
    () => finalPrice(product.custom_attributes, product.price),
    [product.custom_attributes, product.price]
  );
  useEffect(
    () => setImageURI(getProductThumbnailFromAttribute(product)),
    [product]
  );
   useEffect(
    () => setThemeStyle({
      image: styles.imageStyle(theme),
      text: styles.textStyle(theme),
    }),
    [theme]
  );

  return (
    <View style={styles.container(theme)}>
      <TouchableOpacity
        style={styles.containerStyle(theme)}
        onPress={() => { onPress(product); }}
      >
        <FastImage
          style={themeStyles.image}
          resizeMode="contain"
          source={{ uri: imageURI }}
        />
        <View style={styles.infoStyle}>
          <View style={[CommonStyle.marginTB10,CommonStyle.marginLR10]}>
              <Text numberOfLines={2} style={[styles.textStyle]}>{product.name}</Text>
        
          </View>

          <View style={[styles.productPriceContainer,CommonStyle.paddingLR15]}>
            <Price
              style={styles.textStyle}
              basePrice={product.price}
              discountPrice={finalPrice(product.custom_attributes, product.price)}
              currencyRate={currencyRate}
              currencySymbol={currencySymbol}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    padding: theme.spacing.tiny,
    borderRadius:10,
    width: theme.dimens.WINDOW_WIDTH * 0.47,
  }),
  containerStyle: theme => ({
    flexDirection: 'column',
    borderRadius:10,
    flex: 1,
    borderWidth: 0,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.dimens.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  productPriceContainer:{
    height:H(35),
    width:'100%',
    // flexDirection:'row',
    paddingHorizontal:W(15),
    // justifyContent:'center'
  },
  infoStyle: {
    paddingLeft:10,
    paddingRight:10,
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle:{
    // fontSize:W(14),
    color:GlobalStyles.colorSet.appBlack,
  },
  textStyle: theme => ({
    justifyContent: 'center',
    textAlign: 'center',
    fontSize:14,
    color:theme.colors.secondaryDark,
    flexDirection: 'column',
    marginTop: theme.spacing.small,
  }),
  priceStyle: {
    textAlign: 'center',
  },
  imageStyle: theme => ({
    height: theme.dimens.homeProductImageHeight,
    width: theme.dimens.homeProductImageWidth,
  }),
});

FeaturedProductItem.propTypes = {
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  onPress: PropTypes.func,
  product: PropTypes.object,
};

FeaturedProductItem.defaultProps = {};

export default FeaturedProductItem;
