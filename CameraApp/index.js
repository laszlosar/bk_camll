/**
 * BuzzBus React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, ScrollView
} from 'react-native';
import { StackNavigator, NavigationActions} from 'react-navigation';
import PreviewScreen from './src/screens/PreviewScreen/index';
import EditScreen from './src/screens/EditScreen/index';


// global.__DEV__=false;
const Routes = StackNavigator({
    PreviewScreen: {screen:PreviewScreen, navigationOptions:{header:true}},
    EditScreen:{screen:EditScreen,navigationOptions:{header:true}}
})
//TrackPlayer.registerEventHandler(require('./src/components/RemoteControlHandler.js'));
AppRegistry.registerComponent('myApp', () =>  Routes);
