import { StyleProp, Text, TextStyle, useColorScheme, ViewStyle } from 'react-native'
import { Colors } from '../constants/Colors'

interface ThemedTextProps {
  title : boolean,
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;  
}

const ThemedText = ({ style, children, title = false, ...props } : ThemedTextProps) => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  const textColor = title ? theme.title : theme.text

  return (
    <Text 
      style={[{ color: textColor }, style]}
      {...props}
    >{children}</Text>
  )
}

export default ThemedText