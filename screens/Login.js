import { StyleSheet, Text, View, Image, TextInput, StatusBar, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ToastAndroid , Alert} from 'react-native';
import React, { useState, useEffect } from 'react'
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import FlashMessage from 'react-native-flash-message';
import { useNavigation } from "@react-navigation/native"
import api from '../api';
import axios from 'axios';
import AuthService from '../AuthService';

const Login = () => {
    const navigation = useNavigation();
    const [textInputFocused, setTextInputFocused] = useState(false);
    const handleRemoveKeyboard = () => {
        if (textInputFocused) {
            Keyboard.dismiss();
            setTextInputFocused(false);
        }
    };

    // handler login
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(() => {
        validateForm();
    }, [username, password]);

    const validateForm = () => {
        let errors = {};
        if (!username.trim()) {
            errors.username = 'Username is required.'
        }
        if (!password.trim()) {
            errors.password = 'Password is required.'
        }
        // Set the errors and update form validity 
        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://192.168.1.7:8080/api/users/login', {
                userName: username,
                passWord: password
            });

            if (response.status == 200 && response.data.token != null && response.data.token != undefined) {
                // Xử lý dữ liệu trả về từ API nếu cần
                const userIDString = response.data.id.toString(); // Chuyển đổi số thành chuỗi


                await AuthService.setToken(response.data.token, userIDString);


                // Ví dụ: lưu token vào AsyncStorage và điều hướng đến màn hình chính
                navigation.replace('HomeDrawer');
            }else{
                Alert.alert(
                    'Đăng nhập không thành công',
                    'Vui lòng kiểm tra lại thông tin đăng nhập của bạn.',
                    [
                      { text: 'OK', onPress: () => console.log('OK Pressed') }
                    ],
                    { cancelable: false }
                  );
            }

        } catch (error) {
            // Xử lý lỗi khi gọi API
            console.error('Error logging in:', error);
            // Hiển thị thông báo lỗi cho người dùng
            ToastAndroid.show('Login failed. Please try again.', ToastAndroid.SHORT);
        }
    };
    return (
        <TouchableWithoutFeedback onPress={handleRemoveKeyboard} style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#fdfdfd' }}>
                <View style={{ position: 'absolute', top: 30, left: 0, right: 0, zIndex: 999 }}>
                    <FlashMessage position="top" />
                </View>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                <View style={{ position: 'absolute', zIndex: 50, width: '100%', justifyContent: 'center', alignItems: 'center', top: 70 }}>
                    {/* <TouchableOpacity style={{position: 'absolute', left: 25, zIndex:50}}
                 onPress={() =>{navigation.goBack()}}>
                    <FontAwesome6Icon name="angle-left" size={33} color="black" style={{fontWeight: '600'}}/>
                </TouchableOpacity> */}
                    <Image
                        style={{ width: 200, height: 250, resizeMode: 'contain', }}
                        source={require("../assets/images/logo.jpg")}
                    />
                    <Text style={{ fontSize: 25, fontWeight: '500' }}>TRƯỜNG ĐẠI HỌC QUY NHƠN</Text>
                    <Text style={{ fontSize: 22, fontWeight: '500', marginTop: 10 }}>Quản lý giảng dạy</Text>
                    <View style={{ width: 250, height: 2, backgroundColor: 'gray', marginTop: 10 }} />
                </View>

                <View style={styles.container}>
                    <View style={{ width: '100%', height: '100%', flexDirection: 'column', marginTop: 30 }}>
                        <View style={{ width: '100%', flexDirection: 'column', marginBottom: 20 }}>
                            <View style={{ width: '100%', height: 40, marginTop: 5, flexDirection: 'row', borderBottomWidth: 2, borderColor: '#989898', alignItems: 'center' }}>
                                <FontAwesomeIcon name="user-o" size={23} color="gray" />
                                <View style={{ width: 2, height: 20, backgroundColor: 'gray', marginHorizontal: 10 }} />
                                <TextInput placeholder='Enter your username' style={{ fontSize: 19 }}
                                    onFocus={() => setTextInputFocused(true)}
                                    onBlur={() => setTextInputFocused(false)}
                                    value={username}
                                    onChangeText={(text) => {
                                        setUsername(text);
                                        validateForm();
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'column', marginBottom: 20 }}>
                            <View style={{ width: '100%', height: 40, marginTop: 5, flexDirection: 'row', borderBottomWidth: 2, borderColor: '#989898', alignItems: 'center' }}>
                                <SimpleLineIcon name="lock" size={22} color="gray" />
                                <View style={{ width: 2, height: 20, backgroundColor: 'gray', marginHorizontal: 10 }} />
                                <TextInput placeholder='Enter your password' style={{ fontSize: 19 }}
                                    onFocus={() => setTextInputFocused(true)}
                                    onBlur={() => setTextInputFocused(false)}
                                    secureTextEntry={true}
                                    value={password}
                                    onChangeText={(text) => {
                                        setPassword(text);
                                        validateForm();
                                    }} />
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={handleLogin}
                            style={[{ opacity: isFormValid ? 1 : 0.7 }]}
                            disabled={!isFormValid}
                        >
                            <View style={{ width: '100%', height: 50, backgroundColor: '#3399ff', marginTop: 40, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 17, fontWeight: '600', color: '#fff' }}>Đăng nhập</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 330,
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingHorizontal: 20,
        paddingVertical: 30,
        elevation: 10,
        backgroundColor: '#fff',
        zIndex: 100,
    },
})