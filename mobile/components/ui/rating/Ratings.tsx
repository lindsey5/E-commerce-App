import { useEffect, useState } from "react"
import { View, Text, ScrollView } from "react-native"
import { fetchData } from "../../../services/api"
import { Ionicons } from "@expo/vector-icons";
import { formatDateTime } from "../../../utils/date";

const Ratings = ({ product_id} : { product_id: string | number}) => {
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        const getRatings = async () => {
            const response = await fetchData(`/api/rating/product/${product_id}`)
            if(response.success) setRatings(response.ratings)
        }

        getRatings();

    }, [product_id])

    if(!product_id) return null

    return <View style={{ marginTop: 30, paddingBottom: 20}}>
        <Text style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 30 }}>Reviews: </Text>
        <ScrollView 
            horizontal
        >
                {ratings.map(rating => <View
                    key={rating._id}
                    style={{
                        borderWidth: 1,
                        borderColor: '#e6e6e6',
                        padding: 15,
                        marginBottom: 20,
                        borderRadius: 10,
                        minHeight: 100,
                        gap: 10,
                        marginHorizontal: 10,
                        width: 300,
                    }}
                >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text>{rating.user.firstname} {rating.user.lastname}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6}}>
                        <Ionicons 
                            size={15}
                            name={'star'} 
                            color={'#9137db'} 
                        />
                        <Text>{rating.rating} / 5</Text>
                    </View>
                </View>
                <Text>{formatDateTime(rating.createdAt)}</Text>
                <Text style={{ marginBottom: 10 }}>Review: </Text>
                <Text>{rating.review}</Text>
            </View>)}

        </ScrollView>
    </View>
}

export default Ratings