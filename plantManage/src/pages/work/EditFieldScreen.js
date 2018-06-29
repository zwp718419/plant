/**
 * Home page
 */

import React, { Component } from 'react';
import {
  Platform,
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  ToastAndroid,
  Text,
  Image
} from 'react-native';
import PropTypes from 'prop-types'; 

import { WhiteSpace,WingBlank,ActivityIndicator,Flex,List,Button,InputItem,Picker} from 'antd-mobile-rn';

import ApiUtil from '../../utils/ApiUtil';

const instructions = Platform.select({
});

// 所属类型选项
const belongArr = [
  {value:"SELF", label:"自己"},
  {value:"RENT", label:"租赁"},
  {value:"Other", label:"其它"}
]

export default class EditFieldScreen extends Component {
  static defaultProps = {  
    editType: '0', // 0：新曾；1：编辑；3：查看
    fieldId: 'FD00001',//土地编号
  }
  static propTypes = {
    editType: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.mounted = true;
    this.state = {
      animating: false,

      form: {
        fieldId: "",
        fieldName: '',
        size: "",
        belongToType: ["RENT"],
        belongToUser: "",
        remark: "",
        fieldRentInfoList:[
          {startDate: "", endDate: "", totalAmount:""}
        ]
      }
    }
  }

  static navigationOptions = {
    title: '土地信息编辑'
  }

  componentWillUnmount(){
    this.mounted = false
  }

  componentDidMount(){
    if (this.props.fieldId) {

      this.doGetInfo();
    }
  }

  // 组件值改变事件
  handleInputChange(name, value) {
    const { form: fieldForm } = this.state;
    fieldForm[name] = value;
    this.setState({
      "form": fieldForm
    });
  }
  
  // 保存
  doSave() {
    this.setState({
      animating: true
    });
    
    ApiUtil.saveField({
      data: this.state.form,
      success: (res)=>{
        this.setState({
          animating: false
        });
        ToastAndroid.show("保存成功！", ToastAndroid.LONG);
      }
    });
  }
  
  // 获取土地信息
  doGetInfo() {
    this.setState({
      animating: true
    });
    
    ApiUtil.getField({
      data: this.props,
      success: (res)=>{
        this.setState({
          animating: false,
          form: res.data
        });
      }
    });
  }

  render() {
    //fieldForm = this.state.form;
    const {navigate} = this.props.navigation;
    return (
      <ScrollView>
        {/* 土地信息 */}
        {this.renderFieldInfo()}
        {/* 租赁信息 */}
        {this.state.form.belongToType[0] === "RENT"?this.renderRentInfoList():null}

        <WhiteSpace/>
        <Button onClick={()=>this.doSave()}>保存</Button>
                
        <ActivityIndicator
          animating={this.state.animating}
          toast
          size="large"
          text="Loading..."
        />
      </ScrollView>
    )
  }

  // 基本信息
  renderFieldInfo() {
    return (
      <List renderHeader={() => '土地信息'}>
        {this.props.editType === '0'? null :
        <InputItem
          labelNumber={global.compant.labelNumber}
          value={this.state.form.fieldId}
          onChange={(v)=>this.handleInputChange("fieldId", v)}
          disabled="true"
        >
          土地编号
        </InputItem>
        }

        <InputItem
          placeholder="请输入土地名称"
          clear="true"
          labelNumber={global.compant.labelNumber}
          value={this.state.form.fieldName}
          onChange={(v)=>this.handleInputChange("fieldName", v)}
        >
          土地名称
        </InputItem>

        <InputItem
          type="number"
          pattern="[0-9]*"
          placeholder="请输入土地大小"
          clear="true"
          labelNumber={global.compant.labelNumber}
          value={this.state.form.size}
          onChange={(v)=>this.handleInputChange("size", v)}
          extra="亩"
        >
          土地大小
        </InputItem>

        <InputItem
          placeholder="请输入土地位置"
          clear="true"
          labelNumber={global.compant.labelNumber}
          value={this.state.form.address}
          onChange={(v)=>this.handleInputChange("address", v)}
        >
          位置
        </InputItem>

        <Picker
          data={belongArr}
          cols={1}
          labelNumber={global.compant.labelNumber}
          value={this.state.form.belongToType}
          onChange={(v)=>this.handleInputChange("belongToType", v)}
        >
          <List.Item arrow="horizontal" last>
            所属
          </List.Item>
        </Picker>

        {this.state.form.belongToType[0] === "RENT"?
        <InputItem
          placeholder="请输入所属者"
          clear="true"
          labelNumber={global.compant.labelNumber}
          value={this.state.form.belongToUser}
          onChange={(v)=>this.handleInputChange("belongToUser", v)}
        >
          所属者
        </InputItem>
        :
        null}
      </List>
    )
  }

  // 租赁信息
  renderRentInfoList() {
    return (
      // {this.state.form.fieldRentInfoList.map((item, i) => this.renderRentInfoDetail(item, i))}
      <View>
        <WhiteSpace/>
        <WingBlank>
          <Flex justify="end">
            <Flex.Item>
              <Text>租赁信息</Text>
            </Flex.Item>
            <Button type="ghost" size="small" onClick={()=>this.showRent("0", -1)}>添加</Button>
          </Flex>
        </WingBlank>
        <WhiteSpace/>

        <List renderHeader={() => null}>
        {this.state.form.fieldRentInfoList?
          this.state.form.fieldRentInfoList.map((item, i) => this.renderRentInfoDetail(item, i))
          :null}
        </List>
      </View>
    )
  }

  renderRentInfoDetail(detail, i) {
    return (
      
      <List.Item
          key={i}
          nowrap
          // extra="详细"
          multipleLine
          arrow="horizontal"
          onClick={()=>this.showRent("1", i)}
        >
        <List.Item.Brief>时间：{detail.startDate}~{detail.endDate}</List.Item.Brief>
        <List.Item.Brief>金额：{detail.totalAmount}</List.Item.Brief>
      </List.Item>
     
    );
  }

  showRent(editTypeFlag, i) {
    let row = "";
    let {fieldRentInfoList: rentList} = this.state.form;
    if (i >= 0) {
      row = JSON.stringify(rentList[i]);
    }
    return this.props.navigation.navigate("EditFieldRent", {editType: editTypeFlag, rowData: row,
      callBack:(backData) => {
        alert(backData);
        rentList[i] = JSON.parse(backData);
        this.setState({
          fieldRentInfoList: rentList
        });
      }
    });
  }

}

const styles = StyleSheet.create({

});
