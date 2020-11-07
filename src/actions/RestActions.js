import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import { magento } from '../magento';
import { magentoOptions } from '../config/magento';
import {
  MAGENTO_INIT,
  MAGENTO_INIT_ERROR,
  MAGENTO_GET_CATEGORY_TREE,
  MAGENTO_CURRENT_CATEGORY,
  MAGENTO_GET_CATEGORY_PRODUCTS,
  MAGENTO_UPDATE_CONF_PRODUCT,
  MAGENTO_GET_CONF_OPTIONS,
  MAGENTO_LOAD_MORE_CATEGORY_PRODUCTS,
  MAGENTO_RESET_CATEGORY_PRODUCTS,
  MAGENTO_PRODUCT_ATTRIBUTE_OPTIONS,
  MAGENTO_CURRENT_PRODUCT,
  MAGENTO_GET_PRODUCT_MEDIA,
  MAGENTO_CREATE_CART,
  MAGENTO_ADD_TO_CART_LOADING,
  MAGENTO_ADD_CART_BILLING_ADDRESS,
  MAGENTO_GET_CART_SHIPPING_METHODS,
  MAGENTO_GET_CART_PAYMENT_METHODS,
  MAGENTO_PLACE_GUEST_CART_ORDER,
  MAGENTO_ADD_SHIPPING_TO_CART,
  MAGENTO_ADD_TO_CART,
  MAGENTO_GET_CART,
  MAGENTO_CART_ITEM_PRODUCT,
  MAGENTO_GET_COUNTRIES,
  MAGENTO_GET_CURRENCY,
  MAGENTO_CREATE_CUSTOMER,
  UI_CHECKOUT_ACTIVE_SECTION,
  UI_CHECKOUT_CUSTOMER_NEXT_LOADING,
  HOME_SCREEN_DATA,
  MAGENTO_GET_FEATURED_PRODUCTS,
  MAGENTO_UPDATE_FEATURED_CONF_PRODUCT,
  MAGENTO_REMOVE_FROM_CART,
  MAGENTO_REMOVE_FROM_CART_LOADING,
  MAGENTO_GET_SEARCH_PRODUCTS,
  MAGENTO_UPDATE_SEARCH_CONF_PRODUCT,
  MAGENTO_LOAD_MORE_SEARCH_PRODUCTS,
  MAGENTO_RESET_SEARCH_PRODUCTS,
  MAGENTO_STORE_CONFIG,
  MAGENTO_GET_ORDERS,
  MAGENTO_ORDER_PRODUCT_DETAIL,
  MAGENTO_UPDATE_CATEGORY_PRODUCTS,
  MAGENTO_UPDATE_REFRESHING_CATEGORY_PRODUCTS,
  MAGENTO_UPDATE_REFRESHING_HOME_DATA,
  MAGENTO_UPDATE_REFRESHING_CATEGORY_TREE,
  MAGENTO_UPDATE_REFRESHING_CART_ITEM_PRODUCT,
  MAGENTO_ADD_ACCOUNT_ADDRESS,
  RESET_ACCOUNT_ADDRESS_UI,
  MAGENTO_ERROR_MESSAGE_CART_ORDER,
  MAGENTO_GET_FILTERED_PRODUCTS,
  MAGENTO_UPDATE_REFRESHING_ORDERS_DATA,
  ADD_FILTER_DATA,
  RESET_FILTERS_DATA,
  MAGENTO_ADD_ACCOUNT_ADDRESS_ERROR,
  MAGENTO_GET_CUSTOM_OPTIONS,
  MAGENTO_PRODUCT_STOCK_CHECK,
  MAGENTO_ADD_WISHLIST,
  MAGENTO_GET_ADDRESS_LIST,
  MAGENTO_GET_ADDRESS_LIST_LOADING,
  MAGENTO_WISHLIST_DELETE_ITEMS,
  MAGENTO_WISHLIST_GET_LOADING,
  MAGENTO_WISHLIST_ITEMS,
  MAGENTO_GET_ADDRESS_LIST_ERROR,
  MAGENTO_WISHLIST_TOTAL_ITEMS,
  MAGENTO_ADD_ADDRESS_ERROR,
  MAGENTO_ADD_ADDRESS_SUCCESS
} from './types';
import { logError } from '../helper/logger';
import { priceSignByCode } from '../helper/price';
import { checkoutSetActiveSection } from './UIActions';

