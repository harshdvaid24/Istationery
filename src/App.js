import React, { Component,useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { ThemeProvider, theme } from './theme';
import { Navigator } from './navigation/Navigator';
import NavigationService from './navigation/NavigationService';
import { onAppStart } from './helper/app';
import 'react-native-gesture-handler';
import { Spinner } from './components/common';
import FlashMessage from "react-native-flash-message";
import SplashScreen from 'react-native-splash-screen'
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'
onAppStart(store);

const App = () => {
  useEffect(()=>{
    SplashScreen.hide();
    });
 
 
  return(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Navigator
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
         <FlashMessage position="top" /> 
         </SafeAreaProvider>
      </PersistGate>
    </ThemeProvider>
  </Provider>
);
}

export default App;
