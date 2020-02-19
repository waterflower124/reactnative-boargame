
import React, {Component} from 'react';
import { StyleSheet, Text, View, Navigator } from 'react-native';

import {SafeAreaView, createStackNavigator, createSwitchNavigator} from 'react-navigation';

import SplashScreen from './src/pages/SplashScreen';
import Home from './src/pages/Home';
import LanguageScreen from './src/pages/LanguageScreen';
import SettingScreen from './src/pages/SettingScreen';
import RulesScreen from './src/pages/RulesScreen';
import GameScreen from './src/pages/GameScreen';
import GameSummary from './src/pages/GameSummary';
import LandingScreen from './src/pages/LandingScreen';

const Navigation = createStackNavigator(
    {
        SplashScreen: {screen: SplashScreen, header: null},
        Home: {screen: Home},
        LanguageScreen: {screen: LanguageScreen}, 
        SettingScreen: {screen: SettingScreen},
        RulesScreen: {screen: RulesScreen},
        GameScreen: {screen: GameScreen, navigationOptions: null,},
        GameSummary: {screen: GameSummary, navigationOptions: null,},
        LandingScreen: {screen: LandingScreen, navigationOptions: null,},
    }
)

export default Navigation;
