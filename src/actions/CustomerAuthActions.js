import AsyncStorage from '@react-native-community/async-storage';
import { magento } from '../magento';
import { store, persistor } from './../store';
import { onAppStart } from './../helper/app';
import { getCart } from './RestActions';
import {
  MAGENTO_PASSWORD_RESET_LOADING,
  MAGENTO_PASSWORD_RESET_SUCCESS,
  MAGENTO_PASSWORD_RESET_ERROR,
  MAGENTO_CURRENT_CUSTOMER,
  MAGENTO_CREATE_CUSTOMER_LOADING,
  MAGENTO_CREATE_CUSTOMER_SUCCESS,
  MAGENTO_CREATE_CUSTOMER_ERROR,
  MAGENTO_AUTH_LOADING,
  MAGENTO_AUTH,
  MAGENTO_LOGOUT,
  MAGENTO_AUTH_ERROR,
  MAGENTO_AUTH_ERROR_RESET,
  MAGENTO_LOGIN_SUCCESS,
  MAGENTO_PASSWORD_CHANGE_LOADING,
  MAGENTO_PASSWORD_CHANGE_SUCCESS,
  MAGENTO_PASSWORD_CHANGE_ERROR
} from './types';
import NavigationService from '../navigation/NavigationService';
import {
  NAVIGATION_ACCOUNT_STACK_PATH,
  NAVIGATION_WISHLIST_STACK_PATH,
  NAVIGATION_LOGIN_STACK_PATH,
} from '../navigation/routes';
import { logError } from '../helper/logger';

export const signIn = customer => async (dispatch) => {
  try {
    dispatch({ type: MAGENTO_CREATE_CUSTOMER_LOADING, payload: true });
    const response = await magento.guest.createCustomer(customer);
    dispatch({ type: MAGENTO_CREATE_CUSTOMER_SUCCESS, payload: response });
    if (response.id && response.group_id) {
      const token = await magento.guest.auth(
        customer.customer.email,
        customer.password,
      );
      if (token.message) {
        authFail(dispatch, token.message);
      } else {
        dispatch({ type: MAGENTO_LOGIN_SUCCESS });
       await AsyncStorage.setItem('customerToken', token);
        await magento.setCustomerToken(token);
         onAppStart(store);
         authSuccess(dispatch, token, NAVIGATION_ACCOUNT_STACK_PATH);
      }
    } else if (response.message) {
      authFail(dispatch, response.message);
    } else {
      authFail(dispatch, 'Something went wrong. Pleas try again later.');
    }
  } catch (e) {
    logError(e);
    authFail(dispatch, e.message);
  }
};

export const changePassword = (customer) => async (dispatch) =>{
  try {
    const userdetails = {'currentPassword':customer.currentPassword,'newPassword':customer.newPassword};
    dispatch({type: MAGENTO_PASSWORD_CHANGE_LOADING, payload: true});
    const response = await magento.customer.changePassword(userdetails,customer.customer_id);
    if(response.message)
    {
      changePasswordFail(dispatch,response.message);
    }
    else
    {
      changePasswordSuccess(dispatch)
    }
  } catch (error) {
    logError(error);
    changePasswordFail(dispatch,error.message);
  }
}

export const auth = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: MAGENTO_AUTH_LOADING, payload: true });
    const response = await magento.guest.auth(username, password);
    magento.setCustomerToken(response);
    if (response.message) {
      authFail(dispatch, response.message);
    } else {
      authSuccess(dispatch, response,NAVIGATION_ACCOUNT_STACK_PATH);
      dispatch({ type: MAGENTO_LOGIN_SUCCESS });
    }
  } catch (e) {
    logError(e);
    authFail(dispatch, e.message);
  }
};
export const wishlistAuth = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: MAGENTO_AUTH_LOADING, payload: true });
    const response = await magento.guest.auth(username, password);
    magento.setCustomerToken(response);
    if (response.message) {
      authFail(dispatch, response.message);
    } else {
      authSuccess(dispatch, response,NAVIGATION_WISHLIST_STACK_PATH);
      dispatch({ type: MAGENTO_LOGIN_SUCCESS });
    }
  } catch (e) {
    logError(e);
    authFail(dispatch, e.message);
  }
};

