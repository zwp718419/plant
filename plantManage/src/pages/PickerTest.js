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
  ScrollView,
  TouchableOpacity
} from 'react-native';

import {
  createStackNavigator
} from 'react-navigation';

import { List, Picker } from 'antd-mobile-rn';

const district = [
  {value: "AAA1", label: "AAAA1"},{value: "BBB1", label: "BBBB1"}
]

const CustomChildren = (props) => (
  <TouchableOpacity onPress={props.onClick}>
    <View
      style={{ height: 36, paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}
    >
      <Text style={{ flex: 1 }}>{props.children}</Text>
      <Text style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>{props.extra}</Text>
    </View>
  </TouchableOpacity>
);

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{value: "AAA1", label: "AAAA1"},{value: "BBB1", label: "BBBB1"}],
      value: ["BBB1"],
      pickerValue: ["AAA1"],
    };
  }
  onClick = () => {
    // console.log('start loading data');
    setTimeout(() => {
      this.setState({
        data: district,
      });
    }, 500);
  }
  onChange = (value) => {
    // console.log(value);
    this.setState({ value : value});
  }
  render() {
    return (
      <View style={{ marginTop: 30 }}>
        <List>
          <Picker
            data={this.state.data}
            cols={1}
            value={this.state.value}
            onChange={this.onChange}
          >
            <List.Item arrow="horizontal" last onClick={this.onClick}>
              省市选择(异步加载)
            </List.Item>
          </Picker>
          <Picker
            title="选择地区"
            data={district}
            cols={1}
            value={this.state.pickerValue}
            onChange={(v) => this.setState({ pickerValue: v })}
            onOk={(v) => this.setState({ pickerValue: v })}
          >
            <CustomChildren>Customized children</CustomChildren>
          </Picker>
        </List>
      </View>
    );
  }
}

export default createStackNavigator({
    LoginPage: {
      screen: LoginPage
    }
  }
);
