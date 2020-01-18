import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';

//react-navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer'

//screens
import Home from './screens/Home';
import QRScan from './screens/QRScan';
import QRScanned from './screens/QRScanned';
import Config from './screens/Config';

//icons
import Icon5 from 'react-native-vector-icons/FontAwesome5';

//redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import configReducer from './reducers/configReducer';

//HomeStack
const HomeStack = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: ({ navigation }) => ({
                title: "ホーム"
            }),
        },
        QRScan: {
            screen: QRScan,
        },
        QRScanned: {
            screen: QRScanned,
            // navigationOptions: ({ navigation }) => ({
            //     title: 'foo',
            // })
        }
    }
);

//ConfigStack
const ConfigStack = createStackNavigator(
    {
        Config: {
            screen: Config,
            navigationOptions: ({ navigation }) => ({
                title: "設定"
            }),
        }
    }
);

//HomeTab
const HomeTab = createBottomTabNavigator(
    {
        _Home: {
            screen: HomeStack,
            navigationOptions: ({ navigation }) => ({
                title: "ホーム",
                tabBarIcon: ({ tintColor }) => (<Icon5 name="home" size={20} color={tintColor} />)
            }),
        },
        _Config: {
            screen: ConfigStack,
            navigationOptions: ({ navigation }) => ({
                title: "設定",
                tabBarIcon: ({ tintColor }) => (<Icon5 name="cog" size={20} color={tintColor} />)
            }),
        }
    }
);

const AppContainer = createAppContainer(HomeTab);

//createStore
const store = createStore(combineReducers({
    config: configReducer,
}), applyMiddleware());


//App
class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}

export default App;