export const initMagento = () => {
  magento.setOptions(magentoOptions);

  return async (dispatch) => {
    try {
      magento.init();
      dispatch({ type: MAGENTO_INIT, payload: magento });
      const storeConfig = await magento.admin.getStoreConfig();
      dispatch({ type: MAGENTO_STORE_CONFIG, payload: storeConfig });
      const customerToken = await AsyncStorage.getItem('customerToken');
      magento.setCustomerToken(customerToken);
      getCurrency(dispatch);
    } catch (error) {
      logError(error);
      dispatch({ type: MAGENTO_INIT_ERROR, payload: { errorMessage: error.message } });
    }
  };
};

const getCurrency = async (dispatch) => {
  try {
    const data = await magento.guest.getCurrency();
    const displayCurrency = await getCurrencyToBeDisplayed(data);
    dispatch({
      type: MAGENTO_GET_CURRENCY,
      payload: {
        displayCurrency,
        currencyData: data,
      },
    });
  } catch (error) {
    logError(error);
  }
};

async function getCurrencyToBeDisplayed(currencyData) {
  let code = currencyData.default_display_currency_code;
  let symbol = currencyData.default_display_currency_symbol || priceSignByCode(code);
  let rate = 1;

  if ('available_currency_codes' in currencyData && currencyData.available_currency_codes.length > 0) {
    const previousSelectedCurrencyCode = await AsyncStorage.getItem('currency_code');
    if (previousSelectedCurrencyCode && previousSelectedCurrencyCode !== code && currencyData.available_currency_codes.includes(previousSelectedCurrencyCode)) {
      code = previousSelectedCurrencyCode;
      symbol = priceSignByCode(code);
    }
    // TODO: If not and currency get from RNLocalize is supported, then set that and update AsyncStorage
  }

  const exchangeRate = currencyData.exchange_rates.find(_exchangeRate => _exchangeRate.currency_to === code);
  if (exchangeRate && 'rate' in exchangeRate) {
    rate = exchangeRate.rate;
  }

  return {
    code,
    symbol,
    rate,
  };
}

export const getHomeData = refreshing => async (dispatch) => {
  if (refreshing) {
    dispatch({ type: MAGENTO_UPDATE_REFRESHING_HOME_DATA, payload: true });
  }

  try {
    const storeConfig = await magento.admin.getStoreConfig();
    const config = storeConfig.find(conf => conf.code === magentoOptions.store);
    magento.setStoreConfig(config);

    const value = await magento.getHomeData();
    if (!value) {
      dispatch({ type: MAGENTO_UPDATE_REFRESHING_HOME_DATA, payload: false });
      return;
    }
    logError(value);
    const payload = JSON.parse(value.content.replace(/<\/?[^>]+(>|$)/g, ''));
    dispatch({ type: HOME_SCREEN_DATA, payload });
    dispatch({ type: MAGENTO_UPDATE_REFRESHING_HOME_DATA, payload: false });

    _.forEach(payload.featuredCategories, (details, categoryId) => getFeaturedCategoryProducts(categoryId, dispatch));
  } catch (e) {
    logError(e);
  }
};

const getFeaturedCategoryProducts = async (categoryId, dispatch) => {
  try {
    const products = await magento.admin.getProducts(categoryId);
    dispatch({
      type: MAGENTO_GET_FEATURED_PRODUCTS,
      payload: { categoryId, products },
    });
    updateConfigurableProductsPrices(
      products.items,
      dispatch,
      MAGENTO_UPDATE_FEATURED_CONF_PRODUCT,
    );
  } catch (e) {
    logError(e);
  }
};

export const getCategoryTree = refreshing => async (dispatch) => {
  if (refreshing) {
    dispatch({ type: MAGENTO_UPDATE_REFRESHING_CATEGORY_TREE, payload: true });
  }

  try {
    const data = await magento.admin.getCategoriesTree();
    dispatch({ type: MAGENTO_GET_CATEGORY_TREE, payload: data });
    dispatch({ type: MAGENTO_UPDATE_REFRESHING_CATEGORY_TREE, payload: false });
  } catch (error) {
    logError(error);
  }
};

export const resetAccountAddressUI = () => ({
  type: RESET_ACCOUNT_ADDRESS_UI,
});

