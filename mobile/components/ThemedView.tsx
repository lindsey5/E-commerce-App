import React from "react";
import { SafeAreaView, useColorScheme, ViewStyle, StyleProp } from "react-native";
import { Colors } from "../constants/Colors";

interface ThemedViewProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;  
}

const ThemedView = ({ style, children, ...props } : ThemedViewProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <SafeAreaView
      style={[{ backgroundColor: theme.background }, style]}
      {...props}
    >
      {children}
    </SafeAreaView>
  );
};

export default ThemedView;