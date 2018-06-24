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

import { WhiteSpace,WingBlank,Flex,List,Button,InputItem,Picker,DatePicker,DatePickerView,ImagePicker,Modal} from 'antd-mobile-rn';

import ajax from '../../utils/fetch'
import DateUtil from '../../utils/DateUtil'
import DeviceStorage from '../../utils/DeviceStorage';

const instructions = Platform.select({
});


// 租赁明细编辑
export default class EditFieldRentScreen extends Component {
  static defaultProps = {  
    editType: '0', // 0：新曾；1：编辑；3：查看
    rowData: "",
  }
  static propTypes = {
    editType: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.mounted = true;
    this.state = {
      form: {
        companyCd: "",
        fieldId: "",
        rentNo: "",
        unitPrice: "",
        startDate: "",
        endDate: "",
        years: "",
        totalAmount: "",
        contractDate: "",
        fileGroupId: "",
        startDateTmp: undefined,
        endDateTmp: undefined,
        contractDateTmp: undefined,
        files: [
          {
            url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
            id: '2121',
          },
        ]
      },
    }
  }

  back = (state, goBack) => { //把属性传递过来，然后进行使用
    state.params.callBack(JSON.stringify(this.state.form)) //回调传值
    goBack() //点击POP上一个页面得方法
  }

  // 组件值改变事件
  handleInputChange(name, value) {
    const { form: fieldForm } = this.state;
    fieldForm[name] = value;

    if (name === 'endDateTmp' || name === 'startDateTmp') {
      fieldForm.years = this.calcYears(fieldForm.endDateTmp, fieldForm.startDateTmp);
    }
    
    if (name === 'endDateTmp' || name === 'startDateTmp' || name === 'unitPrice' || name === 'years') {
      fieldForm.totalAmount = this.calcTotalAmount(fieldForm.unitPrice, fieldForm.years);
    }
    this.setState({
      "form": fieldForm
    });
  }

  // 计算年数
  calcYears(endDate, startDate) {
    if (startDate && endDate) {
      return DateUtil.getDiffYear(endDate, startDate).toFixed(1);
    }
    return "0.0";
  }

  // 计算合计金额
  calcTotalAmount(unitPrice, years) {
    if (unitPrice, years) {
      let totalAmount = parseFloat(unitPrice) * parseFloat(years);
      return totalAmount.toFixed(2);
    }
    return "0.0";
  }

  // 图片改变事件
  handleFileChange = (files, operationType, index) => {
    
    if (operationType === 'remove') {
      Modal.alert('提示', '确认删除？', [
        { text: '取消'},
        { text: '确认', onPress: () => this.handleInputChange("files", files)},
      ]);
    } else {
      this.handleInputChange("files", files);
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  componentDidMount() {
    let {rowData} = this.props.navigation.state.params;
    if (rowData) {
      let tempForm = JSON.parse(rowData);

      tempForm.startDateTmp = DateUtil.parse(tempForm.startDate);
      tempForm.endDateTmp = DateUtil.parse(tempForm.endDate);
      tempForm.contractDateTmp = DateUtil.parse(tempForm.contractDate);
      this.setState({
        form: tempForm
      });
    }
  }

  render() {
    const {navigate,state,goBack} = this.props.navigation;

    return (
      <View>
        <List renderHeader={() => '租赁信息'}>
          <DatePicker
            value={this.state.form.startDateTmp}
            mode="date"
            onChange={(v)=>this.handleInputChange("startDateTmp", v)}
            format="YYYY-MM-DD"
          >
            <List.Item arrow="horizontal">合同开始日</List.Item>
          </DatePicker>

          <DatePicker
            value={this.state.form.endDateTmp}
            mode="date"
            onChange={(v)=>this.handleInputChange("endDateTmp", v)}
            format="YYYY-MM-DD"
          >
            <List.Item arrow="horizontal">合同结束日</List.Item>
          </DatePicker>

          <InputItem
            type="number"
            pattern="[0-9]*"
            placeholder="请输入单价"
            clear="true"
            labelNumber={global.compant.labelNumber}
            value={this.state.form.unitPrice}
            onChange={(v)=>this.handleInputChange("unitPrice", v)}
            extra="元"
          >
            单价
          </InputItem>

          <InputItem
            type="number"
            pattern="[0-9]*"
            placeholder="请输入年数"
            clear="true"
            labelNumber={global.compant.labelNumber}
            value={this.state.form.years}
            onChange={(v)=>this.handleInputChange("years", v)}
            extra="年"
          >
            年数
          </InputItem>

          <InputItem
            type="number"
            pattern="[0-9]*"
            placeholder="请输入合计金额"
            clear="true"
            labelNumber={global.compant.labelNumber}
            value={this.state.form.totalAmount}
            onChange={(v)=>this.handleInputChange("totalAmount", v)}
            extra="元"
          >
            合计金额
          </InputItem>
          
          <DatePicker
            value={this.state.form.contractDateTmp}
            mode="date"
            onChange={(v)=>this.handleInputChange("contractDateTmp", v)}
            format="YYYY-MM-DD"
          >
            <List.Item arrow="horizontal">签约日</List.Item>
          </DatePicker>

        </List>

        <List renderHeader={() => '合同文件'}>
          <WhiteSpace/>
          <WingBlank>
          <View>
            <ImagePicker
              multiple="true"
              onChange={this.handleFileChange}
              files={this.state.form.files}
            />
          </View>
          </WingBlank>
        </List>
        <WhiteSpace/>
        <Button onClick={()=>this.back(state, goBack)}>确定</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
