import React, { Component } from 'react'
import {View, Text} from 'react-native'


import SettingsActions from '../Redux/SettingsRedux'

//import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import styles from './Styles/LandingScreenStyles';
// Styles


class LandingScreen extends Component {

    state = {
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Hello There , this is the landing page</Text>
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
