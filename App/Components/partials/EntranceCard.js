import React, {Component} from 'react'
import {View, Text, Button, Image, Layout, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../Themes/Colors'
import Carousel from 'react-native-snap-carousel';
import {Avatar, Badge, Icon, withBadge} from 'react-native-elements'


export default class EntranceCard extends Component {
    state = {
        entries: {
            'park1': [
                {
                    name: 'Finnish Nature Centre Hatia',
                    distance: 60,
                }, {
                    name: 'Finnish Nature Centre Hatia',
                    distance: 100,
                }, {
                    name: 'Finnish Nature Centre Hatia',
                    distance: 200,
                }, {
                    name: 'Finnish Nature Centre Hatia',
                    distance: 30,
                },
            ],
            'park2': [
                {
                    name: 'Finnish Nature Centre Hatia',
                    distance: 200,
                }, {
                    name: 'Finnish Nature Centre Hatia',
                    distance: 200,
                }, {
                    name: 'Finnish Nature Centre Hatia',
                    distance: 200,
                }, {
                    name: 'Finnish Nature Centre Hatia',
                    distance: 200,
                },
            ]
        }
    }

    _renderItem({item, index}) {
        let color = '';
        if (item.distance < 100) {
            color = 'green'
        } else if (item.distance >= 100) {
            color = 'red'
        }
        return (
            <TouchableOpacity  onPress={this.triggerNextStep.bind(this , {value  : item.distance})}  >
            <View style={[style.container, {backgroundColor: color}]}>
                <Text style={{color: 'white'}}>{item.name}</Text>
                <View style={style.label}>
                    <Icon name="location-pin" color="white" type="entypo"/>
                    <Text style={{color: 'white'}}>{item.distance} Km</Text>
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
                data={this.state.entries['park1']}
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
        padding: 10,
        marginTop: 10
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
    label: {
        flexDirection: 'row',
    },

})



