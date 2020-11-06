import { Client } from 'bugsnag-react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
const bugsnag = new Client('f1e939802a0abb0832574304f55776a5');

export const logError = (error) => {
  // console.log("logError",error);
  if (error instanceof Error) {
    console.log("instanceof Error:",error);
    bugsnag.notify(error);
  } else if (typeof error === 'string') {
    console.log("typeof error === 'string'):",error);
    bugsnag.notify(new Error(error));
  }
  else{
    // console.log("else:'):",error);
    // showMessage({
    //     message: error.message,
    //    type: "info",
    //    duration:7000,
    //    floating:true
    // });
  }
};
