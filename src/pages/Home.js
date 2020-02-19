import React, {Component} from 'react';
import { StyleSheet, Text, View, Navigator,
	ImageBackground,
	Image,
	TouchableOpacity,
	StatusBar,
	BackHandler,
	TouchableHighlight,
	Platform,
	Vibration,
	Alert,
 } from 'react-native';

import {Font, Constants} from 'expo';

import Global from '../Global';
import { BallIndicator } from 'react-native-indicators';

import {
	Symbnerv,
	SAMAN
} from '../Global'

var networkStatus =  true;

export default class Home extends Component {
	static navigationOptions = {
		header: null,
	};

	constructor(props) {
		super(props);

		this.state = {
			networkStatus: true,
			isReady: false,
			// generalbutton_sound: new Expo.Audio.Sound(),

			showIndicator: false,
		};
	};

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

	play_sound = async (sound) => {
        if(Global.boolean_sound) {
			try {
				if(sound == 'general'){
					await Global.generalbutton_soundObject.setPositionAsync(0);
					await Global.generalbutton_soundObject.playAsync();
				}
				else if(sound == 'correct') {
					await Global.generalbutton_soundObject.setPositionAsync(0);
					await Global.generalbutton_soundObject.playAsync();
				}
			} catch(error) {
				console.log(error);
			}
        }
        
	}

	getCards = () => {
		this.setState({showIndicator: true});
		Global.keywords = [];
		Global.forbidden_words = [];
		self = this;
		var url = "http://52.37.178.217:9876/cards/" + Global.selected_language + "/0";
		return fetch(url)
			.then(response => response.json())
			.then(data => {
				// console.log(data);
				networkStatus = true;
				card = data;
				var temp_array = [];
				for (i = 0; i < card.length; i ++) {
					Global.keywords.push(card[i].keyword);
					for (j = 0; j < card[i].forbidden_words.length; j ++) {
						temp_array.push(card[i].forbidden_words[j]);
						
					}
					Global.forbidden_words.push(temp_array);
					temp_array = [];
				}
				Global.response_words_array_index = 1;
				Global.response_words_count = card.length;
				self.setState({showIndicator: false});
				// alert(Global.selected_language);
				// Vibration.vibrate(500);
				// this.props.navigation.navigate('GameScreen');

				// for (i = 0; i < Global.keywords.length; i ++) {
				// 	console.log("ppp:" + Global.keywords[i]);
				// 	for (j = 0; j < Global.forbidden_words[i].length; j ++) {
				// 		console.log("    " + Global.forbidden_words[i][j]);
				// 	}
				// }
				// console.log("ffff:   " + card[card.length - 1].keyword);
				// for (i = 0; i < 4; i ++)
				// 	console.log("    hhhh   " + card[card.length - 1].forbidden_words[i]);

				// console.log(card.length + "   " + Global.keywords.length + "  " + Global.forbidden_words.length);

			})
			.catch(function(error) {
				networkStatus = false;
				Alert.alert("Warning", "Network error");
				self.setState({showIndicator: false});
			})
		
			
	}
	

    startGameButton_Click = async() => {
		this.play_sound('general');
		if(Global.keywords.length === 0) {
			Global.keywords = [];
			Global.forbidden_words = [];

			await this.getCards();
			if( networkStatus ) {
				Vibration.vibrate(500);
				this.props.navigation.navigate('GameScreen');
			}
		} else {
			Vibration.vibrate(500);
			this.props.navigation.navigate('GameScreen');
		}
    }

    settingsButton_Click = () => {
		this.play_sound('general');
    	this.props.navigation.navigate('SettingScreen');
    }

    languagesButton_Click = () => {
    	this.play_sound('general');
    	this.props.navigation.navigate("LanguageScreen");
    }

    rulesButton_Click = () => {
    	this.play_sound('general');
    	this.props.navigation.navigate("RulesScreen");
    	// this.props.navigation.navigate("GameSummary");
    }

    exitButton_Click = () => {
    	// this.play_sound('general');
    	BackHandler.exitApp();
    }
	
