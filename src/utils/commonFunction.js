// Default Components .....
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// Utility ....
import Strings from './../utils/strings'






// ##Method :: Email Validate
export const IsValidateEmail = (email) => {
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String(email).toLowerCase());
};

// ##Method :: Check Empty Field
export const isEmptyField = (field) => {
    var isFieldEmpty = (field === '') ? true : false
    return isFieldEmpty
}

export const checkOnlyAlphabatic = (input) => {
    return input.match(/^[a-zA-Z ]+$/)
};

// ##Method :: Check phonenumber is valid
export const checkPhoneNumber = (number) => {
    
    var isnum = /^[6-9][0-9]{9}$/.test(number);
    return isnum
}

// ##Method :: Check for minimum password length
export const validPasswordLength = (password, length) => {
    var isPasswordLength = (password.length >= length) ? true : false
    return isPasswordLength
}

// ##Method :: Check for Website url
export const validWebsite = (url) => {
    var isUrl = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/.test(url);
    return isUrl
}


// DD/mm/YYYY
export const DateFomat = (date) => {
    var selected = date; 
    var dd = selected.getDate(); 
    var mm = selected.getMonth() + 1; 

    var yyyy = selected.getFullYear(); 
    if (dd < 10) { 
        dd = '0' + dd; 
    } 
    if (mm < 10) { 
        mm = '0' + mm; 
    } 
    var formatedDate = dd + '/' + mm + '/' + yyyy; 
   return formatedDate 
}


// DD/Mon/YYYY
export const DateFomat2 = (date) => {
    var selected = date; 
    var dd = selected.getDate();
    
    let monthNames =["Jan","Feb","Mar","Apr",
                      "May","Jun","Jul","Aug",
                      "Sep", "Oct","Nov","Dec"];

    let monthIndex = selected.getMonth();
    let monthName = monthNames[monthIndex];

    var yyyy = selected.getFullYear(); 
    if (dd < 10) { 
        dd = '0' + dd; 
    } 
   
    var formatedDate = dd + ' ' + monthName + ', ' + yyyy; 
   return formatedDate 
}











// ##Method :: Compare two string
export const matchString = (string1, string2) => {
    var isMatchString = (string1 === string2) ? true : false
    return isMatchString
}



// export const showPermissionAlert = (title = Constants.strings.app_name,message) => {
//     Alert.alert(title,message,
//         [
//             {
//                 text: Constants.strings.openSettingButton, onPress: () => OpenAppSettings.open()
//             },
//             {
//                 text: 'Cancel',
//                 onPress: () => { },
//                 style: 'cancel',
//             },
//         ], { cancelable: false })
// }



export const toConvertFloat = (v) => {
    let value = parseFloat(v, 2);
    console.log('toFloat:', value);
    return value;
};

export const showAlert = (message) => {
    Alert.alert(Strings.AppName, message);
};