export const getProductsForCategory = ({ id, offset }) => (dispatch) => {
  if (offset) {
    dispatch({ type: MAGENTO_LOAD_MORE_CATEGORY_PRODUCTS, payload: true });
  }
  magento.admin
    .getProducts(id, 10, offset)
    .then((payload) => {
      dispatch({ type: MAGENTO_GET_CATEGORY_PRODUCTS, payload });
      dispatch({ type: MAGENTO_LOAD_MORE_CATEGORY_PRODUCTS, payload: false });
      updateConfigurableProductsPrices(payload.items, dispatch);
    })
    .catch((error) => {
      logError(error);
    });
};

export const addFilterData = data => ({
  type: ADD_FILTER_DATA,
  payload: data,
});

export const resetFilters = () => ({
  type: RESET_FILTERS_DATA,
});

export const getProductsForCategoryOrChild = (category, offset, sortOrder, filter) => async (dispatch) => {
  if (offset) {
    dispatch({ type: MAGENTO_LOAD_MORE_CATEGORY_PRODUCTS, payload: true });
  }

  if (!offset && (typeof sortOrder === 'number' || typeof filter !== 'undefined')) {
    dispatch({ type: MAGENTO_RESET_CATEGORY_PRODUCTS });
  }

  try {
    const payload = await magento.admin
      .getSearchCreteriaForCategoryAndChild(category, 10, offset, sortOrder, filter);
    dispatch({ type: MAGENTO_GET_CATEGORY_PRODUCTS, payload });
    dispatch({ type: MAGENTO_LOAD_MORE_CATEGORY_PRODUCTS, payload: false });
    updateConfigurableProductsPrices(payload.items, dispatch);
  } catch (e) {
    logError(e);
  }
};

export const updateProductsForCategoryOrChild = (category, refreshing) => async (dispatch) => {
  if (refreshing) {
    dispatch({ type: MAGENTO_UPDATE_REFRESHING_CATEGORY_PRODUCTS, payload: true });
  }

  try {
    const payload = await magento.admin
      .getSearchCreteriaForCategoryAndChild(category, 10);
    dispatch({ type: MAGENTO_UPDATE_CATEGORY_PRODUCTS, payload });
    dispatch({ type: MAGENTO_UPDATE_REFRESHING_CATEGORY_PRODUCTS, payload: false });
    updateConfigurableProductsPrices(payload.items, dispatch);
  } catch (e) {
    logError(e);
  }
};

export const getSearchProducts = (searchInput, offset, sortOrder, filter) => async (dispatch) => {
  if (offset) {
    dispatch({ type: MAGENTO_LOAD_MORE_SEARCH_PRODUCTS, payload: true });
  }

  if (!offset && (typeof sortOrder === 'number' || typeof filter !== 'undefined')) {
    dispatch({ type: MAGENTO_RESET_SEARCH_PRODUCTS });
  }

  try {
    const data = await magento.admin
      .getProductsWithAttribute('name', searchInput, 10, offset, sortOrder, filter);
    dispatch({ type: MAGENTO_GET_SEARCH_PRODUCTS, payload: { searchInput, data } });
    dispatch({ type: MAGENTO_LOAD_MORE_SEARCH_PRODUCTS, payload: false });
    updateConfigurableProductsPrices(
      data.items,
      dispatch,
      MAGENTO_UPDATE_SEARCH_CONF_PRODUCT,
    );
  } catch (e) {
    logError(e);
  }
};

export const getCustomOptions = (sku, id) => async (dispatch) => {
  try {
    const data = await magento.admin.getProductOptions(sku);
    dispatch({ type: MAGENTO_GET_CUSTOM_OPTIONS, payload: { data, id } });
  } catch (e) {
    logError(e);
  }
};

export const getConfigurableProductOptions = (sku, id) => (dispatch) => {
  magento.admin
    .getConfigurableProductOptions(sku)
    .then((data) => {
      dispatch({ type: MAGENTO_GET_CONF_OPTIONS, payload: { data, id } });
      data.forEach((option) => {
        magento.admin
          .getAttributeByCode(option.attribute_id)
          .then((attributeOptions) => {
            dispatch({
              type: MAGENTO_PRODUCT_ATTRIBUTE_OPTIONS,
              payload: {
                productId: id,
                attributeId: option.attribute_id,
                options: attributeOptions.options,
                attributeCode: attributeOptions.attribute_code,
              },
            });
          })
          .catch((error) => {
            logError(error);
          });
      });
    })
    .catch((error) => {
      logError(error);
    });
};

