import React, {Component} from 'react'
import {View, Text, Button, Image, Layout, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../Themes/Colors'
import Carousel from 'react-native-snap-carousel';
import {Avatar, Badge, Icon, withBadge} from 'react-native-elements'


export default class WhatCarousel extends Component {
    state = {
        entries: [
            {
                icon: 'icon',
                iconType: 'materiel',
                type: 'Group Visit',
                options: {
                    'park1': ['Finnish Nature Centre Hatia', 'rocky lake'],
                    'park2': ['Pallastunturi Visitor Centre', 'Yllas Area']
                }
            },
            {
                icon: 'icon',
                iconType: 'materiel',
                type: 'Camping',
                options: {
                    'park1': ['Haukkalalamp camp', 'Liukoi camp'],
                    'park2': ['Villenekamppa camp', 'Mussa camp']
                }
            },
            {
                icon: 'icon',
                iconType: 'materiel',
                type: 'Sports',
                options: {
                    'park1': ['Hiking in Nahkiaspolqi nature trail', 'Fishing', 'Skiing'],
                    'park2': ['Fishing at Paavontalo', 'Hiking', 'Biking']
                }
            },
            {
                icon: 'icon',
                iconType: 'materiel',
                type: 'Explore',
                options: {
                    'park1': ['HALTIA', 'Takala', 'Tikankolo'],
                    'park2': ['Pyhakero', 'Pahakuru']
                }
            },
            {
                icon: 'icon',
                iconType: 'materiel',
                type: 'Recommended',
                options: {
                    'park1': ['option 1', 'option 2'],
                    'park2': ['option 1', 'option 2']
                }
            }
        ]
    }

    _renderItem({item, index}) {
        const options = item.options['park2'].map((option, key) =>
            <TouchableOpacity  onPress={this.triggerNextStep.bind(this , {value  : option})} key={option} >
                <Text  style={style.option}>{option}</Text>
            </TouchableOpacity>

        );

        return (
            <TouchableOpacity

            >
            <View style={style.container}>
                <View style={style.type}>
                    <Text>{item.type}</Text>
                </View>
                <View >
                    {options}
                </View>
            </View>
            </TouchableOpacity>
        );
    }

    triggerNextStep = ()=>{

        this.props.trigger()
    }

    render() {
        return (
            <Carousel
                ref={(c) => {
                    this._carousel = c;
                }}
                data={this.state.entries}
                renderItem={(item) => this._renderItem(item)}
                sliderWidth={400}
                itemWidth={300}
            />
        );
    }

}
const style = StyleSheet.create({
    container: {
        borderWidth: 0.1,
        borderRadius: 10,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
    },
    option: {
        color: colors.white,
        backgroundColor: colors.primary,
        margin: 5,
        padding: 5,
        borderRadius: 10
    },
    type: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
})



