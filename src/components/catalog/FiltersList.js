import React,{useState,useEffect} from "react";
import {
    View, Text, StyleSheet, TouchableOpacity,SectionList,Image, LayoutAnimation, Platform, UIManager,
  } from 'react-native';

  import CommonStyle from '../../utils/CommonStyle'
  import GlobalStyle,{W,H,StatusbarHeight,WINDOW_HEIGHT} from '../../utils/GlobalStyles'
  
  import CustomSectionList from './CustomSectionList';


const FiltersList = (props) => {

  // console.log("props.data:",props.data);
const [Data, setData] = useState(props.data);
const [parsedData, setparsedData] = useState([]);

// const [AllselectedFilters, setselectedFilters] = useState([
//   {field:'ink_type',value:'5746',condition_type:'eq'},
//   {field:'cat',value:'28',condition_type:'eq'}
// ])
const [AllselectedFilters, setselectedFilters] = useState([])
const [activeFilterType, setActiveFilterType] = useState('');

useEffect(() => {
  setData(props.data);
  if(props.data){
    calculateData(props.data);
  }
}, [props.data])



const onFilterSelect = (selectedItem) => {
 applyFilter(selectedItem);
};

const onFilterTypeSelect = (selectedFilterType) => {
  console.log("onFilterTypeSelect:",selectedFilterType);
  if(selectedFilterType==activeFilterType){
    setActiveFilterType('');
  }
  else{
    setActiveFilterType(selectedFilterType);
  }
 
 };
 

const calculateData = (data) => {
    // console.log("calculateData:",data);
    
let newData = [];
data.map((item) => {

    let revisedItems=[];
  item.items.map((filter) => {
    
    revisedItems.push(
      {
        "count":filter.count,
        "display":filter.display,
        "value":filter.value,
        "type":item.title,
        "code":filter.code,
        "isActive":false
      })
  })

  newData.push(
    {
      "title":item.title,
      "data":revisedItems
    }
    
    )});
  setparsedData(newData);
}

const applyFilter= (selectedFilter) => {
  
  let newData = parsedData;
  let selected =  AllselectedFilters;

      newData.map(record => {
              record.data.map(category => {
        
                  if (selectedFilter == category.value) {
                      if(category.isActive == true){
                        console.log("category.isActive == true:",selected);
                         selected = selected.filter(item => {
                            console.log("category.isActive == true:filter:item.value:",item.value);
                            console.log("category.isActive == true:filter:category.value:",category.value);
                          item.value !== category.value});
                          category.isActive =false;
                      }
                      else{
                        selected.push(category);
                        category.isActive =true; 
                      }
                  }
              })
      })

      setselectedFilters(selected);
      console.log("applyFilter:selected:",selected);
  // console.log("applyFilter:newData:",newData);
  setparsedData(newData);
  // console.log("applyFilter:parsedData:",parsedData);

   props.getSelectedFilters(selected);
}

   return( 
   <View style={[styles.container]}>
  <CustomSectionList
        data={parsedData}
        activeFilterType={activeFilterType}
        onFilterSelect={onFilterSelect}
        onFilterTypeSelect={onFilterTypeSelect}
        AllselectedFilters={AllselectedFilters}
      />
   </View>)
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyle.colorSet.white,
    flex:1
  },
 
});

export default FiltersList;