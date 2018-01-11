import React from 'react';
import {
    View,
    Image,
    Dimensions,
    Keyboard
} from 'react-native';
import {
    RkButton,
    RkText,
    RkTextInput,
    RkAvoidKeyboard,
    RkStyleSheet,
    RkTheme
} from 'react-native-ui-kitten';
import { FontAwesome } from '../../assets/icons';
import { GradientButton } from '../../components/';
import { scale, scaleModerate, scaleVertical } from '../../utils/scale';

export class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    submitLogin() {

        var dataPost = {
            access_token: '',
            device_id: '34534543534543',
            login_name: this.state.username,
            password: this.state.password
        }

        var formBody = [];
        for (var property in dataPost) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(dataPost[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        console.log('this.state.username ' + this.state.username);
        console.log('this.state.password ' + this.state.password);

        fetch('https://www.toonies.vn/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },

            body: formBody,
        }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson);
        });

    }

    render() {
        return (
            <RkAvoidKeyboard
                onStartShouldSetResponder={(e) => true}
                onResponderRelease={(e) => Keyboard.dismiss()}
                style={styles.screen}>
                <View style={styles.container}>
                    <View style={styles.form}>
                        <RkTextInput rkType='rounded' placeholder='Username' onChangeText={(text => this.setState({ username: text }))} />
                        <RkTextInput rkType='rounded' placeholder='Password' secureTextEntry={true} onChangeText={(text => this.setState({ password: text }))} />
                        <GradientButton onPress={() => {
                            this.submitLogin()
                        }} rkType='large' style={styles.save} text='LOGIN' />
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.textRow}>
                            <RkText rkType='primary3'>Don’t have an account?</RkText>
                            <RkButton rkType='clear'>
                                <RkText rkType='header6' onPress={() => this.props.navigation.navigate('SignUp')}> Sign up
                  now </RkText>
                            </RkButton>
                        </View>
                    </View>
                </View>
            </RkAvoidKeyboard>
        )
    }
}

let styles = RkStyleSheet.create(theme => ({
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.colors.screen.base
    },
    image: {
        resizeMode: 'cover',
        marginBottom: scaleVertical(10),
    },
    container: {
        paddingHorizontal: 17,
        paddingBottom: scaleVertical(22),
        alignItems: 'center',
        flex: -1
    },
    footer: {
        justifyContent: 'flex-end',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginHorizontal: 14
    },
    save: {
        marginVertical: 9
    },
    textRow: {
        justifyContent: 'center',
        flexDirection: 'row',
    }
}));