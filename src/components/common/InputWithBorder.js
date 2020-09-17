import React, { useContext } from 'react';
import { TextInput, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from './Text';
import { ThemeContext } from '../../theme';
import CommonStyle from '../../utils/CommonStyle';
import GlobalStyle from '../../utils/GlobalStyles';

const InputWithBorder = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  assignRef,
  labelStyle,
  inputStyle,
  ...props
}) => {
  const theme = useContext(ThemeContext);

  return (
    <View style={[CommonStyle.SimpleInput,styles.containerStyle]}>
      <TextInput
        {...props}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.bodyText}
        autoCorrect={false}
        style={[styles.inputStyle(theme), inputStyle]}
        value={value}
        onChangeText={onChangeText}
        ref={(component) => { assignRef && assignRef(component); }}
      />
    </View>
  );
};

const styles = {
  containerStyle: theme => ({
    height: theme.dimens.defaultInputBoxHeight,
    backgroundColor: theme.colors.surface,
    marginVertical:5,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.9,
    borderWidth:0,
    borderBottomColor: GlobalStyle.colorSet.BorderGrey,
    borderRadius:W(1),
  }),
  inputStyle: theme => ({
    color: theme.colors.titleText,
    padding: theme.spacing.small,
    borderBottomWidth: 0,
   
    borderBottomColor: theme.colors.border,
    flex: 2,
  }),
  labelStyle: theme => ({
    paddingLeft: theme.spacing.large,
    flex: 1,
  }),
};

InputWithBorder.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  assignRef: PropTypes.func,
};

InputWithBorder.defaultProps = {
  label: null,
  value: '',
  placeholder: '',
  secureTextEntry: false,
  assignRef: () => {},
  onChangeText: () => {},
};

export { InputWithBorder };
