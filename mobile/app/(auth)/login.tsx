import { ImageBackground, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Spacer from "../../components/Spacer";
import { Colors } from "../../constants/Colors";
import ThemedButton from "../../components/ThemedButton";
import ThemedText from "../../components/ThemedText";
import CustomInput from "../../components/CustomInput";
import { useRouter } from "expo-router";
import { useState } from "react";
import { postData } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
    const router = useRouter();
    const [error, setError] = useState('');
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async() => {
        setError('')
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(data.email)) {
            setError('Invalid email format');
        }else if(data.email && data.password){
            try{
                const response = await postData('/api/auth/login', data);
                if(response.success){
                    await AsyncStorage.setItem("user", JSON.stringify(response.user));
                    await AsyncStorage.setItem("token", JSON.stringify(response.token));
                    router.push('/')
                }else{
                    setError(response.message);
                }
            }catch(err){
                setError(err.response.data.message || err.response.data.errors[0])
            }
        }
    }

    return (
        <ImageBackground
            style={styles.container}
            source={require('../../assets/img/purple-bg.webp')}
            resizeMode="cover"

        >
            <ThemedText title={true} style={styles.title}>Login</ThemedText>
            {error && <Text style={{ color: 'red', marginTop: 10, fontSize: 16}}>{error}</Text>}
            <Spacer height={30}/>
            <CustomInput 
                value={data.email}
                placeholder={"Email"} 
                style={{ height: 60 }}
                onChangeText={(value) => setData({...data, email: value})}
            />
            <Spacer />
            <CustomInput 
                value={data.password}
                placeholder={"Password"} 
                style={{ height: 60 }} 
                secureTextEntry={true}
                onChangeText={(value) => setData({...data, password: value})}
            />
            <Spacer height={30}/>
            <Pressable style={styles.forgotPasswordContainer}>
                <Text style={{borderBottomWidth: 1, borderColor: '#9137db', color: '#9137db'}}>Forgot Password?</Text>
            </Pressable>
            <Spacer />
            <ThemedButton onPress={handleSubmit}>
                <Text style={{ textAlign: "center", color: '#f2f2f2', fontWeight: 'bold', fontSize: 18 }}>Login</Text>
            </ThemedButton>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 30, gap: 5, alignItems: 'center'}}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={() => router.push('signup')}>
                    <Text 
                        style={{
                            textAlign: 'center', 
                            color: '#9137db',
                            fontWeight: 'bold',
                            fontSize: 17
                        }}
                    >Sign up</Text>
                </TouchableOpacity>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 30, gap: 5, alignItems: 'center'}}>
                <Text>Go back to</Text>
                <TouchableOpacity onPress={() => router.push('/')}>
                    <Text 
                        style={{
                            textAlign: 'center', 
                            color: '#9137db',
                            fontWeight: 'bold',
                            fontSize: 17
                        }}
                    >Home</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 36,
        color: '#9137db'
    },
    btn: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 5,
      },
      pressed: {
        opacity: 0.8
    },
    forgotPasswordContainer: {
        flexDirection: 'row', 
        justifyContent: 'flex-end',
        paddingRight: 10, 
    },
});