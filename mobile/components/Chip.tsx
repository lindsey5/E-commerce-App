import { Pressable, ViewStyle, Text, StyleSheet, PressableProps} from "react-native"

interface IChip extends PressableProps{
    label: string,
    onClick?: () => void,
    style?: ViewStyle,
    isSelected: boolean,
}

const Chip = ({ label, onClick, style, isSelected, disabled, ...props} : IChip) => {
    return <Pressable
        onPress={onClick}
        disabled={disabled}
        {...props}
        style={({ pressed }) => [
            styles.chip,
            style,
            (pressed || disabled) && { opacity: 0.5 },
            isSelected && { backgroundColor: '#9137db'},
        ]}
    >
        <Text style={[styles.label, isSelected && { color: 'white'}]}>{label}</Text>
    </Pressable>
}

export default Chip

const styles = StyleSheet.create({
    chip: {
        display: 'flex',
        minWidth: 50,
        padding: 5,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
    },
    label: {
        textAlign: 'center',
        fontSize: 15
    }

});