import React from 'react';
import { createAppContainer } from 'react-navigation';

import LandingScreen from '../Containers/LandingScreen';
import { createStackNavigator } from 'react-navigation-stack';

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
export default createAppContainer(AppNavigation)
