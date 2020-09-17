import React, { Component } from 'react';
import { View,Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  getSearchProducts,
  addFilterData,
  resetFilters,
  setCurrentProduct,
} from '../../actions';
import { ProductList, HeaderGridToggleIcon } from '../common';
import NavigationService from '../../navigation/NavigationService';
import { NAVIGATION_SEARCH_PRODUCT_PATH } from '../../navigation/routes';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';

const Title = ({title}) => {
  return(
  <View style={{flex:1,marginLeft:20  }}>
      <Text type="heading" bold >{title}</Text>
  </View>
  )
  
} 
class SearchScreen extends Component {
  static contextType = ThemeContext;
  static navigationOptions = ({ navigation }) => ({
    // title: translate('home.title'),
    // headerTitle: () => <Title title={translate('search.title')} />,
    // headerBackTitle: ' ',
    // headerStyle: {
    //   backgroundColor:'#F7F6F4',
    //   height: 80,
    //   elevation: 0,
    // },
    // headerRight: (<HeaderGridToggleIcon />)
    header: null
  });

  // static navigationOptions = ({ navigation }) => ({
  //   title: translate('search.title'),
  //   headerBackTitle: ' ',
  //   headerRight: (<HeaderGridToggleIcon />),
  // });

  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.getSearchProducts = _.debounce(this.props.getSearchProducts, 1000);
  }

  onRowPress = (product) => {
    this.props.setCurrentProduct({ product });
    NavigationService.navigate(NAVIGATION_SEARCH_PRODUCT_PATH, {
      title: product.name,
    });
  }

  onEndReached = () => {
    const {
      canLoadMoreContent,
      loadingMore,
      products,
    } = this.props;
    const { sortOrder, priceFilter } = this.props;

    if (!loadingMore && canLoadMoreContent) {
      this.props.getSearchProducts(this.state.input, products.length, sortOrder, priceFilter);
    }
  };

  updateSearch = (input) => {
    this.setState({ input }, () => {
      this.props.resetFilters();
      this.getSearchProducts(input, null, this.props.sortOrder, this.props.priceFilter);
    });
  };

  performSort = (sortOrder) => {
    this.props.addFilterData(sortOrder);
    this.props.getSearchProducts(this.state.input, null, sortOrder, this.props.priceFilter);
  };

  renderContent = () => (
    <ProductList
      products={this.props.products}
      navigation={this.props.navigation}
      onEndReached={this.onEndReached}
      canLoadMoreContent={this.props.canLoadMoreContent}
      searchIndicator
      onRowPress={this.onRowPress}
      gridColumnsValue={this.props.listTypeGrid}
      performSort={this.performSort}
      currencySymbol={this.props.currencySymbol}
      currencyRate={this.props.currencyRate}
    />
  );

  render() {
    const theme = this.context;
    const { input } = this.state;

    return (
      <View style={styles.containerStyle(theme)}>
        <View style={[{flexDirection:'row',justifyContent:'center',alignItems:'center'}]}>
        <SearchBar
          placeholder={'Search Products'}
          onChangeText={this.updateSearch}
          value={input}
          containerStyle={styles.searchStyle(theme)}
          inputStyle={styles.inputStyle(theme)}
          inputContainerStyle={styles.inputContainerStyle(theme)}
          showLoading={this.props.loadingMore}
        />
        <View style={[{marginTop:10,marginRight:20}]}>
          <HeaderGridToggleIcon />
        </View>
       
        </View>
       
        <View style={{ flex: 1 }}>
          {this.renderContent()}
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: theme => ({
    flex: 1,
    backgroundColor: theme.colors.background,
  
  }),
  searchStyle: theme => ({
    backgroundColor: theme.colors.background,
    alignSelf: 'center',
   marginLeft:20,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    height: theme.dimens.searchBarHeight,
    width: theme.dimens.WINDOW_WIDTH-50,
  }),
  inputContainerStyle: theme => ({
    marginTop:5,
    marginHorizontal:10,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.dimens.searchBarBorderRadius,
  }),
  inputStyle: theme => ({
    fontSize:14,
    backgroundColor: theme.colors.surface,
    color: theme.colors.titleText,
  }),
  notFoundTextWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  notFoundText: {
    textAlign: 'center',
  },
};

const mapStateToProps = ({ search, filters, magento, ui }) => {
  const { sortOrder, priceFilter } = filters;
  const { products, totalCount, loadingMore } = search;
  const {
    currency: {
      displayCurrencySymbol: currencySymbol,
      displayCurrencyExchangeRate: currencyRate,
    },
  } = magento;
  const canLoadMoreContent = products.length < totalCount;
  const { listTypeGrid } = ui;

  return {
    products,
    sortOrder,
    totalCount,
    loadingMore,
    priceFilter,
    currencyRate,
    listTypeGrid,
    currencySymbol,
    canLoadMoreContent,
  };
};

export default connect(mapStateToProps, {
  getSearchProducts,
  setCurrentProduct,
  resetFilters,
  addFilterData,
})(SearchScreen);
