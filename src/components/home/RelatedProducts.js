import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text } from '../common';
import RelatedProductItem from './RelatedProductItem';
import { ThemeContext } from '../../theme';

const RelatedProducts = ({
  style,
  title,
  products,
  currencySymbol,
  currencyRate,
  onPress,
}) => {
  const theme = useContext(ThemeContext);

  const keyExtractor = item => item.id.toString();

  return (
    <View style={[styles.container(theme), style]}>
      <Text type="heading" style={styles.title(theme)}>
        {title}
      </Text>
      <FlatList
        horizontal
        data={products.items}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <RelatedProductItem
            product={item}
            currencySymbol={currencySymbol}
            currencyRate={currencyRate}
            onPress={onPress}
          />
        )}
      />
    </View>
  );
};

RelatedProducts.propTypes = {
  products: PropTypes.object,
  onPress: PropTypes.func,
  title: PropTypes.string,
  style: PropTypes.object,
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
};

RelatedProducts.defaultProps = {
  products: {},
  style: {},
};

const styles = StyleSheet.create({
  container: theme => ({
    height: theme.dimens.WINDOW_HEIGHT * 0.35,
    paddingTop: 10,
    
  }),
  title:theme => ({
    textAlign: 'left',
    color:theme.colors.primary,
    fontWeight: 'bold',
    marginLeft:20,
    marginBottom: 10,
  }),
});

export default RelatedProducts;
