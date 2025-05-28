import { Badge } from "react-native-paper"

const CustomBadge = ({ text} : { text: string}) => {
    return <Badge
    style={{
      position: "absolute",
      top: -10,
      right: -5,
      backgroundColor: "red",
      color: "white",
      fontWeight: "bold",
      zIndex: 5,
    }}
  >
    {text}
  </Badge>
}

export default CustomBadge