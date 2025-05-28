import { ImageBackground, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Spacer from "../../components/Spacer";
import { Colors } from "../../constants/Colors";
import ThemedButton from "../../components/ThemedButton";
import ThemedText from "../../components/ThemedText";
import CustomInput from "../../components/CustomInput";
import { useRouter } from "expo-router";
import { useState } from "react";
import PasswordInput from "../../components/PasswordInput";
import { postData } from "../../services/api";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signup = () => {
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [fieldWithError, setFieldWithError] = useState<string>();
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const [data, setData] = useState({
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        confirmPassword: ''
    })

    const sendVerificationCode = async () => {
        setLoading(true)
        const response = await postData('/api/auth/signup/verification-code', data)
        if(response.success) setVerificationCode(response.verificationCode.toString())
        else setError(response.message || response.errors[0])
        setLoading(false)
    }

    const verify = async () => {
        setError('')
        if(code !== verificationCode){
            setError('Incorrect code');
        }else{
            const { confirmPassword, ...rest} = data;
            const response = await postData('/api/auth/signup', rest);
            if(response.success) {
                await AsyncStorage.setItem("user", JSON.stringify(response.newUser));
                await AsyncStorage.setItem("token", JSON.stringify(response.token));
                router.push('/')
            }
            else setError(response.message || response.errors[0])
        }
    }
    
    const createAccount = async () => {
        setError('')
        setLoading(true)
        setFieldWithError('')
        setCode('');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!data.email) {
            setError('Email is required.')
            setFieldWithError('email');
        }
        else if (!emailRegex.test(data.email)) {
            setError('Invalid email format');
            setFieldWithError('email');
        }
        else if(!data.firstname) {
            setError('Firstname is required.')
            setFieldWithError('firstname');
        }
        else if(!data.lastname) {
            setError('Lastname is required.')
            setFieldWithError('lastname');
        }
        else if(!data.password) {
            setError('Password is required.')
            setFieldWithError('password');
        }
        else if(!data.confirmPassword) {
            setError('Confirm password is required.')
            setFieldWithError('confirmpassword');
            
        }
        else if(data.password !== data.confirmPassword){
            setError('Password doesn\'t matched.')
            setFieldWithError('bothpassword');
        }else{
            await sendVerificationCode();
        }

        setLoading(false);
    }

    if(verificationCode)
        return <ImageBackground
            style={[styles.container, { alignItems: 'center'}]}
            source={require('../../assets/img/purple-bg.webp')}
            resizeMode="cover"
        >
            <Ionicons size={100} name={"shield-checkmark"} color={'#9137db'} />
            <ThemedText title={true} style={styles.title}>Verify your email</ThemedText>
            <ThemedText title={false} style={{fontSize: 16}}>We have sent a code to your email.</ThemedText>
            {error && <Text style={{ color: 'red', marginTop: 10, fontSize: 16}}>{error}</Text>}
            <View style={{ width: '80%', justifyContent: 'flex-end' }}>
                <CustomInput 
                    keyboardType="email-address"
                    placeholder={""} 
                    style={{ width: '100%', height: 60, marginVertical: 20}}
                    onChangeText={(value) => setCode(value)}
                />
                <TouchableOpacity onPress={sendVerificationCode}>
                    <Text 
                        style={{
                            color: '#9137db',
                            fontWeight: 'bold',
                            fontSize: 17
                        }}
                    >Resend</Text>
                </TouchableOpacity>
                <ThemedButton style={{ width: '100%', marginTop: 20}} onPress={verify} disabled={loading}>
                    <Text style={{ textAlign: "center", color: '#f2f2f2', fontWeight: 'bold', fontSize: 18 }}>Verify</Text>
                </ThemedButton>
            </View>
        </ImageBackground>
    

    return (
        <ImageBackground
            style={styles.container}
            source={require('../../assets/img/purple-bg.webp')}
            resizeMode="cover"

        >
            <ThemedText title={true} style={styles.title}>Signup</ThemedText>
            {error && <Text style={{ color: 'red', marginTop: 10, fontSize: 16}}>{error}</Text>}
            <Spacer height={30}/>
            <CustomInput 
                keyboardType="email-address"
                placeholder={"Email"} 
                style={[{ height: 60}, fieldWithError === 'email' && { borderWidth: 1, borderColor: 'red'}]}
                onChangeText={(value) => setData({...data, email: value})}
            />
            <Spacer />
            <View style={{ flexDirection: 'row', gap: 10}}>
            <CustomInput 
                placeholder={"Firstname"} 
                style={[{ flex: 1, height: 60}, fieldWithError === 'firstname' && { borderWidth: 1, borderColor: 'red'}]}
                onChangeText={(value) => setData({...data, firstname: value})}
            />
            <CustomInput 
                placeholder={"Lastname"} 
                style={[{ flex: 1, height: 60}, fieldWithError === 'lastname' && { borderWidth: 1, borderColor: 'red'}]}
                onChangeText={(value) => setData({...data, lastname: value})}
            />
            </View>
            <Spacer height={30}/>
            <PasswordInput 
                placeholder={"Password"} 
                style={[{ height: 60}, (fieldWithError === 'password' || fieldWithError === 'bothPassword') && { borderWidth: 1, borderColor: 'red'}]}
                secureTextEntry={true}
                onChangeText={(value) => setData({...data, password: value})}
            />
            <Spacer height={30}/>
            <PasswordInput 
                placeholder={"Confirm Password"} 
                style={[{ height: 60}, (fieldWithError === 'confirmpassword' || fieldWithError === 'bothPassword') && { borderWidth: 1, borderColor: 'red'}]}
                secureTextEntry={true}
                onChangeText={(value) => setData({...data, confirmPassword: value})}
            />
            <Spacer height={30}/>
            <ThemedButton onPress={createAccount} disabled={loading}>
                <Text style={{ textAlign: "center", color: '#f2f2f2', fontWeight: 'bold', fontSize: 18 }}>Create account</Text>
            </ThemedButton>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 30, gap: 5, alignItems: 'center'}}>
                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={() => router.push('login')}>
                    <Text 
                        style={{
                            textAlign: 'center', 
                            color: '#9137db',
                            fontWeight: 'bold',
                            fontSize: 17
                        }}
                    >Login</Text>
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

export default Signup;

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