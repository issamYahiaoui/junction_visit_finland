import React from 'react';
import { View, Text } from 'react-native';
import styles from './Styles/SplashScreenStyles'


class SplashScreen extends React.Component {
    performTimeConsumingTask = async() => {
        return new Promise((resolve) =>
            setTimeout(
                () => { resolve('result') },
                2000
            )
        )
    }

    async componentDidMount() {
        // Preload data from an external API
        // Preload data using AsyncStorage
        const data = await this.performTimeConsumingTask();

        if (data !== null) {
            this.props.navigation.navigate('App');
        }
    }

    render() {
        return (
            <View style={styles.viewStyles}>
                <Text style={styles.textStyles}>
                    My Custom Splash screen
                </Text>
            </View>
        );
    }
}


export default SplashScreen;
