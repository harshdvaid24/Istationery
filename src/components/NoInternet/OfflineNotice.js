import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, Keyboard } from 'react-native';
import { W, H } from '../../utils/GlobalStyles';
import GlobalStyle from '../../utils/GlobalStyles';
import CommonStyle from '../../utils/CommonStyle';
const { width, height } = Dimensions.get('window');
import NetInfo from '@react-native-community/netinfo';

import { connect } from 'react-redux';
import { resetNetConnection } from './../../actions/UIActions';

function MiniOfflineSign() {
  console.log('MiniOfflineSign');
  return (
    <View style={styles.offlineContainer}>
      <Image
        resizeMode="contain"
        source={require('./../../../resources/icons/nodata/no_connection.png')}
      />
      <Text style={styles.offlineText}>{'Please check your Internet connection.'}</Text>
    </View>
  );
}

class OfflineNotice extends Component {
  state = {
    isConnected: true,
  };

  componentDidMount() {
    // NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
    // Subscribe
    NetInfo.addEventListener(state => {
      // console.log("Connection type", state.type);
      // console.log("Is connected?", state.isConnected);

      this.setState({ isConnected: state.isConnected });
      this.props.resetNetConnection(state.isConnected);
      Keyboard.dismiss();
    });


  }

  componentWillUnmount() {
    // unsubscribe();
    // NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  /**
   * [handleConnectivityChange This method is called when connection chagned. online or offline]
   * @param  {Boolean} isConnected [this will be changed accroding net status value]
   * @return {[type]}              [description]
   */
  // handleConnectivityChange = isConnected => {
  //   this.setState({ isConnected });
  //   this.props.resetNetConnection(isConnected);
  //   Keyboard.dismiss();
  // };

  render() {
    //  console.log('OfflineNotice: render this.state.isConnected',this.state.isConnected);
    if (!this.state.isConnected) {
      return <MiniOfflineSign />;
    }
    return null;
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    flex:1,
    backgroundColor: GlobalStyle.colorSet.mainBgColor,
    justifyContent: 'center',
    alignItems: 'center',
    width,
     position: 'absolute',
     top: 0,
     bottom:0,
     height,
     height:height+H(40)
  },
  offlineText: {
    marginLeft: W(50),
    marginRight: W(50),
    marginTop:H(40),
    color: GlobalStyle.colorSet.appBlack,
    textAlign: 'center',
    fontSize: W(25),
    fontFamily: GlobalStyle.fontSet.Lite,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    resetNetConnection: dict => dispatch(resetNetConnection(dict)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(OfflineNotice);
