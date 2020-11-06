/**
 * Created by Dima Portenko on 14.05.2020
 */
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
 import AllRelatedProducts from '../home/RelatedProducts';
import { translate } from '../../i18n';
import { ThemeContext } from '../../theme';
import { NAVIGATION_HOME_PRODUCT_PATH } from '../../navigation/routes';
import { useDispatch } from 'react-redux';
import { setCurrentProduct } from '../../actions';
import { useOtherProducts } from '../../hooks/useOtherProducts';
import { Spinner } from '../common';

export const OthersProducts = ({ product, currencySymbol, currencyRate, navigation }) => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { othersProducts, loading, error } = useOtherProducts({ product });
  console.log("Others product:",othersProducts);
  if (!othersProducts?.length && !loading || error) {
    return <View />;
  }

  if (loading) {
    return <Spinner />;
  }

  const onProductPress = (pressedProduct) => {
    dispatch(setCurrentProduct({ product: pressedProduct }));
    navigation.push(NAVIGATION_HOME_PRODUCT_PATH, {
      title: pressedProduct.name,
      product: pressedProduct,
    });
  };

  return (
    <AllRelatedProducts
      style={{ marginBottom: theme.spacing.large }}
      products={{ items: othersProducts }}
      title={translate('product.otherProductsTitle')}
      titleStyle={styles.relatedProductTitle}
      onPress={onProductPress}
      currencySymbol={currencySymbol}
      currencyRate={currencyRate}
    />
  );
};

const styles = StyleSheet.create({
  relatedProductTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});