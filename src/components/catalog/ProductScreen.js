/**
 * Created by Dima Portenko on 14.05.2020
 */
import React, { useContext, useState, useEffect } from 'react';
import { ScrollView,Share,StatusBar,Platform,TouchableOpacity,Text, StyleSheet, View,Image,useWindowDimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import HTML from 'react-native-render-html';
import { Button, Input, Price, Spinner } from '../common';
import { translate } from '../../i18n';
import { ThemeContext } from '../../theme';
import {
  getConfigurableProductOptions,
  getCustomOptions,
  updateProductQtyInput,
  getproductIsInStock,
  toggleWishList,
  getProductRewards,
  
} from '../../actions';
import { ProductMediaContainer } from './ProductMediaContainer';
import { finalPrice } from '../../helper/price';
import { ProductOptions } from './ProductOptions';
import { ProductCustomOptions } from './ProductCustomOptions';
import { useAddToCart } from '../../hooks/useAddToCart';
import { useProductDescription } from '../../hooks/useProductDescription';
import { getProductCustomAttributeValue } from '../../helper/product';
import { RelatedProducts } from './RelatedProducts';
import { OthersProducts } from './OthersProducts';
import { ProductReviews } from './reviews/ProductReviews';
import { ReviewFormContainer } from './reviews/ReviewFormContainer';
import { magentoOptions } from '../../config/magento';
import CartBadge from '../../components/cart/CartBadge';
import CommonStyle from './../../utils/CommonStyle'
import GlobalStyle,{W,H,StatusbarHeight,WINDOW_HEIGHT,WINDOW_WIDTH} from './../../utils/GlobalStyles'
import {NAVIGATION_SEARCH_SCREEN_PATH} from '../../navigation/routes'

export const ProductScreen = props => {
  const { cart, currencyRate, currencySymbol, customer, current } = useSelector(
    state => mapStateToProps(state),
  );

  const contentWidth = useWindowDimensions().width;
  const computeEmbeddedMaxWidth = (availableWidth) => {
    return Math.min(availableWidth, W(250));
  };


  const dispatch = useDispatch();
  const params = props.navigation?.state?.params
    ? props.navigation?.state?.params
    : {};
  const theme = useContext(ThemeContext);
  const [product] = useState(params.product);
  const [qty,setQty] = useState(1);
  const [currentProduct, setCurProduct] = useState(current[product.id]);

  const isInStock =  getProductCustomAttributeValue(currentProduct.product,'quantity_status');
  console.log("currentProduct:isInStock:",isInStock);
  console.log("currentProduct:",currentProduct);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { onPressAddToCart } = useAddToCart({
    product,
    cart,
    customer,
    currentProduct,
  });
  const { description } = useProductDescription({ product });


  console.log('FROM_DETAIL_PAGE',current);

  useEffect(() => {
    if (product.type_id === 'configurable') {
      console.log("product:before:",product);
      dispatch(getConfigurableProductOptions(product.sku, product.id));
    }
    dispatch(
      getProductRewards(customer!=null?customer.id:0,product.id),
      dispatch(getproductIsInStock(product.sku)),
      getCustomOptions(product.sku, product.id),
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
      <View style={[styles.addTocartSection]}>
       <Button style={[styles.buttonStyle]} disabled={isInStock=='0'} onPress={onPressAddToCart}>
        {translate('product.addToCartButton')}
      </Button>
      </View>
    );
  };

  const onToggleWishlist = () =>{
    if(customer!=null){
      dispatch(toggleWishList(product.id));
    }
    else {
      alert("Login is required to add item in wishlist");
    }
   
  }

  const renderAddWishlistButton = () => {
 //   const source = require('./../../../resources/icons/wishlistAdded.png');
  if(currentProduct.item_added_in_wishlist){
    return(
    <TouchableOpacity
      // onPress={current.item_added_in_wishlist?' ': onToggleWishlist}
       style={[styles.wishlistContainer]}>
       <Image
         resizeMode={'contain'}
         style={styles.minusButtonImage}
         source={require('./../../../resources/icons/wishlistAdded.png')}
       />
    </TouchableOpacity>

    )}
    else{
      return(
        <TouchableOpacity
        onPress={onToggleWishlist}
         style={[styles.shareContainer]}>
         <Image
           resizeMode={'contain'}
           style={styles.minusButtonImage}
          
           source={require('./../../../resources/icons/wishlist.png')}
         />
      </TouchableOpacity>
      )
    }
  }
  

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

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'istationery | https://www.istationery.com',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container(theme)}>
    <ScrollView >
       <StatusBar
                  translucent
                  backgroundColor="#F5F5F5"
                  barStyle="dark-content"
                />
      <ProductMediaContainer
        product={product}
        selectedProductSku={selectedProduct?.sku}
      />
      {/* <Text type="heading" bold style={styles.textStyle(theme)}>
        {product.name}
      </Text> */}
      
     
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

            <View style={[CommonStyle.FlexRow,CommonStyle.width30p,CommonStyle.alignContentLR]}>
            {renderAddWishlistButton()}

              <TouchableOpacity
                onPress={onShare}
                  style={[styles.shareContainer]}>
                  <Image
                    resizeMode={'contain'}
                    style={styles.minusButtonImage}
                    source={require('./../../../resources/icons/sharing.png')}
                  />
              </TouchableOpacity>


            </View>
      
             

     
      
      
      
      </View>

        <View style={[CommonStyle.FlexWrap,CommonStyle.marginLR20,CommonStyle.marginTop30]}> 
            <Text style={[CommonStyle.lBlackSemiBold]} numberOfLines={2}>
                      { props.navigation?.state?.params.title}
                </Text>
        </View>

      <View style={[CommonStyle.marginLR20,CommonStyle.marginTop10,CommonStyle.marginBottom20,CommonStyle.alignContentLR,CommonStyle.FlexRow]}>
        {(isInStock=='0')?
          <View>
               <Text style={[CommonStyle.mRedRegular]}>{'Out of stock !'}</Text>
          </View>: renderPrice()
        }
        
      </View>
        {
          (current.rewards_loading)?<Spinner /> :<View>
        {current.rewards_data && current.rewards_data.visible && 
            <View style={[styles.rewardsContainer,CommonStyle.marginLR20]}>
                <Text style={[CommonStyle.sBlackRegular]}> {'You can earn '}</Text>
                <Text style={[CommonStyle.sPrimarySemiBold]} > {current.rewards_data.caption_text}{''}</Text>
                <Text style={[CommonStyle.sBlackRegular]}> {' with this purchase!'}</Text>
            </View>
        }
      </View>
        }
      <View>

      </View>
     
      
      <View style={[CommonStyle.FlexRow,CommonStyle.marginLR20,CommonStyle.alignContentLR,CommonStyle.FlexWrap]}>
        {
          (Object.keys(currentProduct.attributes).length === 0)?
      <View style={[{width:WINDOW_WIDTH-W(40)},CommonStyle.HorizontalCenter,CommonStyle.paddingTB20]}>
        {current.attribute_loading && <Spinner />}
      </View>:
      <ProductOptions
        product={product}
        currentProduct={currentProduct}
        setSelectedProduct={setSelectedProduct}
      />
        }
      </View>
     

     

     
      <ProductCustomOptions product={product} currentProduct={currentProduct} />
     
      <Text style={styles.errorStyle(theme)}>{cart.errorMessage}</Text>
      <View style={[CommonStyle.marginLR20]}>
      {description !== '' ? (
        <View style={[styles.descriptionStyle]}>
          <Text style={[CommonStyle.mBlackSemiBold,CommonStyle.marginBottom15]}>
            {translate('product.productDetailLabel')}
          </Text>
          <HTML 
          contentWidth={contentWidth}
          computeEmbeddedMaxWidth={computeEmbeddedMaxWidth}
          source={{html:description}} 
          enableExperimentalPercentWidth={true}
          tagsStyles= {{ p: {marginBottom:H(20) },
          img: {marginTop:H(30)} }}
           />
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

      <OthersProducts
        product={product}
        currencyRate={currencyRate}
        currencySymbol={currencySymbol}
        navigation={props.navigation}
      />

    
   
    </ScrollView>
    {renderAddToCartButton()}
    </View>
  );

  
};

ProductScreen['navigationOptions'] = screenProps => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {screenProps.navigation.goBack() }}
      >
      <Image style={[CommonStyle.Icon25,CommonStyle.marginTB10,CommonStyle.marginLR20]} source={require("./.././../../resources/icons/back.png")} />
      </TouchableOpacity>
  ),
   headerTitle: () => <View style={[CommonStyle.headerTitle]}>
     <Text style={[CommonStyle.lBlackSemiBold]} numberOfLines={1}>
        {'Product Detail'}
     </Text>
   </View>,
  // title:screenProps.navigation?.state?.params.title ,
  headerRight: () => (
    <View style={[styles.headerRight]}>
    <TouchableOpacity
      style={[CommonStyle.paddingLR10]}
      onPress={() => {screenProps.navigation.navigate(NAVIGATION_SEARCH_SCREEN_PATH) }}
      >
      <View style={[CommonStyle.marginTop5]}><Image style={CommonStyle.Icon25} source={require('../../../resources/icons/Search.png')} resizeMode='contain'/></View>
    </TouchableOpacity>
    <TouchableOpacity
      style={[CommonStyle.paddingLR10]}
      onPress={() => {screenProps.navigation.navigate('Cart') }}
      >

      <CartBadge color={GlobalStyle.colorSet.btnPrimary} />
    </TouchableOpacity>
    </View>
  ),
  headerStyle: {
    backgroundColor:GlobalStyle.colorSet.white,
    marginTop:Platform.OS === 'ios' ? 0 : (WINDOW_HEIGHT>770)? H(27) : H(StatusbarHeight),
    // height: H(40),
    height: H(60),
    elevation: 0,
     borderWidth:0,
   borderBottomColor:'transparent',
  }
});

