import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  View, TouchableOpacity, LayoutAnimation,Image,Text
} from 'react-native';
import { Icon } from 'react-native-elements';
import CategoryTreeList from './CategoryTreeList';
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
        <TouchableOpacity onPress={onExpandPress} style={[CommonStyle.paddingTB10,CommonStyle.paddingLR10,CommonStyle.width20p]} onPress={onExpandPress}>
          {(expanded)?
            <Image style={[CommonStyle.Icon20,CommonStyle.marginLR10]} source={require("./.././../../resources/icons/blackDown.png")} />:
           <Image style={[CommonStyle.Icon20,CommonStyle.marginLR10]} source={require("./.././../../resources/icons/blackRight.png")} />
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
      <View style={[]}>
        <TouchableOpacity
          onPress={onRowPress}
          style={[styles.rowStyles(theme)]}
        >
          <View style={[CommonStyle.width80p,CommonStyle.paddingLR20]}>
             <Text numberOfLines={1} style={[CommonStyle.lGreyRegular]} >{category.name}</Text>
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
    paddingLeft:W(20),
    // paddingBottom:10,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor:GlobalStyles.colorSet.BorderGrey,
  }),
  rowStyles: theme => ({
    flex: 1,
    height:H(40),
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
    // borderBottomWidth: 1,
    // borderColor: theme.colors.border,
    // paddingVertical: theme.spacing.small,
    backgroundColor: theme.colors.white,
  }),
  dropIcon: theme => ({
    height: H(34),
    // padding: 2,
    paddingRight: theme.spacing.large,
  }),
};

export default CategoryTreeListItem;
