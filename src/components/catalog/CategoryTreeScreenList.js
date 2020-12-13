import React,{useContext} from 'react';
import { FlatList, SafeAreaView,View } from 'react-native';
import PropTypes from 'prop-types';
import CategoryTreeListScreenItem from './CategoryTreeListScreenItem';
import { ThemeContext } from '../../theme';

const CategoryTreeScreenList = ({
  categories,
  refreshControl,
}) => {

  const theme = useContext(ThemeContext);

  const renderItem = (category) => {
    return <CategoryTreeListScreenItem category={category.item} expanded={true} />;
  };


  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:theme.colors.white }}>
      {/* <View style={{height:120,backgroundColor:theme.colors.white}}/> */}

    
      <FlatList
        refreshControl={refreshControl}
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

CategoryTreeScreenList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  refreshControl: PropTypes.element,
};

CategoryTreeScreenList.defaultProps = {
  refreshControl: <></>,
};

export default CategoryTreeScreenList;