const authSuccess = async (dispatch, token,SuccessScreen) => {
  dispatch({ type: MAGENTO_AUTH, payload: token });
  try {
    await AsyncStorage.removeItem('customerToken').then((data) => {
           AsyncStorage.setItem('customerToken', token).then((data) => {
            dispatch({ type: MAGENTO_AUTH_LOADING, payload: false });
            dispatch(getCart());
            if(SuccessScreen==NAVIGATION_ACCOUNT_STACK_PATH){
              NavigationService.navigate(NAVIGATION_ACCOUNT_STACK_PATH);
            }
            else if(SuccessScreen==NAVIGATION_WISHLIST_STACK_PATH){
              NavigationService.navigate(NAVIGATION_WISHLIST_STACK_PATH);
            }
          });
        });
   
   
    
  } catch (e) {
    logError(e);
    authFail(dispatch, 'Something went wrong. Pleas try again later.');
  }
};

const authFail = (dispatch, message) => {
  dispatch(errorMessage(message));
  dispatch(getCart());
  dispatch({ type: MAGENTO_AUTH_LOADING, payload: false });
};

export const errorMessage = error => ({ type: MAGENTO_AUTH_ERROR, payload: error });
export const ResetError = message => async (dispatch) => {
  console.log("ResetError",message);
  dispatch(ReseterrorMessage(message));
}

export const ReseterrorMessage = error => ({ type: MAGENTO_AUTH_ERROR_RESET, payload: error });

export const logout = () => (dispatch) => {
  dispatch({ type: MAGENTO_AUTH, payload: '' });
  dispatch({ type: MAGENTO_LOGOUT });
  AsyncStorage.removeItem('cartId');
  dispatch(getCart());
  NavigationService.navigate(NAVIGATION_LOGIN_STACK_PATH);
  AsyncStorage.setItem('customerToken', '');
  magento.setCustomerToken(false);
};

export const initiatePasswordReset = email => async (dispatch) => {
  try {
    dispatch({ type: MAGENTO_PASSWORD_RESET_LOADING, payload: true });
    await magento.guest.initiatePasswordReset(email);
    const message = `If there is an account associated with ${email} you will
        receive an email with a link to reset your password.`;
    dispatch({ type: MAGENTO_PASSWORD_RESET_SUCCESS, payload: message });
  } catch (e) {
    logError(e);
    dispatch({ type: MAGENTO_PASSWORD_RESET_ERROR, payload: { errorMessage: e.message } });
  }
};

/**
 * This action will reset all the state varaibales related to
 * password_reset in the CustomerAuthReducer.
 */
export const updatePasswordResetUI = () => async (dispatch) => {
  dispatch({ type: MAGENTO_PASSWORD_RESET_LOADING, payload: false });
};

export const currentCustomer = () => async (dispatch) => {
  try {
    const customer = await magento.customer.getCurrentCustomer();
    dispatch({
      type: MAGENTO_CURRENT_CUSTOMER,
      payload: customer,
    });
  } catch (error) {
    logError(error);
  }
};

export const setCurrentCustomer = customer => ({
  type: MAGENTO_CURRENT_CUSTOMER,
  payload: customer,
});

const changePasswordSuccess = (dispatch) => {
  dispatch({ type: MAGENTO_PASSWORD_CHANGE_SUCCESS, payload: true });
  dispatch({type:MAGENTO_PASSWORD_CHANGE_LOADING,payload:false});
};

const changePasswordFail = (dispatch, message) => {
  dispatch({type:MAGENTO_PASSWORD_CHANGE_ERROR, payload:message});
  dispatch({ type: MAGENTO_PASSWORD_CHANGE_LOADING, payload: false });
};