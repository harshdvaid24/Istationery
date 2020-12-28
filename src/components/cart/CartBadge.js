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
  isActive,
  itemsCount,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <IconBadge
      MainElement={(
        <View style={styles.iconWrapper}>
        {isActive?
          <Image style={[CommonStyle.Icon25]}  source={require('../../../resources/icons/Cart_c.png')} />
        :
        <Image style={[CommonStyle.Icon25]}  source={require('../../../resources/icons/Cart.png')} />
        }
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
    fontSize: W(10),
    textAlign: 'center',
    backgroundColor: theme.colors.transparent,
  }),
  iconWrapper: {
    marginTop: H(5),
    marginRight: W(12),
  },
  iconBadgeStyle: {
    justifyContent:'center',
    alignItems:'center',
    paddingTop:H(3),
    width: H(15),
    height: H(15),
    backgroundColor: theme.colors.secondaryLight,
  },
};

CartBadge.propTypes = {
  color: PropTypes.string.isRequired,
  itemsCount: PropTypes.number,
};

CartBadge.defaultProps = {
  itemsCount: 0,
  isActive:false
};

const mapStateToProps = ({ cart }) => {
  const itemsCount = cart.quote && cart.quote.items_qty ? cart.quote.items_qty : 0;
  return { itemsCount };
};

export default connect(mapStateToProps)(CartBadge);
