import React,{useState,useEffect} from "react";
import {
    View, Text, StyleSheet, TouchableOpacity,SectionList,Image, LayoutAnimation, Platform, UIManager,
  } from 'react-native';
  import {useSelector} from 'react-redux'
  import CommonStyle from '../../utils/CommonStyle'
  import GlobalStyle,{W,H,StatusbarHeight,WINDOW_HEIGHT} from '../../utils/GlobalStyles'
  
  import CustomSectionList from './CustomSectionList';


const FiltersList = (props) => {

  //  console.log("FiltersList:props.data:",props.data);
const [Data, setData] = useState(props.data);
const [parsedData, setparsedData] = useState([]);

const setselectedFilters1 = useSelector(state => state.category.applied_filters);
 console.log("FiltersList:useSelector setselectedFilters1:",setselectedFilters1);
// const [AllselectedFilters, setselectedFilters] = useState([
//   {field:'ink_type',value:'5746',condition_type:'eq'},
//   {field:'cat',value:'28',condition_type:'eq'}
// ])
const [AllselectedFilters, setselectedFilters] = useState(setselectedFilters1)
// console.log("FiltersList:setselectedFilters1:AllselectedFilters:",AllselectedFilters);
const [activeFilterType, setActiveFilterType] = useState('');

useEffect(() => {
  setData(props.data);
  if(props.data){
    calculateData(props.data);
  }
  console.log("FiltersList:1 useEffect:props.data",props.data);
}, [props.data])

useEffect(() => {
    if(setselectedFilters1&&setselectedFilters1.length!=0 && parsedData.length!=0){

      setselectedFilters1.map((filterItem) =>{
      applyFilter(filterItem.value);
      })
     
    }
    console.log("FiltersList:2 useEffect:setselectedFilters1",setselectedFilters1);
}, [parsedData])



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
 

const  calculateData =  async (data)  => {
     console.log("FiltersList:3 calculateData:data:",data);
    
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
    await setparsedData(newData);
  console.log("calculateData:parsedData:",parsedData);
}

const applyFilter= (selectedFilter) => {
  console.log("FiltersList:4 applyFilter:parsedData:",parsedData);
  console.log("FiltersList:4 applyFilter:selectedFilter:",selectedFilter);
  let newData = parsedData;
  let selected =  AllselectedFilters;

      newData.map(record => {
              record.data.map(category => {
        
                  if (selectedFilter == category.value) {
                      if(category.isActive == true){
                         selected = selected.filter(item => {
                          item.value !== category.value});
                          category.isActive =false;
                      }
                      else{
                        if (selected.indexOf(category) == -1) {
                          selected.push(category);
                      }
                        category.isActive =true; 
                      }
                  }
              })
      })

      setselectedFilters(selected);
      console.log("applyFilter:selected:",selected);
   console.log("applyFilter:newData:",newData);
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