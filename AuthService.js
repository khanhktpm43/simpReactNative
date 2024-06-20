
import AsyncStorage from '@react-native-async-storage/async-storage';
const AuthService = {
    getToken: async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            return token;
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    },
    getUserID: async () => {
        try {
            const userID = await AsyncStorage.getItem('userID');
            return userID;
        } catch (error) {
            console.error('Error getting user ID:', error);
            return null;
        }
    },


    setToken: async (token, id) => {
        try {
            const expirationTime = Date.now() + (24 * 60 * 60 * 1000); // Thời gian hết hạn là 1 ngày
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('tokenExpiration', expirationTime.toString());
            await AsyncStorage.setItem('userID', id);
        } catch (error) {
            console.error('Error setting token:', error);
        }
    },
    // Phương thức để kiểm tra và xóa token khi nó hết hạn
    checkTokenExpiration: async () => {
        try {
            const expirationTime = await AsyncStorage.getItem('tokenExpiration');
            if (expirationTime && Date.now() > parseInt(expirationTime)) {
                // Nếu token đã hết hạn, xóa token và thời gian hết hạn khỏi bộ nhớ

                await clearToken()
            }
        } catch (error) {
            console.error('Error checking token expiration:', error);
        }
    },
    clearToken: async () => {
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('tokenExpiration');
            await AsyncStorage.removeItem('userID');
        } catch (error) {
            console.error('Error clearing token:', error);
        }
    }
};

export default AuthService;
