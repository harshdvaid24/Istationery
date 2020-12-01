import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  View, TouchableOpacity, LayoutAnimation,Image
} from 'react-native';
import { Icon } from 'react-native-elements';
import CategoryTreeList from './CategoryTreeList';
import { Text } from '../common';
import { setCurrentCategory, resetFilters } from '../../actions/index';
import { NAVIGATION_CATEGORY_PATH } from '../../navigation/routes';
import NavigationService from '../../navigation/NavigationService';
import { ThemeContext } from '../../theme';

import CommonStyle from './../../utils/CommonStyle'
import GlobalStyles,{W,H} from './../../utils/GlobalStyles'
const CategoryTreeListItem = (props) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const switchAnimation = {
      duration: 150,
      update: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
    };
    LayoutAnimation.configureNext(switchAnimation);
  });

  const onExpandPress = () => setExpanded(!expanded);

  const onRowPress = () => {
   
    const { category } = props;
    console.log("category:",category);
    dispatch(resetFilters());
    dispatch(setCurrentCategory({ category }));
    NavigationService.navigate(NAVIGATION_CATEGORY_PATH, {
      title: category.name,
    });
  };

  const renderExpandButton = () => {
    if (props.category?.children_data?.length) {
      return (
        <TouchableOpacity onPress={onExpandPress} style={[{paddingLeft:5,paddingTop:5,paddingBottom:5},CommonStyle.width20p]} onPress={onExpandPress}>
          {(expanded)?
           <Image style={[CommonStyle.Icon15,CommonStyle.marginLR10]} source={require("./.././../../resources/icons/down.png")} />:
           <Image style={[CommonStyle.Icon15,CommonStyle.marginLR10]} source={require("./.././../../resources/icons/right.png")} />
          }
        </TouchableOpacity>
      );
    }
  };

  const renderItem = () => {
    const { category } = props;
    const titleStyle = {
      fontSize:16,
      paddingLeft: 10 * category.level,
      color:'#92959e'
    };

    return (
      <View>
        <TouchableOpacity
          onPress={onRowPress}
          style={[styles.rowStyles(theme)]}
        >
          <View style={[CommonStyle.width80p]}>
             <Text numberOfLines={1} type="heading" style={titleStyle}>{category.name}</Text>
          </View>
          
          {renderExpandButton()}
        </TouchableOpacity>
      </View>
    );
  };

  const renderChildren = () => {
    if (expanded) {
      return (
        <View style={[styles.subItemsContainer(theme)]}>
          <CategoryTreeList categories={props.category?.children_data} />
        </View>
      );
    }
  };

  return (
    <View>
      {renderItem()}
      {renderChildren()}
    </View>
  );
}

const styles = {
  subItemsContainer:theme => ({
    paddingLeft:20,
    // paddingBottom:10,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderColor: theme.colors.lightBorder,
  }),
  rowStyles: theme => ({
    flex: 1,
    height:H(50),
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
    // borderBottomWidth: 1,
    // borderColor: theme.colors.border,
    // paddingVertical: theme.spacing.small,
    backgroundColor: theme.colors.white,
  }),
  dropIcon: theme => ({
    height: 24,
    // padding: 2,
    paddingRight: theme.spacing.large,
  }),
};

export default CategoryTreeListItem;
