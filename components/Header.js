import { View, Image, TouchableOpacity,ImageBackground } from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons";
import React from 'react'

const Header = ({ navigation}) => {
  return (
    <View style={{width:'100%', height: 90}}>
            <ImageBackground
                style={{ width: '100%', height: 90, resizeMode: 'cover', }}
                source={require("../assets/images/qnu-banner.png")}
            >
                <TouchableOpacity style={{position:'absolute', top: 42, right: 20}}
                    onPress={() => navigation.openDrawer()}>
                    <View >
                        <Ionicons name="menu-sharp" size={40} color="#fff" />
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        </View>
  )
}

export default Header