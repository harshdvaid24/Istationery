import AsyncStorage from '@react-native-community/async-storage';
import { magento } from '../magento';
import { initMagento, getCart, setCurrentCustomer } from '../actions';
import { logError } from './logger';


export const onAppStart = async (store) => {
  store.dispatch(initMagento());

  const customerToken = await AsyncStorage.getItem('customerToken');
  console.log("customerToken:",customerToken);
  magento.setCustomerToken(customerToken);

  if (customerToken) {
    try {
      const customer = await magento.customer.getCurrentCustomer();
      console.log("onAppStart:customer:",customer);
      store.dispatch(setCurrentCustomer(customer));
    } catch (error) {
      console.log('onAppStart -> unable to retrieve current customer', error);
      logError(error);
    }
  }
  store.dispatch(getCart());
};
