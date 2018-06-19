/**
 * MyPage page
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

const instructions = Platform.select({
});

export default class MyPage extends Component {
  constructor(props) {
      super(props);
      this.state = {
      }
  }

  render() {
      return (
          <View style={styles.page0}>
            <Text style={{fontSize:18,padding:15,color: 'blue'}}>This is MyPage Page</Text>
          </View>
      );
  }
}

const styles = StyleSheet.create({
    page0: {
        flex: 1,
        //backgroundColor: 'yellow'
    }
});