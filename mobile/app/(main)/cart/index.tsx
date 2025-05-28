import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from "react-native"
import useCart from "../../../hooks/useCart"
import CartCard from "../../../components/ui/cart/CartCard"
import ThemedText from "../../../components/ThemedText"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import ThemedButton from "../../../components/ThemedButton"
import { useEffect, useState } from "react"
import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
    withCredentials: true,
}); 

const Cart = () => {
    const { cart, checkout, updateItem, removeItem } = useCart()
    const router = useRouter();
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        socket.on('payment-success', (itemIds) => {
            for(const id in itemIds){
                removeItem(id);
            }
        });
    
        return () => {
          socket.disconnect();
        };
    }, [socket])


    return <View style={styles.container}>
        <View style={styles.header}>
            <View style={{display: 'flex', flexDirection: 'row', gap: 15, alignItems: 'center'}}> 
                <TouchableOpacity
                    style={{ marginBottom: 15}}
                    onPress={() => router.back()}
                >
                    <Ionicons size={25} name="arrow-back"/>
                </TouchableOpacity>
                <ThemedText title style={styles.title}>Shopping Cart</ThemedText>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{ fontSize: 16 }}>{cart.length} items</Text>
                <TouchableOpacity onPress={() => setIsEdit(!isEdit)}>
                    <Text style={{ color: !isEdit ? '#9137db' : 'red'}}>{!isEdit ? 'EDIT' : 'CANCEL'}</Text>
                </TouchableOpacity>
            </View>
        </View>
        {cart.length > 0 ? <ScrollView style={{ paddingHorizontal: 5, paddingVertical: 15}} showsVerticalScrollIndicator={false}>
            {cart.length > 0 && cart.map((item) => <CartCard 
                key={item.id} 
                item={item} 
                updateItem={updateItem} 
                checkout={checkout}
                remove={removeItem}
                isEdit={isEdit}
            />
            )}
        </ScrollView> :
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Your cart is empty</Text>
        </View>}
        <View style={{ padding: 20, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#9CA3AF'}}>
            <View style={{ 
                display: 'flex', 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                width: '100%', 
                alignItems: 'center',
                marginBottom: 15
            }}>
                <Text style={{ fontSize: 17}}>Total</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>₱{cart.reduce((total, item) => (item.price * item.quantity) + total, 0)}</Text>
            </View>
            <ThemedButton 
                onPress={() => checkout(cart)}
                disabled={cart.length === 0}
            >
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 17}}>Check out</Text>
            </ThemedButton>
        </View>
    </View>
}

export default Cart

const styles = StyleSheet.create({
    container: { 
        flex: 1,
    },
    header: { 
        backgroundColor: 'white', 
        padding: 20,
        borderBottomWidth: 1, 
        borderColor: 'rgb(190, 190, 190)'
    },
    title: {
        fontSize: 25, 
        marginBottom: 20, 
        fontWeight: 'bold'
    }
})