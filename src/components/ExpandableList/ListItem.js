import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {
    AppStyles,
    avenirBookObliqueFont,
    avenirBookFont,
    avenirFont,
    avenirHeavyFont,
    avenirMediumFont,
    navigationOptions
} from "../../Styles";


class ListItem extends Component {

    async componentWillMount() {
        //fonts
        await Expo.Font.loadAsync({
            avenir: avenirFont,
            avenirHeavy: avenirHeavyFont,
            AvenirBookOblique: avenirBookObliqueFont,
            avenirBook: avenirBookFont,
            avenirMedium: avenirMediumFont
        });
    }

    render() {

        const {item, index, selectedItem, itemPicker} = this.props;

        return (

            <TouchableOpacity  style={selectedItem === item ? {display: 'none'} : {}} onPress={() => itemPicker(item, index)}>
            <View style={styles.container}>
                    <Text style = {{fontFamily: 'avenirHeavy', color: '#645c5d', fontSize: 18}}>{item}</Text>
            </View>
            </TouchableOpacity>
        );
    }
}

export default ListItem;

const styles = {
    container: {
        justifyContent: 'center',
    }
}

