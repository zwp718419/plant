/**
 * Home page
 */

import React, { Component } from 'react';
import {
  Platform,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import { createStackNavigator } from 'react-navigation';

const instructions = Platform.select({
});

export default class NewPlantScreen extends Component {
  constructor(props) {
      super(props);
      this.state = {
        form: {
            fullName: 'Marco Polo',
            tos: false,
        }
      }
  }

  handleValueChange(values) {
    console.log('handleValueChange', values)
    this.setState({ form: values })
  }

  render() {
    const { fullName, tos, gender } = this.state.form
    return (
      <View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
});
