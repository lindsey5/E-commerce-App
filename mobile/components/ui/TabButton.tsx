import { StyleProp, TouchableOpacity, ViewStyle, Text } from "react-native";
import CustomBadge from "../Badge";

interface TabButtonProps {
  style?: StyleProp<ViewStyle>; 
  badge: string;    
  isSelected: boolean;              
  label: string;                    
  onPress?: () => void;            
}

const TabButton: React.FC<TabButtonProps> = ({ style, isSelected, badge, label, onPress }) => {
  return (
    <TouchableOpacity 
      style={[
        style, 
        { 
          backgroundColor: isSelected ? '#9137db' : '#e0dfe8',
          padding: 10,
          borderRadius: 10,
          minWidth: 80
        }
      ]}
      onPress={onPress}
    >
        {badge && <CustomBadge text={badge} />}
        <Text style={{ color: isSelected ? 'white' : '#9137db', textAlign: 'center' }}>
            {label}
        </Text>
    </TouchableOpacity>
  );
};

export default TabButton