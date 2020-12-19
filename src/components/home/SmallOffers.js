import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { View, StyleSheet,ScrollView,Text,TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { magento } from '../../magento';
import { ThemeContext } from '../../theme';
import  CommonStyle from '../../utils/CommonStyle';
import  GlobalStyles,{H,W,StatusbarHeight,WINDOW_HEIGHT} from '../../utils/GlobalStyles';
import { setCurrentCategory, resetFilters } from '../../actions/index';
import { NAVIGATION_CATEGORY_PATH } from '../../navigation/routes';
import NavigationService from '../../navigation/NavigationService';
import { cos } from 'react-native-reanimated';
const SmallOffers = ({
  slider,
  style,
}) => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  // let URL =  magento.getMediaUrl();
  //  let BaseURL = 'https://staging.istationery.com/pub/media/';
  const images = [
    {id:1,image:'wysiwyg/mobile/icons/online_support_icon.png'},
    {id:2,image:'wysiwyg/mobile/icons/online_support_icon.png'},
    {id:3,image:'wysiwyg/mobile/icons/online_support_icon.png'},
]

const onItemPressed = (Cid,title) => {
  console.log("onItemPressed:",Cid);
  let category = {
          children_data: [],
          id: Cid,
          is_active: false,
          level: 2,
          name: title,
          parent_id: 3,
          position: 35,
          product_count: 14
        };
        dispatch(resetFilters());
        dispatch(setCurrentCategory({ category }));
        NavigationService.navigate(NAVIGATION_CATEGORY_PATH, {
          title: category.name,
        });
  
  }
  const renderMediaItems = () => slider.map((item, index) => (
    <TouchableOpacity onPress={ () => onItemPressed(item.category_id,item.title)} key={index} style={[styles.slide]}>
     {console.log("small offers:",magento.getMediaUrl()+item.image)}
      <FastImage
        style={[styles.imageStyle]}
        resizeMode="contain"
        source={{ uri:magento.getMediaUrl()+item.image }}
      />
    </TouchableOpacity>
  ));

  return (
    <View style={[styles.imageContainer, style]}>
         {renderMediaItems()} 
    </View>
  );
};

SmallOffers.propTypes = {
  slider: PropTypes.array,
  style: PropTypes.object,
};

SmallOffers.defaultProps = {
  slider: [],
  style: {},
};

const styles = StyleSheet.create({
  imageContainer: {
    // height:H(170),
    alignItems: 'center',
    // paddingHorizontal:W(10)
  },
  imageStyle: {
    height:H(140),
    width: "100%",
  },
  slide: {
    width: "100%",
    paddingVertical:H(5),
    alignItems: 'center',
    flexDirection:'row',
    // justifyContent:'center',
    backgroundColor:GlobalStyles.colorSet.white,
    borderBottomColor:GlobalStyles.colorSet.BorderGrey,
    borderBottomWidth:0.5
  },
});

export default SmallOffers;