export const updateConfigurableProductsPrices = (products, dispatch, type) => {
  products.forEach((product) => {
    if (product.type_id === 'configurable') {
      updateConfigurableProductPrice(product, dispatch, type);
    }
  });
};

const updateConfigurableProductPrice = async (
  product,
  dispatch,
  type = MAGENTO_UPDATE_CONF_PRODUCT,
) => {
  const { sku, id } = product;
  try {
    const data = await magento.admin.getConfigurableChildren(sku);
    dispatch({ type, payload: { sku, children: data, id } });
  } catch (e) {
    logError(e);
  }
};

export const getProductMedia = ({ sku, id }) => (dispatch) => {
  magento.admin
    .getProductMedia(sku)
    .then((media) => {
      dispatch({ type: MAGENTO_GET_PRODUCT_MEDIA, payload: { sku, media, id } });
    })
    .catch((error) => {
      logError(error);
    });
};

export const setCurrentCategory = category => ({
  type: MAGENTO_CURRENT_CATEGORY,
  payload: category,
});

export const setCurrentProduct = product => ({
  type: MAGENTO_CURRENT_PRODUCT,
  payload: product,
});

export const createCustomerCart = customerId => async (dispatch) => {
  if (customerId) {
    try {
      const cartId = await magento.admin.getCart(customerId);
      dispatch({ type: MAGENTO_CREATE_CART, payload: cartId });
      dispatch(getCart());
    } catch (error) {
      logError(error);
    }
  }
};

export const getCart = (refreshing = false) => async (dispatch, getState) => {
  console.log("getCart:");
  if (refreshing) {
    console.log("getCart:refreshing:");
    dispatch({ type: MAGENTO_UPDATE_REFRESHING_CART_ITEM_PRODUCT, payload: true });
  }

  try {
    let cart;
    let cartId = await AsyncStorage.getItem('cartId');
    if (magento.isCustomerLogin()) {
      console.log("getCart:isCustomerLogin:");
      if(cartId){
        console.log("getCart:isCustomerLogin:cartId:",cartId);
        /*Merge Cart*/
        /*the code to merge cart will be here*/

        AsyncStorage.removeItem('cartId');
      }
      cart = await magento.customer.getCustomerCart();
      console.log("getCart: CustomerLogin:cart:",cart);
    } else {
      console.log("getCart:not CustomerLogin:");
      if(cartId){
        try{
          console.log("getCart:not CustomerLogin:cartId:",cartId);
          cart = await magento.guest.getGuestCart(cartId);
          console.log("getCart: not CustomerLogin:cart:",cart);
        }catch(err){
          logError('Cart id '+cartId+' is no longer exist');
        }
      }

      if(!cartId || !cart){
        console.log("getCart: not CustomerLogin:not cartid:");
        cartId = await magento.guest.createGuestCart();
        console.log("getCart: not CustomerLogin:not cartid:",cartId);
        AsyncStorage.setItem('cartId', cartId);
        cart = await magento.guest.getGuestCart(cartId);
      }
      dispatch({ type: MAGENTO_CREATE_CART, payload: cartId });
    }

    dispatch({ type: MAGENTO_GET_CART, payload: cart });
    dispatch({ type: MAGENTO_UPDATE_REFRESHING_CART_ITEM_PRODUCT, payload: false });
  } catch (error) {
    logError(error);
    if (error.message && error.message.includes('No such entity with customerId')) {
      const { customer } = getState().account;
      if (customer && customer.id) {
        dispatch(createCustomerCart(customer.id));
      }
    }
  }
};

export const addToCartLoading = isLoading => ({
  type: MAGENTO_ADD_TO_CART_LOADING,
  payload: isLoading,
});

export const addToCart = ({ cartId, item, customer }) => async (dispatch) => {
  try {
    if (cartId) {
      return dispatchAddToCart(dispatch, cartId, item);
    }

    const updatedItem = item;
    if (magento.isCustomerLogin()) {
      const customerCartId = await magento.admin.getCart(customer.id);
      dispatch({ type: MAGENTO_CREATE_CART, payload: customerCartId });
      updatedItem.cartItem.quoteId = customerCartId;
      return dispatchAddToCart(dispatch, customerCartId, updatedItem);
    }

    const guestCartId = await magento.guest.createGuestCart();
    dispatch({ type: MAGENTO_CREATE_CART, payload: guestCartId });
    updatedItem.cartItem.quoteId = guestCartId;
    return dispatchAddToCart(dispatch, guestCartId, updatedItem);
  } catch (error) {
    logError(error);
  }
};