const styles = StyleSheet.create({
  container: theme => ({
    // flex: 1,
    backgroundColor: GlobalStyle.colorSet.white,
    paddingBottom:H(50)
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
  rewardsContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    height:H(37),
    borderRadius:H(5),
    marginHorizontal:W(20),
    backgroundColor:GlobalStyle.colorSet.backagroundOrange
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
  buttonStyle: {
    width:"90%",
    alignSelf: 'center',
    backgroundColor:GlobalStyle.colorSet.btnPrimary,
  },
  addTocartSection:{
    height:H(60),
    paddingBottom:H(10),
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    backgroundColor:GlobalStyle.colorSet.white,
    bottom:H(0),
    width:"100%"
  },
  modalStyle: theme => ({
    alignSelf: 'center',
    width: theme.dimens.WINDOW_WIDTH * 0.9,
    marginBottom: theme.spacing.large,
  }),
 
  descriptionTitleStyle: theme => ({
    color:theme.colors.black,
    fontSize:16,
    // marginTop:30,
  }),
  descriptionStyle: theme => ({
    marginHorizontal:W(20),
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
shareContainer:{
    padding:H(6),
    borderWidth:1,
    borderColor:GlobalStyle.colorSet.BorderGrey,
    borderRadius:H(7),
    backgroundColor:GlobalStyle.colorSet.white
},
wishlistContainer:{
  padding:H(6),
  borderWidth:1,
  borderColor:GlobalStyle.colorSet.BorderGrey,
  borderRadius:H(7),
  backgroundColor:GlobalStyle.colorSet.white,
  marginRight:W(10)
},
headerRight:{
  flexDirection:'row',
  alignItems:'center'
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