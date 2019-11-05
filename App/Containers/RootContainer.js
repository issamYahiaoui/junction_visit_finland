import React, { Component } from 'react'
import {View, StatusBar, AsyncStorage, ActivityIndicator} from 'react-native';
// import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import SettingsActions from '../Redux/SettingsRedux'

// Styles
import styles from './Styles/RootContainerStyles'
import { Colors } from '../Themes';
import AppNavigation from '../Navigation/AppNavigation';

class RootContainer extends Component {

    state = {
        async: false
    }

    async componentWillMount() {
        const lang = await AsyncStorage.getItem('lang')
        if(lang)
        {
            this.props.changeLanguage(lang)
        }
        this.setState({async: true});
    }


    render () {
        if (!this.state.async)
            return (<ActivityIndicator color='#fff' size='small' />)
        return (
                <View style={styles.container}>
                    <StatusBar  backgroundColor={Colors.grey} barStyle='light-content' />
                    <AppNavigation />
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

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
