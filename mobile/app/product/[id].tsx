import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet, Pressable, ScrollView, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { fetchData, postData } from '../../services/api';
import ImageViewer from 'react-native-image-zoom-viewer';
import ThemedText from '../../components/ThemedText';
import Chip from '../../components/Chip';
import { Ionicons } from '@expo/vector-icons';
import ThemedButton from '../../components/ThemedButton';
import useCart from '../../hooks/useCart';
import CustomBadge from '../../components/Badge';
import QuantityCounter from '../../components/ui/QuantityCounter';
import { getToken } from '../../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ratings from '../../components/ui/rating/Ratings';

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [availableItems, setAvailableItems] = useState([]);
  const { cart, addToCart } = useCart();

  const handleCart = async () => {
    const value = await getToken();
    value ? addToCart(item._id,quantity) : router.push('login')
  }

  useEffect(() => {
    const getData = async () => {
      const response = await fetchData(`/api/product/${id}`);
      if (response.success) {
        setProduct(response.product);
        setItem(response.product.items.sort((a, b) => a.price - b.price)[0])
      }
    };

    if (id) {
      getData();
    }
  }, [id]);

  useEffect(() => {
    const setData = () => {
      if(product){
        setQuantity(1)
        if(selectedColor && selectedSize) setItem(product?.items.find(item => item.color === selectedColor && item.size === selectedSize))
        else setAvailableItems(product?.items.filter(item => item.color === selectedColor || item.size === selectedSize))
      }
    }

    setData()

  }, [selectedColor, selectedSize])

  const checkout = async () => {
    const value = await getToken();
    
    if(value){
      await AsyncStorage.setItem("checkout-items", JSON.stringify([{
        product_id: product._id,
        item_id: item._id,
        name: product.name,
        quantity,
        price: item.price,
        image: product.image,
        size: item.size,
        color: item.color
      }]));
      router.push('checkout');
    }else{
      router.push('login')
    }
  }

  if (!product) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#9137db" />
    </View>
  }
  return (
    <View style={styles.container}>

      <TouchableOpacity 
        onPress={() => router.push('cart')}
        style={[{ right: 10, top: 20 }, styles.floatButton]}
      >
        {cart.length > 0 && <CustomBadge text={cart.length.toString()}/>}
        <Ionicons size={30} name="cart" color={"white"}/>
      </TouchableOpacity>
      <TouchableOpacity
        style={[{ left: 5, top: 20 }, styles.floatButton]}
        onPress={() => router.back()}
      >
        <Ionicons size={30} name="arrow-back" color={"white"}/>
      </TouchableOpacity>

      <Pressable style={{ borderBottomWidth: 1, borderBottomColor: '#e0e0e0'}}onPress={() => setShowImage(true)}>
        <Image style={styles.productImage} source={{ uri: product.image }} resizeMode='contain'/>
      </Pressable>

      {showImage && (
        <View style={styles.imageViewerWrapper}>
          <Pressable onPress={() => setShowImage(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </Pressable>
          <ImageViewer style={{width: '100%', height: '100%'}} imageUrls={[{ url: product.image }]} />
        </View>
      )}

      <ScrollView style={{ padding: 20}}>
        <ThemedText 
            title
            style={styles.productName}
        >
          {product.name}
        </ThemedText>
        <Text style={{ marginTop: 10, fontSize: 20}}>
        ₱{item?.price}
        </Text>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Text>Sizes</Text>
          <View style={styles.chipContainer}>
            {[...new Set(product.items.map(item => item.size))].map((item, index) => (
              <Chip 
                key={`size-${index}`} 
                label={item.toString()} 
                isSelected={selectedSize === item}
                disabled={selectedColor ? !availableItems.find(availableItem => availableItem.size === item && availableItem.stock !== 0) : false}
                onClick={() => setSelectedSize(prev => prev === item ? '' : item.toString())}
              />
            ))}
          </View>

          <Text>Colors</Text>
          <View style={styles.chipContainer}>
            {[...new Set(product.items.map(item => item.color))].map((item, index) => (
              <Chip 
                disabled={selectedSize ? !availableItems.find(availableItem => availableItem.color === item && availableItem.stock !== 0) : false}
                key={`color-${index}`} label={item.toString()} 
                isSelected={selectedColor === item}
                onClick={() => setSelectedColor(prev => prev === item ? '' : item.toString())}
              />
            ))}
          </View>
        </View>
        <Ratings 
          product_id={id.toString()}
        />
        </ScrollView>
      <View style={{
        backgroundColor: 'white',
        width: '100%',
        paddingHorizontal: 10,
        paddingBottom: 20,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        zIndex: 10,
      }}>
        <View style={{ marginBottom: 10, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>Quantity</Text>
          <QuantityCounter 
            item={item}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </View>
        <View style={{ 
          justifyContent: 'space-between',
          flexDirection: 'row',
          gap: 10,
          }}>
            <ThemedButton 
              onPress={handleCart}
              style={{ backgroundColor: '#e0e0e0', flex: 1}} 
              disabled={!selectedColor || !selectedSize || item.stock === 0}
            >
              <Text style={{ textAlign: 'center' }}>Add to cart</Text>
            </ThemedButton>
            <ThemedButton 
              onPress={checkout}
              style={{ flex: 1, justifyContent: 'center'}} 
              disabled={!selectedColor || !selectedSize || item.stock === 0}
            >
              <Text style={{ textAlign: 'center', color: 'white'}}>Buy now</Text>
            </ThemedButton>

        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  imageViewerWrapper: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 2,
  },
  closeButtonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#969696',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  chipContainer:{
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    rowGap: 5, 
    columnGap: 5
  },
  floatButton: {
    position: 'absolute',
    zIndex: 5,
    backgroundColor: 'grey',
    borderRadius: '50%',
    padding: 5
  }
});
