import React, {Component} from 'react';
import { StyleSheet, Text, View, Navigator,
	ImageBackground,
	Image,
	TouchableOpacity,
	Vibration,
	Alert,
	Dimensions
 } from 'react-native';

import {Font, Constants} from 'expo';

import { BallIndicator } from 'react-native-indicators';

import Global from '../Global';
import ProgressCircle from '../components/circle_progressbar/ProgressCircle';

var round_time = 0;
var min = 0;
var sec = 0;

var devicewidth = Dimensions.get('window').width

export default class GameScreen extends Component {
	static navigationOptions = {
		header: null,
	};

	constructor(props) {
		super(props);

		this.state = {

			first_call_summary: true,

			current_round: Global.current_round,

			pause_state: false,
			exiting_state: false,
			timer_text: '1 : 00',
			pecentage: 0,
			alarm_notify: false,

			keyword_array: Global.keywords,
			forbidden_words_array: Global.forbidden_words,

			selected_keyword: "",
			selected_forbiddend_words: [],

			score: 0,
			total_words: 0,
			correct_words: 0,
			skip_words: 0,
			penalty_point: Global.penaltyPoints,

			selected_team: Global.selected_team,

			showIndicator: false,
		};

	};

	initState = async() => {
		this.setState({
			first_call_summary: false,
			current_round: Global.current_round,
			keyword_array: Global.keywords,
			forbidden_words_array: Global.forbidden_words,

			selected_keyword: "",
			selected_forbiddend_words: [],

			score: 0,
			total_words: 0,
			correct_words: 0,
			skip_words: 0,
			penalty_point: Global.penaltyPoints,

			selected_team: Global.selected_team,

		});

		await this.select_keyword_forbidden_word();

		round_time = Global.roundTimer + 1;
		min = Global.roundTimer + 1;
		sec = 0;

		this.setState({timer_text: min + " : 00"});

		this.downTimer();
	}

	componentWillMount() {
		this.select_keyword_forbidden_word();

		round_time = Global.roundTimer + 1;
		min = Global.roundTimer + 1;
		sec = 0;
		this.setState({timer_text: min + " : 00"});

		this.downTimer();

	};

	play_sound = async (sound) => {
        if(Global.boolean_sound) {
			try {
				if(sound == 'general'){
					await Global.generalbutton_soundObject.setPositionAsync(0);
					await Global.generalbutton_soundObject.playAsync();
				} else if(sound == 'correct') {
					await Global.correctbutton_soundObject.setPositionAsync(0);
					await Global.correctbutton_soundObject.playAsync();
				} else if(sound == 'skip') {
					await Global.skipbutton_soundObject.setPositionAsync(0);
					await Global.skipbutton_soundObject.playAsync();
				} else if(sound == 'alarm') {
					await Global.alarm_soundObject.setPositionAsync(0);
					await Global.alarm_soundObject.playAsync();
				}
			} catch(error) {
				console.log(error);
			}
        }
        
	}

	// play_sound = async (sound) => {
    //     if(Global.boolean_sound) {
    //         const generalbutton_sound = new Expo.Audio.Sound();
    //         if(sound == 'general')
    //             await generalbutton_sound.loadAsync(require('../assets/sounds/general_button.mp3'));
    //         else if(sound == 'correct')
    //             await generalbutton_sound.loadAsync(require('../assets/sounds/correct_button.mp3'));
    //         else if(sound == 'skip')
    //             await generalbutton_sound.loadAsync(require('../assets/sounds/skip_button.mp3'));
    //         else if(sound == 'alarm')
    //             await generalbutton_sound.loadAsync(require('../assets/sounds/alarm_sound.mp3'));
    //         await generalbutton_sound.playAsync();
    //     }
        
    // }

    checkSecond(sec) {
	    if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
	    if (sec < 0) {sec = "59"};
	    return sec;
	}

