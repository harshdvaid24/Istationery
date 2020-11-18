import React from 'react';
import {
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import { createStackNavigator, StackViewTransitionConfigs } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { DrawerActions } from 'react-navigation-drawer';

import {View ,Image,StyleSheet} from 'react-native'
import CommonStyle from '../utils/CommonStyle'

import { Icon } from 'react-native-elements';

import Category from '../components/catalog/Category';
import CategoryTree from '../components/catalog/CategoryTree';

import Cart from '../components/cart/Cart';
import Checkout from '../components/checkout/Checkout';
import Login from '../components/account/Login';
import Signin from '../components/account/Signin';
import Account from '../components/account/Account';
import AuthLoading from '../components/account/AuthLoading';
import PasswordReset from '../components/account/PasswordReset';
import HomeScreen from '../components/home/HomeScreen';
import SearchScreen from '../components/search/SearchScreen';
import OrdersScreen from '../components/account/OrdersScreen';
import OrderScreen from '../components/account/OrderScreen';

import DrawerScreen from '../components/catalog/DrawerScreen';
import ChangePasswordScreen from '../components/account/ChangePassword';

import {ContactUsScreen} from '../components/catalog/ContactUsScreen';
import WishlistScreen from '../components/Wishlist/WishlistScreen';
import AddressScreen from '../components/AddressList/AddressScreen';
import AddAddressScreen from '../components/AddressList/AddAddressScreen';

// import AddAddress from '../components/Account/AddressScreen';


import CartBadge from '../components/cart/CartBadge';

import * as routes from './routes';

import { theme } from '../theme';
import { ProductScreen } from '../components/catalog/ProductScreen';


const defaultHeader = {
  
  headerStyle: {
    elevation: 0,
    backgroundColor: theme.colors.white,
    height: 0,
    shadowColor: 'transparent',
    borderBottomColor:'transparent',
  },
   style: { shadowColor: 'transparent' },
  
 
  headerTitleStyle: {
    ...theme.typography.titleTextSemiBold,
    alignSelf: 'center',
  },
  headerBackTitle: null,
  headerTintColor: theme.colors.appbarTint,
};

const defaultHeaderOptions = {
  headerForceInset: { top: "never", bottom: "never" }
};

const HomeStack = createStackNavigator(
  {
    [routes.NAVIGATION_ADDRESS_PATH]:AddressScreen,
    [routes.ADD_ADDRESS_PATH]:AddAddressScreen,
    [routes.NAVIGATION_HOME_SCREEN_PATH]: HomeScreen,
    [routes.NAVIGATION_CATEGORY_PATH]: Category,
    [routes.NAVIGATION_HOME_PRODUCT_PATH]: ProductScreen,
  },
  {
    initialRouteName: routes.NAVIGATION_HOME_SCREEN_PATH,
    navigationOptions: defaultHeader,
    
    defaultNavigationOptions: defaultHeaderOptions
  },
);

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    tabBarVisible = false;
    drawerLockMode = 'locked-closed';
  }
  return {
    tabBarVisible,
    drawerLockMode,
  };
};

const AuthStack = createStackNavigator({
  [routes.NAVIGATION_LOGIN_PATH]: Login,
  [routes.NAVIGATION_SIGNIN_PATH]: Signin,
  [routes.NAVIGATION_RESET_PASSWORD_PATH]: PasswordReset,
  [routes.NAVIGATION_CHANGE_PASSWORD_PATH]: ChangePasswordScreen 
}, {
  navigationOptions: defaultHeader,
  defaultNavigationOptions: defaultHeaderOptions
});
AuthStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    tabBarVisible = false;
    drawerLockMode = 'locked-closed';
  }
  return {
    tabBarVisible,
    drawerLockMode,
  };
};
const AccountStack = createStackNavigator({
  [routes.NAVIGATION_ACCOUNT_PATH]: Account,
  [routes.NAVIGATION_RESET_PASSWORD_PATH]: PasswordReset,
  [routes.NAVIGATION_CONTACTUS_PATH]:ContactUsScreen,
  [routes.NAVIGATION_WISHLIST_PATH]:WishlistScreen,
  [routes.NAVIGATION_ADDRESS_PATH]:AddressScreen,
  [routes.NAVIGATION_ORDERS_PATH]: OrdersScreen,
  [routes.NAVIGATION_ORDER_PATH]: OrderScreen,
  [routes.ADD_ADDRESS_PATH]: AddAddressScreen,
}, {
  navigationOptions: defaultHeader,
  defaultNavigationOptions: defaultHeaderOptions
});

AccountStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    tabBarVisible = false;
    drawerLockMode = 'locked-closed';
  }
  return {
    tabBarVisible,
    drawerLockMode,
  };
};

const AccountSwitch = createSwitchNavigator({
  [routes.NAVIGATION_AUTH_LOADING_SWITCH]: AuthLoading,
  [routes.NAVIGATION_LOGIN_STACK_PATH]: AuthStack,
  [routes.NAVIGATION_ACCOUNT_STACK_PATH]: AccountStack,
});

