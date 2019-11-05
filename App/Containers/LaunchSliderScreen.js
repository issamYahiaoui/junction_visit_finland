import React, { Component } from 'react'
import {View, Text, Button, AsyncStorage, Image, StatusBar} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {Colors, Images} from './../Themes';

//redux
import SettingsActions from '../Redux/SettingsRedux'
import {connect} from 'react-redux';



// Styles
import styles from './Styles/LaunchSliderScreenStyles';
import AppNavigation from '../Navigation/AppNavigation';




const slides = [
    {
        key: 'somethun',
        title: 'Title 1',
        text: 'Description.\nSay something cool',
        image: Images.slider1,
        backgroundColor: '#59b2ab',
    },
    {
        key: 'somethun-dos',
        title: 'Title 2',
        text: 'Other cool stuff',
        image: Images.slider2,
        backgroundColor: '#febe29',
    },
    {
        key: 'somethun1',
        title: 'Rocket guy',
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        image: Images.slider3,
        backgroundColor: '#22bcb5',
    }
];

class LaunchSliderScreen extends Component {

    static key = 0

    state = {
        showRealApp: false
    }
    _renderItem = (item,key) => {
        LaunchSliderScreen.key++
        console.warn(key)
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{item.title}</Text>
                <Image style={{width: '100%', height : '100%'}}  source={Images['slider' +  LaunchSliderScreen.key]} />
                <Text style={styles.text}>{item.text}</Text>
            </View>
        );
    }

    _onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        this.setState({ showRealApp: true });
        this.props.navigation.navigate('AuthLoading');
    }


    render() {
            LaunchSliderScreen.key=0
            return (
                <View style={styles.container}>
                    <StatusBar  backgroundColor={Colors.grey} barStyle='light-content'  hidden={true}/>
                    <AppIntroSlider showPrevButton showSkipButton renderItem={this._renderItem} slides={slides} onDone={this._onDone}/>
                </View>
            );
    }




}

const mapStateToProps = ({settings}) => {
    return {
        lang:settings.lang
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        changeLanguage: (lang) => dispatch(SettingsActions.changeLanguage(lang)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchSliderScreen)
