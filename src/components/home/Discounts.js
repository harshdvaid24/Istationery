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
const Discounts = ({
  slider,
  style,
}) => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  // let URL =  magento.getMediaUrl();
  //  let BaseURL = 'https://staging.istationery.com/pub/media/';
  const images = [
    {id:1,image:'wysiwyg/banner/UniCopier.jpg'},
    {id:2,image:'wysiwyg/banner/UniBook_1.jpg'},
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
    <TouchableOpacity onPress={ () => onItemPressed(item.category_id,item.title)} key={index} style={styles.slide}>
      <FastImage
        style={styles.imageStyle}
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

Discounts.propTypes = {
  slider: PropTypes.array,
  style: PropTypes.object,
};

Discounts.defaultProps = {
  slider: [],
  style: {},
};

const styles = StyleSheet.create({
  imageContainer: {
    // height:H(170),
    alignItems: 'center',
    paddingHorizontal:W(10)
  },
  imageStyle: {
    height:H(120),
    width: "100%",
  },
  slide: {
    width: "100%",
    alignItems: 'center',
    backgroundColor:GlobalStyles.colorSet.white
  },
});

export default Discounts;
