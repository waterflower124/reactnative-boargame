import React, {Component} from 'react';
import { StyleSheet, Text, View, Navigator,
	ImageBackground,
	Image,
	TouchableOpacity,
	ScrollView,
	Vibration,
	Alert,
 } from 'react-native';

import {Font, Constants} from 'expo';

import Global from '../Global';

export default class RulesScreen extends Component {
	static navigationOptions = {
		header: null,
	};

	constructor(props) {
		super(props);
	};
	
	componentWillMount() {
		Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
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

    homeButton_Click = () => {
    	this.play_sound('general');
    	this.props.navigation.navigate('Home');
    }

    gameButton_Click = () => {
		this.play_sound('general');
		if(Global.keywords.length === 0) {
			Global.keywords = [];
			Global.forbidden_words = [];
			// console.log(Global.selected_language + "     ::::::::::::::");
			var url = "http://52.37.178.217:9876/cards/" + Global.selected_language + "/0";
			// console.log("rules        " + url);
			fetch(url)
				.then(response => response.json())
				.then(data => {
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

					Vibration.vibrate(500);
					this.props.navigation.navigate('GameScreen');

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
					Alert.alert("Warning", "Network error");
				})
		} else {
			Vibration.vibrate(500);
			this.props.navigation.navigate('GameScreen');
		}

    	// Vibration.vibrate(500);
    	
    	// this.props.navigation.navigate('GameScreen');
    }

	
	render() {
		return (
			<View style={styles.container}>
				<ImageBackground style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} source = {require('../assets/images/background.jpg')}>
					<View style = {{width: '100%', height: '10%', alignItems: 'center', justifyContent: 'center'}}>
						<Text style = {styles.gametitle}> Game Rules </Text>
					</View>
						
					<View style = {{width: '95%', height: '80%', alignItems: 'center', justifyContent: 'center'}}>
						<ScrollView showsVerticalScrollIndicator = {false}>
							<View style = {{width: '95%'}}>
								<Text style = {styles.contentssection_title}>Game Rules</Text>
								{/* <Text style = {styles.contentstext_style}>
									TEAM WHICH FIRST SCORES NUMBER OF POINTS WINS THE GAME. YOU CAN SCORE POINTS BY GUESSING KEYWORDS WITHOUT USING FORBIDDEN WORDS(TABOO WORDS). WHICH ARE ON THE GIVEN CARD.
								</Text> */}

								{/* <View style = {{width: '95%'}}>
									<View style = {{flexDirection: 'row'}}>
										<Image style = {styles.bullet_image} source = {require('../assets/images/num1.png')}/>
										<Text style = {styles.contentstext_style}>
											DEVIDE PLAYERS INTO TWO TEAMS. NUMBER OF PLAYERS MIGHT BE ODD.
										</Text>
									</View>
									<View style = {{flexDirection: 'row'}}>
										<Image style = {styles.bullet_image} source = {require('../assets/images/num2.png')}/>
										<Text style = {styles.contentstext_style}>
											EVERY TEAM DECIDES ORDER OF THEIR CLUE-GIVER(PERSON WHO GIVES HINTS ABOUT THE KEYWORD).
										</Text>
									</View>
									<View style = {{flexDirection: 'row'}}>
										<Image style = {styles.bullet_image} source = {require('../assets/images/num3.png')}/>
										<Text style = {styles.contentstext_style}>
											CLUE-GIVER OF FIRST TEAM TAKES PHONE AND THE GAME BEGINS.
										</Text>
									</View>
									<View style = {{flexDirection: 'row'}}>
										<Image style = {styles.bullet_image} source = {require('../assets/images/num4.png')}/>
										<Text style = {styles.contentstext_style}>
											ONCE TEAM GUESS THE KEYWORD, TAP "CORRECT" BUTTON.
										</Text>
									</View>
									<View style = {{flexDirection: 'row'}}>
										<Image style = {styles.bullet_image} source = {require('../assets/images/num5.png')}/>
										<Text style = {styles.contentstext_style}>
											IF YOU WANT TO SKIP KEYWORD, TAP "SKIP" BUTTON(PLEASE HAVE IN MIND YOU MIGHT GET A PENELTY POINTS - DEPENDING ON YOUR SETTING) 
										</Text>
									</View>
									<View style = {{flexDirection: 'row'}}>
										<Image style = {styles.bullet_image} source = {require('../assets/images/num6.png')}/>
										<Text style = {styles.contentstext_style}>
											THE TEAM CONTINUE GUESSING UNTIL THE TIMER RUNS OUT. 
										</Text>
									</View>
									<View style = {{flexDirection: 'row'}}>
										<Image style = {styles.bullet_image} source = {require('../assets/images/num7.png')}/>
										<Text style = {styles.contentstext_style}>
											PASS THE DEVICE TO THE OPPOSITE TEAM. 
										</Text>
									</View>
									<View style = {{flexDirection: 'row'}}>
										<Image style = {styles.bullet_image} source = {require('../assets/images/num8.png')}/>
										<Text style = {styles.contentstext_style}>
											PLEASE CONTINUE STEPS 3~7 UNTIL THE GAME IS OVER. 
										</Text>
									</View>
								</View>

								<Text style = {styles.contentssection_title}>RULES FOR CLUES</Text>

								<View style = {{width: '95%'}}>
									<View style = {{flexDirection: 'row'}}>
										<Image style = {styles.bullet_image} source = {require('../assets/images/num1.png')}/>
										<View>
											<Text style = {styles.contentstext_style}>
												NO PART OF ANY GIVEN KEYWORDS CAN BE USED AS A CLUE:
											</Text>
											<Text style = {styles.contentstext_style}>
												IF THE KEYWORD IS "COOKING SALT", YOU CAN NOT USE NEITHER "COOKING" OR "SALT". IF THE KEYWORD IS "AIRPLANE", YOU CAN NOT USE "AIR" OR "PLANE".
											</Text>
										</View>
									</View>
									<View style = {{flexDirection: 'row'}}>
										<Image style = {styles.bullet_image} source = {require('../assets/images/num2.png')}/>
										<View>
											<Text style = {styles.contentstext_style}>
												NO FORM OF ANY GIVEN WORD CAN BE USED.
											</Text>
											<Text style = {styles.contentstext_style}>
												IF THE GUESS WORD IS "DRIVE", YOU CAN NOT USE "DRIVEN".
											</Text>
										</View>
									</View>
									<View style = {{flexDirection: 'row'}}>
										<Image style = {styles.bullet_image} source = {require('../assets/images/num3.png')}/>
										<Text style = {styles.contentstext_style}>
											NO GESTURES CAN BE MADE.
										</Text>
									</View>
									<View style = {{flexDirection: 'row'}}>
										<Image style = {styles.bullet_image} source = {require('../assets/images/num4.png')}/>
										<Text style = {styles.contentstext_style}>
											NO SOUND EFFECTS OR NOISES CAN BE MADE.
										</Text>
									</View>
									<View style = {{flexDirection: 'row'}}>
										<Image style = {styles.bullet_image} source = {require('../assets/images/num5.png')}/>
										<Text style = {styles.contentstext_style}>
											YOU CANNOT USE KEYWORD SOUND LIKE OR RHYMES WITH.
										</Text>
									</View>
									<View style = {{flexDirection: 'row'}}>
										<Image style = {styles.bullet_image} source = {require('../assets/images/num6.png')}/>
										<Text style = {styles.contentstext_style}>
											NO INITIALS OR ABBREVATIONS CAN BE USED.
										</Text>
									</View>
								</View> */}
								<View style = {{width: '95%'}}>
									<View style = {{flexDirection: 'row'}}>
										<Image style = {styles.bullet_image} source = {require('../assets/images/num1.png')}/>
										<Text style = {styles.contentstext_style}>
											Two or more teams or two or more individual players are needed to play the game.
										</Text>
									</View>
									<View style = {{flexDirection: 'row'}}>
										<Image style = {styles.bullet_image} source = {require('../assets/images/num2.png')}/>
										<Text style = {styles.contentstext_style}>
											Prior to beginning the game, all teams can agree upon the number of points required to win and the team that scores this number wins the game.
										</Text>
									</View>
									<View style = {{flexDirection: 'row'}}>
										<Image style = {styles.bullet_image} source = {require('../assets/images/num3.png')}/>
										<Text style = {styles.contentstext_style}>
											The word located in the box is the keyword. Each player scores a point by describing this word, but all of the other words listed below are prohibited from being used to describe the keyword.
										</Text>
									</View>
									<View style = {{flexDirection: 'row'}}>
										<Image style = {styles.bullet_image} source = {require('../assets/images/num4.png')}/>
										<Text style = {styles.contentstext_style}>
											Each team will select one teammate every round who will be the designated ‘clue-giver'. The clue-giver of the 1st team should click on the ‘Start’ button when their team is ready. A member of the opposing team will stand in as a referee to ensure that the clue-giver isn’t using any of the prohibited words while trying to describe the keyword.
										</Text>
									</View>
									<View style = {{flexDirection: 'row'}}>
										<Image style = {styles.bullet_image} source = {require('../assets/images/num5.png')}/>
										<Text style = {styles.contentstext_style}>
										 	Every time a team guesses the keyword correctly, tap the ‘Correct’ button .
										</Text>
									</View>
									<View style = {{flexDirection: 'row'}}>
										<Image style = {styles.bullet_image} source = {require('../assets/images/num6.png')}/>
										<Text style = {styles.contentstext_style}>
											If a player wishes to skip a word, please tap on the ‘Skip’ icon. Please note that there is a penalty for skipping words. 
										</Text>
									</View>
									<View style = {{flexDirection: 'row'}}>
										<Image style = {styles.bullet_image} source = {require('../assets/images/num7.png')}/>
										<Text style = {styles.contentstext_style}>
											Each team will be alternating between rounds to score points. 
										</Text>
									</View>
									<View style = {{flexDirection: 'row'}}>
										<Image style = {styles.bullet_image} source = {require('../assets/images/num8.png')}/>
										<Text style = {styles.contentstext_style}>
											Each team will continue to guess until time’s up! 
										</Text>
									</View>
								</View>

								<Text style = {styles.contentssection_title}>Restrictions for the clue-giver</Text>

								<View style = {{width: '95%'}}>
									<View style = {{flexDirection: 'row'}}>
										<Image style = {styles.bullet_image} source = {require('../assets/images/num1.png')}/>
										<View>
											<Text style = {styles.contentstext_style}>
												You may not use a direct translation from any other language to describe the key word.
											</Text>
										</View>
									</View>
									<View style = {{flexDirection: 'row'}}>
										<Image style = {styles.bullet_image} source = {require('../assets/images/num2.png')}/>
										<View>
											<Text style = {styles.contentstext_style}>
												You may not use any of the associated words listed below the keyword in your descriptions.
											</Text>
										</View>
									</View>
									<View style = {{flexDirection: 'row'}}>
										<Image style = {styles.bullet_image} source = {require('../assets/images/num3.png')}/>
										<Text style = {styles.contentstext_style}>
											You may not use a part of the keyword in order to describe it.
										</Text>
									</View>
									<View style = {{flexDirection: 'row'}}>
										<Image style = {styles.bullet_image} source = {require('../assets/images/num4.png')}/>
										<Text style = {styles.contentstext_style}>
											You may not use sounds effects or gestures.
										</Text>
									</View>
								</View>
							</View>
						</ScrollView>
					</View>
					<View style = {{flexDirection: 'row', width: '100%', height: '10%', alignItems: 'center', justifyContent: 'center'}}>
						<View style = {{width: '50%', height: '100%',alignItems: 'center', justifyContent: 'center'}}>
							<TouchableOpacity style = {styles.homebutton_style} onPress = {() => this.homeButton_Click()} >
								<ImageBackground resizeMode= 'stretch' style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} borderRadius = {10} source = {require('../assets/images/button.png')}>
									<Text style = {styles.homebuttontext_style}>Home</Text>
								</ImageBackground>
							</TouchableOpacity>
						</View>
						<View style = {{width: '50%', height: '100%',alignItems: 'center', justifyContent: 'center'}}>
							<TouchableOpacity style = {styles.homebutton_style} onPress = {() => this.gameButton_Click()} >
								<ImageBackground resizeMode= 'stretch' style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} borderRadius = {10} source = {require('../assets/images/button.png')}>
									<Text style = {styles.homebuttontext_style}>Begin</Text>
								</ImageBackground>
							</TouchableOpacity>
						</View>
						
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
		width: 200,
		height: 50,
		borderWidth: 2,
		borderColor: '#444444',
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 50,
	},
	buttontext_style: {
		fontSize: 30,
		color: '#ffffff',
		fontWeight: 'bold',
	},
	homebutton_style: {
		width: 150,
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
	contentssection_title: {
		fontSize: 23, 
		marginBottom: 10,
		fontWeight: 'bold'
	},
	bullet_image: {
		width: 20, 
		height: 20,
		marginRight: 10,
	},
	contentstext_style: {
		fontSize: 18,
		marginBottom: 10,
		textAlign: 'justify'
	}
});



