import { StyleSheet } from 'react-native';
import GlobalStyle from '../../../utils/GlobalStyles';
import { W, H } from '../../../utils/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 25,
    backgroundColor: '#f6f7f8'
  },
  placeholderContainer: {
    width: '90%',
    backgroundColor: '#fff',
    height: 200
  },
  placeholder: {
    height: 8,
    marginTop: 6,
    marginLeft: 15,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#eeeeee'
  },
  row: {
    flexDirection: 'row',
    width: '100%'
  },
});

export default styles;
