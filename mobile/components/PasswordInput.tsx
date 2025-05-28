import { StyleProp, View, ViewStyle, StyleSheet, TouchableOpacity} from "react-native"
import CustomInput from "./CustomInput"
import { TextInputProps } from "react-native-paper"
import { useState } from "react"
import { Ionicons } from "@expo/vector-icons"

interface PasswordInputProps extends TextInputProps {
  placeholder: string;
  style?: StyleProp<ViewStyle>;
}

const PasswordInput = ({ placeholder, style, secureTextEntry = false, ...props } : PasswordInputProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return <View style={style}>
        <CustomInput 
            placeholder={placeholder}
            style={{ height: '100%'}}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            {...props}
        />
        {secureTextEntry && (
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? <Ionicons size={30} name={"eye-off"} color={'#9137db'} /> : <Ionicons size={30} name={"eye"} color={'#9137db'} />}
        </TouchableOpacity>
      )}
    </View>
}

export default PasswordInput

const styles = StyleSheet.create({
    eyeIcon: {
      position: "absolute",
      right: 10,
      top: '50%',
      marginTop: -17
    },
  });