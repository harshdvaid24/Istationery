import React,{useState,useEffect} from "react";
import {
    View, Text, StyleSheet, TouchableOpacity,SectionList,Image, LayoutAnimation, Platform, UIManager,
  } from 'react-native';

  import CommonStyle from '../../../utils/CommonStyle'
  import GlobalStyle,{W,H,StatusbarHeight,WINDOW_HEIGHT} from '../../../utils/GlobalStyles'


const CustomSectionList = (props) => {

  console.log("CustomSectionList:props.data:",props.data);
  const [activeFilterType, setActiveFilterType] = useState(props.activeFilterType);
  const [Data, setData] = useState(props.data);

  const [AllselectedFilters, setAllselectedFilters] = useState(props.AllselectedFilters)
  

useEffect(() => {
  console.log("CustomSectionList:props.data:",props.data);
  setData(props.data);
  setActiveFilterType(props.activeFilterType);
  setAllselectedFilters(props.AllselectedFilters);
}, [props.data,props.activeFilterType,props.AllselectedFilters])


const Item = ({ item }) => {
    let isSelectedEmpty = (AllselectedFilters.length==0)?true:false;
    let isSameCategory = false;
      if(!isSelectedEmpty){
        for (var i = 0; i < AllselectedFilters.length; i++) {
          if (AllselectedFilters[i].code ==item.code) {
            isSameCategory = true;
            break;
          }
        }
      }
   let isVisible = ((!isSameCategory)||isSelectedEmpty||item.isActive)?true:false;
  if(isVisible){
    return (<TouchableOpacity onPress={()=> onFilterSelect(item.value)} style={(item.type==activeFilterType)?styles.item:styles.inActiveItem}>
    <Text style={styles.title}>{item.display}</Text>
    {
      (item.isActive && item.type==activeFilterType)?<Image style={[CommonStyle.Icon20,CommonStyle.marginLR10]} source={require("./../.././../../resources/icons/removeCross.png")} />:null
    }
  </TouchableOpacity>)
  }
return null;
};

const onFilterSelect = (selectedItem) => {
  props.onFilterSelect(selectedItem);
};

const onFilterTypeSelect = (selectedFilterType) => {
  props.onFilterTypeSelect(selectedFilterType);
 };
 

const HeaderItem = ({title}) => (
  <TouchableOpacity onPress={()=>onFilterTypeSelect(title)} style={styles.header}>
    <Text style={styles.headerTitle}>{title}</Text>
    {
      (activeFilterType==title)?
      <Image style={[CommonStyle.Icon20,CommonStyle.marginLR10]} source={require("./../.././../../resources/icons/open.png")} />:
   
    <Image style={[CommonStyle.Icon20,CommonStyle.marginLR10]} source={require("./../.././../../resources/icons/close.png")} />
  }
  </TouchableOpacity>
);


   return( 
   <View style={[styles.container]}>
  <SectionList
        sections={Data}
        extraData={props.data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item item={item} />}
        renderSectionHeader={({ section: { title } }) => <HeaderItem title={title} />}
      />
   </View>)
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyle.colorSet.white,
    flex:1
  },
  item: {
    backgroundColor: GlobalStyle.colorSet.white,
    paddingVertical: H(5),
    paddingHorizontal:W(35),
    marginHorizontal:W(10),
    marginBottom:H(5),
    borderWidth:W(1),
    borderRadius:W(5),
    borderColor:GlobalStyle.colorSet.BorderGrey,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  inActiveItem: {
    height:0,
    width:0
  },
  header: {
    backgroundColor: GlobalStyle.colorSet.white,
    paddingVertical:H(10),
    marginTop: H(5),
    paddingHorizontal:W(25),
    flexDirection:'row',
    justifyContent:'space-between'
  },
  headerTitle: {
    color:GlobalStyle.colorSet.appBlack,
    fontFamily:GlobalStyle.fontSet.Medium,
    fontSize: H(16)
  },
  title: {
    color:GlobalStyle.colorSet.grey,
    fontFamily:GlobalStyle.fontSet.Medium,
    fontSize: H(14)
  }
});

export default CustomSectionList;