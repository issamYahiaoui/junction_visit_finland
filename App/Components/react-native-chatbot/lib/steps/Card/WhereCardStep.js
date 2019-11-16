import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import colors from "../../../../../Themes/Colors";
import {Badge, Icon} from "react-native-elements";
import Carousel from "react-native-snap-carousel";



class WhereCardStep extends Component {
    /* istanbul ignore next */
    constructor(props) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
        this.onOptionClick = this.onOptionClick.bind(this);
    }

    onOptionClick({ value }) {
        this.props.triggerNextStep({ value });
    }

    _renderItem(item) {
        const { value, parkName, imgSource } = item;

        return (
            <TouchableOpacity
                onPress={() => this.onOptionClick({ value })}
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
                            source={{ uri: imgSource}}
                        />
                        <Text style={[style.details, {
                            position: 'absolute',
                            bottom: 20,
                            left: 0,
                            paddingLeft: 10,
                            borderBottomRightRadius: 10,
                            borderTopRightRadius: 10,
                            backgroundColor: colors.lightBlack
                        }]}>{parkName}</Text>
                    </View>

                    <View style={style.detailsContainer}>
                        <View style={[style.details, {
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }]}>
                            <View style={style.label}>
                                <View style={{flexDirection: "row"}}>
                                    <Icon name='person' color="green" type="material"/>
                                    <Icon name='person' color="gray" type="material"/>
                                    <Icon name='person' color="gray" type="material"/>
                                    <Icon name='person' color="gray" type="material"/>
                                    <Icon name='person' color="gray" type="material"/>
                                </View>
                                <Badge value="9900" status="success"/>
                            </View>
                            <View style={style.label}>
                                <Icon name="location" type="entypo"/>
                                <Text>200 Km</Text>
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
        )
    }

    render() {
        const { cardData } = this.props.step;

        return (
            <Carousel
                ref={(c) => {
                    this._carousel = c;
                }}
                data={data}
                renderItem={this._renderItem}
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
    image: {}
})




WhereCardStep.propTypes = {
    step: PropTypes.object.isRequired,
    triggerNextStep: PropTypes.func.isRequired,
};

export default WhereCardStep;
