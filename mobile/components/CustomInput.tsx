import { useState } from "react";
import { TextInput, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { TextInputProps } from "react-native-paper";

interface CustomInputProps extends TextInputProps {
  placeholder: string;
  style?: StyleProp<ViewStyle>;
}

const CustomInput = ({ placeholder, style, ...props }: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      style={[
        styles.input,
        isFocused && styles.focusedInput,
        style,
      ]}
      placeholder={placeholder}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 15,
  },
  focusedInput: {
    borderColor: "#9137db", // Focus color
    shadowColor: "#9137db",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5, 
  },
});
