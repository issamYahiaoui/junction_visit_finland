import React from 'react';
import { createAppContainer ,createSwitchNavigator } from 'react-navigation';

import LandingScreen from '../Containers/LandingScreen';
import { createStackNavigator  } from 'react-navigation-stack';
import SplashScreen from '../Containers/SplashScreen';

const AppNavigation = createStackNavigator(
    {
        Home: { screen: LandingScreen },


    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }

    }
);

const InitialNavigator = createSwitchNavigator({
    Splash: SplashScreen,
    App: AppNavigation
});
export default createAppContainer(InitialNavigator)
