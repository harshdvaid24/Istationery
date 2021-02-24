import React,{useContext,useEffect} from 'react';
import { FlatList, SafeAreaView,View } from 'react-native';

import PropTypes from 'prop-types';
import CategoryTreeListItem from './CategoryTreeListItem';
import { ThemeContext } from '../../theme';

const CategoryTreeList = ({
  categories,
  refreshControl,
}) => {

  const theme = useContext(ThemeContext);
 

  console.log("CategoryTreeList:");

  useEffect(() => {
    // dispatch(getFiltersForCategory())
   
  }, [])

  const renderItem = (category) => {
    return <CategoryTreeListItem category={category.item} expanded={true} />;
  };


  return (
    <SafeAreaView style={{ flex: 1,paddingHorizontal:10,backgroundColor:theme.colors.white }}>
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

CategoryTreeList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  refreshControl: PropTypes.element,
};

CategoryTreeList.defaultProps = {
  refreshControl: <></>,
};

export default CategoryTreeList;
