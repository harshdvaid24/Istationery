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
const Categories = ({
  slider,
  style,
}) => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  // let URL =  magento.getMediaUrl();
  //  let BaseURL = 'https://staging.istationery.com/pub/media/';

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
        source={{ uri:magento.getMediaUrl()+item.image}}
      />
    <Text numberOfLines={3} style={[CommonStyle.mBlackRegular,CommonStyle.TextAlineCenter,CommonStyle.marginTB10]}>{item.category_name}</Text>
    </TouchableOpacity>
  ));

  return (
    <View style={[styles.imageContainer, style]}>
      {/* <Text style={[CommonStyle.lPrimarySemiBold,CommonStyle.marginLR10,CommonStyle.marginTB10]}> Brands </Text> */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
         {/* <Swiper showsPagination={false} pagingEnabled autoplay={false}> */}
         {renderMediaItems()}
      {/* </Swiper> */}
      </ScrollView>
     
    </View>
  );
};

Categories.propTypes = {
  slider: PropTypes.array,
  style: PropTypes.object,
};

Categories.defaultProps = {
  slider: [],
  style: {},
};

const styles = StyleSheet.create({
  imageContainer: {
    height:H(140),
    alignItems: 'center',
    // paddingHorizontal:W(10)
    // width: W(200),
  },
  imageStyle: {
    height:H(100),
    width: W(100),
  },
  slide: {
    height:H(140),
    width: W(130),
    alignItems: 'center',
    // paddingVertical:H(5),
    // paddingHorizontal:W(20),
    // marginHorizontal:W(10),
    backgroundColor:GlobalStyles.colorSet.white
  },
});

export default Categories;
