import React, { Component, useContext, useState } from 'react';
import { connect } from 'react-redux';
import {
  View,
  FlatList,
  TouchableOpacity,Image,
  StyleSheet,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import {
  getProductsForCategoryOrChild, addFilterData, getSearchProducts,
} from '../../actions';
import { Button, Input } from '../common';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import CommonStyle from './../../utils/CommonStyle'
import GlobalStyle,{W,H,StatusbarHeight,WINDOW_HEIGHT} from './../../utils/GlobalStyles'



const DrawerScreen = (props) => {
  const [maxValue, setMaxValue] = useState('');
  const [minValue, setMinValue] = useState('');
  const theme = useContext(ThemeContext);

  const onApplyPressed = () => {
    const { currencyRate } = props;
    const priceFilter = {
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
    flex: 1,
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
  getProductsForCategoryOrChild, addFilterData, getSearchProducts,
})(DrawerScreen);
