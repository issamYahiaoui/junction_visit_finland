import React from 'react'
import {View, Text, AsyncStorage, TextInput, TouchableOpacity} from 'react-native';
import globalStyle from '../Styles/GlobalStyle'
import colors from '../../Themes/Colors'
import PhoneInput from 'react-native-phone-input'
import api from '../../Services/Api'

class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Please sign in'
    };

    state = {
        country_code: '213',
        phone: '657058126',
        password: '123456'
    }

    handleChange = (name, value) => {
        console.log(value)
        this.setState({[name]: value});
    };

    render() {
        return (
            <View style={globalStyle.containerLightDark}>
                <View>
                    <Text style={globalStyle.h1}>
                        Login
                    </Text>
                    <Text style={[globalStyle.p, {marginBottom: 10}]}>
                        Enter your phone and password to login into Challenge Area
                    </Text>
                    <PhoneInput
                        ref={ref => {
                            this.phone = ref;
                        }}
                        textStyle={globalStyle.input}
                        onChangePhoneNumber={text => this.handleChange('phone', text)}
                        onSelectCountry={e => this.handleChange('country_code', e)}
                    />
                    <TextInput
                        style={globalStyle.input}
                        onChangeText={text => this.handleChange('password', text)}
                        value={this.state.password}
                        placeholder="Password"
                        placeholderTextColor={colors.gray}
                    />
                </View>
                <TouchableOpacity
                    style={globalStyle.button}
                    onPress={this._signInAsync}>
                    <Text style={globalStyle.buttonText}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    _signInAsync = async () => {
        const Api = api.create()
        const response = await Api.login(this.state)
        console.log(response)
        AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };
}

export default LoginScreen
