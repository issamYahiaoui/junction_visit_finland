import React, { Component } from 'react'
import {View, Text, Button,  AsyncStorage} from 'react-native';





import styles from './Styles/LandingScreenStyles';
import colors from '../Themes/Colors'
import ChatBot from "../Components/react-native-chatbot/lib";


// Styles
const parks = [
    {
        id : 1 ,
        title : 'Park 1'
    },
    {
        id : 2 ,
        title : 'Park 2'
    },
    {
        id : 3 ,
        title : 'Park 3'
    }
]


const steps = [
    {
        id: '1',
        message: 'Hello, Where are you going?',
        trigger: '4',
    },

    {
        id: '3',
        message: "Awesome!  Could you tell us please when ?",
        trigger: '4',
    },
    {
        id: '4',
        options: [
            { value: 1, component: (<View><Text>Hello</Text><Text> :: There</Text></View>), trigger: '5' },
            { value: 2, label: 'Some other date', trigger: '5' },
            { value: 3, label: 'Some other date ...', trigger: '5' },
        ],
    },
    {
        id: '5',
        message: "Awesome!  So Now we wanna know what are you planning to do so that we can guide you ? ",
        trigger: '6',
    },
    {
        id: '6',
        options: [
            { value: 1, label: 'Family Trip', trigger: '7' },
            { value: 2, label: 'Sports', trigger: '7' },
            { value: 3, label: 'Camping', trigger: '7' },
            { value: 4, label: 'Exploring', trigger: '7' },
            { value: 4, label: 'Optional from us !', trigger: '7' },
        ],
    },
    {
        id: '7',
        message: "Great!  You are good to go ! Let the fun begin ",
        end : true
    }
];
class LandingScreen extends Component {

    state = {

    }

    static navigationOptions = {
        title: 'Welcome to the chatbot!',
    };




    render() {



        return (


            <ChatBot
                style={{backgroundColor : colors.primary , color : colors.primary}}
                steps={steps} />


        );
    }

}



export default LandingScreen

