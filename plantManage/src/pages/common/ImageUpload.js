/**
 * Home page
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import { List,ImagePicker} from 'antd-mobile-rn';

import ajax from '../../utils/fetch'
import DeviceStorage from '../../utils/DeviceStorage';

// 租赁明细编辑
export default class EditFieldRentScreen extends Component {
  static defaultProps = {  
    editType: '0', // 0：新曾；1：编辑；3：查看
    fieldId: '',//土地编号
  }
  static propTypes = {
    editType: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.state = {
      form: {
        startDate: undefined,
        endDate: undefined,
      },
      files: [
        {
          url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
          id: '2121',
        },
        {
          url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
          id: '2122',
        },
        {
          url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
          id: '2123',
        },
        {
          url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
          id: '2124',
        },
        {
          url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
          id: '2125',
        },
        {
          url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
          id: '2126',
        },
      ]
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

  handleFileChange = (files) => {
    this.setState({
      files,
    });
  }

  handleFile2Change = (files2) => {
    this.setState({
      files2,
    });
  }

  render() {
    return (
      <View>
        <List renderHeader={() => '租赁信息'}>
          <DatePicker
            value={this.state.form.startDate}
            mode="date"
            onChange={(v)=>this.handleInputChange("startDate", v)}
            format="YYYY-MM-DD"
          >
            <List.Item arrow="horizontal">合同开始日</List.Item>
          </DatePicker>

          <DatePicker
            value={this.state.form.endDate}
            mode="date"
            onChange={(v)=>this.handleInputChange("endDate", v)}
            format="YYYY-MM-DD"
          >
            <List.Item arrow="horizontal">合同结束日</List.Item>
          </DatePicker>
          
        </List>
        <List renderHeader={() => '合同文件'}>
        <View >
          <ImagePicker
            multiple="true"
            onChange={this.handleFileChange}
            files={this.state.files}
          />
        </View>
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
