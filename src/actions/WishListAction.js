import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import { magento } from '../magento';
import { magentoOptions } from '../config/magento';
import {
    MAGENTO_WISHLIST_GET_LOADING,
    MAGENTO_WISHLIST_ITEMS,
    MAGENTO_WISHLIST_DELETE_ITEMS,
    MAGENTO_WISHLIST_DELETE_ITEMS_SUCCESS,
    MAGENTO_WISHLIST_DELETE_ITEMS_ERROR,
    MAGENTO_WISHLIST_PRODUCT_STOCK_CHECK
} from './types';
import { logError } from '../helper/logger';

const loadingStart=(dispatch) => {
  dispatch({type:MAGENTO_WISHLIST_GET_LOADING, payload:true})
}

const loadingEnd=(dispatch) => {
  dispatch({type:MAGENTO_WISHLIST_GET_LOADING, payload:false})
}


export const getWishListProducts = () => async(dispatch) =>{
  console.log('method is called');
  loadingStart(dispatch);
    // dispatch({type:MAGENTO_WISHLIST_GET_LOADING,payload:true});
    try {
      let arr = [];
      await magento.customer.getWishlistItems().then((data)=>{
        console.log(data);
         data.forEach((products) => {
            arr.push({
             productItem: products.product,
             wishlistId:products.wishlist_item_id
            })
        });
        dispatch({type:MAGENTO_WISHLIST_ITEMS, payload:arr})
        loadingEnd(dispatch);
      }).catch((error)=>{logError(error)})
    } catch (error) {
      logError(error);
      loadingEnd(dispatch);
    }
    
  }

export const removeWishlistItem = (id) =>  async (dispatch) =>{
  loadingStart(dispatch);
  try {
    magento.customer.RemoveWishListItem(id).then((data)=>{
      if(data.message)
      {
        dispatch({type:MAGENTO_WISHLIST_DELETE_ITEMS_ERROR, payload:data.message})
      }
      else{
        return dispatch(getWishListProducts(dispatch))
    }
    loadingEnd(dispatch);
  }).
  catch((error)=>{
        loadingEnd(dispatch);
        dispatch({type:MAGENTO_WISHLIST_DELETE_ITEMS_SUCCESS, payload:error.message}), 
        logError(error)
      })
  }

  catch(error)
  {
    loadingEnd(dispatch)
    dispatch({type:MAGENTO_WISHLIST_DELETE_ITEMS_ERROR, payload:error.message})
    logError(error);
  }
}

export const AddToCart = (sku) =>async (dispatch) =>{
  try{
    await magento.admin.getProductIsInStock(sku).then((data)=>{
        dispatch({type:MAGENTO_WISHLIST_PRODUCT_STOCK_CHECK, payload: data.is_in_stock})      
      //return item_is_in_stock;
    }).catch((error)=>{logError(error)})
    }
  
  catch(error)
  {
    logError(error);
  }
}