import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image, Alert} from 'react-native';

import ListItem from './ListItem';
import {
    AppStyles,
    avenirBookObliqueFont,
    avenirBookFont,
    avenirFont,
    avenirHeavyFont,
    avenirMediumFont,
    navigationOptions
} from "../../Styles";

class ListView extends Component {


    constructor(props) {
        super(props);

        this.state = {
            remove_border: false,           
        };


    }

    removeBorder = () => {
        if(this.state.remove_border)
            this.setState({remove_border: false});
        else 
            this.setState({remove_border: true});
    }

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
        const { data, selectedItem, expandList, itemPicker, expanded } = this.props;
        return (

            <ScrollView style={styles.container}>
                
                    <View style={styles.listHeader}>
                        <Text style = {{width: '75%', color: '#645c5d', fontFamily: "avenirHeavy", fontSize: 18}}>{selectedItem !== "" ? selectedItem : 'Apparel'}</Text>
                        <View style={styles.iconStyle}>
                            <TouchableOpacity onPress={() => {expandList(); this.removeBorder()}}>
                                <Image style = {{width: 30, height: 30}} source={require('../../assets/icons/sortdown.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                
                {
                    expanded ?  <View>
                    {
                        data.map((item, index) => <ListItem 
                                                    key={index}
                                                    index={index} 
                                                    item={item}
                                                    itemPicker={itemPicker}
                                                    selectedItem={selectedItem}
                                                    />)
                    }
                </View> : null
                }
            </ScrollView>
        );
    }
}

export default ListView;

const styles = {
    listHeader: {
        // justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor:'#e9e3d5'
    },
    iconStyle: {
        width: '25%', 
        borderLeftWidth: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        borderColor:'#e9e3d5'
    }
}

