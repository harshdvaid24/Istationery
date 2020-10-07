import React, { Component } from 'react';
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

onAppStart(store);

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
        <Navigator
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
         <FlashMessage position="top" /> 
      </PersistGate>
    </ThemeProvider>
  </Provider>
);

export default App;
