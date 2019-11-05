import React, { Component } from 'react'
import {View, Text, Button} from 'react-native'


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
            <View style={styles.container}>
                <Text>{t('home' )}</Text>

            </View>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen)