const SearchStack = createStackNavigator({
  [routes.NAVIGATION_SEARCH_SCREEN_PATH]: SearchScreen,
  [routes.NAVIGATION_SEARCH_PRODUCT_PATH]: ProductScreen,
}, {
  navigationOptions: defaultHeader,
  defaultNavigationOptions: defaultHeaderOptions
});

SearchStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    tabBarVisible = false;
    drawerLockMode = 'locked-closed';
  }
  return {
    tabBarVisible,
    drawerLockMode,
  };
};


const CartStack = createStackNavigator({
  [routes.NAVIGATION_CART_PATH]: Cart,
}, {
  navigationOptions: defaultHeader,
  defaultNavigationOptions: defaultHeaderOptions
});

CartStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    tabBarVisible = false;
    drawerLockMode = 'locked-closed';
  }
  return {
    tabBarVisible,
    drawerLockMode,
  };
};

const MainAppNavigator = createBottomTabNavigator(
  {
    [routes.NAVIGATION_HOME_STACK_PATH]: {
      screen: HomeStack,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor,focused }) => {
          let imagePath = null;
          if(focused)
          {
            imagePath=require('../../resources/icons/Home_c.png')
          }
          else 
          {
            imagePath=require('../../resources/icons/Home.png')
          }
          return(<View style={styles.IconWrapper}><Image style={CommonStyle.Icon25} source={imagePath} resizeMode='contain'/></View>)
        },
      }),
    },
    [routes.NAVIGATION_SEARCH_SCREEN_PATH]: {
      screen: SearchStack,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor,focused }) => {
          let imagePath = null;
          if(focused)
          {
            imagePath=require('../../resources/icons/Search_c.png')
          }
          else 
          {
            imagePath=require('../../resources/icons/Search.png')
          }
          return(<View style={styles.IconWrapper}><Image style={CommonStyle.Icon25} source={imagePath} resizeMode='contain'/></View>)
        },
      }),
    },
   
    
    [routes.NAVIGATION_CART_PATH]: {
      screen: CartStack,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor,focused }) => {
          let isFocused = null
          if(focused)
          {
            isFocused = true;
          }
          else
        {
          isFocused = false
        }
          return(<CartBadge isActive={isFocused} color={tintColor} />)},
      }),
    },
    [routes.NAVIGATION_AUTH_STACK_PATH]: {
      screen: AccountSwitch,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor,focused }) => {
          let imagePath = null;
          if(focused)
          {
            imagePath=require('../../resources/icons/Profile_c.png')
          }
          else 
          {
            imagePath=require('../../resources/icons/Profile.png')
          }
          return(<View style={styles.IconWrapper}><Image style={CommonStyle.Icon25} source={imagePath} resizeMode='contain'/></View>)
        },
      }),
    }
  },
  {
    // initialRouteName: NAVIGATION_AUTH_STACK_PATH,
    tabBarOptions: {
      showLabel: false,
      activeTintColor: theme.colors.secondary,
      inactiveTintColor: theme.colors.tabBarIconInactive,
      activeBackgroundColor: theme.colors.tabBarBackground,
      inactiveBackgroundColor: theme.colors.tabBarBackground,
    },
  },
 { navigationOptions: defaultHeader,
  defaultNavigationOptions: defaultHeaderOptions
}
);

const Drawer = createDrawerNavigator({
  [routes.BOTTOM_TAB_NAVIGATOR]: {
    screen: MainAppNavigator,
  },
  [routes.NAVIGATION_DRAWER_SCREEN]: {
    screen: DrawerScreen,
    navigationOptions: { header: null },
  },
}, {
  contentComponent: CategoryTree,
});

const DrawerNavigator = createDrawerNavigator(
  {
    Drawer,
  },
  {
    navigationOptions: defaultHeader,
    defaultNavigationOptions: defaultHeaderOptions
  },
  {
    contentComponent: DrawerScreen,
    getCustomActionCreators: (route, stateKey) => ({
      toggleFilterDrawer: () => DrawerActions.toggleDrawer({ key: stateKey }),
    }),
  },
);

const Nav = createStackNavigator({
  [routes.NAVIGATION_DRAWER_NAVIGATOR]: {
    screen: DrawerNavigator,
    navigationOptions: defaultHeader,
    defaultNavigationOptions: defaultHeaderOptions
  },
  [routes.NAVIGATION_CHECKOUT_PATH]: Checkout,
},
{
  headerBackTitleVisible: false,
});

Nav.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    tabBarVisible = false;
    drawerLockMode = 'locked-closed';
  }
  return {
    tabBarVisible,
    drawerLockMode,
  };
};

const styles = StyleSheet.create({
  IconWrapper:{
    marginTop: 5,
    marginRight: 12
  }
})

export const Navigator = createAppContainer(Nav);
