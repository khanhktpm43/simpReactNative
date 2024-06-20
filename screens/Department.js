import { StyleSheet, Text,TouchableOpacity, View,ScrollView, StatusBar } from 'react-native'
import React,{useState,useEffect } from 'react'
import api from '../api'
import Header from '../components/Header'
const Department = ({ navigation }) => {
    const handleDetail = (id) => {
        // Xử lý sự kiện chuyển trang khi nhấn vào button
        // Ví dụ:
        navigation.navigate('Faculty', { id });
      };
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData(); // Gọi fetchData khi màn hình được render
  }, []); // Dependency array trống đảm bảo rằng fetchData chỉ được gọi một lần khi màn hình được render

  const fetchData = async () => {
    try {
      const response = await api.get('/api/departments/'); // Thay thế your-endpoint bằng đường dẫn API của bạn
      setData(response.data.data); // Lưu dữ liệu vào state
   
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />
      <Header navigation={navigation} />
      <View style={{ width: "100%", height: 50, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(192,192,192,0.7)' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Khoa</Text>
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          
          <View style={styles.table}>
            <View style={styles.headerRow}>
              <Text style={[styles.headerItem, styles.column1]}>STT</Text>
              <Text style={[styles.headerItem, styles.column2]}>Khoa</Text>
              <Text style={[styles.headerItem, styles.column3]}>Chi tiết</Text>
            </View>
            {/* Sử dụng data để render dữ liệu */}
            {data && data.map((item, index) => (
              <View key={index} style={styles.row}>
                <Text style={[styles.column1]}>{index + 1}</Text>
                <Text style={[styles.column2]}>{`${item.name}`}</Text>
                {/* button */}
                <TouchableOpacity style={styles.detailButton} onPress={() => handleDetail(item.id)}>
                <Text style={styles.detailButtonText}>Chi tiết</Text>
              </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>


    </View>
  )
}

export default Department
const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    marginTop: 20,
    flexDirection: 'column',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  headerItem: {
    fontWeight: 'bold',
  },
  column1: {
    flex: 1,
    marginRight: 0, // Đặt khoảng cách mong muốn giữa cột 1 và cột 2
  },
  column2: {
    flex: 2,
    marginRight: 15,
  },
  column3: {
    flex: 1,
  },
  detailButton: {
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  detailButtonText: {
    color: '#fff',
  },
});