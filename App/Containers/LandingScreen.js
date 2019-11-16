import React, {Component} from 'react'
import {View, Text, Button, AsyncStorage} from 'react-native';


import SettingsActions from '../Redux/SettingsRedux'
import {WhereCard} from '../Components/partials/'

import {connect} from 'react-redux'
import styles from './Styles/LandingScreenStyles';
import {getLocale, setLocale, t} from '../Services/I18n';
import ChatBot from "../Components/react-native-chatbot/lib";
import WhatCard from "../Components/partials/WhatCard";
import DateCard from "../Components/partials/DateCard";

// Styles




export default class LandingScreen extends Component {

    state = {

    where : false ,  what : false , when : true ,

    }
    _trigger_what =  ()=> {

         this.setState({what : true , where : false , when : false})

    }
    _trigger_where =  ()=> {
        this.setState({when : false , what : false , where : true})
    }




    steps_1 = [
        {
            id: '1',
            message: "Hey Issam ! When are you planing to visit our amazing parks ?",
            trigger: '2',
        },
        {
            id: '2',
            component:(<DateCard trigger={this._trigger_where}  />),
            end : true
        },


    ]
    steps_2 = [
        {
            id: '1',
            message: 'Great , so tell us which park  you are going to visit ?',
            trigger: '2',
        },
        {
            id: '2',
            component:(<WhereCard trigger={this._trigger_what}  />),
            end : true
        },


    ]
    steps_3 = [
        {
            id: '1',
            message: 'Awesome , now you are almost good to go, just one more thing , what do you want to do during your visit ?',
            trigger: '2',
        },
        {
            id: '2',
            component:(<WhatCard  trigger={this._trigger_what} />),

            end : true
        },


    ]





    render() {
        const {what , where , when } =this.state
        return (
            <View style={{ backgroundColor : 'white', borderRadius : 10, padding : 10, height : '100%' ,flex : 1 , flexDirection : 'column', overflow : 'scroll'  }}>
                {
                    when &&
                    <View style={{height : '70%'}}>
                        <ChatBot steps={this.steps_1} />
                    </View>
                }
                {
                    where &&
                    <View style={{height : '70%'}}>
                    <ChatBot steps={this.steps_2} />
                </View>
                }
                {
                    what &&
                    <View style={{height : '70%'}}>
                        <ChatBot steps={this.steps_3} />
                    </View>
                }
            </View>
        );
    }

}

const mapStateToProps = ({settings}) => {
    return {
        lang: settings.lang
    }
}

