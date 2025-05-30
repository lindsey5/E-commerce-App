import { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native"
import { fetchData, updateData } from "../../../services/api"
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "../../../components/CustomInput";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
    const [user, setUser] = useState<any>();
    const [updatedUser, setUpdatedUser] = useState<any>()

    const logout = async () => {
            Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Yes',
                onPress: async () => {
                    await AsyncStorage.removeItem("user");
                    await AsyncStorage.removeItem("token");
                    setUser(undefined)
                    setUpdatedUser(undefined)
                    router.replace('/');
                },
            },
            ],
            { cancelable: true }
        );
    }

    const handleSaveConfirmation = async () => {
        Alert.alert(
            'Confirm Update',
            'Do you want to save the changes?',
            [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Yes',
                onPress: async () => {
                const result = await updateData('/api/user', updatedUser);
                if (result.success) {
                    router.replace('/');
                }
                },
            },
            ],
            { cancelable: true }
        );
    };

    useEffect(() => {
        const getUser = async () => {
            const response = await fetchData('/api/user')
            if(response.success){
                 setUser(response.user)
                 setUpdatedUser(response.user)
            }
        }

        getUser();
    }, [])

    if(!user) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => router.push('/login')} style={{ backgroundColor: '#9137db', borderRadius: 10, paddingHorizontal: 30, paddingVertical: 10 }}>
            <Text style={{ color: 'white' }}>Login</Text>
        </TouchableOpacity>
    </View>

    return <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#9137db', paddingHorizontal: 10, paddingVertical: 20}}> 
            <Text style={{ fontSize: 25, color: 'white'}}>Profile</Text>
            <TouchableOpacity onPress={logout}>
                <Ionicons 
                    name="log-out-outline"
                    style={{ color: 'white'}}
                    size={30}
                />
            </TouchableOpacity>
        </View>
        <View style={{ flex: 1, padding: 20, gap: 20}}>
            <Text>Email Address: {user?.email}</Text>
            <View style={{ flexDirection: 'row', gap: 10}}>
                <CustomInput
                    value={updatedUser?.firstname}
                    onChangeText={(value) => setUpdatedUser({...updatedUser, firstname: value})}
                    style={{ flex: 1}}
                    placeholder="Firstname"
                />
                <CustomInput
                    value={updatedUser?.lastname}
                    onChangeText={(value) => setUpdatedUser({...updatedUser, lastname: value})}
                    style={{ flex: 1}}
                    placeholder="Lastname"
                />
            </View>
            <CustomInput
                value={updatedUser?.address.address}
                style={{ height: 100, textAlignVertical: "top"}}
                multiline
                numberOfLines={4}
                onChangeText={(value) => setUpdatedUser({...updatedUser, address: { ...updatedUser.address, address: value}})}
                placeholder="Address"
            />
            <CustomInput
                value={updatedUser?.address.city}
                onChangeText={(value) => setUpdatedUser({...updatedUser, address: { ...updatedUser.address, city: value}})}
                placeholder="City"
            />
            <CustomInput
                value={updatedUser?.address.zip}
                onChangeText={(value) => setUpdatedUser({...updatedUser, address: { ...updatedUser.address, zip: value}})}
                placeholder="Zip"
            />
            <View style={{ alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={handleSaveConfirmation} style={{ backgroundColor: '#9137db', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 10}}>
                    <Text style={{ color: 'white'}}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
}

export default  Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    }
});