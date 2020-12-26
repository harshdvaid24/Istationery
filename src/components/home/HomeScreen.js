import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Platform,
  ScrollView, View, StyleSheet,StatusBar, RefreshControl,
  TouchableOpacity,Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import _ from 'lodash';
import { MaterialHeaderButtons, Text, Item } from '../common';
import {
  NAVIGATION_HOME_PRODUCT_PATH,
  NAVIGATION_CATEGORY_SCREEN_PATH
} from '../../navigation/routes';
import { getHomeData, setCurrentProduct } from '../../actions';


import HomeSlider from './HomeSlider';
import Banners from './Banners';
import SmallOffers from './SmallOffers';
// import Discounts from './Discounts';
import Categories from './Categories';
import BrandsSlider from './BrandsSlider';

import CurrencyPicker from './CurrencyPicker';
import FeaturedProducts from './FeaturedProducts';
import NavigationService from '../../navigation/NavigationService';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import  CommonStyle from './../../utils/CommonStyle';
import  GlobalStyles,{H,W,StatusbarHeight,WINDOW_HEIGHT} from './../../utils/GlobalStyles';
import CartBadge from '../../components/cart/CartBadge';
import {NAVIGATION_SEARCH_SCREEN_PATH} from '../../navigation/routes'
import FastImage from 'react-native-fast-image';
import SplashScreen from 'react-native-splash-screen'
const LogoTitle = ( ) => {
  return(
  <View style={[CommonStyle.width100p]}>
    <View style={[CommonStyle.width100p,CommonStyle.HorizontalCenter]}>
    <FastImage
          style={[styles.Logo]}
          resizeMode="contain"
          source={require('./../../../resources/icons/logo.png')}
        />
    </View>
    
  </View>
  )
  
} 

class HomeScreen extends Component {
  static contextType = ThemeContext;