const dispatchAddToCart = async (dispatch, cartId, item) => {
  try {
    let result;
    if (magento.isCustomerLogin()) {
      result = await magento.customer.addItemToCart(item);
    } else {
      result = await magento.guest.addItemToCart(cartId, item);
    }
    dispatch(checkoutSetActiveSection(1));
    dispatch({ type: MAGENTO_ADD_TO_CART, payload: result });
    dispatchGetGuestCart(dispatch, cartId);
  } catch (e) {
    logError(e);
    dispatch({ type: MAGENTO_ADD_TO_CART, payload: e });
  }
};

const dispatchGetGuestCart = async (dispatch, cartId) => {
  try {
    let data;
    if (magento.isCustomerLogin()) {
      data = await magento.customer.getCustomerCart();
    } else {
      data = await magento.guest.getGuestCart(cartId);
    }
    dispatch({ type: MAGENTO_GET_CART, payload: data });
  } catch (e) {
    logError(e);
  }
};

export const cartItemProduct = sku => async (dispatch) => {
  try {
    const data = await magento.admin.getProductBySku(sku);
    dispatch({ type: MAGENTO_CART_ITEM_PRODUCT, payload: data });
  } catch (error) {
    logError(error);
  }
};

export const getOrdersForCustomer = (customerId, refreshing) => async (dispatch) => {
  if (refreshing) {
    dispatch({ type: MAGENTO_UPDATE_REFRESHING_ORDERS_DATA, payload: true });
  }

  try {
    const data = await magento.admin.getOrderList(customerId);
    console.log('getOrderList response:', data);
    const orders = data.items.map((order) => {
      const { items } = order;
      const simpleItems = items.filter(i => i.product_type === 'simple');
      const simpleItemsWithPriceAndName = simpleItems.map((simpleItem) => {
        if (simpleItem.parent_item) {
          simpleItem.price = simpleItem.parent_item.price;
          simpleItem.row_total = simpleItem.parent_item.row_total;
          simpleItem.name = simpleItem.parent_item.name || simpleItem.name;
        }
        return simpleItem;
      });
      order.items = simpleItemsWithPriceAndName;
      return order;
    });
    data.items = orders;
    dispatch({ type: MAGENTO_GET_ORDERS, payload: data });
    dispatch({ type: MAGENTO_UPDATE_REFRESHING_ORDERS_DATA, payload: false });
  } catch (error) {
    logError(error);
  }
};

// Fetch product_data for product in OrderScreen
export const orderProductDetail = sku => async (dispatch) => {
  try {
    const product = await magento.admin.getProductBySku(sku);
    dispatch({
      type: MAGENTO_ORDER_PRODUCT_DETAIL,
      payload: {
        sku,
        product,
      },
    });
  } catch (error) {
    logError(error);
  }
};

export const addAccountAddress = (id, customer) => async (dispatch) => {
  try {
    const data = await magento.admin.updateCustomerData(id, customer);
    dispatch({ type: MAGENTO_ADD_ACCOUNT_ADDRESS, payload: data });
  } catch (error) {
    logError(error);
    const message = error.message ? error.message : 'Sorry, something went wrong. Please check your internet connection and try again';
    dispatch({ type: MAGENTO_ADD_ACCOUNT_ADDRESS_ERROR, payload: message });
  }
};

export const addGuestCartBillingAddress = (cartId, address) => async (dispatch) => {
  try {
    let data;
    if (magento.isCustomerLogin()) {
      data = await magento.customer.addCartBillingAddress(address);
    } else {
      data = await magento.guest.addGuestCartBillingAddress(cartId, address);
    }
    dispatch({ type: MAGENTO_ADD_CART_BILLING_ADDRESS, payload: data });
  } catch (error) {
    logError(error);
  }

  try {
    let data;
    if (magento.isCustomerLogin()) {
      data = await magento.customer.cartEstimateShippingMethods(address);
    } else {
      data = await magento.guest.guestCartEstimateShippingMethods(
        cartId,
        address,
      );
    }
    dispatch({ type: MAGENTO_GET_CART_SHIPPING_METHODS, payload: data });
    dispatch({ type: UI_CHECKOUT_ACTIVE_SECTION, payload: 2 });
    dispatch({ type: UI_CHECKOUT_CUSTOMER_NEXT_LOADING, payload: false });
  } catch (error) {
    logError(error);
  }
};

