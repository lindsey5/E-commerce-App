import { useCallback, useEffect, useMemo, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList, RefreshControl } from "react-native"
import { fetchData } from "../../../services/api";
import RateModal from "../../../components/ui/rating/RateModal";
import { router } from "expo-router";
import { formatDate } from "../../../utils/date";
import TabButton from "../../../components/ui/TabButton";


const tabs = ["All", "Pending", "Confirmed", "Shipped", "Completed", "Rated", "Cancelled"];

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('All');
    const [refreshing, setRefreshing] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const filteredOrders = useMemo(() => {
        if(selectedStatus === 'All')
            return orders
        
        return orders.filter(order => order.status === selectedStatus)

    }, [selectedStatus, orders])

    const getOrdersAsync = async () => {
        const response = await fetchData('/api/order/user')
        if(response.success) setOrders(response.orders)
    }

    useEffect(() => {
        getOrdersAsync();
    }, [])

    
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getOrdersAsync();
        setRefreshing(false);
    }, []);

    return <View style={styles.container}>
        <RateModal 
            close={() => setSelectedOrder(null)}
            modalVisible={selectedOrder !== null}
            order={selectedOrder}
        />
        <View style={{backgroundColor: 'white', padding: 20, paddingTop: 20, paddingBottom: 10}}>
            <Text style={styles.title}>My Orders</Text>

            <ScrollView 
                horizontal 
                style={{ width: '100%', maxHeight: 80, marginTop: 30, paddingTop: 10 }} 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ alignItems: 'center' }} 
            >
            {tabs.map((label, index) => {
                const badge = label === 'All' ? orders.length  : orders.filter(order => order.status === label).length
                return <TabButton 
                    key={index}
                    badge={badge !== 0 ? badge.toString() : ''}
                    label={label}
                    isSelected={selectedStatus === label}
                    onPress={() => setSelectedStatus(label)}
                    style={{ marginRight: 10 }}
                />
            })}
            </ScrollView>
        </View>
        <FlatList
            style={{ padding: 10}}
            data={filteredOrders}
            keyExtractor={(order, index) => order._id || index.toString()}
            renderItem={({ item }) => (
                <View key={item._id} style={styles.card}>
                    <View style={{ flexDirection: 'row', gap: 20}}>
                        <Image style={styles.image} source={{ uri: item.product.image }} resizeMode="cover"/>
                    
                        <View style={{flex: 1, flexDirection: 'column', gap: 5}}> 
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10}}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5}}>{item.product.name}</Text>
                                <Text style={{backgroundColor: '#E0E0E0', padding: 7, borderRadius: 15}}>{item.status}</Text>
                            </View>
                            <Text>{item.color} | {item.size}</Text>
                            
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                                <Text>x{item.quantity}</Text>
                                <Text>₱{item.price}</Text>
                            </View>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                                {item.status !== 'Rated' && item.status !== 'Completed' && item.status !== 'Cancelled' && <>
                                <Text>Estimated Delivery:</Text>
                                <Text>{formatDate(item.estimated_delivery)}</Text>
                                </>}
                                {item.status === 'Cancelled' && <>
                                    <Text>Cancel Date:</Text>
                                    <Text>{formatDate(item.updatedAt)}</Text>
                                </>}
                                {(item.status === 'Rated' || item.status === 'Completed') && <>
                                    <Text>Delivered at:</Text>
                                    <Text>{formatDate(item.updatedAt)}</Text>
                                </>}
                            </View>

                            <View style={{ alignItems: 'flex-end', marginTop: 20}}>
                                <Text style={{fontWeight: "bold", fontSize: 17}}>Total: ₱{item.quantity * item.price}</Text>
                            </View>
                        </View>
                    </View>
                    {item.status === 'Completed' && <View
                        style={{ 
                            width: '100%', 
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginTop: 25,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => setSelectedOrder(item)}
                            style={{ paddingHorizontal: 30, paddingVertical: 10, borderRadius: 10, backgroundColor: '#9137db'}}
                        >
                            <Text style={{ color: 'white' }}>Rate</Text>
                        </TouchableOpacity>
                    </View>}
                    <TouchableOpacity 
                        onPress={() => router.push(`/order/${item._id}`)}
                        style={{ padding: 10, borderRadius: 10, marginTop: 20}}
                    >
                        <Text style={{ color: '#9137db', textDecorationLine: 'underline'}}>Order details</Text>
                    </TouchableOpacity>
                </View>
            )}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        />
    </View>
}

export default Orders

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30
    },
    card: {
        padding: 20,
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#c9c9c9',
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
    },
    image: {
        width: 60,
        height: 100
    }
});