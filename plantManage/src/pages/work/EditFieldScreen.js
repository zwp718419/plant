/**
 * Home page
 */

import React, { Component } from 'react';
import {
  Platform,
  AppRegistry,
  StyleSheet,
  ScrollView,
  Text,
  Image
} from 'react-native';

import { createStackNavigator } from 'react-navigation';

import { WhiteSpace,WingBlank,Flex,List,Button,InputItem,Picker} from 'antd-mobile-rn';

const instructions = Platform.select({
});

const belongArr = [
  {value:"1", label:"AA"},
  {value:"2", label:"BB"}
]

//let fieldForm = null;
export default class EditFieldScreen extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      form: {
        fieldId: "AAAAA",
        fieldName: 'Marco Polo',
        fieldSize: "400",
        fieldBelong: ["2"],
        fieldRentInfoList:[
          {validStartDate:"2018-06-12"},
        ]
      }
    }
  }

  static navigationOptions = {
    title: '土地信息编辑'
  }

  handleInputChange(name, value) {
    const { form: fieldForm } = this.state;
    fieldForm[name] = value;
    this.setState({
      "form": fieldForm
    });
  }

  render() {
    //fieldForm = this.state.form;
    const {navigate} = this.props.navigation;
    return (
      <ScrollView>
        {this.renderFieldInfo()}

        {this.state.form.fieldBelong[0] === "2"?this.renderRentInfoList():null}
      </ScrollView>
    )
  }

  // 基本信息
  renderFieldInfo() {
    return (
        <List renderHeader={() => '基本'}>
        <InputItem
          placeholder="有标签"
          clear="true"
          value={this.state.form.fieldId}
          onChange={(v)=>this.handleInputChange("fieldId", v)}
        >
          输入框
        </InputItem>

        <InputItem
          placeholder="有标签"
          clear="true"
          value={this.state.form.fieldName}
          onChange={(v)=>this.handleInputChange("fieldName", v)}
        >
          输入框
        </InputItem>

        <InputItem
          type="number"
          pattern="[0-9]*"
          placeholder="有标签"
          clear="true"
          value={this.state.form.fieldSize}
          onChange={(v)=>this.handleInputChange("fieldSize", v)}
          extra="元"
        >
          输入框
        </InputItem>

        <Picker
          data={belongArr}
          cols={1}
          value={this.state.form.fieldBelong}
          onChange={(v)=>this.handleInputChange("fieldBelong", v)}
        >
          <List.Item arrow="horizontal" last>
            省市选择
          </List.Item>
        </Picker>
      </List>
    )
  }

  renderRentInfoList() {
    return (
      
        // {this.state.form.fieldRentInfoList.map((item, i) => this.renderRentInfoDetail(item, i))}
        <List renderHeader={() => 'basic'}>
        {this.state.form.fieldRentInfoList.map((item, i) => this.renderRentInfoDetail(item, i))}
        </List>
      
    )
  }
  renderRentInfoDetail(detail, i) {
    return (
      
      <List.Item
          key={i}
          wrap
          extra="详细"
          multipleLine
          arrow="horizontal"
        >
        <List.Item.Brief>时间：{detail.validStartDate}</List.Item.Brief>
        <List.Item.Brief>金额：</List.Item.Brief>
      </List.Item>
     
    );
  }

}

const styles = StyleSheet.create({

});
