import { View, Text, Image, StyleSheet, ViewStyle, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface Card {
    id: string,
    image: string;
    productName: string;
    price: number;
    style?: ViewStyle
}

const ProductCard = ({ id, productName, image, price, style }: Card) => {
    const router = useRouter();

    const goToProduct = () => {
        router.push(`/product/${id}`);
      };

    return (
        <Pressable style={[styles.card, style]} onPress={goToProduct}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.title}>{productName}</Text>
            <View style={[{width: '100%', justifyContent: 'space-between'}, styles.view]}>
                <View style={styles.view}>
                    <Ionicons 
                        size={10} 
                        name={'star'} 
                        color={'#9137db'} 
                    />
                    <Text style={{ fontSize: 12}}>4/5</Text>
                </View>
                <Text style={styles.price}>₱ {price.toFixed(2)}</Text>
            </View>
        </Pressable>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        marginBottom: 10,
    },
    view: {
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 3
    },  
    image: {
        width: '100%',
        flex: 1,
        borderRadius: 8,
        marginBottom: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 3
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#9137db'
    },
});
