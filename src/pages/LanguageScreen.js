import React, {Component} from 'react';
import { StyleSheet, Text, View, Navigator,
	ImageBackground,
	Image,
	TouchableOpacity,
	ScrollView,
	Alert,
 } from 'react-native';

import {Font, Constants} from 'expo';

import Global from '../Global';

export default class LanguageScreen extends Component {
	static navigationOptions = {
		header: null,
	};

	constructor(props) {
		super(props);
		this.state = {
			languages_array: Global.languages_array,
			selected_language: Global.selected_language,
			generalbutton_sound: new Expo.Audio.Sound(),
		};
	};

	async componentWillMount() {
		// Global.music = "llllll"
		// alert(Global.music);
		// await this.state.generalbutton_sound.loadAsync(require('../assets/sounds/general_button.mp3'));
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
	getCardsJsonData(language) {
		// fetch('https://s3-us-west-2.amazonaws.com/peekaboo-upatchava/telugu/cards.json')
		var url = "http://52.37.178.217:9876/data/" + language;
		fetch('http://52.37.178.217:9876/data/telugu')
			.then(response => response.json())
			.then(data => {
				card = data.cards;

				for (i = 0; i < card.length; i ++) {
					Global.keywords.push(card[i]);
					for (j = 0; j < card[i].forbidden_words.length; j ++) {
						Global.forbidden_words.push(card[1].forbidden_words[i]);
					}
				}
			})
			.catch(function(error) {
				Alert.alert("Warnning", "Network error");
			})
	}

    async lanuageButton_Click(language) {
		this.play_sound('general');

		Global.keywords = [];
		Global.forbidden_words = [];
		Global.selected_language = language;
		this.setState({
			selected_language: language,
		});
		// var url = "http://52.37.178.217:9876/cards/" + Global.selected_language + "/0";
		// console.log(url);
		// fetch(url)
		// 	.then(response => response.json())
		// 	.then(data => {
		// 		card = data;
		// 		var temp_array = [];
		// 		for (i = 0; i < card.length; i ++) {
		// 			Global.keywords.push(card[i].keyword);
		// 			for (j = 0; j < card[i].forbidden_words.length; j ++) {
		// 				temp_array.push(card[i].forbidden_words[j]);
						
		// 			}
		// 			Global.forbidden_words.push(temp_array);
		// 			temp_array = [];
		// 		}

		// 		for (i = 0; i < Global.keywords.length; i ++) {
		// 			console.log("ppp:" + Global.keywords[i]);
		// 			for (j = 0; j < Global.forbidden_words[i].length; j ++) {
		// 				console.log("    " + Global.forbidden_words[i][j]);
		// 			}
		// 		}
		// 		// console.log("ffff:   " + card[card.length - 1].keyword);
		// 		// for (i = 0; i < 4; i ++)
		// 		// 	console.log("    hhhh   " + card[card.length - 1].forbidden_words[i]);

		// 		// console.log(card.length + "   " + Global.keywords.length + "  " + Global.forbidden_words.length);

		// 	})
		// 	.catch(function(error) {
		// 		Alert.alert("Warnning", "Network error");
		// 	})

    }

    homeButton_Click = () => {
    	this.play_sound('general');
    	this.props.navigation.navigate('Home');
    }
	
	render() {
		return (
			<View style={styles.container}>
				<ImageBackground style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} source = {require('../assets/images/background.jpg')}>
					<View style = {{width: '100%', height: '20%', alignItems: 'center', justifyContent: 'center'}}>
						<Text style = {styles.gametitle}> Select Language</Text>
					</View>
						
					<View style = {{width: '100%', height: '70%', alignItems: 'center', justifyContent: 'center'}}>
						<ScrollView showsVerticalScrollIndicator = {false}>
						{
							this.state.languages_array.map((item, index) => 
								<TouchableOpacity key = {index} style = {styles.button_style} onPress = {() => this.lanuageButton_Click(item)}>
									<ImageBackground resizeMode= 'stretch' style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} borderRadius = {10} source = {require('../assets/images/button.png')}>
										{
											(item == this.state.selected_language) ? 
											<Text style = {styles.selectedbuttontext_style}>{item}</Text>
											: <Text style = {styles.buttontext_style}>{item}</Text>
										}
									</ImageBackground>
								</TouchableOpacity>
							)
						}
							
						</ScrollView>
					</View>
					<View style = {{width: '100%', height: '10%', alignItems: 'center', justifyContent: 'center'}}>
						<TouchableOpacity style = {styles.homebutton_style} onPress = {() => this.homeButton_Click()} >
							<ImageBackground resizeMode= 'stretch' style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} borderRadius = {10} source = {require('../assets/images/button.png')}>
								<Text style = {styles.homebuttontext_style}>Home</Text>
							</ImageBackground>
						</TouchableOpacity>
					</View>
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
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	gametitle: {
		fontSize: 40,
		color: '#ffffff',
		fontWeight: 'bold',
	},
	button_style: {
		width: 160,
		height: 40,
		// borderWidth: 2,
		borderColor: '#444444',
		// borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 30,
	},
	buttontext_style: {
		fontSize: 25,
		color: '#ffffff',
		fontWeight: 'bold',
	},
	selectedbuttontext_style: {
		fontSize: 25,
		color: '#f47575',
		fontWeight: 'bold',
	},
	homebutton_style: {
		width: 120,
		height: 30,
		// borderWidth: 2,
		borderColor: '#444444',
		// borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	homebuttontext_style: {
		fontSize: 20,
		color: '#ffffff',
		fontWeight: 'bold',
	},
});