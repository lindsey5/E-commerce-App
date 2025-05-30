import { useEffect, useState } from "react"
import { View, Text } from "react-native"
import { fetchData } from "../../../services/api";
import { Ionicons } from "@expo/vector-icons";

const Star = ({ num, rating} : { num: number, rating: number}) => {
    return <Ionicons 
                size={20}
                name={'star'} 
            color={rating >= num ? '#9137db' : 'gray'} 
    />
}

const Rating = ({ order } : { order: any }) => {
    const [rating, setRating] = useState<any>();
    const nums = [1, 2, 3, 4, 5]

    useEffect(() => {
        const getRatingAsync = async () => {
            const response = await fetchData(`/api/rating/${order._id}`)
            if(response.success) setRating(response.rating)
        }

        getRatingAsync()
    }, [order])
    
    if(order.status !== 'Rated') return null

    return <View style={{ 
                    backgroundColor: 'white', 
                    padding: 15, 
                    width: '90%',
                    borderRadius: 10,
                    marginTop: 10
                }}>
            <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text>Your Review: </Text>
                <View style={{ flexDirection: 'row', gap: 3, marginTop: 5}}>
                    {nums.map(num => <Star key={num} num={num} rating={rating?.rating}/>)}
                </View>
            </View>
            <Text>{rating?.review}</Text>
    </View>
}

export default Rating