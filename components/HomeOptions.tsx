import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import api from "../api";

import RNPickerSelect from 'react-native-picker-select';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';
import AuthService from '../AuthService';
import { BarChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
const OPTION1 = "OPTION1";
const OPTION2 = "OPTION2";

export default function HomeOptions({ navigation }: { navigation: any }) {
  const [page, setPage] = useState<string>("OPTION1");
  return (
    <View>
      <MainComponent page={page} setPage={setPage} />
    </View>
  );
}

const MainComponent = ({
  page,
  setPage,
}: {
  page: string;
  setPage: Function;
}) => {
  return (
    <View>
      <View style={styles.nav}>
        <TouchableOpacity
          style={styles.bntControl}
          onPress={() => {
            setPage(OPTION1);
          }}
          disabled={page === OPTION1 ? true : false}
        >
          <Text
            style={[
              styles.bntText,
              page === OPTION1 ? styles.activeText : null,
            ]}
          >
            Một năm
          </Text>
          {page === OPTION1 ? (
            <View
              style={{
                position: "absolute",
                bottom: -3,
                width: "100%",
                height: 3,
                backgroundColor: "#2966dc",
                borderRadius: 10,
              }}
            />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bntControl}
          onPress={() => {
            setPage(OPTION2);
          }}
          disabled={page === OPTION2 ? true : false}
        >
          <Text
            style={[
              styles.bntText,
              page === OPTION2 ? styles.activeText : null,
            ]}
          >
            Tất cả
          </Text>
          {page === OPTION2 ? (
            <View
              style={{
                position: "absolute",
                bottom: -3,
                width: "100%",
                height: 3,
                backgroundColor: "#2966dc",
                borderRadius: 10,
              }}
            />
          ) : null}
        </TouchableOpacity>
      </View>
      {page === OPTION1 ? <Option1Component /> : null}
      {page === OPTION2 ? <Option2Component /> : null}
    </View>
  );
};

const Option1Component = () => {
  return (
    <View>
      <Text>Option1</Text>
    </View>
  );
};

const Option2Component = () => {
  const [selectedItem, setSelectedItem] = useState<number>(1); // Đặt kiểu dữ liệu của selectedItem là number
  const [dataFromApi, setDataFromApi] = useState<any[]>([]); // Đặt kiểu dữ liệu của dataFromApi là một mảng các đối tượng bất kỳ (any[])
  const [itemsFromApi, setItemsFromApi] = useState<any[]>([]); // Đặt kiểu dữ liệu của itemsFromApi là một mảng các đối tượng bất kỳ (any[])
  const [userID, setUserID] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userID = await AuthService.getUserID();
        setUserID(userID)
        const response = await api.get('/api/school-year/');
        setItemsFromApi(response.data.data);
        // Lưu danh sách các mục từ API vào state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(); // Gọi hàm fetchData khi component được tạo
  }, []); // Chỉ gọi một lần khi component được tạo
  const fetchData = async (value) => {
    try {
      const response = await api.post('/api/assignment/get-data/', {
        lecturer: value.lecturer,
        year: value.year
      });
      // Xử lý dữ liệu từ API tại đây
      setDataFromApi(response.data.data)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  let data = {
    labels: dataFromApi.map(item => item.semesterName),
    datasets: [
      {
        data: dataFromApi.map(item => item.exactTime),
      }
    ]
  };
  return (

    <View>

      {/* <RNPickerSelect
        onValueChange={(value) => {
          const lecturerObj = { id: userID };
          const yearObj = { id: value };
          const dto = { "lecturer": lecturerObj, "year": yearObj };

          setSelectedItem(value)
          fetchData(dto); // Gọi hàm fetchData khi giá trị thay đổi
        }}
        items={itemsFromApi.map(item => ({ label: `${item.fromYear} - ${item.toYear}`, value: item.id }))}
        value={selectedItem}
      />

      <BarChart
        style={styles.chart}
        data={data}
        width={Dimensions.get('window').width - 16}
        height={220}
        yAxisLabel=""
        yAxisSuffix="giờ"
        chartConfig={{
          backgroundColor: "#1cc910",

          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          decimalPlaces: 0, // Số thập phân
          color: (opacity = 1) => `rgba(0, 0, 128, 1)`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        verticalLabelRotation={0}
      /> */}
    </View>

  );
};

const styles = StyleSheet.create({
  nav: {
    width: "100%",
    height: 50,
    justifyContent: "space-between",
    borderBottomWidth: 3,
    borderBottomColor: "#d3d3d3",
    flexDirection: "row",
    alignContent: "center",
  },
  bntControl: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bntText: {
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "600",
    color: "#626262",
  },
  activeText: {
    color: "#2966dc",
  },
  chart: {
    marginTop: 40, // Để không che mất dropdown list
    pointerEvents: 'none',
  },
});
