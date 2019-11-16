import React, {Component} from 'react'
import {View, Text, Button, AsyncStorage} from 'react-native';


import SettingsActions from '../Redux/SettingsRedux'
import {WhereCard} from '../Components/partials/'

import {connect} from 'react-redux'
import styles from './Styles/LandingScreenStyles';
import {getLocale, setLocale, t} from '../Services/I18n';

// Styles

export default class LandingScreen extends Component {

    state = {}


    render() {
        return (
            <View>
                <WhereCard/>
            </View>
        );
    }

}

const mapStateToProps = ({settings}) => {
    return {
        lang: settings.lang
    }
}

