import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "../../CustomInput";
import CustomBadge from "../../Badge";
import useCart from "../../../hooks/useCart";
import { useRouter } from "expo-router";
import { useState } from "react";

const Header = ({ setSearchTerm } : { setSearchTerm: (searchTerm) => void}) => {
    const { cart } = useCart();
    const router = useRouter();
    const [search, setSearch] = useState<string>();

    return <View style={styles.header}>
       <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <CustomInput 
                placeholder="Search" 
                style={{ flex: 1, marginRight: 20 }}
                onChangeText={setSearch}
            />
            <TouchableOpacity onPress={() => setSearchTerm(search)}>
                <Ionicons size={30} name="search-outline" color={'#ffff'}/>
            </TouchableOpacity>
       </View>
        <TouchableOpacity onPress={() => router.push(`/cart`)}>
            {cart.length > 0 && <CustomBadge text={cart.length.toString()}/>}
            <Ionicons size={30} name={"cart-outline"} color={'#fff'} />
        </TouchableOpacity>
    </View>
}

export default Header

const styles = StyleSheet.create({
    header: {
        padding: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#9137db',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    }

});