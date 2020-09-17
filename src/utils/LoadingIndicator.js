import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import GlobalStyles from './GlobalStyles';

export default class LoadingIndicator extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={GlobalStyles.colorSet.buttonColor} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: GlobalStyles.windowH - 150,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
