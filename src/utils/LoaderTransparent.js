// Default Component ....
import React, { Component } from 'react';
import { View, Dimensions, ImageBackground, ActivityIndicator } from 'react-native';

// Third Party ....
import PropTypes from 'prop-types'

// Utility ....
import GlobalStyles from './GlobalStyles'


const screenDimensions = Dimensions.get('window');
class Loader extends Component {

    static propTypes = {
        color: PropTypes.string,
        size: PropTypes.number,
        visible: PropTypes.bool,
        transparentBackground: PropTypes.bool
    }

    static defaultProps = {
        color: GlobalStyles.colorSet.txtRed,
        size: 20,
        visible: false,
        transparentBackground: true
    }

    constructor(props) {
        super(props);
    }
    render() {
        const { visible, transparentBackground } = this.props
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: (this.props.top) ? this.props.top : 0,
                left: 0,
                right: 0,
                bottom: 0,
                height: (visible) ? '100%' : 0,
                width: (visible) ? screenDimensions.width : 0,
                backgroundColor: (visible) ? (transparentBackground ? 'transparent' : 'rgba(0,0,0,0.6)') : 'transparent'
            }} >
                {(visible) && <ActivityIndicator size="large" color={GlobalStyles.colorSet.btnRed} />}
            </View>
        )
    }
}
module.exports = Loader
