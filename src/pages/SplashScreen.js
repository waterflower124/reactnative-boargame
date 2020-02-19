import React, {Component} from 'react';
import { StyleSheet, Text, View, Navigator,
	Image,
	ImageBackground,
	StatusBar,
	BackHandler
 } from 'react-native';
import {Font, Constants} from 'expo';

import Global from '../Global';

import {
	Symbnerv,
	SAMAN
} from '../Global'



export default class SplashScreen extends Component {
	static navigationOptions = {
		header: null,
	};

	constructor(){
		super();

		this.state={
		  isVisible : true,
		  isReady: false,
		}
	}

	getLanguagesJsonData = () => {
		return fetch('http://52.37.178.217:9876/languages')
			.then(response => response.json())
			.then(data => {
				var languages = data.languages;
				for(i = 0; i < languages.length; i ++) {
					Global.languages_array.push(languages[i]);
					
				}
				// console.log(data);
			})
			.catch(function(error) {
				console.log("Network error");
				Alert.alert('Warning!', 'Network error!');
			})
	}


	 Hide_Splash_Screen = () => {

	    this.setState({
	    	isVisible : false
	    });

	    this.props.navigation.navigate('LandingScreen');
	}

	async componentWillMount() {

		await Expo.Font.loadAsync({
			SymbnervFont: Symbnerv,
			SAMANFont: SAMAN
		});
		

		// await Expo.Asset.loadAsync([
		// 	require('../assets/images/background.jpg'),
		// ]);
		this.setState({isReady: true});

		var that = this;

		setTimeout(function(){
			that.Hide_Splash_Screen();
		}, 3000);

		await this.getLanguagesJsonData();

		BackHandler.addEventListener('hardwareBackPress', () => {return true});
		Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
		StatusBar.setHidden(true);

		await Global.background_soundObject.loadAsync(require('../assets/sounds/background_sound.mp3'));
		await Global.generalbutton_soundObject.loadAsync(require('../assets/sounds/general_button.mp3'));
		await Global.correctbutton_soundObject.loadAsync(require('../assets/sounds/correct_button.mp3'));
		await Global.skipbutton_soundObject.loadAsync(require('../assets/sounds/skip_button.mp3'));
		await Global.alarm_soundObject.loadAsync(require('../assets/sounds/alarm_sound.mp3'));
		// this.setState({isReady: true});
	};

	render() {
		if (!this.state.isReady) {
            return <Expo.AppLoading/>;
        }

		// let Splash_Screen = (
		// 	<ImageBackground style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} source = {require('../assets/images/background.jpg')}>
		// 		<Text style = {{marginBottom: 100,}}>
		// 			<Text style = {[styles.gametitle, {fontFamily: 'SymbnervFont'}]}>T</Text>
		// 			<Text style = {[styles.gametitle, {fontFamily: 'SmegalomFont'}]}>ri</Text>
		// 			<Text style = {[styles.gametitle, {fontFamily: 'SymbnervFont'}]}>O</Text>
		// 			<Text style = {[styles.gametitle, {fontFamily: 'SymbnervFont'}]}>Lingo</Text>
		// 		</Text>
		// 		<Image style = {styles.logostyle} resizeMode = {'contain'} source = {require('../assets/images/logo.png')}/>
		// 	</ImageBackground>
		// );
		
		

		return (
			<View style={styles.container}>
				{
				  (this.state.isVisible === true) ? 
				  	<ImageBackground style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} source = {require('../assets/images/background.jpg')}>
						{/* <Text style = {{marginBottom: 100,}}>
							<Text style = {[styles.gametitle, {fontFamily: 'SymbnervFont', fontSize: 55}]}>T</Text>
							<Text style = {[styles.gametitle, {fontFamily: 'SAMANFont'}]}>riOLingo</Text>
						</Text> */}
						<View style = {{marginBottom: 100, flexDirection: 'row'}}>
							<Text style = {[styles.gametitle, {fontFamily: 'SymbnervFont', fontSize: 55}]}>T</Text>
							<Text style = {[styles.gametitle, {fontFamily: 'SAMANFont', marginLeft: -3}]}>riOLingo</Text>
						</View>
						<Image style = {styles.logostyle} resizeMode = {'contain'} source = {require('../assets/images/icon.png')}/>
					</ImageBackground>
			  		: null
		        }
				
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