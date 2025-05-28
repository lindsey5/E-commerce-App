import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { Colors } from '../constants/Colors'

const ThemedButton = ({ style, disabled, onPress, ...props } : { style?: StyleProp<ViewStyle> } & PressableProps) => {

  return (
    <Pressable 
      style={({ pressed }) => [styles.btn, pressed && styles.pressed, style, disabled && styles.pressed]} 
      onPress={disabled ? undefined : onPress}
      {...props}
    />
  )
}
const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 6,
  },
  pressed: {
    opacity: 0.5
  },
})

export default ThemedButton