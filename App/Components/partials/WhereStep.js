import React, {Component} from 'react';
import {View ,Text} from "react-native";
import Carousel from "react-native-snap-carousel";

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

class WhereStep extends Component {

        _renderItem ({item, index}) {
            return (
                <View >
                    <Text >{ item.title }</Text>
                </View>
            );
        }
    render() {
        return (
            <View>
                <Carousel
                    layout={'default'}
                    ref={(c) => { this._carousel = c; }}
                    data={parks}
                    renderItem={this.props._renderItem}
                    sliderWidth={100}
                    itemWidth={50}
                />
            </View>
        );
    }
}

export default WhereStep;
