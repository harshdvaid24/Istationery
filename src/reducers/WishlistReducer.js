import{
MAGENTO_WISHLIST_ITEMS,
MAGENTO_WISHLIST_DELETE_ITEMS,
MAGENTO_WISHLIST_GET_LOADING,
MAGENTO_WISHLIST_DELETE_ITEMS_SUCCESS,
MAGENTO_WISHLIST_DELETE_ITEMS_ERROR,
MAGENTO_WISHLIST_PRODUCT_STOCK_CHECK,
MAGENTO_WISHLIST_TOTAL_ITEMS
 } from '../actions/types'
 import _ from 'lodash';

const initialState ={
  products: {},
  wishlist_item_id:{},
  error:false,
  success:true,
  is_in_stock:{},
  total:{}
}

 export default (state = initialState, action) =>{
     switch(action.type)
     {
         case MAGENTO_WISHLIST_ITEMS:
            const products = { ...state.products,products:action.payload}
             return {...state,products};
         case MAGENTO_WISHLIST_DELETE_ITEMS_SUCCESS:
            return {...state,success:action.payload};
        case MAGENTO_WISHLIST_DELETE_ITEMS_ERROR:
            return {...state,error:error.payload};
        case MAGENTO_WISHLIST_PRODUCT_STOCK_CHECK:
            return {...state,is_in_stock:action.payload }
        case MAGENTO_WISHLIST_TOTAL_ITEMS:{
            return {...state,total:action.payload}
        }
         default:
             return state;
     }
 }