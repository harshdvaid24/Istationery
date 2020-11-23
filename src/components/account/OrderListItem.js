import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { Price } from '../common';
import { NAVIGATION_ORDER_PATH } from '../../navigation/routes';
import NavigationService from '../../navigation/NavigationService';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import { priceSignByCode } from '../../helper/price';
import CommonStyle from './../../utils/CommonStyle'

const OrderListItem = ({
  item,
}) => {
  const theme = useContext(ThemeContext);
  const currencySymbol = priceSignByCode(item.order_currency_code);

  const openOrdersScreen = () => {
    NavigationService.navigate(NAVIGATION_ORDER_PATH, {
      item,
    });
  };

  return (
    <TouchableOpacity onPress={openOrdersScreen}>
      <View style={styles.container(theme)}>

      <View style={[styles.row,CommonStyle.marginTB5,CommonStyle.alignContentLR]}>
          <Text style={[CommonStyle.mGreySemiBold]}>{`${translate('common.order')} # ${item.increment_id}`}</Text>
           <Text style={[CommonStyle.mPrimarySemiBold]}>{`${item.status}`}</Text>
        </View>

        
        {/* <View style={[CommonStyle.marginTB10]}>
           <Text type="label">{`${translate('orderListItem.created')}: ${item.created_at}`}</Text>
        </View> */}
        {/* <View style={[CommonStyle.marginTB10]}>
          <Text type="label">
            {`${translate('orderListItem.shipTo')} ${item.customer_firstname} ${item.customer_lastname}`}
          </Text>
        </View> */}

       
      
      
        <View style={[styles.row,CommonStyle.marginTB10,CommonStyle.HorizontalCenter]}>
          <Text>
            {`${translate('orderListItem.orderTotal')}: `}
          </Text>
          <Price
            basePrice={item.grand_total}
            currencySymbol={currencySymbol}
            currencyRate={1}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    backgroundColor: theme.colors.surface,
    borderRadius: theme.dimens.borderRadius,
    marginTop: theme.spacing.small,
    // padding: theme.spacing.small,
    paddingHorizontal:20,
    paddingVertical:15,
    // borderBottomWidth: 1,
    borderColor: theme.colors.border,
    flex: 1,
  }),
  row: {
    flexDirection: 'row',
  },
});

OrderListItem.propTypes = {
  item: PropTypes.object.isRequired,
  currencySymbol: PropTypes.string.isRequired,
};

OrderListItem.defaultProps = {};

export default OrderListItem;
