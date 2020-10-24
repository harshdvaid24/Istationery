import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  FlatList,
  TouchableOpacity,Image,
  StyleSheet,
  Text
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { ProductListItem, Spinner } from '.';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import { W ,H} from '../../utils/GlobalStyles';
import  CommonStyle from './../../utils/CommonStyle';
const COLUMN_COUNT = 2;

const sortData = [
  {
    label: translate('common.sortOption.aToZ'),
    key: 0,
  },
  {
    label: translate('common.sortOption.zToA'),
    key: 1,
  },
  {
    label: translate('common.sortOption.priceLowToHigh'),
    key: 2,
  },
  {
    label: translate('common.sortOption.priceHighToLow'),
    key: 3,
  },
];

const ProductList = ({
  onRowPress,
  currencySymbol,
  currencyRate,
  performSort,
  navigation,
  canLoadMoreContent,
  products,
  onEndReached,
  refreshControl,
  gridColumnsValue,
  searchIndicator,
}) => {
  const theme = useContext(ThemeContext);
  const selector = useRef(null);

  const renderItemRow = ({ item, index }) => (
    <ProductListItem
      imageStyle={styles.imageStyle}
      viewContainerStyle={{ flex: 1 }}
      product={item}
      onRowPress={onRowPress}
      currencySymbol={currencySymbol}
      currencyRate={currencyRate}
    />
  );

  const renderItemColumn = ({ item, index }) => (
    <ProductListItem
      viewContainerStyle={{
        width: theme.dimens.WINDOW_WIDTH / COLUMN_COUNT,
        borderRightColor: theme.colors.lightBorder,
        borderRightWidth: index % COLUMN_COUNT !== (COLUMN_COUNT - 1) ? theme.dimens.productListItemInBetweenSpace : 0,
      }}
      columnContainerStyle={styles.columnContainerStyle}
      textStyle={styles.textStyle}
      infoStyle={styles.infoStyle}
      product={item}
      onRowPress={onRowPress}
      currencySymbol={currencySymbol}
      currencyRate={currencyRate}
    />
  );

  const renderHeader = () => (
    <View style={styles.headerContainerStyle(theme)}>
      <ModalSelector
        style={styles.iconWrapper(theme)}
        data={sortData}
        ref={(component) => { selector.current = component; }}
        customSelector={(
          <TouchableOpacity
            style={styles.iconWrapper(theme)}
            onPress={() => selector.current.open()}>
            <Image style={[CommonStyle.Icon20]} source={require("./.././../../resources/icons/sort.png")} />
         
           <View style={[styles.textContainer]}>
              <Text style={styles.headerTextStyle(theme)}>{translate('common.sort')}</Text>
           </View>
          
          </TouchableOpacity>
        )}
        onChange={option => performSort(option.key)}
      />
      {/* <View style={styles.separator(theme)} /> */}
      <TouchableOpacity
        style={styles.iconWrapper(theme)}
        onPress={() => navigation.toggleFilterDrawer()}>
        <Image style={[CommonStyle.Icon20]} source={require("./.././../../resources/icons/filter.png")} />
        <View style={[styles.textContainer]}>
              <Text style={styles.headerTextStyle(theme)}>{translate('common.filter')}</Text>
           </View>
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => {
    if (canLoadMoreContent) {
      return <Spinner style={{ padding: theme.spacing.large }} />;
    }

    return null;
  };

  const renderItemSeparator = () => <View style={styles.itemSeparator(theme)} />;

  const renderContent = () => {
    if (!products) {
      return <Spinner />;
    }

    if (products.length) {
      return (
        <FlatList
          refreshControl={refreshControl}
          data={products}
          renderItem={gridColumnsValue ? renderItemRow : renderItemColumn}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          numColumns={gridColumnsValue ? 1 : 2}
          key={(gridColumnsValue) ? 'ONE COLUMN' : 'TWO COLUMNS'}
          ItemSeparatorComponent={renderItemSeparator}
        />
      );
    }
    if (!searchIndicator) {
      return (
        <View style={styles.notFoundTextWrap}>
          <Text style={styles.notFoundText}>{translate('errors.noProduct')}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  itemSeparator: theme => ({
    height: theme.dimens.productListItemInBetweenSpace,
    // backgroundColor: theme.colors.border,
    flex: 1,
  }),
  container: {
    flex: 1,
  },
  notFoundTextWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  notFoundText: {
    textAlign: 'center',
  },
  infoStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    marginTop: 0,
    padding: 0,
  },
  imageStyle: {
    flex: 1,
  },
  columnContainerStyle: {
    flexDirection: 'column',
  },
  headerContainerStyle: theme => ({
    flex: 1,
    backgroundColor:theme.colors.white,
    flexDirection: 'row',
    //  alignItems: 'stretch',
     justifyContent: 'space-between',
    // borderBottomWidth: 1,
    borderBottomColor: theme.colors.bodyText,
  }),
  
  iconWrapper: theme => ({
    // flex: 1,
    height: H(32),
    // backgroundColor:'green',
    width:'50%',
    //  borderWidth:1,
     paddingVertical:W(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  headerTextStyle: theme => ({
    textTransform: 'uppercase',
    color:theme.colors.black,
    marginLeft: theme.spacing.small,
  }),
  separator: theme => ({
    width: 0.1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.small,
  }),
  textContainer:  {
    height: H(32),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

ProductList.propTypes = {
  onRowPress: PropTypes.func,
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  performSort: PropTypes.func,
  navigation: PropTypes.object.isRequired,
  canLoadMoreContent: PropTypes.bool.isRequired,
  products: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.bool]),
  onEndReached: PropTypes.func,
  refreshControl: PropTypes.element,
  gridColumnsValue: PropTypes.bool.isRequired,
  searchIndicator: PropTypes.bool,
};


ProductList.defaultProps = {
  onRowPress: () => {},
  performSort: () => console.log('Perform Sort function not sent in props'),
  onEndReached: () => {},
  refreshControl: <></>,
  searchIndicator: false,
};

export { ProductList };
