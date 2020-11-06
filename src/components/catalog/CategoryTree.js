import React, { useContext, useEffect } from 'react';
import { RefreshControl, View,Platform } from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from '../common/index';
import { initMagento, getCategoryTree } from '../../actions/index';
import CategoryTreeList from './CategoryTreeList';
import { ThemeContext } from '../../theme';
import  CommonStyle from './../../utils/CommonStyle';
import  GlobalStyles,{H,W,StatusbarHeight,WINDOW_HEIGHT} from './../../utils/GlobalStyles';

const CategoryTree = ({
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
        <CategoryTreeList
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
    <View style={styles.container(theme)}>
      {renderContent()}
    </View>
  );
};

CategoryTree.navigationOptions = {
  title: 'Categories'.toUpperCase(),
  headerBackTitle: ' ',
  marginTop:Platform.OS === 'ios' ? 0 : (WINDOW_HEIGHT>770)? H(27) : H(StatusbarHeight),
  // height: H(40),
  height: H(60),
  elevation: 0,
  //  borderWidth:1,
  borderBottomColor:'transparent',
};

const styles = {
  container: theme => ({
    flex: 1,
    marginTop:Platform.OS === 'ios' ?0:H(40),
    backgroundColor: theme.colors.primary,
  }),
};

const mapStateToProps = ({ categoryTree }) => ({ categoryTree, refreshing: categoryTree.refreshing });

export default connect(mapStateToProps, { initMagento, getCategoryTree })(CategoryTree);
