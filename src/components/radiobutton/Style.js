var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
} = ReactNative;

var Style = StyleSheet.create({
  radioForm: {
    width: '100%',
    height: '100%',
    backgroundColor: "#666666",
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },

  radioWrap: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 5,
    justifyContent: 'space-between'
  },
  radio: {
    justifyContent: 'center',
    alignItems: 'center',

    width: 20,
    height: 20,


    alignSelf: 'center',

    borderColor: '#2196f3',
    borderRadius: 20,
  },

  radioLabel: {
    paddingLeft: 0,
    lineHeight: 20,
  },

  radioNormal: {
    borderRadius: 10,
  },

  radioActive: {
    width: 20,
    height: 20,
    backgroundColor: '#2196f3',
  },

  labelWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  labelVerticalWrap: {
    flexDirection: 'column',
    paddingLeft: 10,
  },

  labelVertical: {
    paddingLeft: 0,
  },

  formHorizontal: {
    flexDirection: 'row',
  },
});

module.exports = Style;