export const getGuestCartShippingMethods = cartId => async (dispatch) => {
  try {
    let data;
    if (magento.isCustomerLogin()) {
      data = await magento.customer.getCartShippingMethods();
    } else {
      data = await magento.guest.getGuestCartShippingMethods(cartId);
    }
    dispatch({ type: MAGENTO_GET_CART_SHIPPING_METHODS, payload: data });
  } catch (error) {
    logError(error);
  }
};

export const addGuestCartShippingInfo = (cartId, address) => async (dispatch) => {
  try {
    let data;
    if (magento.isCustomerLogin()) {
      data = await magento.customer.addCartShippingInfo(address);
    } else {
      data = await magento.guest.addGuestCartShippingInfo(cartId, address);
    }
    dispatch({ type: MAGENTO_ADD_SHIPPING_TO_CART, payload: data });
    dispatch({ type: UI_CHECKOUT_CUSTOMER_NEXT_LOADING, payload: false });
    dispatch({ type: UI_CHECKOUT_ACTIVE_SECTION, payload: 3 });
  } catch (error) {
    logError(error);
  }
};

export const getGuestCartPaymentMethods = cartId => async (dispatch) => {
  try {
    let data;
    if (magento.isCustomerLogin()) {
      data = await magento.customer.getCartPaymentMethods();
    } else {
      data = await magento.guest.getGuestCartPaymentMethods(cartId);
    }
    dispatch({ type: MAGENTO_GET_CART_PAYMENT_METHODS, payload: data });
    dispatch({ type: UI_CHECKOUT_CUSTOMER_NEXT_LOADING, payload: false });
    dispatch({ type: UI_CHECKOUT_ACTIVE_SECTION, payload: 4 });
  } catch (error) {
    logError(error);
  }
};

export const getCountries = () => (dispatch) => {
  magento.guest
    .getCountries()
    .then((data) => {
      dispatch({ type: MAGENTO_GET_COUNTRIES, payload: data });
    })
    .catch((error) => {
      logError(error);
    });
};

export const placeGuestCartOrder = (cartId, payment) => async (dispatch) => {
  try {
    let data;
    if (magento.isCustomerLogin()) {
      data = await magento.customer.placeCartOrder(payment);
    } else {
      data = await magento.guest.placeGuestCartOrder(cartId, payment);
    }
    dispatch({ type: MAGENTO_PLACE_GUEST_CART_ORDER, payload: data });
    dispatch({ type: UI_CHECKOUT_CUSTOMER_NEXT_LOADING, payload: false });
  } catch (error) {
    logError(error);
    const message = error.message ? error.message : 'Place order error';
    dispatch({ type: MAGENTO_ERROR_MESSAGE_CART_ORDER, payload: message });
  }
};

export const createCustomer = customer => (dispatch) => {
  magento.guest
    .createCustomer(customer)
    .then((data) => {
      dispatch({ type: MAGENTO_CREATE_CUSTOMER, payload: data });
    })
    .catch((error) => {
      logError(error);
    });
};

export const removeFromCartLoading = isLoading => ({
  type: MAGENTO_REMOVE_FROM_CART_LOADING,
  payload: isLoading,
});

export const getFilteredProducts = ({ page, pageSize, filter }) => async (dispatch) => {
  try {
    const data = await magento.admin.getFeaturedChildren({ page, pageSize, filter });
    dispatch({ type: MAGENTO_GET_FILTERED_PRODUCTS, payload: data });
  } catch (error) {
    logError(error);
  }
};

export const removeFromCart = ({ cart, item }) => async (dispatch) => {
  try {
    console.log('removeFromCart', cart, item);
    if (cart.quote) {
      dispatchRemoveFromCart(dispatch, cart, item);
      dispatch(checkoutSetActiveSection(1));
    }
  } catch (error) {
    logError(error);
    dispatch({ type: MAGENTO_REMOVE_FROM_CART, payload: error.message });
  }
};

