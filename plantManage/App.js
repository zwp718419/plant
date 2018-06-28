/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  AppRegistry,
  StyleSheet,
  Image,
  YellowBox
} from 'react-native';

import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';


import LoginPage from './src/pages/LoginPage';
import HomePage from './src/pages/HomePage';
import WorkPage from './src/pages/WorkPage';
import MyPage from './src/pages/MyPage';

import NewPlantPage from './src/pages/work/NewPlantScreen';

import EditFieldPage from './src/pages/work/EditFieldScreen';
import EditFieldRentPage from './src/pages/work/EditFieldRentScreen';

import LightboxView from './src/pages/common/LightboxView';

const IconHome = require('./src/res/images/home.png')
const IconHomeSelected = require('./src/res/images/home_selected.png')
const IconCtg = require('./src/res/images/ctg.png')
const IconCtgSelected = require('./src/res/images/ctg_selected.png')
const IconUser = require('./src/res/images/user.png')
const IconUserSelected = require('./src/res/images/user_selected.png')

// 屏蔽警告
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
      super(props);
  }

  render() {
      return <SwitchStack/>;
  }
}

const styles = StyleSheet.create({
  icon: {
      width: 22,
      height: 22
  },
});

/* #################### 定义路由 #################### */
// 共通
// const CommonStack = createStackNavigator({
//     LightboxView: {
//         screen: LightboxView, 
//         navigationOptions: {
//             mode: 'modal',
//             headerMode: 'none',
//         }
//     }
// })

// 登陆画面
const LoginStack = createStackNavigator({
    Login: {
        screen: LoginPage
    }
});

// 主页
const HomeStack = createStackNavigator(
    {
        Home: {
            screen: HomePage
        }
    }, {
        navigationOptions: ({ navigation }) => (StackNavigationCustom(navigation))
    }
);

// 工作台
const WorkStack = createStackNavigator(
    {
        Work: {
            screen: WorkPage
        },
        // 新种植
        NewPlant: {
            screen: NewPlantPage
        },
        // 田地管理
        EditField : {
            screen: EditFieldPage
        },
        // 田地管理
        EditFieldRent : {
            screen: EditFieldRentPage
        },
        LightboxView: {
            screen: LightboxView
        }
    }, {
        navigationOptions: ({ navigation }) => (StackNavigationCustom(navigation))
    }
);

WorkStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
  
    return {
      tabBarVisible,
    };
};
  
// 我
const MyStack = createStackNavigator(
    {
        My: {
            screen: MyPage
        }
    }, {
        navigationOptions: ({ navigation }) => (StackNavigationCustom(navigation))
    }
);

// 底部导航
const TabStack = createBottomTabNavigator({
    Home: {
        screen:HomeStack,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => tabBarIconCustom(navigation, focused, tintColor),
            tabBarOptions: tabBarOptionsCustom
        })
    },
    Work: {
        screen:WorkStack,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => tabBarIconCustom(navigation, focused, tintColor),
            tabBarOptions: tabBarOptionsCustom
        })
    },
    My: {
        screen:MyStack,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => tabBarIconCustom(navigation, focused, tintColor),
            tabBarOptions: tabBarOptionsCustom
        })
    },
});

// Stack属性
const StackNavigationCustom = (navigation) => {
    return {
        headerStyle: {
            backgroundColor: '#62b900',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    }
}

// tabBar图标
const tabBarIconCustom = (navigation, focused, tintColor)=>{
    const { routeName } = navigation.state;
    let iconName;
    if (routeName === 'Home') {
        iconName = !focused ? IconHome : IconHomeSelected;
    } else if (routeName === 'Work') {
        iconName = !focused ? IconCtg : IconCtgSelected;
    } else if (routeName === 'My') {
        iconName = !focused ? IconUser : IconUserSelected;
    }
    
    return <Image style={styles.icon} source={iconName} color={tintColor}/>;
}
// tabBar属性
const tabBarOptionsCustom = {
    activeTintColor: '#62b900',
    inactiveTintColor: 'gray',
}

//
const SwitchStack = createSwitchNavigator(
    {
        LoginStack: LoginStack,
        TabStack: TabStack
    },
    {
        initialRouteName: 'LoginStack'
    }
);