import React, {Component} from 'react';
import { StyleSheet, Text, View, Navigator,
	ImageBackground,
	Image,
	TouchableOpacity,
	Vibration,
	Alert,
 } from 'react-native';

import {Font, Constants} from 'expo';

import Global from '../Global';
import ProgressCircle from '../components/circle_progressbar/ProgressCircle';
// import { Glob } from 'glob';

var round_time = 0;
var min = 0;
var sec = 0;
var A_total_score = "";
var B_total_score = "";

export default class GameSummary extends Component {
	static navigationOptions = {
		header: null,
	};

	constructor(props) {
		super(props);

		this.state = {
			selected_team: Global.selected_team,
			next_team: '',
			current_round: Global.current_round,
			A_total_score: "",
			B_total_score: "",

			round_score: 0,
			correct_words: 0,
			skip_words: 0,
			total_words: 0,

			isGameOver: false,
		};

	};

	initState = async() => {
	// 	this.setState({
	// 		selected_team: Global.selected_team,
	// 		next_team: '',
	// 		current_round: Global.current_round,
	// 		A_total_score: "",
	// 		B_total_score: "",

	// 		round_score: 0,
	// 		correct_words: 0,
	// 		skip_words: 0,
	// 		total_words: 0,

	// 	});
	};

	componentWillMount() {
		Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);


		this.setState({
			current_round: Global.current_round,
			// selected_team: Global.selected_team,
		});

		if(this.state.selected_team == 'A') {
			this.setState({next_team: 'B'});
		}
		else if(this.state.selected_team == 'B') {
			this.setState({next_team: 'A'});
		}


		if(Global.A_total_score < 10)
			this.setState({A_total_score: "0" + Global.A_total_score});
		else
			this.setState({A_total_score: Global.A_total_score});

		if(Global.B_total_score < 10)
			this.setState({B_total_score: "0" + Global.B_total_score});
		else
			this.setState({B_total_score: Global.B_total_score});

