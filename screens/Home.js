import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeOptions from '../components/HomeOptions';
import Header from '../components/Header';
import {BarChart, Grid, YAxis, XAxis} from 'react-native-svg-charts';



export default Home = ({ navigation }) => {



  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />
      <Header navigation={navigation} />
      <View style={{ width: "100%", height: 50, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(192,192,192,0.7)' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Thống kê</Text>
            </View>
      <View style={{ flex: 1 }}>
        <HomeOptions />
      </View>


    </View>
  )
}


const styles = StyleSheet.create({})