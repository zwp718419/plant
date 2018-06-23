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

import DeviceStorage from '../utils/DeviceStorage';

const instructions = Platform.select({
});

export default class MyPage extends Component {
  constructor(props) {
      super(props);
      //mounted = true;
      this.state = {
          userName: 'A'
      }
      
  }

  componentWillUnmount(){
    //this.mounted = false
  }

  componentDidMount(){
    console.log("componentDidMount");
    this.getSkUser();
  }

  getSkUser() {
    console.log("getSkUser");
    DeviceStorage.get('SK_USER').then((value) => {
        this.setState({
            userName: value.userName
        })
    });
  }

  render() {
      return (
          <View style={styles.page0}>
            <Text style={{fontSize:18,padding:15,color: 'blue'}}>{this.state.userName}</Text>
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