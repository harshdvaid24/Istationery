import * as React from 'react';
import { ActivityIndicator } from 'react-native';

const withLoadingScreen = WrappedComponent => {
  return class LoadingScreen extends React.PureComponent {
    render() {
      if (this.props.loading) return <ActivityIndicator size="small" color="white" />;
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withLoadingScreen;
