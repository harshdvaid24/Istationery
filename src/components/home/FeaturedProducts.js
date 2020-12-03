import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, FlatList,Text } from 'react-native';
import FeaturedProductItem from './FeaturedProductItem';
import { ThemeContext } from '../../theme';
import  CommonStyle from './../../utils/CommonStyle';
import  GlobalStyles,{H,W} from './../../utils/GlobalStyles';

const FeaturedProducts = ({
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
        <Text style={[CommonStyle.xlBlackSemiBold,CommonStyle.marginLR20,CommonStyle.marginTB10]}>
        {title}
      </Text>
      <FlatList
        horizontal
        data={products.items}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <FeaturedProductItem
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

FeaturedProducts.propTypes = {
  products: PropTypes.object,
  onPress: PropTypes.func,
  title: PropTypes.string,
  style: PropTypes.object,
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
};

FeaturedProducts.defaultProps = {
  products: {},
  style: {},
};

const styles = StyleSheet.create({
  container: theme => ({
    // height:H(300),
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

export default FeaturedProducts;
