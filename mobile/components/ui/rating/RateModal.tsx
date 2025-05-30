import { Ionicons } from "@expo/vector-icons";
import { useState } from "react"
import { View, Modal, StyleSheet, Text, TouchableOpacity, Image, TextInput } from "react-native"
import { postData } from "../../../services/api";
import { useRouter, } from "expo-router";

const StarButton = ({ num, setRating, rating } : { num: number, setRating: (value) => void, rating: number}) => {
    return <TouchableOpacity
            onPress={() => setRating(num)}
        >
                <Ionicons 
                    size={40}
                    name={'star'} 
                    color={rating >= num ? '#9137db' : 'gray'} 
                />
        </TouchableOpacity>
}

const RateModal = ({ modalVisible, close, order } : { modalVisible: boolean, close: () => void, order: any}) => {
    const [rating, setRating] = useState<number>();
    const nums = [1, 2, 3, 4, 5]
    const [review, setReview] = useState<string>('');
    const router = useRouter();

    const rateProduct = async () => {
        const response = await postData('/api/rating', {
            product: order.product._id,
            order: order._id,
            rating,
            review,
        });

        if (response.success) {
            close();
            router.replace('/orders')
            
        }
    };
    return <Modal
            animationType="slide" 
            transparent={true}
            visible={modalVisible}
            onRequestClose={close} 
      >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <Text style={styles.text}>Rate Product</Text>
                <View style={{ width: '100%', alignItems: 'center', marginTop: 20}}>
                    <Image 
                        style={{ width: '30%', height: 80}}
                        source={{ uri: order?.product.image }} 
                    />
                    <Text style={{ fontSize: 17, marginTop: 10}}>{order?.product.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20, justifyContent: 'space-between'}}>
                    {nums.map(num => <StarButton 
                        key={num}
                        num={num}
                        setRating={setRating}
                        rating={rating}
                    />)}
                </View>
                <TextInput 
                    style={styles.textarea}
                    multiline
                    numberOfLines={4}
                    placeholder="Type your here..."
                    value={review}
                    onChangeText={setReview}
                />
                <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-end', marginTop: 20}}>
                    <TouchableOpacity 
                        onPress={close}
                        style={{ 
                            borderWidth: 1, 
                            borderColor: 'gray', 
                            paddingHorizontal: 20, 
                            paddingVertical: 12,
                            borderRadius: 15
                        }}
                    >
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={rateProduct}
                        style={{ backgroundColor: '#9137db', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 15}}>
                        <Text style={{ color: 'white'}}>Rate</Text>
                    </TouchableOpacity>
                </View>
          </View>
        </View>
      </Modal>
}

export default RateModal

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)', // dimmed background
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 30,
        elevation: 5
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: ' #9137db'
    },
    textarea: {
        borderWidth: 1,
        borderColor: '#c7c7c7',
        minHeight: 100,
        textAlignVertical: "top",
    }
});