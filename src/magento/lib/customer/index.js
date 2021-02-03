import { CUSTOMER_TYPE } from '../../types';

export default magento => ({
  getCurrentCustomer: () => magento.get('/V1/customers/me', undefined, undefined, CUSTOMER_TYPE),

  getCustomerCart: () => magento.get('/V1/carts/mine', undefined, undefined, CUSTOMER_TYPE),

  getCopyGuestCart:(id,customer_id) => magento.put(`/V1/guest-carts/${id}`,{customerId:customer_id,storeId:1},CUSTOMER_TYPE),

  createCart: customerId => magento.post(`/V1/customers/${customerId}/carts`, undefined, CUSTOMER_TYPE),

  addItemToCart: item => magento.post('/V1/carts/mine/items', item, CUSTOMER_TYPE),

  addCartBillingAddress: address => magento.post('/V1/carts/mine/billing-address', address, CUSTOMER_TYPE),

  cartEstimateShippingMethods: address => magento.post('/V1/carts/mine/estimate-shipping-methods', address, CUSTOMER_TYPE),

  addCartShippingInfo: address => magento.post('/V1/carts/mine/shipping-information', address, CUSTOMER_TYPE),

  getCartShippingMethods: () => magento.get('/V1/carts/mine/estimate-shipping-methods', undefined, undefined, CUSTOMER_TYPE),

  getCartPaymentMethods: () => magento.get('/V1/carts/mine/payment-methods', undefined, undefined, CUSTOMER_TYPE),

  placeCartOrder: payment => magento.put('/V1/carts/mine/order', payment, CUSTOMER_TYPE),

  postReview: review => magento.post('/V1/mma/review/mine/post', review, CUSTOMER_TYPE),

  changePassword: (userDetail,id) => magento.put(`/V1/customers/me/password?customerId=${id}`,userDetail,CUSTOMER_TYPE),

  AddWishlistItem: (id)=> magento.post(`/V1/ipwishlist/add/${id}`,undefined,CUSTOMER_TYPE),

  RemoveWishListItem: (wishListItemId) => magento.delete(`/V1/ipwishlist/delete/${wishListItemId}`,undefined,CUSTOMER_TYPE),

  getWishlistItems: () => magento.get(`/V1/ipwishlist/items`,undefined,undefined,CUSTOMER_TYPE),

  getCustomerAddress: (customerId) => magento.post(`/V1/mobileapi/customer/address`,customerId,undefined,CUSTOMER_TYPE),

  deleteCustomerAddress:(userDetail) => magento.post(`/V1/mobileapi/customer/deleteaddress`,userDetail,undefined,CUSTOMER_TYPE),

  wishlistItem:() => magento.get(`/V1/ipwishlist/info`,undefined,undefined,CUSTOMER_TYPE),

  addAddressCustomer:(userDetail) => magento.post(`/V1/mobileapi/customer/saveaddress`,userDetail,undefined,CUSTOMER_TYPE),
});
