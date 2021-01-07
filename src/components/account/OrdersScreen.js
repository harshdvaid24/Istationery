import React, { useEffect, useContext } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
  Image
} from 'react-native';
import PropTypes from 'prop-types';
import CartBadge from '../../components/cart/CartBadge';
import {
  getOrdersForCustomer,
} from '../../actions';
import { Text } from '../common';
import OrderListItem from './OrderListItem';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import CommonStyle from './../../utils/CommonStyle'
import GlobalStyles,{W,H,StatusbarHeight,WINDOW_HEIGHT} from './../../utils/GlobalStyles'
import { Spinner } from '../common';

import {
  NAVIGATION_SEARCH_SCREEN_PATH
} from '../../navigation/routes';
import { NAVIGATION_HOME_SCREEN_PATH } from '../../navigation/routes';

const OrdersScreen = ({
  orders,
  customerId,
  refreshing,
  loading,
  getOrdersForCustomer: _getOrdersForCustomer,
  navigation,
}) => {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    _getOrdersForCustomer(customerId);
  }, []);

  const onRefresh = () => {
    _getOrdersForCustomer(customerId, true);
  };

  const renderItem = orderItem => (
    <OrderListItem
      item={orderItem.item}
    />
  );

  const renderOrderList = () => {

    return (
      <FlatList
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
)}
        data={orders}
        extraData={orders}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const renderEmptyOrderList = () => {
    const { navigate } = navigation;
    if(loading)
    {
      return <Spinner/>
    }
    return (
      <View style={styles.emptyListContainerStyle(theme)}>
        <Image style={[CommonStyle.Icon100]} source={require("./../../../resources/icons/empty.png")} />

        <Text  style={[CommonStyle.xlGreyRegular,CommonStyle.marginTop20]}>
          {translate('ordersScreen.noOrderMessage')}
        </Text>
        <TouchableOpacity
          onPress={() => navigate(NAVIGATION_HOME_SCREEN_PATH)}
        >
          <Text style={[CommonStyle.lPrimarySemiBold,CommonStyle.marginTop10,CommonStyle.underline]}>
            {translate('common.continueShopping')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (orders && orders.length) {
    if(loading)
    {
      return <Spinner/>
    }
    return (
      <View style={styles.container(theme)}>
        {renderOrderList()}
      </View>
    );
  }
  return renderEmptyOrderList();
};



OrdersScreen['navigationOptions'] = screenProps => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {screenProps.navigation.goBack() }}
      >
      <Image style={[CommonStyle.Icon25,CommonStyle.marginTB10,CommonStyle.marginLR20]} source={require("./.././../../resources/icons/back.png")} />
      </TouchableOpacity>
  ),
  title: 'My Orders'.toUpperCase(),
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

      <CartBadge color={GlobalStyles.colorSet.btnPrimary} />
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
  container: theme => ({
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal:10
  }),
  headerRight:{
    flexDirection:'row',
    alignItems:'center'
  },
  emptyListContainerStyle: theme => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  }),
  textStyle: theme => ({
    paddingTop: theme.spacing.small,
  }),
  buttonTextStyle: theme => ({
    padding: theme.spacing.large,
    top: 0,
    color: theme.colors.secondary,
  }),
};

OrdersScreen.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object),
  customerId: PropTypes.number,
  refreshing: PropTypes.bool,
  getOrdersForCustomer: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

OrdersScreen.defaultProps = {
  orders: null,
  customerId: null,
};

const mapStateToProps = ({ account, magento }) => {
  const loading = account.loading;
  const customerId = account.customer ? account.customer.id : null;
  const orders = account.orderData ? account.orderData : [];
  return {
    customerId,
    orders,
    loading,
    refreshing: account.refreshing,
  };
};

export default connect(mapStateToProps, {
  getOrdersForCustomer,
})(OrdersScreen);
