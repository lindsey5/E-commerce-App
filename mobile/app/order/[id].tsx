import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Image, TouchableOpacity, Alert } from "react-native"
import { fetchData, updateData } from "../../services/api";
import { formatDate } from "../../utils/date";
import RateModal from "../../components/ui/rating/RateModal";
import Rating from "../../components/ui/rating/Rating";

const Order = () => {
    const { id } = useLocalSearchParams();
    const [order, setOrder] = useState<any>();
    const router = useRouter();
    const [showRate, setShowRate] = useState<boolean>(false)

    useEffect(() => {
        const getOrderAsync = async () => {
            const response = await fetchData(`/api/order/${id}`)
            if(response.success){
                setOrder(response.order)
            }
        }

        if(id){
            getOrderAsync()
        }
    }, [id])

    const cancelOrder = () => {
        Alert.alert(
            'Cancel',
            'Are you sure you want to cancel your order?',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        const response = await updateData(`/api/order/status/${id}`, { status: 'Cancelled'})
                        if(response.success)  router.replace('/orders')
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const rateProduct = () => {
        setShowRate(true)
    }

    if(!order) return  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#9137db" />
    </View>
    return <View 
            style={styles.container}
        >
        <RateModal 
            close={() => setShowRate(false)}
            modalVisible={showRate}
            order={order}
        />
        <View style={{ backgroundColor: '#9137db', padding: 30, width: '100%', marginBottom: 20}}>
            <Text 
                style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}
            >Order</Text>
        </View>
            <View style={{ 
                backgroundColor: 'white', 
                padding: 15, 
                width: '90%',
                borderRadius: 10,
            }}>
                <View style={{ flexDirection: 'row', gap: 20 }}>
                    <Image source={{ uri: order?.product.image }} style={{ width: 70, height: 80}} />
                    <View style={{ gap: 10, flex: 1 }}>
                       <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10}}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5}}>{order?.product.name}</Text>
                            <Text style={{backgroundColor: '#E0E0E0', padding: 7, borderRadius: 15}}>{order?.status}</Text>
                        </View>
                        <Text>{order?.color} | {order?.size}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>x{order?.quantity}</Text>
                            <Text>₱{order?.price}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 20, gap: 10, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#c0c0c0'}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16}}>Order ID: {order?.order_id}</Text>
                    <Text>Order Date: {formatDate(order?.createdAt)}</Text>
                    {order?.status !== 'Cancelled' && <Text>Estimated Delivery: {formatDate(order?.estimated_delivery)}</Text>}
                    {(order?.status === 'Completed' || order?.status === 'Rated') && <Text>Delivered At: {formatDate(order?.estimated_delivery)}</Text>}
                    {order?.status === 'Cancelled' && <Text>Cancel Date: {formatDate(order?.updatedAt)}</Text>}
                </View>

                <View style={{ marginTop: 20, gap: 10, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#c0c0c0'}}>
                    <Text>Firstname: {order?.firstname}</Text>
                    <Text>Lastname: {order?.lastname}</Text>
                    <Text>Address: {order?.address}</Text>
                    <Text>City: {order?.city}</Text>
                    <Text>Zip: {order?.zip}</Text>
                </View>
                {(order?.status === 'Pending' || order?.status === 'Confirmed' || order?.status === 'Completed') &&
                <View 
                    style={{ flexDirection: 'row', justifyContent: 'flex-end'}}
                >
                    <TouchableOpacity 
                        onPress={order?.status === 'Completed' ? rateProduct : cancelOrder}
                        style={{ backgroundColor: '#9137db', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 10}}>
                        <Text style={{ color: 'white' }}>{order?.status === 'Completed' ? 'Rate' : 'Cancel'}</Text>
                    </TouchableOpacity>
                </View>}
            </View>
            {order.status === 'Rated' && <Rating order={order}/>}
    </View>
}

export default Order

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0dfe8',
        alignItems: 'center'
    }
})

