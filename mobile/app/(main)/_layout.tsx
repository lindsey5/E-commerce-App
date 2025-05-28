import { Tabs } from "expo-router"
import { useColorScheme } from "react-native"
import { Colors } from "../../constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { fetchData } from "../../services/api"
import CustomBadge from "../../components/Badge"
import AsyncStorage from "@react-native-async-storage/async-storage"
import useCart from "../../hooks/useCart"

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
  const [orders, setOrders] = useState<number>(0);
  const { cart } = useCart();

  useEffect(() => {
    fetchUser();
    getOrdersAsync();
  }, [])

  const fetchUser = async () => {

    const response = await fetchData('/api/user')
    if(!response.success) {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");
    }
  } 
  const getOrdersAsync = async() => {
    const response = await fetchData('/api/order/user')

    if(response.success)  setOrders(response.orders.length)
  }

  return (<Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: theme.navBackground, height: 70 },
          tabBarActiveTintColor: theme.iconColorFocused,
          tabBarInactiveTintColor: theme.iconColor,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{ title: "Home", tabBarIcon: ({ focused }) => (
            <Ionicons 
              size={24} 
              name={focused ? 'home': 'home-outline'} 
              color={focused ? theme.iconColorFocused : theme.iconColor} 
            />
          )}}
        />
        <Tabs.Screen
          name="cart/index"
          options={{ title: "Cart", tabBarIcon: ({ focused }) => (
            <>
              {cart.length > 0 && <CustomBadge text={cart.length.toString()} />}
              <Ionicons 
                size={24} 
                name={focused ? 'cart': 'cart-outline'} 
                color={focused ? theme.iconColorFocused : theme.iconColor} 
              />
            </>
          )}}
        />
        <Tabs.Screen
          name="orders/index"
          options={{ title: "Orders", tabBarIcon: ({ focused }) => (
            <>
              {orders > 0 && <CustomBadge text={orders.toString()}/>}
              <Ionicons 
                size={24} 
                name={focused ? 'receipt': 'receipt-outline'} 
                color={focused ? theme.iconColorFocused : theme.iconColor} 
              />
            </>
          )}}
        />
        <Tabs.Screen
          name="profile/index"
          options={{ title: "Profile", tabBarIcon: ({ focused }) => (
            <Ionicons 
              size={24} 
              name={focused ? 'person': 'person-outline'} 
              color={focused ? theme.iconColorFocused : theme.iconColor} 
            />
          )}}
        />
      </Tabs>
  )
}