    downTimer = async() => {

    	const self = this;
    	var countDownTimer = setInterval (async() =>  {

    		if(self.state.exit_state)
    			clearInterval(countDownTimer);

			if(!self.state.pause_state) {
	    		sec = self.checkSecond(sec - 1);
		    	if(sec == 59)
		    		min = min - 1;

		    	self.setState({timer_text: min + " : " + sec});
		    	tt = ((round_time - (min + 1)) * 60 + (60 - sec)) / (round_time * 60) * 100;
		    	self.setState({pecentage: tt});

		    	if(min == 0 && sec == 5) {
		    		self.setState({alarm_notify: true});

		    		self.play_sound('alarm');
		    	}

		    	if(tt == 100) {
		    		Vibration.vibrate(500);
		    		clearInterval(countDownTimer);
		    		self.setState({
		    			finish_round: true,
		    			alarm_notify: false,
					});
					if(self.state.selected_team == "A") {
						Global.A_round_score = this.state.score;
						Global.A_total_score += this.state.score;
						Global.A_correct_words = this.state.correct_words;
						Global.A_skip_words = this.state.skip_words;
						Global.total_words = this.state.total_words;
					}
					else if (self.state.selected_team == "B") {
						Global.B_round_score = this.state.score;
						Global.B_total_score += this.state.score;
						Global.B_correct_words = this.state.correct_words;
						Global.B_skip_words = this.state.skip_words;
						Global.total_words = this.state.total_words;
					}

					
					this.props.navigation.navigate("GameSummary", {initGameState: this.initState.bind(this)});
		    	}
		    	
	    	}
    	}, 1000);
	};
	
	setKeywords = () => {
		var selected_number = Math.round(Math.random() * (this.state.keyword_array.length - 1));
		this.setState({
			selected_keyword: this.state.keyword_array[selected_number],
			selected_forbiddend_words: this.state.forbidden_words_array[selected_number],
		});
	}
	
	select_keyword_forbidden_word = async() => {
		
		if(this.state.keyword_array.length > 0) {
			// var selected_number = Math.round(Math.random() * (this.state.keyword_array.length - 1));
			// this.setState({
			// 	selected_keyword: this.state.keyword_array[selected_number],
			// 	selected_forbiddend_words: this.state.forbidden_words_array[selected_number],
			// });
			this.setKeywords();
		} else {
			this.setState({
				showIndicator: true,
				pause_state: true
			});
			Global.keywords = [];
			Global.forbidden_words = [];
			self = this;
			var url = "http://52.37.178.217:9876/cards/" + Global.selected_language + "/" + Global.response_words_count * Global.response_words_array_index;
			await fetch(url)
				.then(response => response.json())
				.then(data => {
					
					console.log(data.length);
					networkStatus = true;
					card = data;
					var temp_array = [];
					if(card.length > 0) {
						if(Global.response_words_array_index === 0) {
							Global.response_words_count = card.length;
						}
						if(Global.response_words_count < card.length) {
							Global.response_words_array_index = 0;
							Global.response_words_count = 0;
						} else {
							Global.response_words_array_index = Global.response_words_array_index + 1;
						}

						for (i = 0; i < card.length; i ++) {
							Global.keywords.push(card[i].keyword);
							for (j = 0; j < card[i].forbidden_words.length; j ++) {
								temp_array.push(card[i].forbidden_words[j]);
							}
							Global.forbidden_words.push(temp_array);
							temp_array = [];
						}
						this.setState({
							keyword_array: Global.keywords,
							forbidden_words_array: Global.forbidden_words,
						}, () => {self.setKeywords();});
					} else {
						Global.response_words_array_index = 0;
						Global.response_words_count = 0;
						this.setState({
							keyword_array: [],
							forbidden_words_array: [],
						}, () => {self.select_keyword_forbidden_word();});
					}
				})
				.catch(function(error) {
					networkStatus = false;
					Alert.alert("Warning", "Network error");
				})

			this.setState({
				showIndicator: false,
				pause_state: false
			});

			// if(last_keywordArrayFromServer) {
			// 	Global.current_keyword_array_index = 0;
			// 	self = this;
			// 	var url = "http://52.37.178.217:9876/cards/" + Global.selected_language + "/" + Global.current_keyword_array_index;
			// 	await fetch(url)
			// 		.then(response => response.json())
			// 		.then(data => {
			// 			// console.log(data);
			// 			networkStatus = true;
			// 			card = data;
			// 			var temp_array = [];
			// 			if(card.length > 0) {
			// 				for (i = 0; i < card.length; i ++) {
			// 					Global.keywords.push(card[i].keyword);
			// 					for (j = 0; j < card[i].forbidden_words.length; j ++) {
			// 						temp_array.push(card[i].forbidden_words[j]);
									
			// 					}
			// 					Global.forbidden_words.push(temp_array);
			// 					temp_array = [];
			// 				}
			// 			} else {
			// 				last_keywordArrayFromServer = true;
			// 			}
			// 		})
			// 		.catch(function(error) {
			// 			networkStatus = false;
			// 			Alert.alert("Warning", "Network error");
			// 		})
			// }
		}
	};
	

