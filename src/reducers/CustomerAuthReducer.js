import {
  MAGENTO_PASSWORD_RESET_LOADING,
  MAGENTO_PASSWORD_RESET_SUCCESS,
  MAGENTO_PASSWORD_RESET_ERROR,
  MAGENTO_CREATE_CUSTOMER_LOADING,
  MAGENTO_CREATE_CUSTOMER_SUCCESS,
  MAGENTO_CREATE_CUSTOMER_ERROR,
  GET_APP_VERSIONS,
  MAGENTO_AUTH_LOADING,
  MAGENTO_AUTH,
  MAGENTO_AUTH_ERROR,
  MAGENTO_AUTH_ERROR_RESET,
  MAGENTO_PASSWORD_CHANGE_ERROR,
  MAGENTO_PASSWORD_CHANGE_LOADING,
  MAGENTO_PASSWORD_CHANGE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  customer: null,
  token: null,
  app_version:'',
  /**
   * Login/Signin Screen
   */
  error: null,
  success: null,
  loading: false,
  /**
   * Password Reset Screen
   */
  resetLoading: false,
  resetPasswordErrorMessage: null,
  resetPasswordSuccessMessage: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAGENTO_PASSWORD_RESET_LOADING:
      return {
        ...state,
        resetLoading: action.payload,
        resetPasswordSuccessMessage: null,
        resetPasswordErrorMessage: null,
      };
    case MAGENTO_PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        resetLoading: false,
        resetPasswordErrorMessage: null,
        resetPasswordSuccessMessage: action.payload,
      };
    case MAGENTO_PASSWORD_RESET_ERROR:
      return {
        ...state,
        resetLoading: false,
        resetPasswordErrorMessage: action.payload.errorMessage,
      };
    case MAGENTO_CREATE_CUSTOMER_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: null,
        success: null,
      };
      case GET_APP_VERSIONS:{
        console.log("Reducer:GET_APP_VERSIONS:",action.payload);
        return {
          ...state,
          app_version: action.payload,
        };
      }
       
    case MAGENTO_CREATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customer: action.payload,
      };
    case MAGENTO_AUTH:
      return { ...state, token: action.payload };
    case MAGENTO_AUTH_ERROR:
      return { ...state, error: action.payload };
      case MAGENTO_AUTH_ERROR_RESET:{
        console.log("MAGENTO_AUTH_ERROR_RESET");
        return { ...state, error: null };
      }
      case MAGENTO_PASSWORD_CHANGE_ERROR:
      return { ...state, error: action.payload };
      case MAGENTO_PASSWORD_CHANGE_SUCCESS:
      return { ...state, success: action.payload };
      case MAGENTO_PASSWORD_CHANGE_LOADING:{
        return { ...state, loading:action.payload };
      }
        
    case MAGENTO_AUTH_LOADING: {
      if (action.payload) {
        return {
          ...state,
          loading: action.payload,
          error: null,
          success: null,
        };
      }
      return { ...state, loading: action.payload };
    }
    default:
      return state;
  }
};
