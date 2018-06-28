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

import { WhiteSpace,WingBlank,Flex,ActivityIndicator,Progress,List,Button,InputItem,Picker,DatePicker,DatePickerView,ImagePicker,Modal} from 'antd-mobile-rn';
import Lightbox from 'react-native-lightbox';


import ajax from '../../utils/fetch'
import DateUtil from '../../utils/DateUtil'
import DeviceStorage from '../../utils/DeviceStorage';
import ApiUtil from '../../utils/ApiUtil';

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
      animating: false,
      percent: 50,

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

  // 点击确认
  back = (state, goBack) => { //把属性传递过来，然后进行使用
    const { form: tempForm } = this.state;

    tempForm.startDate = DateUtil.format(tempForm.startDateTmp);
    tempForm.endDate = DateUtil.format(tempForm.endDateTmp);
    tempForm.contractDate = DateUtil.format(tempForm.contractDateTmp);
    this.setState({
      form: tempForm
    });
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

    if (unitPrice && years) {
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
      let params = {
        path: files[files.length - 1].url,    //本地文件地址
        name: 'sss.jpg'
      }

      this.uploadImage(params)
      .then(res=> {
          //请求成功
          //alert(JSON.stringify(res));
          // this.setState({
          //   animating: false
          // })
      }).catch(err=> {
          //请求失败
          //alert("ERROR: " + err);
          
      }).finally(()=>{
        this.setState({
          animating: false
        })
      })
      this.handleInputChange("files", files);
    }
  }

  onAdd() {
    let p = this.state.percent + 10;
    if (this.state.percent >= 100) {
      p = 0;
    }
    this.setState({ percent: p });
  }

  // 打开图片
  _onImageClick(index, files) {
    const mediaList = [];
    for (let i = 0; i < files.length; i++) {
      mediaList.push({photo: files[i].url});
    }
    this.props.navigation.navigate("LightboxView", {media: mediaList, index: index});
  }

  uploadImage(params) {
    return new Promise(function (resolve, reject) {
        let formData = new FormData();
        for (var key in params){
            formData.append(key, params[key]);
        }
        let file = {uri: params.path, type: 'multipart/form-data', name: 'image.jpg'};
        formData.append("file", file);

        fetch("http://192.168.136.171:9096/plant/API/api/file/upload", {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data;charset=utf-8',
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseData)=> {
                console.log('uploadImage', responseData);
                resolve(responseData);
            })
            .catch((err)=> {
                console.log('err', err);
                reject(err);
            });
    });
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
              files={this.state.form.files}
              onChange={this.handleFileChange}
              onImageClick={(index, files)=>this._onImageClick(index, files)}
            />
          </View>
          </WingBlank>
        </List>
        <WhiteSpace/>
        <Button onClick={()=>this.back(state, goBack)}>确定</Button>

        <ActivityIndicator
          animating={this.state.animating}
          toast
          size="large"
          text="Loading..."
        />
        <View style={{ marginRight: 10, height: 4, flex: 1 }}>
          <Progress percent={this.state.percent} />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  contain: {
    flex: 1,
    height: 150,
    width: 150,
  }
});
