import { StyleSheet, Text, View, StatusBar, TextInput, Button } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import api from '../api';
import { ToastAndroid } from 'react-native';
import { Alert } from 'react-native';
import AuthService from '../AuthService';
import React, { useState } from 'react'
import Header from '../components/Header'
const Profile = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [facultyData, setFacultyData] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Biến cờ để kiểm tra xem dữ liệu đã được tải xong chưa

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                try {
                    const userID = await AuthService.getUserID();
                    // console.log(userID)
                    if (userID) {
                        const response = await api.get(`/api/lecturer/${userID}`);
                        setUserData(response.data.data);
                        
                        const response2 = await api.get(`/api/faculty/${response.data.message}`);
                        setFacultyData(response2.data.data);
                        setIsLoading(false); // Đánh dấu rằng dữ liệu đã được tải xong
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };

            fetchData();
        }, [])
    );
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword  = async () => {
        // Kiểm tra xem mật khẩu mới có trùng khớp với mật khẩu xác nhận không
        if (newPassword !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu mới và mật khẩu xác nhận không trùng khớp');
            return;
        }
        try {
            const response = await api.post('http://192.168.1.8:8080/api/users/update', {
                pass: currentPassword,
                newPass: newPassword,
                rePass: confirmPassword
            });

            if (response.data.status == "ok" ) {
                ToastAndroid.show('Đổi mật khẩu thành công', ToastAndroid.SHORT);
                setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
            }else{
                ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
            }

        } catch (error) {
            // Xử lý lỗi khi gọi API
          
            // Hiển thị thông báo lỗi cho người dùng
            ToastAndroid.show('Mật khẩu không đúng', ToastAndroid.SHORT);
        }
   
    };
    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />
            <Header navigation={navigation} />
            <View style={{ width: "100%", height: 50, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(192,192,192,0.7)' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Thông tin cá nhân</Text>
            </View>

            <View style={{ flex: 1 }}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" /> // Hiển thị loading indicator
                ) : (
                    <View style={styles.container}>
                        <View style={styles.infoContainer}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Thông tin tài khoản</Text>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>Mã giảng viên:</Text>
                                <Text style={styles.value}>{userData ? userData.id : ''}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>Tên:</Text>
                                <Text style={styles.value}>{userData ? userData.name : ''}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>Mail:</Text>
                                <Text style={styles.value}>{userData ? userData.mail : ''}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>Tổ bộ môn:</Text>
                                <Text style={styles.value}>{facultyData ? facultyData.name : ''}</Text>
                            </View>
                        
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Đổi mật khẩu</Text>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Mật khẩu hiện tại"
                                    secureTextEntry={true}
                                    value={currentPassword}
                                    onChangeText={setCurrentPassword}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Mật khẩu mới"
                                    secureTextEntry={true}
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Xác nhận mật khẩu mới"
                                    secureTextEntry={true}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                />
                            </View>
                            <Button title="Thay đổi mật khẩu" onPress={handleChangePassword} />
                        </View>

                    </View>
                )}
            </View>
        </View>
    )
}

export default Profile
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f8ff', // Màu xanh nước biển
    },
    infoContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    inputContainer: {
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoContainer: {
        width: '80%',
        backgroundColor: 'white', // Màu trắng
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        width: '40%',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black', // Màu xanh lá cây tương ứng với màu xanh nước biển
    },
    value: {
        flex: 1,
        fontSize: 16,
    },
});
