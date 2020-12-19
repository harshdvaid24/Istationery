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
const Banners = ({
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
    ((slider.length-1)==index)?
    <TouchableOpacity onPress={ () => onItemPressed(item.category_id,item.category_id)} key={index} style={[styles.slideH,CommonStyle.border1]}>
      <FastImage
        style={styles.imageStyle}
        resizeMode="cover"
        source={{ uri:magento.getMediaUrl() + item.image }}
      />
    </TouchableOpacity>:
     <TouchableOpacity onPress={ () => onItemPressed(item.category_id,item.title)} key={index} style={[styles.slide,CommonStyle.border1]}>
     <FastImage
       style={styles.imageStyle}
       resizeMode="cover"
       source={{ uri:magento.getMediaUrl() + item.image }}
     />
   </TouchableOpacity>
  ));

  return (
    <View style={[styles.imageContainer, style]}>
          <View style={[styles.textContainer]}>
            <Text style={[CommonStyle.lBlackSemiBold]}>
              {slider.title}
            </Text>
            <Text style={[CommonStyle.mGreyRegular]}>
              {slider.Discription}
            </Text>
          </View>
          <View style={[CommonStyle.FlexRow,CommonStyle.FlexWrap]}>
          {(slider)?renderMediaItems():null} 
          </View>
        
    </View>
  );
};

Banners.propTypes = {
  slider: PropTypes.array,
  style: PropTypes.object,
};

Banners.defaultProps = {
  slider: [],
  style: {},
};

const styles = StyleSheet.create({
  imageContainer: {
    // height:H(170),
    // flexDirection:'row',
    alignItems: 'center',
     backgroundColor:GlobalStyles.colorSet.white
  },
  textContainer:{
    width: "100%",
    alignItems: 'center',
    paddingVertical:W(20),
    backgroundColor:GlobalStyles.colorSet.white
  },
  imageStyle: {
    height:H(200),
    width: "100%",
  },
  slide: {
    // height:H(160),
    width: "50%",
    alignItems: 'center',
    backgroundColor:GlobalStyles.colorSet.white
  },
  slideH: {
    // height:H(160),
    width: "100%",
    alignItems: 'center',
    backgroundColor:GlobalStyles.colorSet.white
  },
});

export default Banners;
