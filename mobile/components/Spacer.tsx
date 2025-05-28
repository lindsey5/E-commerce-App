import { View, ViewStyle } from 'react-native';

interface SpacerProps {
  width?: number | string;
  height?: number | string;
};

const Spacer = ({ width = "100%", height = 40 } : SpacerProps) => {
  return (
    <View style={{ width, height } as ViewStyle} />
  );
};

export default Spacer;