import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  View, TouchableOpacity, LayoutAnimation,Image,Text
} from 'react-native';
import { Icon } from 'react-native-elements';
import CategoryTreeScreenList from './CategoryTreeScreenList';
import { setCurrentCategory, resetFilters } from '../../actions/index';
import { NAVIGATION_CATEGORY_PATH } from '../../navigation/routes';
import NavigationService from '../../navigation/NavigationService';
import { ThemeContext } from '../../theme';

import CommonStyle from '../../utils/CommonStyle'
import GlobalStyles,{W,H} from '../../utils/GlobalStyles'
const CategoryTreeListScreenItem = (props) => {
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
      if(props.category.level==2){
        return (
          <TouchableOpacity onPress={onExpandPress} style={[CommonStyle.paddingTB10,CommonStyle.width10p]} onPress={onExpandPress}>
            {(expanded)?
             <Image style={[CommonStyle.Icon20,CommonStyle.marginLR10]} source={require("./.././../../resources/icons/down-arrow-primary.png")} />:
             <Image style={[CommonStyle.marginLR10,{height:H(30),width:W(15)}]} source={require("./.././../../resources/icons/right_arrow.png")} />
            }
          </TouchableOpacity>
        );
      }
      else{
        return (
          <TouchableOpacity onPress={onExpandPress} style={[CommonStyle.paddingTB10,CommonStyle.width15p]} onPress={onExpandPress}>
            {(expanded)?
             <Image style={[CommonStyle.Icon20,CommonStyle.marginLR10]} source={require("./.././../../resources/icons/down-arrow-primary.png")} />:
             <Image style={[CommonStyle.Icon20,CommonStyle.marginLR10]} source={require("./.././../../resources/icons/right-arrow-primary.png")} />
            }
          </TouchableOpacity>
        );
      }
     
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
      {
        (props.category?.level==2)?
        <TouchableOpacity
          onPress={onRowPress}
          style={[styles.rowStyles(theme)]}
        >
          <View style={[CommonStyle.width90p,CommonStyle.FlexRow,CommonStyle.HorizontalCenter]}>
          <Image resizeMode={'stretch'} style={[CommonStyle.Icon40,{position:'absolute',top:H(14),zIndex:2,left:W(30)}]} source={require("./.././../../resources/icons/wishlist.png")} />
             <Image resizeMode={'stretch'} style={[{height:H(60),width:W(120)}]} source={require("./.././../../resources/icons/right_slider.png")} />
             <View style={[CommonStyle.width70p]}>
                <Text numberOfLines={1} style={[CommonStyle.mBlackRegular,CommonStyle.marginL10]} >{category.name.toUpperCase()}</Text>
             </View>
           
          </View>
          
          {renderExpandButton()}
        </TouchableOpacity>:
     
        <TouchableOpacity
          onPress={onRowPress}
          style={[styles.SubrowStyles(theme)]}
        >
          <View style={[CommonStyle.width85p,CommonStyle.paddingLR20]}>
             <Text numberOfLines={1} style={[CommonStyle.mGreyRegular]} >{category.name.toUpperCase()}</Text>
          </View>
          
          {renderExpandButton()}
        </TouchableOpacity>
      }
      </View>
    );
  };

  const renderChildren = () => {
    if (expanded) {
      return (
        <View style={[styles.subItemsContainer(theme)]}>
          <CategoryTreeScreenList categories={props.category?.children_data} />
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
    paddingRight:W(20),
    // paddingBottom:10,
    backgroundColor: theme.colors.white,
     borderBottomWidth: 1,
    borderBottomColor:GlobalStyles.colorSet.BorderGrey,
    // /borderColor: theme.colors.lightBorder,
  }),
  rowStyles: theme => ({
    flex: 1,
    height:H(60),
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
     borderWidth: 0.5,
    borderColor: GlobalStyles.colorSet.BorderGrey,
    marginBottom: H(5),
    backgroundColor: theme.colors.white,
  }),
  SubrowStyles: theme => ({
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

export default CategoryTreeListScreenItem;
