import React, { Component } from 'react'
import {View, Text, Button,  AsyncStorage} from 'react-native';


import SettingsActions from '../Redux/SettingsRedux'


import { connect } from 'react-redux'
import styles from './Styles/LandingScreenStyles';
import {getLocale, setLocale, t} from '../Services/I18n';
// Styles

class LandingScreen extends Component {

    state = {

    }


    render() {
        return (
            <View>
                <Button title="Show me more of the app" onPress={this._showMoreApp} />
                <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
            </View>
        );
    }

    _showMoreApp = () => {
        this.props.navigation.navigate('PhoneAuth');
    };

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
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

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen)
