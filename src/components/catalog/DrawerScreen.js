import React, { Component, useContext, useState,useEffect } from 'react';
import { connect,useSelector } from 'react-redux';
import {
  View,
  FlatList,
  TouchableOpacity,Image,
  StyleSheet,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import {
  getProductsForCategoryOrChild, addFilterData, getSearchProducts,setAppliedFilters
} from '../../actions';
import { Button, Input } from '../common';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import CommonStyle from './../../utils/CommonStyle'
import GlobalStyle,{W,H,StatusbarHeight,WINDOW_HEIGHT} from './../../utils/GlobalStyles'

import FiltersList from './FiltersList'
import { cos } from 'react-native-reanimated';

const DrawerScreen = (props) => {
  const [maxValue, setMaxValue] = useState('');
  const [minValue, setMinValue] = useState('');

  const [selectedFiltersparams, setSelectedFiltersparams] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  
  const theme = useContext(ThemeContext);


const filterOptions = useSelector((state) => state.category.filterOptions);

console.log("filterOptions:",filterOptions);

useEffect(() => {
 
}, [filterOptions])


  const onApplyPressed = () => {
    const { currencyRate } = props;
    const priceFilter = {
      price: {
        condition: 'from,to',
        value: `${(minValue / currencyRate).toFixed(3)},${(maxValue / currencyRate).toFixed(3)}`,
      },
      price: {
        condition: 'from,to',
        value: `${(minValue / currencyRate).toFixed(3)},${(maxValue / currencyRate).toFixed(3)}`,
      },
    };
    props.addFilterData(priceFilter);
    if (props.filters.categoryScreen) {
      props.getProductsForCategoryOrChild(props.category, null, props.filters.sortOrder, priceFilter);
      props.addFilterData({ categoryScreen: false });
    } else {
      props.getSearchProducts(props.searchInput, null, props.filters.sortOrder, priceFilter);
    }
    props.navigation.goBack();
  };

  const getSelectedFilters = (params) => {
    // console.log("drawer params:",params);
    setSelectedFiltersparams(params);
    let temp_selected_filters =[];
    params.map((item) =>{
      temp_selected_filters.push({
        field:item.code,value:item.value,condition_type:'eq'
      })
      
    })
    console.log("drawer params:temp_selected_filters:",temp_selected_filters);
    setSelectedFilters(temp_selected_filters);
  }

  const onFilterPressed = (params) => {
   
    const Filter = [
      {field:'ink_type',value:'5746',condition_type:'eq'},
      {field:'brand',value:'5478',condition_type:'eq'}
    ]


    // const Filter = {
    //   ink_type:{
    //       condition_type:'eq',
    //       value:'5746'
    //     },
    //   category:{
    //       condition_type:'eq',
    //       value:'28'
    //     }
    //   }
    
    console.log("drawer params:selectedFilters:",selectedFilters);

    // const filterParams = params;
    props.setAppliedFilters(selectedFiltersparams);
    props.addFilterData(selectedFilters);
    if (props.filters.categoryScreen) {
      props.getProductsForCategoryOrChild(props.category, null, props.filters.sortOrder, selectedFilters);
     
      props.addFilterData({ categoryScreen: false });
    } else {
      props.getSearchProducts(props.searchInput, null, props.filters.sortOrder, selectedFilters);
    }
    props.navigation.goBack();
  };

  const {
    container,
    InputContainer,
    textStyle,
    minInputStyle,
    maxInputStyle,
    dashTextStyle,
  } = styles;

  return (
    <View style={container(theme)}>
{/*      
      <View style={InputContainer(theme)}>
        <Text type="heading" style={textStyle(theme)}>Price:</Text>
        <Input
          containerStyle={[minInputStyle,CommonStyle.borderBottomGrey]}
          placeholder={translate('common.min')}
          value={minValue}
          keyboardType="number-pad"
          onChangeText={minValue => setMinValue(minValue)}
        />
        <Text style={dashTextStyle(theme)}>-</Text>
        <Input
          containerStyle={[minInputStyle,CommonStyle.borderBottomGrey]}
          value={maxValue}
          placeholder={translate('common.max')}
          keyboardType="number-pad"
          onChangeText={maxValue => setMaxValue(maxValue)}
        />
      </View>
      <View style={styles.buttonStyleWrap}>
        <TouchableOpacity onPress={onApplyPressed} style={CommonStyle.BottomPrimaryColorSaveBtnSection}>
         <Text style={[CommonStyle.mWhitleSemiBold]}>{translate('common.apply')}</Text> 
        </TouchableOpacity>
      </View>
    */}

   

    <FiltersList 
    data ={filterOptions}
    getSelectedFilters={getSelectedFilters}
     />
 <View style={[styles.buttonStyleWrap]}>
        <TouchableOpacity onPress={onFilterPressed} style={CommonStyle.BottomPrimaryColorSaveBtnSection}>
         <Text style={[CommonStyle.mWhitleSemiBold]}>{translate('common.apply')}</Text> 
        </TouchableOpacity>
      </View>


    </View>
  );
};


DrawerScreen['navigationOptions'] = screenProps => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {screenProps.navigation.goBack() }}
      >
      <Image style={[CommonStyle.Icon25,CommonStyle.marginTB10,CommonStyle.marginLR20]} source={require("./.././../../resources/icons/back.png")} />
      </TouchableOpacity>
  ),
  title:"Filter" ,
  // headerRight: () => (
  //   <View style={[styles.headerRight]}>
  //   <TouchableOpacity
  //     style={[CommonStyle.paddingLR10]}
  //     // onPress={() => {screenProps.navigation.navigate(NAVIGATION_SEARCH_SCREEN_PATH) }}
  //     >
  //     <Text style={[CommonStyle.mPrimarySemiBold]}>Clear</Text>
  //   </TouchableOpacity>
  //   </View>
  // ),
  headerStyle: {
    backgroundColor:'white',
    marginTop:Platform.OS === 'ios' ? (WINDOW_HEIGHT>812)?H(0):0 : H(StatusbarHeight),
    height: H(40),
    elevation: 0,
     borderWidth:0,
  //  borderBottomColor:'transparent',
  },
});

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: theme.colors.background,
  }),
  InputContainer: theme => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.large,
  }),
  minInputStyle: {
    width: W(100),
  },
  maxInputStyle: {
    width: W(100),
  },
  textStyle: theme => ({
    paddingLeft: 50,
    paddingRight: theme.spacing.large,
  }),
  dashTextStyle: theme => ({
    paddingHorizontal: theme.spacing.large,
  }),
  buttonStyle: {
    width: '90%',

    backgroundColor:GlobalStyle.colorSet.btnPrimary
  },
  buttonStyleWrap: {
    height:H(70),
    backgroundColor:GlobalStyle.colorSet.white,
    width:'100%',
    alignItems:'center',
    justifyContent: 'flex-end',
  },
  headerRight:{
    marginRight:W(20),
    flexDirection:'row',
    alignItems:'center'
  },
});

DrawerScreen.propTypes = {
  currencyRate: PropTypes.number,
};

DrawerScreen.defaultProps = {
  currencyRate: 1,
};

const mapStateToProps = ({ category, filters, search, magento }) => {
  const currentCategory = category.current.category;
  const { searchInput } = search;
  const { currency: { displayCurrencyExchangeRate: currencyRate } } = magento;
  return {
    filters,
    searchInput,
    currencyRate,
    category: currentCategory,
  };
};

export default connect(mapStateToProps, {
  getProductsForCategoryOrChild, addFilterData, getSearchProducts,setAppliedFilters
})(DrawerScreen);
