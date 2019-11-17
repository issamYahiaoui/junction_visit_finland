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
          message: 'Thank you for telling us about your trip, here is what we propose for you in Nuuksio National Park for your journey on Friday 22 November 2019 for 10 hours:',
          trigger: '2',
      },
      {
          id: '2',
          message: 'f you’re coming by car, go and park your car in the parking area at  Haukkalampi (Haukkalammentie 32, Espoo, main information point, eastern part)',
          trigger: '3',
      },
      {
          id: '3',
          message: 'Before your journey, dont forget that in the National Park walking, skiing, rowing and canoeing, except in the possibly restricted areas are allowed but Campfire and camping are only allowed at sites marked for this purpose.',
          trigger: '4',
      },
      {
          id: '4',
          message: 'We Wish You a nice trip',
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
          message: 'You are going hiking to Korpinkierros, it’s a 08 km Circle Trail.',
          trigger: '7',
      },
      {
          id: '7',
          message: 'The estimated time is 04 h, and it’s a challenging trail.',
          trigger: '8',
      },
      {
          id: '8',
          message: 'Your starting point will be Haukkalampi, Address: Haukkalammentie 32, 02820 Espoo and Siikaniemi, Siikajärvenranta, Espoo.',
          trigger: '9',
      },
      {
          id: '9',
          message: 'uring your adventure don’t forget to Several species of bird’s nest in the park\'s woods, meadows and rocky terrain. There is also a birdwatching tower by Lake Matalajärvi.',
          trigger : '10'
      },
      {
          id: '10',
          message: 'There are no restrictions on berry and mushroom picking in the park. Treat yourself to Nuuksio\'s tasty bilberries.',
          trigger: '11',
      },
      {
          id: '11',
          message: 'The park offers beautiful scenery and a varied landscape: There are lakes, woodland, valleys, rocky hills and wetland. Korpinkierros Trail is especially scenic.',
          end : true
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