		if(this.state.selected_team == "A") {
			this.setState({
				round_score: Global.A_round_score,
				correct_words: Global.A_correct_words,
				skip_words: Global.A_skip_words,
				total_words: Global.total_words,
			});
		} else if(this.state.selected_team == "B") {
			this.setState({
				round_score: Global.B_round_score,
				correct_words: Global.B_correct_words,
				skip_words: Global.B_skip_words,
				total_words: Global.total_words,
			});

			if((Global.A_total_score > (Global.pointsToWin + 1) * 25) || (Global.B_total_score > (Global.pointsToWin + 1) * 25)) {
				this.setState({isGameOver: true});
				if(Global.A_total_score > Global.B_total_score)
					this.showWinAlert(1);
				else if(Global.A_total_score < Global.B_total_score)
					this.showWinAlert(-1);
				else if(Global.A_total_score == Global.B_total_score)
					this.showWinAlert(0);
			}

		}
		// console.log("Game summary");
	
	};

	showWinAlert(team) {
		var wintext = '';
		if(team == 1)
			wintext = "Team A Win";
		else if(team == -1)
			wintext = "Team B Win";
		else if(team == 0)
			wintext = "Tie";
			Alert.alert("CONGRATULATIONS!", wintext, [{text: 'OK', onPress: this.gameInitialization}]);
	}

	gameInitialization = () => {

		Global.response_words_array_index = 0;
		Global.response_words_count = 0;

		Global.current_round = 1;

		Global.selected_team = "A";   ////0 is TEAM A, 1 is TEAM B

		Global.total_words = 0;

		Global.A_total_score = 0;
		Global.A_round_score = 0;
		Global.A_round_total_word = 0;
		Global.A_correct_words = 0;
		Global.A_skip_words = 0;
		Global.B_total_score = 0;
		Global.B_round_score = 0;
		Global.B_round_total_word = 0;
		Global.B_correct_words = 0;
		Global.B_skip_words = 0;

		this.props.navigation.navigate('Home');
	}

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
		Global.keywords = [],
		Global.forbidden_words = [],

		Global.currrent_cardsindex = 0,

		Global.current_round = 1,

		Global.selected_team = "A",   ////0 is TEAM A, 1 is TEAM B

		Global.total_words = 0,

		Global.A_total_score = 0,
		Global.A_round_score = 0,
		Global.A_round_total_word = 0,
		Global.A_correct_words = 0,
		Global.A_skip_words = 0,
		Global.B_total_score = 0,
		Global.B_round_score = 0,
		Global.B_round_total_word = 0,
		Global.B_correct_words = 0,
		Global.B_skip_words = 0,

    	this.props.navigation.navigate('Home');
	}


    startButton_Click = () => {
		this.play_sound('general');

		if(this.state.selected_team == 'A')
			Global.selected_team = 'B';
		else if(this.state.selected_team == 'B')
			Global.selected_team = 'A';
		
		if(this.state.selected_team == "B")
			Global.current_round ++;

		this.props.navigation.navigate("GameScreen");
		this.props.navigation.state.params.initGameState();
    }

	
	render() {
		return (
			<View style={styles.container}>
				<ImageBackground style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} source = {require('../assets/images/background.jpg')}>
					<View style = {styles.gamesummary_view}>
						<View style = {{width: '100%', height: '30%', alignItems: 'center', justifyContent: 'center'}}>
							<Text style = {styles.title_text}> GAME SUMMARY </Text>
						</View>
						<View style = {{width: '100%', height: '70%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
							<View style = {{width: '50%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
								<Text style = {styles.content_text}> TEAM A </Text>
								<Text style = {styles.subtitle_text}> {this.state.A_total_score} </Text>
							</View>
							<View style = {{width: '50%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
								<Text style = {styles.content_text}> TEAM B </Text>
								<Text style = {styles.subtitle_text}> {this.state.B_total_score} </Text>
							</View>
						</View>
					</View>
					<View style = {styles.roundsummary_view}>
						<View style = {{width: '100%', height: '30%', alignItems: 'center', justifyContent: 'center'}}>
							<Text style = {styles.subtitle_text}> ROUND SUMMARY {this.state.current_round} </Text>
						</View>
						<View style = {{width: '100%', height: '30%', alignItems: 'center', justifyContent: 'center'}}>
							<View style = {{width: '100%', height: 50, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 10}}>
								<Text style = {styles.subtitle_text}> TEAM {this.state.selected_team} </Text>
							</View>
						</View>
						<View style = {{width: '100%', height: '40%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
							<View style = {{width: '60%', height: '100%', alignItems: 'flex-start', justifyContent: 'center'}}>
								<Text style = {styles.content_text}> CORRECT WORDS </Text>
								<Text style = {styles.content_text}> SKIPPED WORDS </Text>
								<Text style = {styles.content_text}> SCORE </Text>
							</View>
							<View style = {{width: '40%', height: '100%', alignItems: 'flex-end', justifyContent: 'center'}}>
								<Text style = {styles.content_text}> {this.state.correct_words}/{this.state.total_words} </Text>
								<Text style = {styles.content_text}> {this.state.skip_words} </Text>
								<Text style = {styles.content_text}> {this.state.round_score} </Text>
							</View>
						</View>
					</View>
					<View style = {styles.ready_view}>
						<Text style = {styles.subtitle_text}> GET READY </Text>
						<View style = {{width: '100%', height: 60, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 10}}>
							<Text style = {{fontSize: 40}}> TEAM {this.state.next_team} </Text>
						</View>
					</View>
					<View style = {styles.button_view}>
						<View style = {{width: '50%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
							<TouchableOpacity style = {styles.button} onPress = {() => this.homeButton_Click()}>
								<ImageBackground resizeMode= 'stretch' style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} borderRadius = {10} source = {require('../assets/images/button.png')}>
									<Text style = {styles.startbutton_style}> HOME </Text>
								</ImageBackground>
							</TouchableOpacity>
						</View>
						<View style = {{width: '50%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
							<TouchableOpacity style = {styles.button} onPress = {() => this.startButton_Click()}>
								<ImageBackground resizeMode= 'stretch' style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} borderRadius = {10} source = {require('../assets/images/button.png')}>
									<Text style = {styles.startbutton_style}> START </Text>
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
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	gamesummary_view: {
		width: '90%',
		height: '20%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	roundsummary_view: {
		width: '90%',
		height: '35%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	ready_view: {
		width: '90%',
		height: '35%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title_text: {
		fontSize: 35,
		color: '#ffffff',
		fontWeight: 'bold',
	},
	subtitle_text: {
		fontSize: 30,
	},
	content_text: {
		fontSize: 20,
	},
	button_view: {
		width: '100%',
		height: '10%',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	button: {
		width: '90%',
		height: 50,
		// borderWidth: 1, 
		borderRadius: 10,
		alignItems: 'center', 
		justifyContent: 'center'
	},
	bottom_button_style: {
		width: '90%', 
		height: '90%', 
		alignItems: 'center', 
		justifyContent: 'center', 
		borderWidth: 1, 
		// borderRadius: 10,
	},
	startbutton_style: {
		fontSize: 30,
		color: '#ffffff',
		fontWeight: 'bold',
	},
});
