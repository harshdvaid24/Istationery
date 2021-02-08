/**
 * Magento Settings for the app,
 * Follow instructions: https://github.com/troublediehard/magento-react-native/wiki/Setup
 *
 * url                     : Base url of the magento website
 * home_cms_block_id       : Block id which contain json data,
 *                           which will be shown in Home screen
 * access_token            : Token to access magento API, without it
 *                           app won't work
 */
// export const magentoOptions = {
//   url: 'https://theprintmania.com/',
//   home_cms_block_id: '154',
//   store: 'default', // store code // Stores > All Stores > Store View > Code
//   authentication: {
//     integration: {
//       access_token: 'siv8gcu0dgi1psu4hi26npjvjnueu8qs',
//     },
//   },
// };

// export const magentoOptions = {
//   url: 'https://staging.istationery.com/',
//   reviewEnabled:true,
//   home_cms_block_id: '207',
//   store: 'default', // store code // Stores > All Stores > Store View > Code
//   authentication: {
//     integration: {
//       // access_token: '67lctablgnnuxadnwopus7o73wvr9efp',
//       access_token: 'avg02m7nb71gb553ib29noae3ully99e',
      
//     },
//   },
// };

export const magentoOptions = {
  url: 'https://www.istationery.com/',
  reviewEnabled:true,
  home_cms_block_id: '207',
  store: 'default', // store code // Stores > All Stores > Store View > Code
  authentication: {
    integration: {
      // access_token: '67lctablgnnuxadnwopus7o73wvr9efp',
      access_token: 'c5eph7dafa9micii92x6gjelpl1hlnmo',
      
    },
  },
};

// 67lctablgnnuxadnwopus7o73wvr9efp  -- access_token
// gmtip0ixuf9l628ssvl170yzl4uus6ag   -- access secret
// export const magentoOptions = {
//   url: 'https://www.codedecorator.com/',
//   home_cms_block_id: '31',
//   store: 'default', // store code // Stores > All Stores > Store View > Code
//   authentication: {
//     integration: {
//       access_token: '4dyprix16anu45k3onrefsi9mof5azkk',
//     },
//   },
// };

/**
 * Magento 2 REST API doesn't return currency symbol,
 * so manually specify all currency symbol(that your store support)
 * along side their currency code.
 */
export const currencySymbols = Object.freeze({
  USD: '$',
  EUR: '€',
  AUD: 'A$',
  GBP: '£',
  CAD: 'CA$',
  CNY: 'CN¥',
  JPY: '¥',
  SEK: 'SEK',
  CHF: 'CHF',
  INR: '₹',
  KWD: 'د.ك',
  RON: 'RON',
});