const dispatchRemoveFromCart = async (dispatch, cart, item) => {
  try {
    const result = await magento.admin.removeItemFromCart(cart.quote.id, item.item_id);
    dispatch({ type: MAGENTO_REMOVE_FROM_CART, payload: result });
    dispatchGetCart(dispatch, cart.cartId);
    dispatch({ type: MAGENTO_REMOVE_FROM_CART_LOADING, payload: false });
  } catch (e) {
    // TODO: handle error
    dispatch({ type: MAGENTO_REMOVE_FROM_CART, payload: e.message });
    dispatch({ type: MAGENTO_REMOVE_FROM_CART_LOADING, payload: false });
    logError(e);
  }
};

const dispatchGetCart = async (dispatch, cartId) => {
  try {
    let data;
    if (magento.isCustomerLogin()) {
      data = await magento.customer.getCustomerCart();
    } else {
      data = await magento.guest.getGuestCart(cartId);
    }
    dispatch({ type: MAGENTO_GET_CART, payload: data });
  } catch (e) {
    logError(e);
  }
};

export const getproductIsInStock = (sku) => async (dispatch) =>{
  console.log('SKU:',sku);
  magento.admin.getProductIsInStock(sku).then((data=>{
    dispatch({type: MAGENTO_PRODUCT_STOCK_CHECK,payload: data});
  }))
  .catch((error)=>{logError(error)});
}

export const toggleWishList = (id,wishListItemId,add) => (dispatch)=>{
  // if(add)
  // {
  //   const data = {product_id:id,item_added_in_wishlist : false}
  //  dispatch({type:MAGENTO_ADD_WISHLIST, payload:data})
  //  const respose = magento.customer.RemoveWishListItem(wishListItemId);
  //  if(respose.message)
  //  {
  //   console.log('Failed_TO_REMOVE',response.message);
  //   //  failedToRemoveWishListItem();
  //  } 
  // }
  // else
  // {
  const data = {product_id:id,item_added_in_wishlist : true}
  dispatch({type:MAGENTO_ADD_WISHLIST, payload:data});
  const response = magento.customer.AddWishlistItem(id);
  console.log(response);
    if(response.message)
    {
      console.log('Failed',response.message);
      // wishlistFail()
    }
  }
// }

export const getAddress = (id) => async(dispatch) =>{
  // dispatch ({type:MAGENTO_GET_ADDRESS_LIST_LOADING, payload:true});
  const parameters = {parameters:{customer_id:id}}
  magento.customer.getCustomerAddress(parameters).then((data)=>{
    // console.log('GET ADDRESS:',)
    // dispatch ({type:MAGENTO_GET_ADDRESS_LIST_LOADING, payload:false});
    if(data[0].data.status=="success")
    {
    dispatch({type:MAGENTO_GET_ADDRESS_LIST, payload:data[0].data.address});
    }
    else
    {
    dispatch({type:MAGENTO_GET_ADDRESS_LIST_ERROR,payload:data[0].data.status});
    }
    //console.log(data[0].data.address);
  })
}

export const deleteAddress = (customer_id,address_id) => async (dispatch) =>{
  const parameters = {parameters:{customer_id,address_id}};
  await magento.customer.deleteCustomerAddress(parameters).then((data)=>{
   // console.log(data[0].data.customer[0].status);
    if(data[0].data.customer[0].status=="success")
    {
      dispatch(getAddress(customer_id));
    }
    else{
      dispatch({type:MAGENTO_DELETE_ADDRESS_ERROR , payload:true}) 
    }
  })
}

//to get the total item in wishlist 
export const wishListItem = () => async (dispatch) =>{
  await magento.customer.wishlistItem().then((data)=>{
    // console.log(data[0]);  
    dispatch({type:MAGENTO_WISHLIST_TOTAL_ITEMS, payload:data[0].total_items});
  })
}

export const addAddress = (userDetail) => async (dispatch) => {
  // console.log(userDetail);  
  try {
    dispatch({type:MAGENTO_ADD_ADDRESS_SUCCESS , payload:false})
    await magento.customer.addAddressCustomer(userDetail).then((data)=>{
      if(data[0].data.customer[0].status=="success")
      {
        dispatch({type:MAGENTO_ADD_ADDRESS_SUCCESS , payload:true})
      }
      else{
        dispatch({type:MAGENTO_ADD_ADDRESS_ERROR , payload:true})
      }
    })
  } catch (error) {
    logError(error);
    dispatch({type:MAGENTO_ADD_ADDRESS_ERROR , payload:true})
  }
  
}