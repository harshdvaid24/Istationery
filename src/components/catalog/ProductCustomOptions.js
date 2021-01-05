/**
 * Created by Dima Portenko on 14.05.2020
 */
import React, { useContext } from 'react';
import { StyleSheet, View,Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { ModalSelect } from '../common';
import { uiProductCustomOptionUpdate } from '../../actions';
import { ThemeContext } from '../../theme';
import CommonStyle from './../../utils/CommonStyle'
import GlobalStyle,{W,H} from './../../utils/GlobalStyles'


export const ProductCustomOptions = ({ currentProduct, product }) => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { customOptions } = currentProduct;

  if (!customOptions) {
    return <View />;
  }

  const customOptionSelect = (optionId, optionValue) => {
    const { selectedCustomOptions } = currentProduct;
    const updatedCustomOptions = { ...selectedCustomOptions, [optionId]: optionValue };
    dispatch(uiProductCustomOptionUpdate(updatedCustomOptions, product.id));
  };

  return customOptions.map((option) => {
    const data = option.values.map(value => ({
      label: value.title,
      key: value.option_type_id,
    }));

    return (
      <View style={[styles.modalStyle(theme),CommonStyle.HorizontalCenter,CommonStyle.marginLR20]}>
      <ModalSelect
        style={[CommonStyle.width80p]}
        disabled={data.length === 0}
        key={option.option_id}
        label={option.title}
        attribute={option.option_id}
        value={option.option_id}
        data={data}
        onChange={customOptionSelect}
      />
           <Image style={[CommonStyle.Icon15,{marginRight:W(20)}]} source={require("./.././../../resources/icons/down-arrow.png")} />
      </View>
     
    );
  });
};

const styles = StyleSheet.create({
  modalStyle: theme => ({
   // alignSelf: 'center',
   width: '48%',
   height:H(30),
   flexDirection:'row',
   backgroundColor:'white',
   // borderWidth:1,
    marginTop: theme.spacing.large,
   marginBottom: theme.spacing.large,
   height: H(42),
   borderWidth:1,
   borderColor:GlobalStyle.colorSet.BorderGrey,
   borderRadius:H(7),
   backgroundColor:GlobalStyle.colorSet.white
  }),
});