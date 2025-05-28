import AsyncStorage from "@react-native-async-storage/async-storage";

export const setToken = async (token) => {
    await AsyncStorage.setItem("token", JSON.stringify(token));
}

export const getToken = async () => {
    return await AsyncStorage.getItem("token");
}