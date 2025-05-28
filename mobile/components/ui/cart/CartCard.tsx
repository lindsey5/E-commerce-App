import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native"
import { CartItem } from "../../../types/Cart"
import QuantityCounter from "../QuantityCounter"
import { useEffect, useState } from "react"
import { fetchData } from "../../../services/api"
import { useRouter } from "expo-router"
import ThemedButton from "../../ThemedButton"

interface ICard{
    item : CartItem;
    updateItem: (value : string, value1: number) => void
    checkout: (item : object[]) => void
    remove : (id : string) => void
    isEdit : boolean
}

const CartCard = ({ item, updateItem, checkout, remove, isEdit } : ICard) => {
    const [stock, setStock] = useState<number>();
    const [quantity, setQuantity] = useState<number>()
    const router = useRouter();

    useEffect(() => {
        const getItemAsync = async () => {
            const response = await fetchData(`/api/item/${item.item_id}`)
            setStock(response.item.stock)
            item.quantity > response.item.stock ? setQuantity(response.item.stock) : setQuantity(item.quantity)
        }
        
        getItemAsync()
    }, [])


    useEffect(() => {

        const handler = setTimeout(() => {
            if (quantity) {
                updateItem(item.id, quantity);
            }
        }, 600);

        return () => clearTimeout(handler);

    }, [quantity]);

    return <View style={styles.card}>
       <TouchableOpacity onPress={() => router.push(`/product/${item.product_id}`)}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover"/>
       </TouchableOpacity>
       <View 
            style={{ 
                flex: 1, 
                height: '100%', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
            }}
        >
            <View> 
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5}}>{item.name}</Text>
                <Text>{item.color} | {item.size}</Text>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 18}}>₱{(item.price * item.quantity)}</Text>
                <QuantityCounter 
                    item={{ stock }}
                    quantity={quantity}
                    setQuantity={setQuantity}
                />
            </View>
            {isEdit && <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <ThemedButton 
                    onPress={() => remove(item.id)} 
                    style={{ paddingVertical: 10, backgroundColor: 'white', borderWidth: 1, borderColor: 'red'}}
                >
                    <Text style={{ color: 'red', textAlign: 'center', fontSize: 12}}>Remove</Text>
                </ThemedButton>
                <ThemedButton 
                    onPress={() => checkout([item])} 
                    disabled={quantity === 0}
                    style={{ paddingVertical: 10}}
                >
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 12}}>Check out</Text>
                </ThemedButton>
            </View>}
       </View>
    </View>
}

export default CartCard

const styles = StyleSheet.create({
    card: {
        padding: 20,
        backgroundColor: 'white',
        width: '100%',
        height: 170,
        marginBottom: 10,
        flexDirection: 'row',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#c9c9c9',
        gap: 20,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
    },
    image: {
        width: 80,
        height: "100%"
    }
});
