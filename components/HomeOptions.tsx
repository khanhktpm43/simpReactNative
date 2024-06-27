import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import api from "../api";

import RNPickerSelect from 'react-native-picker-select';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';
import AuthService from '../AuthService';
import { BarChart } from 'react-native-chart-kit';
import { LineChart } from 'react-native-chart-kit';
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
            Tất cả
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
            Theo năm
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

const screenWidth = Dimensions.get('window').width;


const Option1Component = () => {
  const [allYear, setAllYear] = useState([]);
  const [loading, setLoading] = useState(true); // Trạng thái để theo dõi trạng thái loading
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userID = await AuthService.getUserID();
        if (userID) {
          const response = await api.get(`/api/assignment/lecturer/${userID}`);
          const data = response.data.data;
          setAllYear(data);
          setLoading(false); // Khi dữ liệu được fetch xong, set loading về false
        }
      } catch (error) {
        console.error('Lỗi khi fetch dữ liệu:', error);
        setLoading(false); // Xử lý lỗi và set loading về false
      }
    };

    fetchData(); // Fetch dữ liệu khi component được mount
  }, []);

  if (loading) {
    return (
      <View>
        {/* Hiển thị indicator loading hoặc placeholder */}
        <Text>Loading...</Text>
      </View>
    );
  }

  // Gộp nhóm và tính tổng giá trị theo label 'time'
  const groupedData = allYear.reduce((acc, current) => {
    const existingItem = acc.find(item => item.time === current.time);
    if (existingItem) {
      existingItem.exactTime += current.exactTime; // Cộng giá trị 'exactTime' lại nếu label trùng nhau
    } else {
      
      acc.push({ ...current }); // Thêm label mới vào mảng kết quả
    }
    return acc;
  }, []);

  // Chuẩn bị dữ liệu cho biểu đồ
  const chartData = {
    labels: groupedData.map(item => item.time), // Lấy các nhãn từ trường 'time'
    datasets: [
      {
        data: groupedData.map(item => item.exactTime), // Lấy dữ liệu 'exactTime' để vẽ biểu đồ
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Màu của đường line
        strokeWidth: 2, // Độ dày của đường line
      },
    ],
  };

  return (
    <View>
      <LineChart
        data={chartData}
        width={screenWidth} // Chiều rộng của biểu đồ là toàn bộ màn hình
        height={650}
       
        yAxisSuffix=" giờ"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

        }}
        bezier
       
      />
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

    <View style={styles.container}>

      <RNPickerSelect
    
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
        width={Dimensions.get('window').width }
        height={550}
        yAxisLabel=""
        yAxisSuffix=" giờ"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
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
      /> 
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#ffffff',
  },
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