	render() {
		if (!this.state.isReady) {
            return <Expo.AppLoading/>;
        }
		return (
			<View style={styles.container}>
				{
                    this.state.showIndicator &&
                    <View style = {{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', opacity: 0.5, zIndex: 100}}>
                        <View style = {{flex: 1}}>
                            <BallIndicator color = '#ffffff' size = {50} count = {8}/>
                        </View>
                    </View>
                }
				<ImageBackground style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} source = {require('../assets/images/background.jpg')}>
				{
					(Platform.OS == 'ios') &&
					<View style = {styles.contents}>
						{/* <Text style = {{marginBottom: 50, marginBottom: 50}}>
							<Text style = {[styles.gametitle, {fontFamily: 'SymbnervFont', fontSize: 55}]}>T</Text>
							<Text style = {[styles.gametitle, {fontFamily: 'SAMANFont'}]}>riOLingo</Text>
						</Text> */}
						<View style = {{marginBottom: 50, marginTop: 50, flexDirection: 'row'}}>
							<Text style = {[styles.gametitle, {fontFamily: 'SymbnervFont', fontSize: 55}]}>T</Text>
							<Text style = {[styles.gametitle, {fontFamily: 'SAMANFont', marginLeft: -3}]}>riOLingo</Text>
						</View>
						<TouchableOpacity style = {styles.button_style} onPress = {() => this.startGameButton_Click()}>
							<ImageBackground resizeMode= 'stretch' style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} borderRadius = {10} source = {require('../assets/images/button.png')}>
								<Text style = {styles.buttontext_style}>Start Game</Text>
							</ImageBackground>
						</TouchableOpacity>
						<TouchableOpacity style = {styles.button_style} onPress = {() => this.settingsButton_Click()}>
							<ImageBackground resizeMode= 'stretch' style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} borderRadius = {10} source = {require('../assets/images/button.png')}>
								<Text style = {styles.buttontext_style}>Settings</Text>
							</ImageBackground>
						</TouchableOpacity>
						<TouchableOpacity style = {styles.button_style} onPress = {() => this.languagesButton_Click()}>
							<ImageBackground resizeMode= 'stretch' style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} borderRadius = {10} source = {require('../assets/images/button.png')}>
								<Text style = {styles.buttontext_style}>Languages</Text>
							</ImageBackground>
						</TouchableOpacity>
						<TouchableOpacity style = {[styles.button_style, {marginBottom: 0}]} onPress = {() => this.rulesButton_Click()}>
							<ImageBackground resizeMode= 'stretch' style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} borderRadius = {10} source = {require('../assets/images/button.png')}>
								<Text style = {styles.buttontext_style}>Rules</Text>
							</ImageBackground>
						</TouchableOpacity>
					</View>
				}
				{
					(Platform.OS == 'android') &&
						<View style = {{width: '100%', height: '100%'}}>
							<View style = {{width: '100%', height: '90%', alignItems: 'center', justifyContent: 'center'}}>
								{/* <Text style = {{marginBottom: 50, marginTop: 50}}>
									<Text style = {[styles.gametitle, {fontFamily: 'SymbnervFont', fontSize: 55}]}>T</Text>
									<Text style = {[styles.gametitle, {fontFamily: 'SmegalomFont'}]}>ri</Text>
									<Text style = {[styles.gametitle, {fontFamily: 'SymbnervFont'}]}>o</Text>
									<Text style = {[styles.gametitle, {fontFamily: 'SymbnervFont'}]}>LingO</Text>
								</Text> */}
								<View style = {{marginBottom: 50, marginTop: 50, flexDirection: 'row'}}>
									<Text style = {[styles.gametitle, {fontFamily: 'SymbnervFont', fontSize: 55}]}>T</Text>
									<Text style = {[styles.gametitle, {fontFamily: 'SAMANFont', marginLeft: -3}]}>riOLingo</Text>
								</View>
								<TouchableOpacity style = {styles.button_style} onPress = {() => this.startGameButton_Click()}>
									<ImageBackground resizeMode= 'stretch' style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} borderRadius = {10} source = {require('../assets/images/button.png')}>
										<Text style = {styles.buttontext_style}>Start Game</Text>
									</ImageBackground>
								</TouchableOpacity>
								<TouchableOpacity style = {styles.button_style} onPress = {() => this.settingsButton_Click()}>
									<ImageBackground resizeMode= 'stretch' style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} borderRadius = {10} source = {require('../assets/images/button.png')}>
										<Text style = {styles.buttontext_style}>Settings</Text>
									</ImageBackground>
								</TouchableOpacity>
								<TouchableOpacity style = {styles.button_style} onPress = {() => this.languagesButton_Click()}>
									<ImageBackground resizeMode= 'stretch' style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} borderRadius = {10} source = {require('../assets/images/button.png')}>
										<Text style = {styles.buttontext_style}>Languages</Text>
									</ImageBackground>
								</TouchableOpacity>
								<TouchableOpacity style = {[styles.button_style, {marginBottom: 0}]} onPress = {() => this.rulesButton_Click()}>
									<ImageBackground resizeMode= 'stretch' style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} borderRadius = {10} source = {require('../assets/images/button.png')}>
										<Text style = {styles.buttontext_style}>Rules</Text>
									</ImageBackground>
								</TouchableOpacity>
							</View>
							<View style = {{width: '100%', height: '10%', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
								<TouchableOpacity style = {styles.exitbutton_style} onPress = {() => this.exitButton_Click()}>
									<ImageBackground resizeMode= 'stretch' style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} borderRadius = {10} source = {require('../assets/images/exit.png')}>
									</ImageBackground>
								</TouchableOpacity>
							</View>
						</View>
				}
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
	contents: {
		width: '80%',
		height: '80%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	gametitle: {
		fontSize: 50,
		// marginBottom: 100,
		color: '#0000ff',
		// fontWeight: 'bold',
	},
	button_style: {
		width: 200,
		height: 50,
		// borderWidth: 2,
		borderColor: '#444444',
		// borderRadius: 30,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 50,
	},
	buttontext_style: {
		fontSize: 30,
		color: '#ffffff',
		fontWeight: 'bold',
	},
	exitbutton_style: {
		width: 30,
		height: 30,
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		marginBottom: 20,
		marginRight: 20,
	},
});