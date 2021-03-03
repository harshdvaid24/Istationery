import { currencySymbols } from '../config/magento';

export function finalPrice(data, price) {
   let specialPrice = price;
   let today= new Date();
   let isVisible = false;
   let toDate='';
   let fromDate='';

    if(data.some(attribute => attribute.attribute_code === "special_from_date")&&data.some(attribute => attribute.attribute_code === "special_to_date")){
        // console.log("special_from_date and special_to_date found:");
           // from and to dates are there
          data.map((item)=>{
              if(item.attribute_code === 'special_to_date'){
                 toDate= new Date(item.value);
              } 
              if(item.attribute_code === 'special_from_date'){
                 fromDate= new Date(item.value);
              }
             
                if (toDate!=''&&fromDate!=''&& today  < toDate && today > fromDate ) { 
                    //  console.log("special_to_date is after today.");
                    isVisible= true;
                } 
         })

      } 
     else if(data.some(attribute => attribute.attribute_code === "special_from_date")){
      // console.log("special_from_date date found:");
                  data.map((item)=>{
                    if(item.attribute_code === 'special_from_date'){
                      fromDate= new Date(item.value);
                    }
                      // from date is there
                      if (fromDate!=''&& today > fromDate ) { 
                          // console.log("special_from_date is before today.");
                          isVisible= true;
                      } 
                   })
     } 
     else if(data.some(attribute => attribute.attribute_code === "special_to_date")){
      // console.log("special_to_date not found to date found:");
          // to date is there

          data.map((item)=>{
            if(item.attribute_code === 'special_to_date'){
              toDate= new Date(item.value);
            }
              // to date is there
              if (toDate!=''&& today < toDate ) { 
                  // console.log("special_to_date is after today.");
                  isVisible= true;
              } 
           })

     }
     else{
      //  no dates found.
      isVisible=true;
    }


  const result = data.filter(item => item.attribute_code === 'special_price');
  if (isVisible&&result.length) {
    const splittedValue = result[0].value.split('.');
    specialPrice = splittedValue[0];
  }
  
  return specialPrice;
}

export const priceSignByCode = (code) => {
  const sign = currencySymbols[code];
  if (sign) {
    return sign;
  }
  // If no currency symbol specified for currency code, return currency code
  return code;
};

export const currencyExchangeRateByCode = (code, exchangeRates) => {
  const result = exchangeRates.find(exchangeRate => exchangeRate.currency_to === code);
  if (result) {
    return result.rate;
  }
  return 1;
};
