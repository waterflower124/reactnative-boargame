import React, {Component} from 'react';
import { StyleSheet, Text, View, Navigator, Alert } from 'react-native';
import {
  Platform,
  Button,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,

} from 'react-native';

import {Font, Constants} from 'expo';

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from '../components/radiobutton/RadioButton';
import { PlaySound, StopSound, PlaySoundRepeat, PlaySoundMusicVolume } from 'react-native-play-sound';

import Global from '../Global';



export default class SettingScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            radio_level: [{label: 'Level 1(for Children)', value: 0}, {label: 'Level 2(for Adults)', value: 1}],
            radio_time: [{label: '1 min', value: 0}, {label: '2 min', value: 1}, {label: '3 min', value: 2}, {label: '4 min', value: 3}, {label: '5 min', value: 4}],
            radio_winpoint: [{label: '25', value: 0}, {label: '50', value: 1}, {label: '75', value: 2}, {label: '100', value: 3}, {label: '125', value: 4}, {label: '150', value: 5}, {label: '175', value: 6}, {label: '200', value: 7}],
            radio_panelty: [{label: "0 pt", value: 0}, {label: "1 pt", value: 1}, {label: "2 pt", value: 2}, {label: "3 pt", value: 3}],
            radio_music: [{label: 'OFF', value: 0}, {label: 'ON', value: 1}],
            radio_sound: [{label: 'OFF', value: 0}, {label: 'ON', value: 1}],

            round_time: Global.roundTimer,
            pointstowin: Global.pointsToWin,
            penaltypoint: Global.penaltyPoints,
            music_bool: Global.boolean_music,
            sound_bool: Global.boolean_sound,
        };

    }
    componentWillMount() {
        // alert(Global.keywords[1]);
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

    click_soundSetting = async(value) => {
        
        this.play_sound('general');
        Global.boolean_sound = value;
    }

       
    click_musicSetting = async(value) => {
        this.play_sound('general');
        if(value != Global.boolean_music) {
            Global.boolean_music = value;
            if (Global.boolean_music) {
                try {
                    // background_sound = new Expo.Audio.Sound();
                    // Global.background_soundObject = background_sound;
                    // await background_sound.loadAsync(require('../assets/sounds/background_sound.mp3'));
                    await Global.background_soundObject.setPositionAsync(0);
                    await Global.background_soundObject.setIsLoopingAsync(true);
                   
                    await Global.background_soundObject.playAsync();
                } catch (error) {

                }
            } else {
                Global.background_soundObject.stopAsync();
            }
        }
        
    }

    roundLevelOption_Click = (value) => {
        
    }

    roundTimerOption_Click = (value) => {
        Global.roundTimer = value;
        this.play_sound('general');
    }

    pointsToWinOption_Click = (value) => {
        Global.pointsToWin = value;
        this.play_sound('general');
    }

    penaltyPointOption_Click = (value) => {
        Global.penaltyPoints = value;
        this.play_sound('general');
    }

    homeButton_Click = async() => {
        this.play_sound('general');
        this.props.navigation.navigate('Home')
    }


    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} resizeMode = {'stretch'} source = {require('../assets/images/background.jpg')}>
                    <View style = {{width: '100%', height: '15%', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style = {styles.title}>Setting</Text>
                    </View>
                    <View style = {{width: '100%', height:'75%', alignItems: 'center', justifyContent: 'center'}}>
                        <View style = {{width: '90%', height:'17%', alignItems: 'center', justifyContent: 'center', marginBottom: '3%'}}>
                            <Text style = {styles.itemlabel_style}>Level</Text>
                            <RadioForm
                                radio_props={this.state.radio_level}
                                initial={this.state.round_time}
                                buttonSize={10}
                                buttonOuterSize={20}
                                formHorizontal={true}
                                labelStyle = {{fontSize: 15}}
                                style = {{width: '100%', justifyContent: 'center', alignItems: 'center'}}
                                onPress={(value) => {this.roundLevelOption_Click(value)}}
                            >
                            </RadioForm>
                        </View>
                        <View style = {{width: '90%', height:'17%', alignItems: 'center', justifyContent: 'center', marginBottom: '3%'}}>
                            <Text style = {styles.itemlabel_style}>Round Timer</Text>
                            <RadioForm
                                radio_props={this.state.radio_time}
                                initial={this.state.round_time}
                                buttonSize={10}
                                buttonOuterSize={20}
                                formHorizontal={true}
                                labelStyle = {{fontSize: 15}}
                                style = {{width: '100%', justifyContent: 'center', alignItems: 'center'}}
                                onPress={(value) => {this.roundTimerOption_Click(value)}}
                            >
                            </RadioForm>
                        </View>
                        <View style = {{width: '90%', height:'17%', alignItems: 'center', justifyContent: 'center', marginBottom: '3%'}}>
                            <Text style = {styles.itemlabel_style}>Points to Win</Text>
                            <RadioForm
                                radio_props={this.state.radio_winpoint}
                                initial={this.state.pointstowin}
                                buttonSize={10}
                                buttonOuterSize={20}
                                formHorizontal={true}
                                labelStyle = {{fontSize: 15}}
                                style = {{width: '100%', justifyContent: 'center', alignItems: 'center'}}
                                onPress={(value) => {this.pointsToWinOption_Click(value)}}
                            >
                            </RadioForm>
                        </View>
                        <View style = {{width: '60%', height:'17%', alignItems: 'center', justifyContent: 'center', marginBottom: '3%'}}>
                            <Text style = {styles.itemlabel_style}>Penalty Points</Text>
                            <RadioForm
                                radio_props={this.state.radio_panelty}
                                initial={this.state.penaltypoint}
                                buttonSize={10}
                                buttonOuterSize={20}
                                formHorizontal={true}
                                labelStyle = {{fontSize: 15}}
                                style = {{width: '100%', justifyContent: 'center', alignItems: 'center'}}
                                onPress={(value) => {this.penaltyPointOption_Click(value)}}
                            >
                            </RadioForm>
                        </View>
                        <View style = {{flexDirection: 'row', width: '100%', height:'17%', alignItems: 'center', justifyContent: 'center', marginBottom: '3%'}}>
                            <View style = {{width: '50%', height:'100%', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style = {styles.itemlabel_style}>Music</Text>
                                <View style = {{width: '50%', alignItems: 'center', justifyContent: 'center'}}>
                                    <RadioForm
                                        radio_props={this.state.radio_music}
                                        initial={this.state.music_bool}
                                        buttonSize={10}
                                        buttonOuterSize={20}
                                        formHorizontal={true}
                                        labelStyle = {{fontSize: 15}}
                                        style = {{width: '100%', justifyContent: 'center', alignItems: 'center'}}
                                        onPress={(value) => {this.click_musicSetting(value)}}
                                    >
                                    </RadioForm>
                                </View>
                            </View>
                            <View style = {{width: '50%', height:'100%', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style = {styles.itemlabel_style}>Sound</Text>
                                <View style = {{width: '50%', alignItems: 'center', justifyContent: 'center'}}>
                                    <RadioForm
                                        radio_props={this.state.radio_sound}
                                        initial={this.state.sound_bool}
                                        buttonSize={10}
                                        buttonOuterSize={20}
                                        formHorizontal={true}
                                        labelStyle = {{fontSize: 15}}
                                        style = {{width: '100%', justifyContent: 'center', alignItems: 'center'}}
                                        onPress={(value) => {this.click_soundSetting(value)}}
                                    >
                                    </RadioForm>
                                </View>
                            </View>
                        
                        </View>
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
        backgroundColor: "rgba(250, 248, 243, 1)",
    },
    title: {
        fontSize: 40,
        color: '#ffffff',
		fontWeight: 'bold',
    },
    section_style: {
        width: '60%', 
        height:'17%', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: 30
    },
    itemlabel_style: {
        fontSize: 20,
        marginBottom: 20,
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


});

