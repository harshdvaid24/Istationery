import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { MaterialHeaderButtons, Item } from './Header';
import { uiProductListTypeGrid } from '../../actions';
import { TouchableOpacity,Image,Text } from 'react-native';
import CommonStyle from '../../utils/CommonStyle';

const HeaderGridToggleIcon = () => {
  const dispatch = useDispatch();
  const isGrid = useSelector(({ ui }) => ui.listTypeGrid );

  const onPress = () => {
    dispatch(uiProductListTypeGrid(!isGrid));
  };

  return (
    <TouchableOpacity style={[{height:"100%"},CommonStyle.width100p,CommonStyle.HorizontalCenter,CommonStyle.VerticalCenter,CommonStyle.FlexRow]} onPress={onPress}>{
        (isGrid)?
        <Image style={[CommonStyle.Icon20]} source={require("./.././../../resources/icons/grid.png")} />
     : <Image style={[CommonStyle.Icon20]} source={require("./.././../../resources/icons/list.png")} />
    }
        <Text style={[CommonStyle.mGreySemiBold,CommonStyle.marginLR10]}>
              View
        </Text>
    </TouchableOpacity>
  );
};

HeaderGridToggleIcon.propTypes = {
  changeGridValueFunction: PropTypes.func,
};

export { HeaderGridToggleIcon };
