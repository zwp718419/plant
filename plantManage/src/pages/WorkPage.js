/**
 * Work page
 */

import React, { Component } from 'react';
import {
  Platform,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Button,
  Image
} from 'react-native';

// data:菜单
import menuList from './WorkPage.json';

let navigation = null;
export default class WorkPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          expandFlag:{id: "0", expand: false},//true表示有数据更新 
        };
        navigation = this.props.navigation;
    }
    static navigationOptions = {
        title: '标题1'
    }
    
  // 点击事件
  onPressItem(id, link){
    let l = this.state.expandFlag;
    // 控制跳转
    if (link) {
        return navigation.navigate(link);
    }
    // 控制折叠/展开
    if (l.id == id || l.id.startsWith(id)) {
        // 折叠/展开
        l.expand = !l.expand;
        this.setState({expandFlag:l});
    } else {
        if (!id.startsWith(l.id)) {
            // 之前的复原
            l.expand = !l.expand;
            this.setState({expandFlag:l});
        }
        // 展开新的
        l.id = id;
        l.expand = true;
        this.setState({expandFlag:l});
    }
  }
  
  renderMenuList(list, mainFlag) {
    if (list != null) {
        return list.map((item, i) => this.renderItem(item, i, mainFlag)); 
    }
  }

  renderItem(item, i, mainFlag) { 
    return (
        <View key={i}>
            <TouchableOpacity onPress={this.onPressItem.bind(this, item.id, item.link)}>
                {mainFlag?
                <View style={styles.itemContainer} >
                    <Text>{item.name}</Text>
                    {item.subMenu!=null?this.renderIcon(item.id):null}
                </View>
                :
                <View style={styles.subItemContainer} >
                    <Text>{item.name}</Text>
                    {item.subMenu!=null?this.renderIcon(item.id):null}
                </View>
                }
            </TouchableOpacity>
            {(this.state.expandFlag.id.startsWith(item.id) && this.state.expandFlag.expand)?this.renderMenuList(item.subMenu, false):null}
        </View>
    ); 
  }
  // 菜单右侧图标
  renderIcon(id) {
    return (
        <View>
        {this.state.expandFlag.id.startsWith(id)?
            <Image source={require("../res/images/icon_caret-down.png")} />
        :
            <Image source={require("../res/images/icon_caret-right.png")} />
        }
        </View>
    );
  }

  render() {
    return (
        <View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {this.renderMenuList(menuList.menus, true)}
            </ScrollView>
        </View>
      );
    }
}

  const styles = StyleSheet.create({
    contentContainer: {
        padding: 20,
    },
    center: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    itemContainer: {
        height: 50,
        paddingLeft: 10,
    
        paddingRight: 10, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        backgroundColor: 'white', 
        borderBottomColor: '#ccc', 
        borderBottomWidth: 0.5
    },
    subItemContainer: {
        height: 30,
        paddingLeft: 20,
    
        paddingRight: 10, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        backgroundColor: 'white', 
        borderBottomColor: '#ccc', 
        borderBottomWidth: 0.5
    }
  });
