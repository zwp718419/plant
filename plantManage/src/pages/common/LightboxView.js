/**
 * LightboxView
 */

import React, { Component } from 'react';
import {
  Platform,
  AppRegistry,
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  ToastAndroid,
  Text,
  Image
} from 'react-native';
import PropTypes from 'prop-types'; 

import PhotoBrowser from 'react-native-photo-browser';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

export default class LightboxView extends Component {
  static navigationOptions = {
    //1.隐藏导航头部
    header: null
  };

  _goBack = () => {
    this.props.navigation.goBack(null);
  }

  render() {
    const { params } = this.props.navigation.state;
    const media = params.media;
    const index = params.index || 0;
    return (
        <PhotoBrowser
            onBack={this._goBack}
            mediaList={media}
            initialIndex={index}
            displayActionButton={true}
            displayTopBar={true}
        />
    );
  }
}

const styles = StyleSheet.create({
});
