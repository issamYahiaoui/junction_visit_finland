import React from 'react';
import { createAppContainer ,createSwitchNavigator } from 'react-navigation';

import LandingScreen from '../Containers/LandingScreen';
import { createStackNavigator  } from 'react-navigation-stack';
import AuthLoadingScreen from '../Containers/Auth/AuthLoadingScreen';
import LoginScreen from '../Containers/Auth/LoginScreen';
import RegisterScreen from '../Containers/Auth/RegisterScreen';
import PhoneAuthScreen from '../Containers/Auth/PhoneAuthScreen';
import LaunchSliderScreen from '../Containers/LaunchSliderScreen';

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

const AuthStack = createStackNavigator(
    {
        Login: LoginScreen ,
        Register : RegisterScreen ,
        PhoneAuth : PhoneAuthScreen
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
    );


export default createAppContainer(
    createSwitchNavigator(
        {
            // LaunchSlider: LaunchSliderScreen,
            AuthLoading: AuthLoadingScreen,
            App: AppNavigation,
            Auth: AuthStack,
        },
        {
            initialRouteName: 'AuthLoading',
        }
    )
);



