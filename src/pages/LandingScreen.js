import React, {Component} from 'react';
import { StyleSheet, Text, View, Navigator,
	Image,
	ImageBackground,
	StatusBar,
	TouchableOpacity,
	BackHandler
 } from 'react-native';
import {Font, Constants} from 'expo';

import Global from '../Global';

import {
	Symbnerv,
	SAMAN
} from '../Global'



export default class LandingScreen extends Component {
	static navigationOptions = {
		header: null,
	};

	constructor(){
		super();

		this.state={
		  isReady: false,
		}
	}

	async componentWillMount() {

		await Expo.Font.loadAsync({
			SymbnervFont: Symbnerv,
			SAMANFont: SAMAN
		});

		this.setState({isReady: true});

		BackHandler.addEventListener('hardwareBackPress', () => {return true});
		Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
		StatusBar.setHidden(true);

	};

	render() {
		if (!this.state.isReady) {
            return <Expo.AppLoading/>;
        }
		return (
			<View style={styles.container}>
				  	<ImageBackground style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} source = {require('../assets/images/background.jpg')}>
						<View style = {{marginBottom: 50, flexDirection: 'row'}}>
							<Text style = {[styles.gametitle, {fontFamily: 'SymbnervFont', fontSize: 55}]}>T</Text>
							<Text style = {[styles.gametitle, {fontFamily: 'SAMANFont', marginLeft: -3}]}>riOLingo</Text>
						</View>
						<Image style = {styles.logostyle} resizeMode = {'contain'} source = {require('../assets/images/logo.jpg')}/>
						<TouchableOpacity style = {{marginTop: 50}} onPress = {() => this.props.navigation.navigate('Home')}>
							<Text style = {{fontSize: 50, fontWeight: 'bold', color: '#0000ff', }}>Let's Play</Text>
						</TouchableOpacity>
					</ImageBackground>
				
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',

	},
	gametitle: {
		fontSize: 50,
		color: '#0000ff',
		// fontWeight: 'bold',
	},
	logostyle: {
		width: '70%',
		height: '40%',
		resizeMode: 'stretch',
	},
});