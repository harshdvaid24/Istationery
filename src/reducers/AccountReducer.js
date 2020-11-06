import {
  MAGENTO_CURRENT_CUSTOMER,
  MAGENTO_GET_ORDERS,
  UI_ACCOUNT_CUSTOMER_DATA_UPDATE,
  UI_ACCOUNT_CUSTOMER_DATA_LOADING,
  RESET_ACCOUNT_ADDRESS_UI,
  MAGENTO_ADD_ACCOUNT_ADDRESS,
  MAGENTO_UPDATE_REFRESHING_ORDERS_DATA,
  MAGENTO_ORDER_PRODUCT_DETAIL,
  MAGENTO_LOGOUT,
  MAGENTO_ADD_ACCOUNT_ADDRESS_ERROR,
  MAGENTO_GET_ADDRESS_LIST,
  MAGENTO_GET_ADDRESS_LIST_LOADING,
  MAGENTO_GET_ADDRESS_LIST_ERROR,
  MAGENTO_DELETE_ADDRESS_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  customer: null,
  orderData: {
    items: [],
  },
  products: {},
  refreshing: false,
  ui: {
    postcode: '',
    country: '',
    countryId: '',
    street: '',
    city: '',
    region: '',
    loading: false,
    error: false,
  },
  addresses:{},
  loading:{},
  error:false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UI_ACCOUNT_CUSTOMER_DATA_UPDATE: {
      const ui = { ...state.ui, [action.payload.key]: action.payload.value };
      return { ...state, ui };
    }
    case UI_ACCOUNT_CUSTOMER_DATA_LOADING: {
      const ui = { ...state.ui, loading: action.payload };
      return { ...state, ui };
    }
    case RESET_ACCOUNT_ADDRESS_UI: {
      return { ...state, ui: INITIAL_STATE.ui };
    }
    case MAGENTO_ADD_ACCOUNT_ADDRESS_ERROR: {
      return { ...state, ui: { ...state.ui, loading: false, error: action.payload } };
    }
    case MAGENTO_ADD_ACCOUNT_ADDRESS: {
      return {
        ...state,
        customer: action.payload,
        ui: { ...state.ui, loading: false, error: false },
      };
    }
    case MAGENTO_CURRENT_CUSTOMER:
      return { ...state, customer: action.payload };
    case MAGENTO_GET_ORDERS:
      return { ...state, orderData: action.payload };
    case MAGENTO_LOGOUT:
      return { ...INITIAL_STATE };
    case MAGENTO_UPDATE_REFRESHING_ORDERS_DATA:
      return {
        ...state,
        refreshing: action.payload,
      };
    case MAGENTO_ORDER_PRODUCT_DETAIL: {
      const { sku, product } = action.payload;
      const products = {
        ...state.products,
        [sku]: product,
      };
      return {
        ...state,
        products,
      };
    }

    case MAGENTO_GET_ADDRESS_LIST:{
      return {...state,address:action.payload}
    }
    case MAGENTO_GET_ADDRESS_LIST_ERROR:{
    return {...state,address:{},error:action.payload}
    }
    
    case MAGENTO_GET_ADDRESS_LIST_LOADING:{
      return {...state.loading,loading:action.payload}
    }
    case MAGENTO_DELETE_ADDRESS_ERROR:{
      return {...state,error:action.payload}
    }
    default:
      return state;
  }
};