  static navigationOptions = ({ navigation }) => ({
    // title: translate('home.title'),
    headerTitle: () => <LogoTitle />,
    headerBackTitle: ' ',
    headerLeft: (
      <View style={[CommonStyle.marginLR10]}>     
          <MaterialHeaderButtons>
            <Item title="menu" iconName="menu" color={GlobalStyles.colorSet.btnPrimary} onPress={()=>navigation.navigate(NAVIGATION_CATEGORY_SCREEN_PATH)} />
          </MaterialHeaderButtons>
      </View>
    ),
     headerRight:(  
      <View style={[styles.headerRight]}>
      <TouchableOpacity
        style={[CommonStyle.paddingLR10]}
        onPress={() => {navigation.navigate(NAVIGATION_SEARCH_SCREEN_PATH) }}
        >
        <View style={[CommonStyle.marginTop5]}><Image style={CommonStyle.Icon25} source={require('../../../resources/icons/Search.png')} resizeMode='contain'/></View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[CommonStyle.paddingLR10]}
        onPress={() => {navigation.navigate('Cart') }}
        >
  
        <CartBadge color={GlobalStyles.colorSet.btnPrimary} />
      </TouchableOpacity>
      </View>),
    headerStyle: {
      backgroundColor:'white',
      // marginTop:Platform.OS === 'ios' ? (WINDOW_HEIGHT>812)?H(StatusbarHeight):0 : (WINDOW_HEIGHT>770)? H(27) : H(StatusbarHeight),
      marginTop:Platform.OS === 'ios' ? 0 : (WINDOW_HEIGHT>770)? H(27) : H(StatusbarHeight),
      // height: H(40),
      height: H(60),
      elevation: 0,
      //  borderWidth:1,
      borderBottomColor:'transparent',
    },
   
     
  });

  

  componentDidMount() {
    console.log("WINDOW_HEIGHT:WINDOW_HEIGHT:",WINDOW_HEIGHT);
    const { navigation } = this.props;
    if (this.props.slider.length === 0) {
      this.props.getHomeData();
    }
    SplashScreen.hide();
    navigation.setParams({ toggleDrawer: this.toggleDrawer });
  }

  toggleDrawer = () => {
    const { navigation } = this.props;
    navigation.toggleDrawer();
  };
  onProductPress = (product) => {
    this.props.setCurrentProduct({ product });
    NavigationService.navigate(NAVIGATION_HOME_PRODUCT_PATH, {
      product,
      title: product.name,
    });
  };
  WINDOW_HEIGHT = (product) => {
    console.log("onProductPress:product:",product);
    this.props.setCurrentProduct({ product });
    NavigationService.navigate(NAVIGATION_HOME_PRODUCT_PATH, {
      product,title: product.name,
    });
  };

  onRefresh = () => {
    this.props.getHomeData(true);
  };

  renderFeatured() {
    console.log("featuredProducts:",this.props.featuredProducts);
    return _.map(this.props.featuredProducts, (value, key) => (
      <FeaturedProducts
        key={`featured${key}`}
        products={value}
        title={this.props.featuredCategories[key].title}
        onPress={this.onProductPress}
        currencySymbol={this.props.currencySymbol}
        currencyRate={this.props.currencyRate}
      />
    ));
  }
  renderFeature() {
    console.log("officeProducts:",this.props.officeProducts);
    return _.map(this.props.officeProducts, (value, key) => (
      <FeaturedProducts
        key={`featured${key}`}
        products={value}
        title={this.props.officeEssentials[key].title}
        onPress={this.onProductPress}
        currencySymbol={this.props.currencySymbol}
        currencyRate={this.props.currencyRate}
      />
    ));
  }

  render() {
    const theme = this.context;
    console.log("this.props.brand_block:",this.props.brand_block);
    if (this.props.errorMessage) {
      return (
        <View style={styles.errorContainer}>
          <Text>{this.props.errorMessage}</Text>
        </View>
      );
    }

    return (
     
      <ScrollView
        style={styles.container(theme)}
        contentContainerStyle={styles.Contentcontainer(theme)}
        refreshControl={(
          <RefreshControl
            refreshing={this.props.refreshing}
            onRefresh={this.onRefresh}
          />
          )}
      >
      
         <StatusBar
                  translucent
                  backgroundColor="#F5F5F5"
                  barStyle="dark-content"
                />
        <HomeSlider slider={this.props.slider} />


        <SmallOffers slider={this.props.extra_info_block1} />

       


        {/* <View  style={[CommonStyle.marginTop20]} />
        <View  style={[CommonStyle.marginTop20]} /> */}
        <Categories slider={this.props.category_block_1.items} />

        <SmallOffers slider={this.props.new_arrivals} />
       
        <Banners slider={this.props.category_block_2} />
        
        {/* <Discounts slider={this.props.category_block_1.items} /> */}

        {this.renderFeatured()}
        {this.renderFeature()}
        <View  style={[CommonStyle.marginTop20]} />
        {/* <SmallOffers slider={this.props.extra_info_block1} /> */}
        <SmallOffers slider={this.props.toys} />
        <View  style={[CommonStyle.marginTop10]} />
        <BrandsSlider slider={this.props.brand_block} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    paddingBottom:H(10),
    backgroundColor: theme.colors.background,
  }),
  Contentcontainer: theme => ({
    paddingBottom:H(10),
  }),
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight:{
    flexDirection:'row',
    alignItems:'center'
  },
  Logo:{height:H(45),width:W(200)}
});

HomeScreen.propTypes = {
  slider: PropTypes.array,
  category_block_1:PropTypes.array,
  extra_info_block1:PropTypes.array,
  promotional_block1:PropTypes.array,
  new_arrivals:PropTypes.array,
  toys:PropTypes.array,
  category_block_2:PropTypes.array,
  brand_block: PropTypes.array,
  getHomeData: PropTypes.func,
  navigation: PropTypes.object,
  featuredProducts: PropTypes.object,
  featuredCategories: PropTypes.object,
  officeProducts:PropTypes.object,
  officeEssentials:PropTypes.object,
  setCurrentProduct: PropTypes.func,
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  refreshing: PropTypes.bool,
};

HomeScreen.defaultProps = {
  slider: [],
  category_block_1:[],
  extra_info_block1:[],
  new_arrivals:[],
  toys:[],
  promotional_block1:[],
  category_block_2:[],
  brand_block:[]
};


const mapStateToProps = (state) => {
  const { refreshing } = state.home;
  const {
    errorMessage,
    currency: {
      displayCurrencySymbol: currencySymbol,
      displayCurrencyExchangeRate: currencyRate,
    },
  } = state.magento;
  return {
    ...state.home,
    refreshing,
    errorMessage,
    currencySymbol,
    currencyRate,
  };
};

export default connect(mapStateToProps, { getHomeData, setCurrentProduct })(HomeScreen);
