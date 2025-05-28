import { StyleProp, StyleSheet, useColorScheme, View, ViewProps, ViewStyle } from "react-native";
import { Colors } from "../constants/Colors";

interface ThemedCardProps extends ViewProps { 
  style?: StyleProp<ViewStyle>;
}

const ThemedCard = ({ style, ...props } : ThemedCardProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <View
      style={[{ backgroundColor: theme.uiBackground }, styles.card, style]}
      {...props}
    />
  );
};

export default ThemedCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    padding: 20,
  },
});
