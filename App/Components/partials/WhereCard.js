import React, {Component} from 'react'
import {View, Text, Button, Image, Layout, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../Themes/Colors'
import Carousel from 'react-native-snap-carousel';
import {Avatar, Badge, Icon, withBadge} from 'react-native-elements'


export default class WhereCarousel extends Component {
    state = {
        entries: [


            {
                imgSource: 'https://edit.myhelsinki.fi/sites/default/files/styles/hero_image/public/2017-04/Esplanadinpuisto-kuva-laurirotko.jpg?h=5e08a8b6&itok=Ijrld8Fe',
                parkName: 'Nuuksio National Park',
                visit: 3000,
                distance: 9,
                weather: "cloud",
                degree: 5
            },
            {
                imgSource: 'https://cdn.pixabay.com/photo/2015/08/26/19/21/finland-908940_960_720.jpg',
                parkName: 'Pallas-yllas National Park',
                visit: 15000,
                distance: 0.1,
                weather: "cloud",
                degree: 7
            },
            {
                imgSource: 'https://cdn.pixabay.com/photo/2019/01/17/08/18/autumn-3937289_960_720.jpg',
                parkName: 'Esplanade Park',
                visit: 7000,
                distance: 12,
                weather: "rain",
                degree: 0
            },

            {
                imgSource: 'https://edit.myhelsinki.fi/sites/default/files/styles/hero_image/public/2017-04/Esplanadinpuisto-kuva-laurirotko.jpg?h=5e08a8b6&itok=Ijrld8Fe',
                parkName: 'Esplanade Park',
                visit: 3000,
                distance: 30,
                weather: "sun",
                degree: -1
            }
        ]
    }

    _renderItem({item, index}) {

        return (
            <TouchableOpacity
                onPress={this.triggerNextStep.bind(this, {value: item.id})}
            >
                <View style={style.container}>
                    <View style={[style.grid, {width: "100%"}]}>
                        <View style={{
                            width: '100%',
                            height: '70%',
                            borderRadius: 7,
                        }}>
                            <Image
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                source={{uri: item.imgSource}}
                            />
                            <Text style={[style.details, {
                                position: 'absolute',
                                bottom: 20,
                                left: 0,
                                paddingLeft: 10,
                                borderBottomRightRadius: 10,
                                borderTopRightRadius: 10,
                                backgroundColor: colors.lightBlack
                            }]}>{item.parkName}</Text>
                        </View>

                        <View style={style.detailsContainer}>
                            <View style={[style.details, {
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }]}>
                                <View style={style.label}>
                                    <View style={{flexDirection: "row"}}>
                                        {item.visit > 0 && item.visit < 3000 &&
                                        <View style={style.icons}>
                                            <Icon name='person' color={"green"} type="material"/>
                                            <Icon name='person' color={"gray"} type="material"/>
                                            <Icon name='person' color={"gray"} type="material"/>
                                            <Icon name='person' color={"gray"} type="material"/>
                                            <Icon name='person' color={"gray"} type="material"/>
                                        </View>
                                        }
                                        {item.visit >= 3000 && item.visit < 6000 &&
                                        <View style={style.icons}>
                                            <Icon name='person' color={"green"} type="material"/>
                                            <Icon name='person' color={"green"} type="material"/>
                                            <Icon name='person' color={"gray"} type="material"/>
                                            <Icon name='person' color={"gray"} type="material"/>
                                            <Icon name='person' color={"gray"} type="material"/>
                                        </View>
                                        }
                                        {item.visit >= 6000 && item.visit < 9000 &&
                                        <View style={style.icons}>
                                            <Icon name='person' color={"orange"} type="material"/>
                                            <Icon name='person' color={"orange"} type="material"/>
                                            <Icon name='person' color={"orange"} type="material"/>
                                            <Icon name='person' color={"gray"} type="material"/>
                                            <Icon name='person' color={"gray"} type="material"/>
                                        </View>
                                        }
                                        {item.visit >= 9000 && item.visit < 12000 &&
                                        <View style={style.icons}>
                                            <Icon name='person' color={"orange"} type="material"/>
                                            <Icon name='person' color={"orange"} type="material"/>
                                            <Icon name='person' color={"orange"} type="material"/>
                                            <Icon name='person' color={"orange"} type="material"/>
                                            <Icon name='person' color={"gray"} type="material"/>
                                        </View>
                                        }
                                        {item.visit >= 12000 &&
                                        <View style={style.icons}>
                                            <Icon name='person' color={"red"} type="material"/>
                                            <Icon name='person' color={"red"} type="material"/>
                                            <Icon name='person' color={"red"} type="material"/>
                                            <Icon name='person' color={"red"} type="material"/>
                                            <Icon name='person' color={"red"} type="material"/>
                                        </View>
                                        }


                                    </View>
                                    <Badge value={item.visit} status="success"/>
                                </View>
                                <View style={style.label}>
                                    <Icon name="location-pin" type="entypo"/>
                                    <Text>{item.distance} Km</Text>
                                </View>
                                <View style={style.label}>
                                    <Icon name='cloud' type="foundation"/>
                                    <Text>-1</Text>
                                </View>

                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    triggerNextStep = () => {

        this.props.trigger()
    }

    render() {
        let data = this.state.entries
        return (
            <Carousel
                ref={(c) => {
                    this._carousel = c;
                }}
                data={data}
                renderItem={(item) => this._renderItem(item)}
                sliderWidth={400}
                itemWidth={300}
            />
        );
    }

}
const style = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
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
        marginTop: 10,
    },
    grid: {
        height: 250,
        justifyContent: 'center',
        alignItems: 'center'
    },
    detailsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },
    details: {
        width: '33%'
    },
    label: {
        flexDirection: 'column',
    },
    icons: {
        flexDirection: 'row'
    }
})



