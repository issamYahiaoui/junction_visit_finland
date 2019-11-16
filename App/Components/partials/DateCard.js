import React, {Component} from 'react'
import {View, Text, Button, Image, Layout, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../Themes/Colors'
import DatePicker from 'react-native-datepicker'
import {Avatar, Badge, Icon, withBadge} from 'react-native-elements'
import globalStyle from "../../Containers/Styles/GlobalStyle";


export default class DateCarousel extends Component {

    state = {
        start_date: new Date(),
        end_date: new Date((new Date()).valueOf() + 1000 * 3600 * 24),
    }
    chooseDate = () => {
        let {
            start_date,
            end_date,
        } = this.state;

        if (!start_date) {
            return "EmptyStartDate"
        }

        if (!end_date) {
            return "EmptyEndDate"
        }

        let d1 = new Date(start_date);
        let d2 = new Date(end_date);
        if (d1.getTime() > d2.getTime()) {
            return "timeStartGreaterThanTimeEnd"
        }

        //
        this.triggerNextStep()
        return {...this.state}
    }


    triggerNextStep = ()=>{

        this.props.trigger()
    }


    render() {
        return (
            <View style={style.container}>
                <View style={style.datePickerContainer}>
                    <Text>Start Date</Text>
                    <DatePicker
                        style={style.datePicker}
                        date={this.state.start_date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {
                            this.setState({start_date: date})
                        }}
                    />
                </View>
                <View style={style.datePickerContainer}>
                    <Text>End Date</Text>
                    <DatePicker
                        style={style.datePicker}
                        date={this.state.end_date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36,
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {
                            this.setState({end_date: date})
                        }}
                    />
                    <TouchableOpacity
                        style={style.button}
                        onPress={this.chooseDate}>
                        <Text style={globalStyle.buttonText}>
                            Confirm
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    button: {
        backgroundColor: colors.primary,
        padding: 5,
        margin: 5,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    datePickerContainer: {
        padding: 5
    },
    datePicker: {
        width: '100%',
        padding: 5,
    }

})



