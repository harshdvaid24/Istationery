import React, { useContext, useEffect } from 'react';
import {
  View,TouchableOpacity,Image,
  RefreshControl,Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from '../common/index';
import { initMagento, getCategoryTree } from '../../actions/index';
import CategoryTreeScreenList from './CategoryTreeScreenList';
import { ThemeContext } from '../../theme';
import CartBadge from '../../components/cart/CartBadge';
import CommonStyle from './../../utils/CommonStyle'
import GlobalStyles,{W,H,StatusbarHeight,WINDOW_HEIGHT} from './../../utils/GlobalStyles'

import {
  NAVIGATION_SEARCH_SCREEN_PATH
} from '../../navigation/routes';

const CategoryTreeScreen = ({
  categoryTree,
  refreshing,
  getCategoryTree: _getCategoryTree,
}) => {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    _getCategoryTree();
  }, []);

  const onRefresh = () => {
    _getCategoryTree(true);
  };

  const renderContent = () => {
    if (categoryTree) {
      return (
        <CategoryTreeScreenList
          categories={categoryTree.children_data}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          )}
        />
      );
    }
    return <Spinner />;
  };

  return (
    <View style={[styles.container(theme)]}>
      {renderContent()}
    </View>
  );
};

// CategoryTreeScreen.navigationOptions = {
//   title: 'Categories'.toUpperCase(),
//   headerBackTitle: ' ',
//   marginTop:Platform.OS === 'ios' ? 0 : (WINDOW_HEIGHT>770)? H(27) : H(StatusbarHeight),
//   // height: H(40),
//   height: H(60),
//   elevation: 0,
//   //  borderWidth:1,
//   borderBottomColor:'transparent',
// };
CategoryTreeScreen.navigationOptions = {
  title: 'Categories'.toUpperCase(),
  headerStyle: {
    backgroundColor:GlobalStyles.colorSet.white,
    marginTop:Platform.OS === 'ios' ? 0 : H(StatusbarHeight),
    height: H(40),
    elevation: 0,
     borderBottomWidth:0.8,
     borderBottomColor:GlobalStyles.colorSet.BorderGrey,
  }
};

CategoryTreeScreen['navigationOptions'] = screenProps => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {screenProps.navigation.navigate('Home') }}
      >
      <Image style={[CommonStyle.Icon25,CommonStyle.marginTB10,CommonStyle.marginLR20]} source={require("./.././../../resources/icons/back.png")} />
      </TouchableOpacity>
  ),
  title: 'Categories'.toUpperCase(),
  headerRight: () => (
    <View style={[styles.headerRight]}>
    <TouchableOpacity
      style={[CommonStyle.paddingLR10]}
      onPress={() => {screenProps.navigation.navigate(NAVIGATION_SEARCH_SCREEN_PATH) }}
      >
      <View style={[CommonStyle.marginTop5]}><Image style={CommonStyle.Icon25} source={require('../../../resources/icons/Search.png')} resizeMode='contain'/></View>
    </TouchableOpacity>
    <TouchableOpacity
      style={[CommonStyle.paddingLR10]}
      onPress={() => {screenProps.navigation.navigate('Cart') }}
      >

      <CartBadge color={GlobalStyles.colorSet.btnPrimary} />
    </TouchableOpacity>
    </View>
  ),
  headerStyle: {
    backgroundColor:'white',
    marginTop:Platform.OS === 'ios' ? (WINDOW_HEIGHT>812)?H(0):0 : H(StatusbarHeight),
    height: H(40),
    elevation: 0,
     borderWidth:0,
  //  borderBottomColor:'transparent',
  },

});


const styles = {
  container: theme => ({
    flex: 1,
     marginTop:H(10),
    // backgroundColor: theme.colors.primary,
  }),
  headerRight:{
    flexDirection:'row',
    alignItems:'center'
  },
  
};

const mapStateToProps = ({ categoryTree }) => ({ categoryTree, refreshing: categoryTree.refreshing });

export default connect(mapStateToProps, { initMagento, getCategoryTree })(CategoryTreeScreen);
