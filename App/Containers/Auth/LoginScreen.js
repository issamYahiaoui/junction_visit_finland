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
        email: null,
        password: null
    }

    handleChange = (name, value) => {
        console.log(value)
        this.setState({[name]: value});
    };

    render() {
        return (
            <View style={globalStyle.containerLightDark}>
                <View>
                    <Text style={{fontSize : 38 , textAlign: 'center'}}>
                        Login
                    </Text>

                    <View style={{marginBottom: 10 , padding : 10  , textAlign : 'center'}}>
                        <Text style={globalStyle.p}>
                        Enter your phone and password to login into VisitFinland App
                    </Text>

                    </View>

                    <View style={{
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                        <TextInput
                            style={globalStyle.input}
                            onChangeText={text => this.handleChange('email', text)}
                            value={this.state.email}
                            placeholder="E-mail"
                            placeholderTextColor={colors.gray}
                        />
                        <TextInput
                            style={globalStyle.input}
                            onChangeText={text => this.handleChange('password', text)}
                            value={this.state.password}
                            placeholder="Password"
                            placeholderTextColor={colors.gray}
                        />
                    </View>
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
        AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };
}

export default LoginScreen
