import { Image, useColorScheme } from 'react-native'

const ThemedLogo = () => {
  const colorScheme = useColorScheme()
  
  //const logo = colorScheme === 'dark' ? DarkLogo : LightLogo

  /*return (
    <Image source={logo} />
  )*/
}

export default ThemedLogo