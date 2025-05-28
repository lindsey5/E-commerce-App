import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import ThemedText from "../../components/ThemedText"
import Header from "../../components/ui/partials/header"
import { useRouter } from "expo-router"

const OrderPlaced = () => {
    const router = useRouter();
    
    return <View style={styles.container}>
        <Header />
        <Ionicons size={100} name={"checkmark-circle"} color={'#9137db'} />
        <ThemedText title={true} style={styles.title}>Your Order has been placed</ThemedText>
        <TouchableOpacity style={styles.button} onPress={() => router.replace('/')}>
            <Text style={{ color: 'white', fontSize: 15}}>Continue Shopping</Text>
            <Ionicons size={30} name={"arrow-forward"} color={'white'} />
        </TouchableOpacity>
    </View>
}

export default OrderPlaced

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#9137db',
        textAlign: 'center',
        marginBottom: 40
    },
    button: {
        backgroundColor: '#9137db',
        padding: 15,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    }
})