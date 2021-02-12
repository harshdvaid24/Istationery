import React from 'react';
import {
  createSwitchNavigator,
  createAppContainer,
  NavigationActions
} from 'react-navigation';
import { createStackNavigator, StackViewTransitionConfigs } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { DrawerActions } from 'react-navigation-drawer';

import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import {View ,Image,StyleSheet,Text, TouchableOpacity} from 'react-native'
import CommonStyle from '../utils/CommonStyle'

import { Icon } from 'react-native-elements';

import Category from '../components/catalog/Category';
import CategoryTree from '../components/catalog/CategoryTree';
import CategoryTreeScreen from '../components/catalog/CategoryTreeScreen';


import Cart from '../components/cart/Cart';
import Checkout from '../components/checkout/Checkout';
import Login from '../components/account/Login';
import WishlistLogin from '../components/Wishlist/Login';
import Signin from '../components/account/Signin';
import Account from '../components/account/Account';
import AuthLoading from '../components/account/AuthLoading';
import AuthWishlistLoading from '../components/account/AuthWishlistLoading';

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

 import {PaymentScreen} from './../components/checkout/PaymentScreen';
 import SuccessScreen from '../components/checkout/SuccessScreen';


import CartBadge from '../components/cart/CartBadge';

import * as routes from './routes';

import { theme } from '../theme';
import { ProductScreen } from '../components/catalog/ProductScreen';
import { H,W } from '../utils/GlobalStyles';
import Categories from '../components/home/Categories';
import { TermsAndConditionScreen } from '../components/catalog/TermsAndConditionScreen';


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
    [routes.NAVIGATION_HOME_SCREEN_PATH]: HomeScreen,
    [routes.NAVIGATION_ADDRESS_PATH]:AddressScreen,
    [routes.ADD_ADDRESS_PATH]:AddAddressScreen,
    
    [routes.NAVIGATION_CATEGORY_PATH]: Category,
    [routes.NAVIGATION_HOME_PRODUCT_PATH]: ProductScreen,
    [routes.NAVIGATION_DRAWER_SCREEN]: DrawerScreen,
    [routes.NAVIGATION_CART_PATH]: Cart,
    [routes.NAVIGATION_SEARCH_SCREEN_PATH]: SearchScreen,
    // [routes.NAVIGATION_PAYMENT_SUCCESS_PATH]: SuccessScreen,
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
  // if (navigation.state.index > 0) {
  //   tabBarVisible = false;
  //   drawerLockMode = 'locked-closed';
  // }
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
  // if (navigation.state.index > 0) {
  //   tabBarVisible = false;
  //   drawerLockMode = 'locked-closed';
  // }
  return {
    tabBarVisible,
    drawerLockMode,
  };
};
const WishlistAuthStack = createStackNavigator({
  [routes.NAVIGATION_LOGIN_PATH]: WishlistLogin,
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
  // if (navigation.state.index > 0) {
  //   tabBarVisible = false;
  //   drawerLockMode = 'locked-closed';
  // }
  return {
    tabBarVisible,
    drawerLockMode,
  };
};
const WishlistStack = createStackNavigator({
  [routes.NAVIGATION_WISHLIST_PATH]: WishlistScreen,
}, {
  // navigationOptions: defaultHeader,
  defaultNavigationOptions: defaultHeaderOptions
});

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
  // if (navigation.state.index > 0) {
  //   tabBarVisible = false;
  //   drawerLockMode = 'locked-closed';
  // }
  return {
    tabBarVisible,
    drawerLockMode,
  };
};



const WishlistSwitch = createSwitchNavigator({
  [routes.NAVIGATION_AUTH_LOADING_SWITCH2]: AuthWishlistLoading,
  [routes.NAVIGATION_LOGIN_STACK_PATH]: WishlistAuthStack,
  [routes.NAVIGATION_WISHLIST_STACK_PATH]: WishlistStack,
});

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

const CategoryStack = createStackNavigator({
  [routes.NAVIGATION_HOME_SCREEN_PATH]: HomeScreen,
  [routes.NAVIGATION_CATEGORY_SCREEN_PATH]: CategoryTreeScreen,
  [routes.NAVIGATION_CATEGORY_PATH]: Category,
  [routes.NAVIGATION_DRAWER_SCREEN]: DrawerScreen,
  [routes.NAVIGATION_HOME_PRODUCT_PATH]: ProductScreen
 
}, {
  initialRouteName: routes.NAVIGATION_CATEGORY_SCREEN_PATH,
  // navigationOptions: defaultHeader,
  defaultNavigationOptions: defaultHeaderOptions
});

SearchStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  let drawerLockMode = 'unlocked';
  // if (navigation.state.index > 0) {
  //   tabBarVisible = false;
  //   drawerLockMode = 'locked-closed';
  // }
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
  // if (navigation.state.index > 0) {
  //   tabBarVisible = false;
  //   drawerLockMode = 'locked-closed';
  // }
  return {
    tabBarVisible,
    drawerLockMode,
  };
};



CartStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  let drawerLockMode = 'unlocked';
  // if (navigation.state.index > 0) {
  //   tabBarVisible = false;
  //   drawerLockMode = 'locked-closed';
  // }
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
          return(<View style={[styles.IconWrapper,CommonStyle.marginLR10]}>
                <Image style={CommonStyle.Icon20} source={imagePath} resizeMode='contain'/>
                    <Text style={[(focused)?CommonStyle.xsPrimarySemiBold:CommonStyle.xsGreyRegular,CommonStyle.marginTop2]}>
                      Home
                    </Text>
          </View>)
        },
      }),
    },
   
    
    [routes.NAVIGATION_CATEGORY_SCREEN_PATH]: {
      screen: CategoryStack,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor,focused }) => {
          let imagePath = null;
          if(focused)
          {
            imagePath=require('../../resources/icons/Bottom/category.png')
          }
          else 
          {
            imagePath=require('../../resources/icons/Bottom/category2.png')
          }
          return(<View style={[styles.IconWrapper,CommonStyle.marginLR10]}>
                <Image style={CommonStyle.Icon20} source={imagePath} resizeMode='contain'/>
                    <Text style={[(focused)?CommonStyle.xsPrimarySemiBold:CommonStyle.xsGreyRegular,CommonStyle.marginTop2]}>
                    Categories
                    </Text>
          </View>)
        },
      }),
    },
    [routes.NAVIGATION_AUTH_STACK2_PATH]: {
      screen: WishlistSwitch,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor,focused }) => {
          let imagePath = null;
          if(focused)
          {
            imagePath=require('../../resources/icons/Bottom/wishlist_selected.png')
          }
          else 
          {
            imagePath=require('../../resources/icons/Bottom/wishlist.png')
          }
          return(<View style={styles.IconWrapper}>
              <Image style={CommonStyle.Icon20} source={imagePath} resizeMode='contain'/>
              <Text style={[(focused)?CommonStyle.xsPrimarySemiBold:CommonStyle.xsGreyRegular,CommonStyle.marginTop2]}>
                      Wishlist
              </Text>
            </View>)
        },
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
          return(<View style={[styles.IconWrapper]}>
                  <Image style={CommonStyle.Icon20} source={imagePath} resizeMode='contain'/>
                  <Text style={[(focused)?CommonStyle.xsPrimarySemiBold:CommonStyle.xsGreyRegular,CommonStyle.marginTop2]}>
                      My Account
                    </Text>
              </View>)
        },
      }),
    }
  },
  {
    // initialRouteName: NAVIGATION_AUTH_STACK_PATH,
    tabBarOptions: {
        tabStyle: {
            // height:H(100),
          // width:W(10),
          // paddingTop: 10,
          paddingHorizontal: 0,
        },
        
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
  [routes.NAVIGATION_PAYMENT_PATH]: PaymentScreen,
  [routes.NAVIGATION_PAYMENT_SUCCESS_PATH]: SuccessScreen,
  [routes.NAVIGATION_TERMS_AND_CONDITION]:TermsAndConditionScreen,
  
},
{
  // getCustomActionCreators: (route, navStateKey) => {
  //   console.log("route, navStateKe",route, navStateKey);
  //   console.log("DrawerActions:",DrawerActions);
  //   console.log("NavigationActions:",NavigationActions);
  //   return {
  //     toggleFilterDrawer: () => {
  //       return DrawerActions.toggleDrawer({key: navStateKey});
  //     },
  //   };
  // },
},
{
  headerBackTitleVisible: false,
});

Nav.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  let drawerLockMode = 'unlocked';
  // if (navigation.state.index > 0) {
  //   tabBarVisible = false;
  //   drawerLockMode = 'locked-closed';
  // }
  return {
    tabBarVisible,
    drawerLockMode,
  };
};

const styles = StyleSheet.create({
  IconWrapper:{
     paddingTop: H(10),
    // marginHorizontal:W(10),
    justifyContent:'center',
    alignItems:'center'

  }
})

export const Navigator = createAppContainer(Nav);
