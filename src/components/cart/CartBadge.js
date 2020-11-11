import React, { useContext } from 'react';
import { View, Image,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import IconBadge from 'react-native-icon-badge';
import { Text } from '../common';
import { ThemeContext, theme } from '../../theme';
import CommonStyle from './../../utils/CommonStyle'
import GlobalStyle,{W,H} from './../../utils/GlobalStyles'
const CartBadge = ({
  color,
  itemsCount,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <IconBadge
      MainElement={(
        <View style={styles.iconWrapper}>
          <Image style={[CommonStyle.Icon25]} source={require("./.././../../resources/icons/Cart.png")} />
        </View>
      )}
      BadgeElement={
        <Text style={styles.textStyle(theme)}>{itemsCount}</Text>
      }
      IconBadgeStyle={styles.iconBadgeStyle}
      Hidden={itemsCount === 0}
    />
  );
};

const styles = {
  textStyle: theme => ({
    color: theme.colors.white,
    fontSize: 12,
    textAlign: 'center',
    backgroundColor: theme.colors.transparent,
  }),
  iconWrapper: {
    marginTop: 5,
    marginRight: 12,
  },
  iconBadgeStyle: {
    minWidth: 15,
    height: 15,
    backgroundColor: theme.colors.secondaryLight,
  },
};

CartBadge.propTypes = {
  color: PropTypes.string.isRequired,
  itemsCount: PropTypes.number,
};

CartBadge.defaultProps = {
  itemsCount: 0,
};

const mapStateToProps = ({ cart }) => {
  const itemsCount = cart.quote && cart.quote.items_qty ? cart.quote.items_qty : 0;
  return { itemsCount };
};

export default connect(mapStateToProps)(CartBadge);
