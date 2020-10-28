/**
 * Created by Dima Portenko on 14.05.2020
 */
import React, { useContext, useState, useEffect } from 'react';
import { ScrollView,StatusBar,TouchableOpacity, StyleSheet, View,Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import HTML from 'react-native-render-html';
import { Button, Input, Price, Spinner, Text } from '../common';
import { translate } from '../../i18n';
import { ThemeContext } from '../../theme';
import {
  getConfigurableProductOptions,
  getCustomOptions,
  updateProductQtyInput,
  getproductIsInStock
} from '../../actions';
import { ProductMediaContainer } from './ProductMediaContainer';
import { finalPrice } from '../../helper/price';
import { ProductOptions } from './ProductOptions';
import { ProductCustomOptions } from './ProductCustomOptions';
import { useAddToCart } from '../../hooks/useAddToCart';
import { useProductDescription } from '../../hooks/useProductDescription';
import { RelatedProducts } from './RelatedProducts';
import { ProductReviews } from './reviews/ProductReviews';
import { ReviewFormContainer } from './reviews/ReviewFormContainer';
import { magentoOptions } from '../../config/magento';

import CommonStyle from './../../utils/CommonStyle'
import GlobalStyle,{W,H} from './../../utils/GlobalStyles'

export const ProductScreen = props => {
  const { cart, currencyRate, currencySymbol, customer, current } = useSelector(
    state => mapStateToProps(state),
  );


 
  ProductScreen['navigationOptions'] = screenProps => ({
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {props.navigation.goBack() }}
        >
        <Image style={[CommonStyle.Icon25,CommonStyle.marginLR20]} source={require("./.././../../resources/icons/back.png")} />
        </TouchableOpacity>
    ),
    headerBackTitle: ' ',
    headerStyle: {
      backgroundColor:GlobalStyle.colorSet.white,
      height: 50,
      elevation: 0,
      borderBottomColor:'transparent',
    }
});
  console.log("current:",current);
  const dispatch = useDispatch();
  const params = props.navigation?.state?.params
    ? props.navigation?.state?.params
    : {};
  const theme = useContext(ThemeContext);
  const [product] = useState(params.product);
  const [qty,setQty] = useState(1);
  const [currentProduct, setCurProduct] = useState(current[product.id]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { onPressAddToCart } = useAddToCart({
    product,
    cart,
    customer,
    currentProduct,
  });
  const { description } = useProductDescription({ product });
  console.log("product:",product);
  useEffect(() => {
    if (product.type_id === 'configurable') {
      dispatch(getConfigurableProductOptions(product.sku, product.id));
    }
    dispatch(
      getCustomOptions(product.sku, product.id),
      dispatch(getproductIsInStock(product.sku))
)}, []); // eslint-disable-line

  useEffect(() => {
    setCurProduct(current[product.id]);
  }, [current, product.id]);

  const renderPrice = () => {
    if (selectedProduct) {
      return (
        <Price
          style={styles.priceContainer}
          basePrice={selectedProduct.price}
          currencySymbol={currencySymbol}
          currencyRate={currencyRate}
        />
      );
    }
    return (
      <Price
        style={styles.priceContainer}
        basePrice={product.price}
        discountPrice={finalPrice(product.custom_attributes, product.price)}
        currencySymbol={currencySymbol}
        currencyRate={currencyRate}
      />
    );
  };

  const renderAddToCartButton = () => {
    if (cart.addToCartLoading) {
      return <Spinner />;
    }
    return (
      <Button style={styles.buttonStyle(theme)} disabled={!currentProduct.stocks} onPress={onPressAddToCart}>
        {translate('product.addToCartButton')}
      </Button>
    );
  };

  const onIncrement = () => {
    let q = qty+1;
    if(q>10){
      alert("Maximum 10 Items can be purchased at a same time.");
    }
    else {
      setQty(q);
      dispatch(updateProductQtyInput(q, product.id));
    }
    
  }
  const onDecrement = () => {
    let q = qty-1;
    if(qty>1){
      setQty(q);
      dispatch(updateProductQtyInput(q, product.id));
    }
   
  }

  return (
    <ScrollView style={styles.container(theme)}>
       <StatusBar
                  translucent
                  backgroundColor="transparent"
                  barStyle="dark-content"
                />
      <ProductMediaContainer
        product={product}
        selectedProductSku={selectedProduct?.sku}
      />
      <Text type="heading" bold style={styles.textStyle(theme)}>
        {product.name}
      </Text>
      
     
      <View style={styles.qtyAddCartContanier}>
            
              <View style={[styles.QuantitySubMainContainer]}>
                <TouchableOpacity
                  onPress={onIncrement}
                  style={[styles.minusButtonContainer]}>
                  <Image
                    resizeMode={'contain'}
                    style={styles.minusButtonImage}
                    source={require('./../../../resources/icons/plus.png')}
                  />
                </TouchableOpacity>

                <View style={styles.productQuantityContainer}>
                  <Text style={styles.productQuantityText}>
                  {`${currentProduct.qtyInput}`}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={onDecrement}
                  style={[styles.plusButtonContainer]}>
                  <Image
                    resizeMode={'contain'}
                    style={styles.plusButtonImage}
                    source={require('./../../../resources/icons/minus.png')}
                  />
                </TouchableOpacity>
              </View>
      
    

     
     
      <View style={[CommonStyle.marginLR20,CommonStyle.alignContentLR,CommonStyle.FlexRow]}>
       
        {(!currentProduct.stocks)?
          <View>
               <Text>{'Out of stock !'}</Text>
          </View>: renderPrice()
        }
        
      </View>
      
      
      </View>
      <View style={styles.stockcontainer}>

     
      </View>
      <View style={[CommonStyle.FlexRow,CommonStyle.marginLR20,CommonStyle.alignContentLR,CommonStyle.FlexWrap]}>
      <ProductOptions
        product={product}
        currentProduct={currentProduct}
        setSelectedProduct={setSelectedProduct}
      />
      </View>
      {renderAddToCartButton()}

     

     
      <ProductCustomOptions product={product} currentProduct={currentProduct} />
     
      <Text style={styles.errorStyle(theme)}>{cart.errorMessage}</Text>
      <View style={[CommonStyle.marginLR20]}>
      {description !== '' ? (
        <View style={styles.descriptionStyle}>
          <Text bold type="subheading" style={styles.productDetailTitle}>
            {translate('product.productDetailLabel')}
          </Text>
          <HTML html={description} />
        </View>
      ) : (
        <Text style={styles.descriptionStyle}>
          {translate('product.noProductDetail')}
        </Text>
      )}
      {magentoOptions.reviewEnabled && (
        <>
          <ProductReviews product={product} />
          <ReviewFormContainer product={product} />
        </>
      )}
      </View>
      
      <RelatedProducts
        product={product}
        currencyRate={currencyRate}
        currencySymbol={currencySymbol}
        navigation={props.navigation}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: GlobalStyle.colorSet.white,
  }),
  textStyle: theme => ({
    color:theme.colors.black,
    padding: theme.spacing.small,
    textAlign: 'center',
  }),
  qtyAddCartContanier:{
    paddingHorizontal:20,
    marginTop:30,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  qtyContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  inputContainer: theme => ({
    width: 60,
    alignSelf: 'center',
    // marginBottom: theme.spacing.extraLarge,
  }),
  buttonStyle: theme => ({
    alignSelf: 'center',
    marginTop: 20,
    width: theme.dimens.WINDOW_WIDTH * 0.9,
  }),
  modalStyle: theme => ({
    alignSelf: 'center',
    width: theme.dimens.WINDOW_WIDTH * 0.9,
    marginBottom: theme.spacing.large,
  }),
 
  descriptionTitleStyle: theme => ({
    color:theme.colors.black,
    fontSize:16,
    marginTop:30,
  }),
  descriptionStyle: theme => ({
    marginHorizontal:20,
    padding: theme.spacing.large,
    lineHeight: 25,
  }),
  productDetailTitle: {
    marginBottom: 4,
  },
  errorStyle: theme => ({
    textAlign: 'center',
    padding: theme.spacing.small,
    color: theme.colors.error,
  }),
  priceContainer: {
    alignSelf: 'center',
  },
  stockcontainer:{
    flexDirection:'row',
    justifyContent:'center'
  },
  PriceQuantityConatiner: {
    marginLeft: W(20),
    marginRight: W(20),
    height: H(42),
    borderTopWidth: 1,
    borderTopColor: GlobalStyle.colorSet.BorderGrey,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyle.colorSet.BorderGrey,
  },
  QuantityConatiner: {
    width: W(180),
    height: H(42),
    // borderWidth: 1,
    // borderColor: GlobalStyle.colorSet.black,
  },
  QuantitySubMainContainer: {
    borderWidth: 0,
    height: H(42),
    flexDirection:'row',
    borderWidth:1,
    borderColor:GlobalStyle.colorSet.BorderGrey,
    borderRadius:H(7),
    backgroundColor:GlobalStyle.colorSet.white
  },
  FavourateButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: W(10),
    marginLeft: W(10),
    marginRight: W(10)
  },

  plusButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: W(10),
    paddingRight: W(10)
  },
  plusButtonImage: {
    height: H(22),
    width: H(22),
  },
  productQuantityContainer: {
    width: W(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  productQuantityText: {
    fontSize: W(16),
    fontFamily: GlobalStyle.fontSet.SemiBold,
    color: GlobalStyle.colorSet.bgBlack,
  },
  minusButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: W(10),
    paddingRight: W(10)
  },
  minusButtonImage: {
    height: H(22),
    width: H(22),
  },


});

const mapStateToProps = state => {
  const {
    currency: {
      displayCurrencySymbol: currencySymbol,
      displayCurrencyExchangeRate: currencyRate,
    },
  } = state.magento;

  const { cart, account } = state;

  return {
    cart,
    currencyRate,
    currencySymbol,
    customer: account.customer,
    current: state.product.current,
  };
};