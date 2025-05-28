import { View, Text, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const QuantityCounter = ({ quantity, item, setQuantity} : { quantity: number, item: { stock: number }, setQuantity: (value : number) => void}) => {
    return <View style={{ flexDirection: 'row', alignItems: 'center'}}>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity 
            onPress={() => setQuantity(quantity - 1)}
            style={[{ borderWidth: 1, borderColor: '#bdbdbd'}, 
            quantity === 1 && { opacity: 0.5}]}
            disabled={quantity === 1 || quantity === 0}
            >
            <Ionicons size={25} name={"remove"} color={quantity === 1 && "#e0e0e0"}/>
            </TouchableOpacity>

            <View style={{ width: 30}}>
            <Text style={{ textAlign: 'center'}}>{quantity}</Text>
            </View>
            
            <TouchableOpacity 
                onPress={() => setQuantity(quantity + 1)}
                style={[{ borderWidth: 1, borderColor: '#bdbdbd'}, 
                    quantity === item.stock && { opacity: 0.5}]}
                disabled={quantity === item.stock || quantity === 0}
            >
            <Ionicons size={25} name={"add"} color={quantity === item.stock && "#e0e0e0"}/>
            </TouchableOpacity>
        </View>
    </View>
}

export default QuantityCounter