    pauseButton_Click = () => {
    	this.setState({pause_state: true});
    	this.play_sound('general');
    }

    resumeButton_Click = () => {
    	this.setState({pause_state: false});
    	this.play_sound('general');
    }

    homeButton_Click = () => {

    	this.setState({
			exiting_state: true,
			keyword_array: [],
			forbidden_words_array: []
		});
		this.play_sound('general');
		Global.response_words_array_index = 0;
		Global.response_words_count = 0;
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
	
	removeItemAndSelect(item) {
		var keyword_array = [...this.state.keyword_array];
		var forbidden_array = [...this.state.forbidden_words_array];
		// var index = keyword_array.indexOf(item.target.value);
		for(index = 0; index < this.state.keyword_array.length - 1; index ++) {
			if(this.state.keyword_array[index] === item)
				break;
		}
		keyword_array.splice(index, 1);
		forbidden_array.splice(index, 1);
		Global.keywords.splice(index, 1),
		Global.forbidden_words.splice(index, 1);
		this.setState({
			keyword_array: keyword_array,
			forbidden_words_array: forbidden_array
		}, () => {this.select_keyword_forbidden_word();});
	}

    correctButton_Click = () => {
		this.play_sound('correct');
		this.setState({
			score: this.state.score + 1,
			correct_words: this.state.correct_words + 1,
			total_words: this.state.total_words + 1,
		});

		this.removeItemAndSelect(this.state.selected_keyword);
		
		// this.select_keyword_forbidden_word();

		
    }

    skipButton_Click = () => {
		this.play_sound('skip');
		this.setState({
			score: this.state.score - this.state.penalty_point,
			skip_words: this.state.skip_words + 1,
			total_words: this.state.total_words + 1,
		});
		this.removeItemAndSelect(this.state.selected_keyword);
		// this.select_keyword_forbidden_word();
    }

	
	render() {
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
					<View style = {styles.contents}>
						<View style = {{flexDirection: 'row', width: '100%', height: '10%', alignItems: 'center', justifyContent: 'center'}}>
							<View style = {{width: 30, height: 30}}>
							{
								!this.state.pause_state &&
								<TouchableOpacity onPress = {() => this.pauseButton_Click()}>
									<Image style = {{width: '100%', height: '100%'}} source = {require('../assets/images/pause.png')}/>
								</TouchableOpacity>
							}
							</View>
							
							<View style = {{width: '90%', height: '50%', alignItems: 'center', justifyContent: 'center'}}>
								<Text style = {styles.gametitle}> Round {this.state.current_round} </Text>
							</View>
							
						</View>
						{
							!this.state.pause_state &&
								<View style = {{width: '100%', height: '90%', alignItems: 'center', justifyContent: 'center'}}>
									<View style = {styles.sandtimer}>
										<View style = {{zIndex: 5}}>
											<ProgressCircle
									            percent={this.state.pecentage}
									            radius={50}
									            borderWidth={8}
									            color="#3399FF"
									            shadowColor="#c5a8d3"
									            bgColor="#74a03c"
									        >
									            
									        </ProgressCircle>
								        </View>
								        <View style = {{zIndex: 10, position: 'absolute'}}>
								        {
								        	!this.state.alarm_notify &&
											<Image style = {{width: 30, height: 55}} source = {require('../assets/images/sandclock.png')}/>
								        }
								        {
								        	this.state.alarm_notify &&
											<Image style = {{width: 30, height: 55}} source = {require('../assets/images/sandclock.gif')}/>
								        }
										</View>
									</View>
									<View style = {styles.downtimer}>
										<Text style = {styles.timertext}>{this.state.timer_text}</Text>
									</View>
									<View style = {styles.team_scoreview}>
										<View style = {{justifyContent: 'center', alignItems: 'flex-start', width: '50%', height: '100%'}}>
											<Text style = {{fontSize: 20}}>TEAM {this.state.selected_team}</Text>
										</View>
										<View style = {{justifyContent: 'center', alignItems: 'flex-end', width: '50%', height: '100%'}}>
											<Text style = {{fontSize: 20}}>SCORE: {this.state.score}</Text>
										</View>
									</View>
									<View style = {styles.keywordview}>
										<Text style = {{fontSize: 0.07 * devicewidth}}> {this.state.selected_keyword} </Text>
									</View>
									<View style = {styles.forbiddenwordsview}>
										<View style = {{alignItems: 'center', justifyContent: 'center', width: '100%', height: '15%'}}>
											<Text style = {{fontSize: 20}}> RESTRICTED WORDS: </Text>
										</View>

										{
											this.state.selected_forbiddend_words.map((item, index) => 
											<View key = {index} style = {{alignItems: 'center', justifyContent: 'center', width: '100%', height: '15%'}}>
												<Text style = {{fontSize: 18}}> {item} </Text>
											</View>
											)
										}
										
									</View>
									<View style = {styles.buttonsview}>
										<View style = {{width: '50%', height: '100%', alignItems: 'flex-start', justifyContent: 'center'}}>
											<TouchableOpacity style = {styles.bottom_button_style} onPress = {() => this.correctButton_Click()}>
												<ImageBackground resizeMode= 'stretch' style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} borderRadius = {10} source = {require('../assets/images/button.png')}>
													<Text style = {styles.buttontext_style}>CORRECT</Text>
												</ImageBackground>
											</TouchableOpacity>
										</View>
										<View style = {{width: '50%', height: '100%', alignItems: 'flex-end', justifyContent: 'center'}}>
											<TouchableOpacity style = {styles.bottom_button_style} onPress = {() => this.skipButton_Click()}>
												<ImageBackground resizeMode= 'stretch' style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} borderRadius = {10} source = {require('../assets/images/button.png')}>
													<Text style = {styles.buttontext_style}>SKIP</Text>
												</ImageBackground>
											</TouchableOpacity>
										</View>
									</View>
								
								</View>
						}
						{
							this.state.pause_state &&
							<View style = {{width: '100%', height: '90%', alignItems: 'center', justifyContent: 'center'}}>
								<TouchableOpacity style = {styles.pausebutton_style} onPress = {() => this.resumeButton_Click()}>
									<ImageBackground resizeMode= 'stretch' style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} borderRadius = {10} source = {require('../assets/images/button.png')}>
										<Text style = {styles.buttontext_style}> Resume </Text>
									</ImageBackground>
								</TouchableOpacity>
								<TouchableOpacity style = {styles.pausebutton_style} onPress = {() => this.homeButton_Click()}>
									<ImageBackground resizeMode= 'stretch' style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} borderRadius = {10} source = {require('../assets/images/button.png')}>
										<Text style = {styles.buttontext_style}> Home </Text>
									</ImageBackground>
								</TouchableOpacity>
							</View>
						}
						
						
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
	gametitle: {
		fontSize: 30,
	},
	sandtimer: {
		width: '95%',
		height: '25%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	downtimer: {
		width: '95%',
		height: '10%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	timertext: {
		fontSize: 40,
	},
	team_scoreview: {
		flexDirection: 'row',
		width: '90%',
		height: '5%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	keywordview: {
		width: '90%',
		height: '15%',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderRadius: 10,
	},
	forbiddenwordsview: {
		width: '90%',
		height: '35%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonsview: {
		flexDirection: 'row',
		width: '90%',
		height: '10%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	pausebutton_style: {
		width: 200,
		height: 50,
		// borderWidth: 2,
		borderColor: '#444444',
		// borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 50,
	},
	bottom_button_style: {
		width: '90%', 
		height: '90%', 
		alignItems: 'center', 
		justifyContent: 'center', 
		// borderWidth: 1, 
		// borderRadius: 10,
	},
	buttontext_style: {
		fontSize: 25,
		color: '#ffffff',
		fontWeight: 'bold',
	},
	homebutton_style: {
		width: 150,
		height: 30,
		borderWidth: 2,
		borderColor: '#444444',
		// borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	homebuttontext_style: {
		fontSize: 20,
	},
});
