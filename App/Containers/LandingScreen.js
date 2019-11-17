import React, {Component} from 'react'
import {View, Text, Button, AsyncStorage, TouchableOpacity} from 'react-native';


import SettingsActions from '../Redux/SettingsRedux'
import {WhereCard, WhatCard, DateCard,EntranceCard} from '../Components/partials/'

import {connect} from 'react-redux'
import styles from './Styles/LandingScreenStyles';
import {getLocale, setLocale, t} from '../Services/I18n';
import ChatBot from "../Components/react-native-chatbot/lib";

// Styles




export default class LandingScreen extends Component {

    state = {

    where : false ,  what : false , when : true , entrance  : false ,init : false

    }
    _trigger_what =  ()=> {

         this.setState({what : true , where : false , when : false , entrance : false , init : false})

    }
    _trigger_where =  ()=> {
        this.setState({when : false , what : false , where : true , entrance : false , init : false})
    }
    _trigger_entrance =  ()=> {
        this.setState({when : false , what : false , where : false , entrance : true , init : false})
    }

    _trigger_init =  ()=> {
        console.warn( 'init')
        this.setState({when : false , what : false , where : false , entrance  :  false , init : true})
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
            component:(<WhatCard  trigger={this._trigger_entrance} />),

            end : true
        },


    ]
    steps_4 = [
        {
            id: '1',
            message: 'Finally, please tell us which entrance will you pass by ?',
            trigger: '2',
        },
        {
            id: '2',
            component:(<EntranceCard trigger={this._trigger_init}   />),
            end : true
        }



    ]
  steps_5 = [
      {
          id: '1',
          message: 'Message 1',
          trigger: '2',
      },
      {
          id: '2',
          message: 'Message 2',
          trigger: '3',
      },
      {
          id: '3',
          message: 'Message 3',
          trigger: '4',
      },
      {
          id: '4',
          message: 'Message 4',
          trigger : '5'
      },
      {
          id: '5',
          options: [
              { value: 1,component : (<Text style={{backgroundColor : 'white' , color : '#B20066'  , textAlign : 'center'}}> Get Started</Text>),  label: 'Get started', trigger: '6' },
          ]
      },
      {
          id: '6',
          message: 'Message 6',
          trigger: '7',
      },
      {
          id: '7',
          message: 'Message 7',
          trigger: '8',
      },
      {
          id: '8',
          message: 'Message 8',
          trigger: '9',
      },
      {
          id: '9',
          message: 'Message 9',
          trigger : '10'
      },
      {
          id: '10',
          message: 'Message 10',
          trigger: '11',
      },
      {
          id: '11',
          message: 'Message 11',
          trigger: '12',
      },
      {
          id: '12',
          message: 'Message 12',
          trigger : '13'
      },
      {
          id: '13',
          message: 'Message 13',
          end: true
      },
  ]




    render() {
        const {what , where , when ,entrance,init} =this.state
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
                {
                    entrance &&
                    <View style={{height : '70%'}}>
                        <ChatBot steps={this.steps_4} />
                    </View>
                }
                {
                    init &&
                    <View style={{height : '70%'}}>
                        <ChatBot steps={this.steps_5} />
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

