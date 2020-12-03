import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet,ScrollView,Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { magento } from '../../magento';
import { ThemeContext } from '../../theme';
import  CommonStyle from './../../utils/CommonStyle';
import  GlobalStyles,{H,W,StatusbarHeight,WINDOW_HEIGHT} from './../../utils/GlobalStyles';
const BrandsSlider = ({
  slider,
  style,
}) => {
  const theme = useContext(ThemeContext);

//   const images = [
//     {id:1,image:'https://www.istationery.com/pub/media/wysiwyg/banner/Brands11.jpg'},
//     {id:2,image:'https://www.istationery.com/pub/media/wysiwyg/banner/Brands11.jpg'},
//     {id:3,image:'https://www.istationery.com/pub/media/wysiwyg/banner/Brands11.jpg'},
//     {id:4,image:'https://www.istationery.com/pub/media/wysiwyg/banner/Brands11.jpg'},
// ]

  const renderMediaItems = () => slider.map((item, index) => (
    <View key={index} style={styles.slide}>
      <FastImage
        style={styles.imageStyle}
        resizeMode="contain"
        source={{ uri:magento.getMediaUrl()+ item.image }}
      />
    </View>
  ));

  return (
    <View style={[styles.imageContainer, style]}>
      <Text style={[CommonStyle.lPrimarySemiBold,CommonStyle.marginLR10,CommonStyle.marginTB10]}> Brands </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
         {/* <Swiper showsPagination={false} pagingEnabled autoplay={false}> */}
         {renderMediaItems()}
      {/* </Swiper> */}
      </ScrollView>
     
    </View>
  );
};

BrandsSlider.propTypes = {
  slider: PropTypes.array,
  style: PropTypes.object,
};

BrandsSlider.defaultProps = {
  slider: [],
  style: {},
};

const styles = StyleSheet.create({
  imageContainer: {
    height:H(170),
    alignItems: 'center',
    // paddingHorizontal:W(10)
    // width: W(200),
  },
  imageStyle: {
    height:H(150),
    width: W(200),
  },
  slide: {
    alignItems: 'center',
    paddingHorizontal:W(10),
    backgroundColor:GlobalStyles.colorSet.white
  },
});

export default BrandsSlider;
