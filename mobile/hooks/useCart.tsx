import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid, Platform, Alert } from "react-native";
import { getToken } from "../services/auth";
import { useRouter } from "expo-router";
import { deleteData, fetchData, postData, updateData } from "../services/api";

const showAddedPrompt = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show("Added to cart!", ToastAndroid.SHORT);
    } else {
      Alert.alert("Added to cart!");
    }
};

const useCart = () => {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  const getValue = async () => {
      const response = await fetchData('/api/cart');
      if(response.success) setCart(response.cart);
  }

  useEffect(() => {
    getValue();
  }, []);

  const addToCart = async (id : string, quantity : number) => {
    const response = await postData('/api/cart', { item_id: id, quantity: quantity});
    if(response.success){
      await getValue();
      showAddedPrompt();
    }
  };

  const updateItem = async (id : string, newQuantity : number) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: newQuantity }
        : item
    )

    setCart(updatedCart);
    await updateData(`/api/cart/${id}`, { quantity: newQuantity});

  }

  const removeItem = async (id) => {
    Alert.alert(
      "Confirm Removal",
      "Are you sure you want to remove this item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            const updatedCart = cart.filter((item) => item.id != id)

            setCart(updatedCart);
            await deleteData(`/api/cart/${id}`);
          },
        },
      ],
      { cancelable: true }
    );
  }

  const checkout = async (items) => {
    const value = await getToken();

    if(value){
      await AsyncStorage.setItem("checkout-items", JSON.stringify(items));
      router.push('checkout');
    }else{
      router.push('login')
    }
  }

  return { cart, addToCart, updateItem, checkout, removeItem };
};

export default useCart;
