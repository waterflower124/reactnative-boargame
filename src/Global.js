
export default {

	boolean_sound: 0,
	boolean_music: 0,

	roundTimer: 0, //// Timer option index
	pointsToWin: 0, //// point to win option index
	penaltyPoints: 1,///penalty index

	background_soundObject: new Expo.Audio.Sound(),
	generalbutton_soundObject: new Expo.Audio.Sound(),
	correctbutton_soundObject: new Expo.Audio.Sound(),
	skipbutton_soundObject: new Expo.Audio.Sound(),
	alarm_soundObject: new Expo.Audio.Sound(),

	// keywords: ['a', 'b'],
	// forbidden_words: [['a1', 'a2', 'a3', 'a4'], ['b1', 'b2', 'b3', 'b4']],

	response_words_array_index: 0,//used for get keyword array from server
	response_words_count: 0,

	keywords: [],
	forbidden_words: [],

	currrent_cardsindex: 0,

	current_round: 1,

	selected_team: "A",   ////0 is TEAM A, 1 is TEAM B

	total_words: 0,

	A_total_score: 0,
	A_round_score: 0,
	A_round_total_word: 0,
	A_correct_words: 0,
	A_skip_words: 0,
	B_total_score: 0,
	B_round_score: 0,
	B_round_total_word: 0,
	B_correct_words: 0,
	B_skip_words: 0,


	selected_language: 'English',
	languages_array: [],


	game_title_text: 'Board Game',///
	start_game_text: 'Start Game',////
	settings_text: 'Settings',////
	languages_text: 'Languages',
	rules_text: 'Rules',
	round_text: 'Round',////
	team_text: 'TEAM',////
	score_text: 'SCORE',/////
	correct_text: 'CORRECT',//
	skip_text: 'SKIP',////
	resume_text: 'Resume',///
	home_text: 'Home',///
	round_timer_text: 'Round Timer',////
	pointtowin_text: 'Points to Win',///
	penaltypoints_text: 'Penalty Points',////
	music_text: 'Music',///
	sound_text: 'Sound',////
	begin_text: 'Begin',//
	game_summary_text: 'GAME SUMMARY',////
	round_summary: 'ROUND SUMMARY',
	correct_words_text: 'CORRECT WORDS',//
	skip_words_text: 'SKIPPED WORDS',////
	get_ready_text: 'GET READY',///
	start_text: 'START',////
	// keywords: ['FLOWERS', 'DIGITAL CAMERA', 'GOOGLE', 'SAPPHIRE', 'SUMMER', 'WATER', 'WEREWOLF', 'MALL', 'WHITE HOUSE', 'DONALD DUCK', 'DENTIST', 'LADYBIRD', 'WITCH DOCTOR'],
	// forbidden_words: [['DECORATE', 'PLANT', 'BOUGUET', 'SMELL'],
	// 				['PHOTO', 'MEMORY', 'HOLIDAY', 'IMAGE'],
	// 				['INTERNET', 'SEARCH ENGNE', 'YAHOO', 'MICROSOFT'],
	// 				['JEWEL', 'GOLD', 'SILVER', 'DIAMOND'],
	// 				['WINTER', 'AUTUM', 'SPRING', 'HOLIDAY'],
	// 				['FIRE', 'EARTH', 'WIND', 'POND'],
	// 				['CHANG', 'MOON', 'HOWL', 'LEGEND'],
	// 				['SHOPS', 'CENTER', 'BUY', 'SELL'],
	// 				['PRESIDENT', 'WASHINGTON D.C', 'PENTAGON', 'BARACK OBAMA'],
	// 				['MICHEY MOUSE', 'WALT DISNEY', 'KIDS', 'PLUTO'],
	// 				['TEETH', 'WISDOM', 'FILLING', 'DOCTOR'],
	// 				['RED', 'BUG', 'INSECT', 'BLACK SPOTS'],
	// 				['CURE', 'MEDICINE', 'MAGIC', 'DISEASE']
	// 			],

}

export const Symbnerv =  require('./assets/fonts/symbnerv.ttf');
export const SAMAN =  require('./assets/fonts/SAMAN.ttf');

