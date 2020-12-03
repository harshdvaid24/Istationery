import React, { useContext, useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import {
  View,TouchableOpacity,Image,
  RefreshControl,Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  addFilterData,
  getProductsForCategoryOrChild,
  setCurrentProduct,
  updateProductsForCategoryOrChild,
} from '../../actions';
import { ProductList, HeaderGridToggleIcon } from '../common';
import NavigationService from '../../navigation/NavigationService';
import {
  NAVIGATION_HOME_PRODUCT_PATH,NAVIGATION_SEARCH_SCREEN_PATH
} from '../../navigation/routes';
import { ThemeContext } from '../../theme';
import CartBadge from '../../components/cart/CartBadge';
import CommonStyle from './../../utils/CommonStyle'
import GlobalStyle,{W,H,StatusbarHeight,WINDOW_HEIGHT} from './../../utils/GlobalStyles'

const Category = ({
  canLoadMoreContent,
  loadingMore,
  products,
  totalCount,
  sortOrder, // Add its validation in prop-types
  priceFilter, // Add its validation in prop-types
  category,
  refreshing,
  navigation,
  currencySymbol,
  currencyRate,
  addFilterData: _addFilterData,
  getProductsForCategoryOrChild: _getProductsForCategoryOrChild,
  setCurrentProduct: _setCurrentProduct,
  updateProductsForCategoryOrChild: _updateProductsForCategoryOrChild,
}) => {
  const theme = useContext(ThemeContext);
  const listTypeGrid = useSelector(({ ui }) => ui.listTypeGrid );
console.log("products:",products);
console.log("height:",WINDOW_HEIGHT);

  useEffect(() => {
    _addFilterData({ categoryScreen: true });
    console.log(" _getProductsForCategoryOrChild:category:",category);
    _getProductsForCategoryOrChild(category);
  }, []);

  const onRowPress = (product) => {
    _setCurrentProduct({ product });
    NavigationService.navigate(NAVIGATION_HOME_PRODUCT_PATH, {
      title: product.name,
      product: product,
    });
  };

  const onRefresh = () => {
    _updateProductsForCategoryOrChild(category, true);
  };

  const onEndReached = () => {
    console.log('On end reached called!');
    console.log(loadingMore, totalCount, canLoadMoreContent);
    if (!loadingMore && canLoadMoreContent) {
      _getProductsForCategoryOrChild(category, products.length, sortOrder, priceFilter);
    }
  };

  const performSort = (_sortOrder) => {
    _addFilterData(_sortOrder);
    _getProductsForCategoryOrChild(category, null, _sortOrder, priceFilter);
  };

  return (
   
   
    <View style={styles.containerStyle(theme)}>
      <ProductList
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}
        products={products}
        onEndReached={onEndReached}
        canLoadMoreContent={canLoadMoreContent}
        onRowPress={onRowPress}
        navigation={navigation}
        gridColumnsValue={listTypeGrid}
        performSort={performSort}
        sortOrder={sortOrder}
        currencySymbol={currencySymbol}
        currencyRate={currencyRate}
      />
    </View>
  
  );
};

Category['navigationOptions'] = screenProps => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {screenProps.navigation.goBack() }}
      >
      <Image style={[CommonStyle.Icon25,CommonStyle.marginTB10,CommonStyle.marginLR20]} source={require("./.././../../resources/icons/back.png")} />
      </TouchableOpacity>
  ),
  title:screenProps.navigation?.state?.params.title ,
  headerRight: () => (
    <View style={[styles.headerRight]}>
    <TouchableOpacity
      style={[CommonStyle.paddingLR10]}
      onPress={() => {screenProps.navigation.navigate(NAVIGATION_SEARCH_SCREEN_PATH) }}
      >
      <View style={[CommonStyle.marginTop5]}><Image style={CommonStyle.Icon25} source={require('../../../resources/icons/Search.png')} resizeMode='contain'/></View>
    </TouchableOpacity>
    <TouchableOpacity
      style={[CommonStyle.paddingLR10]}
      onPress={() => {screenProps.navigation.navigate('Cart') }}
      >

      <CartBadge color={GlobalStyle.colorSet.btnPrimary} />
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
  },
});

const styles = {
  containerStyle: theme => ({
    flex: 1,
    backgroundColor: theme.colors.background,
  }),
  headerRight:{
    flexDirection:'row',
    alignItems:'center'
  },
  
};

Category.propTypes = {
  canLoadMoreContent: PropTypes.bool.isRequired,
  loadingMore: PropTypes.bool.isRequired,
  products: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.bool]),
  totalCount: PropTypes.number.isRequired,
  category: PropTypes.object,
  refreshing: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  addFilterData: PropTypes.func.isRequired,
  getProductsForCategoryOrChild: PropTypes.func.isRequired,
  setCurrentProduct: PropTypes.func.isRequired,
  updateProductsForCategoryOrChild: PropTypes.func.isRequired,
};

Category.defaultProps = {};

const mapStateToProps = (state) => {
  const { category } = state.category.current;
  const {
    products, totalCount, loadingMore, refreshing,
  } = state.category;
  const {
    currency: {
      displayCurrencySymbol: currencySymbol,
      displayCurrencyExchangeRate: currencyRate,
    },
  } = state.magento;
  const { priceFilter, sortOrder } = state.filters;
  const canLoadMoreContent = products.length < totalCount;

  return {
    category,
    products,
    totalCount,
    canLoadMoreContent,
    loadingMore,
    refreshing,
    priceFilter,
    sortOrder,
    currencySymbol,
    currencyRate,
  };
};

export default connect(mapStateToProps, {
  getProductsForCategoryOrChild,
  updateProductsForCategoryOrChild,
  setCurrentProduct,
  addFilterData,
})(Category);
