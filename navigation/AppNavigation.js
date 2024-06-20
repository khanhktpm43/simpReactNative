import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, View, ImageBackground, Image, Text, SafeAreaView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNavigator, SwitchRouter, DrawerRouter, NavigationHelpers } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Manage from '../screens/Manage';
import Profile from '../screens/Profile';
import Semester from '../screens/Semester';
import Rank from '../screens/Rank';
import Faculty from '../screens/Faculty';
import Department from '../screens/Department';
import { useFocusEffect } from '@react-navigation/native';
import api from '../api';
import AuthService from '../AuthService';
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


const HomeDrawer = () => {


  const [userName, setUserName] = useState('');
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const userID = await AuthService.getUserID();

          //  console.log(userID)
          if (userID) {
            const response = await api.get(`/api/lecturer/${userID}`);
            const userName = response.data.data.name;
            setUserName(userName);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchData();
    }, [])
  );

  const navigation = useNavigation();
  const goToProfile = () => {
    navigation.navigate('Profile');
  };
  const handleLogout = async () => {
    // Thực hiện các thao tác cần thiết để logout (ví dụ: xóa token, gọi API logout)
    try {
      const response = await api.post('/api/users/logout');

      if (response.status == 200) {
        // Xử lý dữ liệu trả về từ API nếu cần

        await AuthService.clearToken(response.data.token);


        // Chuyển hướng người dùng đến màn hình đăng nhập
        navigation.replace('Login');
      }

    } catch (error) {
      // Xử lý lỗi khi gọi API
      console.error('Error logging out:', error);
      // Hiển thị thông báo lỗi cho người dùng
      ToastAndroid.show('Logout failed. Please try again.', ToastAndroid.SHORT);
    }

  };

  return (
    <Drawer.Navigator
      initialRouteName='Home'
      drawerContent={
        (props) => {
          return (
            <SafeAreaView>
              <TouchableOpacity onPress={goToProfile}>
                <View style={{ width: '100%', height: 250, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    style={{ width: 120, height: 120, borderRadius: 60 }}
                    source={require("../assets/images/user.jpg")} />
                  <Text style={{ fontSize: 20, fontWeight: 500, marginTop: 10 }}>{userName}</Text>
                </View>
              </TouchableOpacity>
              <DrawerItemList {...props} />
              <DrawerItem
                label="Đăng xuất"
                onPress={handleLogout}
                // icon={() => <SimpleLineIcon name="logout" size={20} color="#111" />}
                labelStyle={{ fontWeight: 'bold', color: 'black' }}
              />
            </SafeAreaView>
          )
        }
      }
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
          width: 350,
        },
        headerStyle: {
          backgroundColor: '#3399ff',

        },
        headerTintColor: '#3399ff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerActiveTintColor: '#3399ff',
        drawerLabelStyle: {
          color: 'black',
          fontWeight: 'bold',
        }
      }}
    >
      <Drawer.Screen
        name='Home'
        component={Home}
        options={{
          headerShown: false,
          drawerLabel: 'Thống kê',
          title: 'Home',
          // drawerIcon: () => (
          //   <SimpleLineIcon name="home" size={20} color="#111" />
          // ),
          labelStyle: { fontWeight: 'bold', color: 'black' }
        }} />
      <Drawer.Screen
        name='Manage'
        component={Manage}
        options={{
          headerShown: false,
          drawerLabel: 'Năm học',
          title: 'Manage',
          // drawerIcon: () => (
          //   <SimpleLineIcon name="home" size={20} color="#111" />
          // ),
          labelStyle: { fontWeight: 'bold', color: 'black' }
        }} />
      <Drawer.Screen
        name='Semester'
        component={Semester}
        options={{
          headerShown: false,
          drawerLabel: 'Học kì',
          title: 'Semester',
          // drawerIcon: () => (
          //   <SimpleLineIcon name="home" size={20} color="#111" />
          // ),
          labelStyle: { fontWeight: 'bold', color: 'black' }
        }} />
        <Drawer.Screen
        name='Rank'
        component={Rank}
        options={{
          headerShown: false,
          drawerLabel: 'Ngạch giảng viên',
          title: 'Rank',
          // drawerIcon: () => (
          //   <SimpleLineIcon name="home" size={20} color="#111" />
          // ),
          labelStyle: { fontWeight: 'bold', color: 'black' }
        }} />
        <Drawer.Screen
        name='Department'
        component={Department}
        options={{
          headerShown: false,
          drawerLabel: 'Khoa',
          title: 'Department',
          // drawerIcon: () => (
          //   <SimpleLineIcon name="home" size={20} color="#111" />
          // ),
          labelStyle: { fontWeight: 'bold', color: 'black' }
        }} />
      <Drawer.Screen
        name='Profile'
        component={Profile}
        options={{
          headerShown: false,
          drawerLabel: () => null,
          drawerItemStyle: { height: 0 } // Ẩn mục "Profile" khỏi menu Drawer
        }}
      />
      <Drawer.Screen
        name='Faculty'
        component={Faculty}
        options={{
          headerShown: false,
          drawerLabel: () => null,
          drawerItemStyle: { height: 0 } // Ẩn mục "Profile" khỏi menu Drawer
        }}
      />
    </Drawer.Navigator>
  )
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="HomeDrawer" options={{ headerShown: false }} component={HomeDrawer} />

      </Stack.Navigator>

    </NavigationContainer>
  )
}
