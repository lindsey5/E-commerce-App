import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, TextInput, TextInputProps, TouchableOpacity, Switch } from "react-native"
import { fetchData, postData, updateData } from "../../services/api";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import ThemedButton from "../../components/ThemedButton";
import useSocket from "../../hooks/useSocket";

interface DetailInputProps extends TextInputProps{
    label: string,
    value: string
}

const DetailInput = ({ label, value, ...props} : DetailInputProps) => {
    return <View style={{
            width: '100%', 
            flexDirection: 'row', 
            gap: 30, 
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
        <Text style={{ fontSize: 15, opacity: 0.5, fontWeight: 'bold'}}>{label}</Text>
        <TextInput 
            style={{ 
                width: '70%', 
                backgroundColor: 'white', 
                fontWeight: 'bold',
                fontSize: 18,
                borderBottomWidth: 1,
                borderColor: '#b9b9b9'
            }}
            value={value} 
            {...props}
        />
    </View>
}

const CheckoutPage = () => {
    const router = useRouter();
    const [address, setAddress] = useState({
        address: '',
        zip: '',
        city: '',
    });
    const [isSaved, setIsSaved] = useState(true);
    const [items, setItems] = useState([]);
    const [user, setUser] = useState({
        firstname: '',
        lastname: ''
    });

    useEffect(() => {
        const getCheckoutItemsAsync = async () => {
            setItems(JSON.parse(await AsyncStorage.getItem("checkout-items")))
            const response = await fetchData('/api/user');
            setUser({
                firstname: response.user.firstname,
                lastname: response.user.lastname
            })

            setAddress(response.user.address)
        }

        getCheckoutItemsAsync()
    }, [])

    const pay = async () => {
        try{  
            const response = await postData('/api/payment', { items, address, user })
            router.replace(`/webview?url=${encodeURIComponent(response.checkout_url)}`);
        }catch(err){
            console.error(err)
        }
    }

    useEffect(() => {
        const updateAddress = async () => {
            await updateData('/api/user', {address});
        }

        if(isSaved && address.address && address.zip && address.city) {
            updateAddress()
        }
    }, [isSaved, address])

    return <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons size={30} name="arrow-back" color={"white"}/>
            </TouchableOpacity>
            <Text style={styles.title}>Checkout</Text>
            <Text style={styles.title}>₱{items.reduce((total, item) => (item.price * item.quantity) + total, 0)}</Text>
        </View>
        <View 
            style={{ 
                gap: 20, 
                padding: 20,
                backgroundColor: 'white',
                alignItems: 'flex-end'
            }}
        >
            <DetailInput 
                label="Firstname:" 
                value={user.firstname} 
                editable={false}
            />
            <DetailInput 
                label="Lastname:" 
                value={user.lastname} 
                editable={false}
            />
            <DetailInput 
                label="Address:"
                value={address.address}
                onChangeText={(value) => setAddress({...address, address: value})} 
            />
            <DetailInput 
                label="ZIP:"
                value={address.zip}
                onChangeText={(value) => setAddress({...address, zip: value})} 
            />
            <DetailInput 
                label="City:"
                value={address.city}
                onChangeText={(value) => setAddress({...address, city: value})} 
            />
            <View style={{
                width: '100%', 
                flexDirection: 'row', 
                gap: 30, 
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Text style={{ fontSize: 15, opacity: 0.5, fontWeight: 'bold'}}>Saved for future purchases</Text>
                <Switch
                    trackColor={{ false: '#767577', true: 'rgb(208, 174, 236)' }}
                    thumbColor={isSaved ? '#9137db' : '#f4f3f4'}
                    onValueChange={setIsSaved}
                    value={isSaved}
                />
            </View>
            <ThemedButton 
                disabled={!(address.address && address.zip && address.city)}
                style={{width: 120, paddingVertical: 12, marginTop: 20}} 
                onPress={pay}
            >
                <Text style={{ color: 'white', textAlign: 'center'}}>Proceed</Text>
            </ThemedButton>
        </View>
    </View>
}

export default CheckoutPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0dfe8'
    },
    header:{ 
        flexDirection: 'row',
        paddingVertical: 30, 
        backgroundColor: '#9137db', 
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        alignItems: 'center'
    },    
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    switch: {
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], 
      },
})