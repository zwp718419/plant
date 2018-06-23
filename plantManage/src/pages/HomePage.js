/**
 * Home page
 */

import React, { Component } from 'react';
import {
  Platform,
  AppRegistry,
  StyleSheet,
  ToastAndroid,
  Text,
  View,
  Image
} from 'react-native';

import ajax from '../utils/fetch'
import DeviceStorage from '../utils/DeviceStorage';

const instructions = Platform.select({
});

export default class HomePage extends Component {

  constructor(props) {
      super(props);
      this.mounted = true;
      this.state = {
          title:'This is Home Page'
      }
  }
  
  componentWillUnmount(){
    this.mounted = false
  }

  componentDidMount(){
    this.login();
  }

  login() {
    let _this = this;
    // 删除用户缓存信息
    DeviceStorage.delete("SK_USER");
    ajax({
        url: 'user/login',
        data: {userCd: '10007', password: 'gggg'},
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        success: (res)=> {
            if (res.code === '1000') {
                // 保存用户缓存信息
                DeviceStorage.save("SK_USER", res.data);
                _this.setState({
                    title: res.data.user.userName
                });
            } else {
                ToastAndroid.show(res.msg, ToastAndroid.LONG);
            }
        },
        error: (err)=> {
            ToastAndroid.show("网络连接失败！", ToastAndroid.LONG);
        }
    });
  }

  render() {
    return (
        <View style={styles.page0}>
        <Text style={{fontSize:18,padding:15,color: 'blue'}}>{this.state.title}</Text>
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