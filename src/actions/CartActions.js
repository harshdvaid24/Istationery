import * as types from './types';
import { magento } from '../magento';
import { logError } from '../helper/logger';
import { createCustomerCart,getCartTotal } from './RestActions';
import Toast from 'react-native-simple-toast'


export const addCouponToCart = (couponCode,cartId) => async (dispatch, getState) => {
  dispatch({ type: types.MAGENTO_COUPON_LOADING, payload: true });
  try {
    // const cartId = getState().cart?.cartId;
    let totals;
    if (magento.isCustomerLogin()) {
      await magento.admin.addCouponToCart(cartId, couponCode).then((data)=>{if(data.message){Toast.show(data.message,3000,Toast.BOTTOM)}}).catch((error)=>{
        dispatch({ type: types.MAGENTO_COUPON_ERROR, payload: error?.message });
        logError(error);
      });
      totals = await magento.admin.getCartTotals(cartId);
    } else {
      await magento.guest.addCouponToCart(cartId, couponCode).then((data)=>{if(data.message){Toast.show(data.message,3000,Toast.BOTTOM)}}).catch((error)=>{
        dispatch({ type: types.MAGENTO_COUPON_ERROR, payload: error?.message });
        logError(error);
      });;
      totals = await magento.guest.getCartTotals(cartId);
    }
    dispatch({ type: types.MAGENTO_CHECKOUT_TOTALS, payload: totals });
    dispatch({type:types.MAGENTO_CART_TOTAL, payload:totals})

  } catch (error) {
    Toast.show(error.message,3000,Toast.BOTTOM);
    dispatch({ type: types.MAGENTO_COUPON_ERROR, payload: error?.message });
    logError(error);
  }
  dispatch({ type: types.MAGENTO_COUPON_LOADING, payload: false });
};

export const removeCouponFromCart = (cartId) => async (dispatch, getState) => {
  dispatch({ type: types.MAGENTO_COUPON_LOADING, payload: true });
  try {
    let totals;
    if (magento.isCustomerLogin()) {
      await magento.admin.removeCouponFromCart(cartId);
      totals = await magento.admin.getCartTotals(cartId);
    } else {
      await magento.guest.removeCouponFromCart(cartId);
      totals = await magento.guest.getCartTotals(cartId);
    }
    dispatch({ type: types.MAGENTO_CHECKOUT_TOTALS, payload: totals });
    dispatch({type:types.MAGENTO_CART_TOTAL, payload:totals})
  } catch (error) {
    logError(error);
  }
  dispatch({ type: types.MAGENTO_COUPON_LOADING, payload: false });
};

export const refreshCart = () => async (dispatch, getState) => {
  dispatch({ type: types.MAGENTO_UPDATE_REFRESHING_CART_ITEM_PRODUCT, payload: true });

  try {
    let cart;
    if (magento.isCustomerLogin()) {
      cart = await magento.customer.getCustomerCart();
    } else {
      const cartId = getState().cart?.cartId;
      cart = await magento.guest.getGuestCart(cartId);
    }
    dispatch({ type: types.MAGENTO_GET_CART, payload: cart });
    dispatch({ type: types.MAGENTO_UPDATE_REFRESHING_CART_ITEM_PRODUCT, payload: false });
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
