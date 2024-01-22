import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from '@expo/vector-icons'

export default function EButton({ title, onPress, icon, color, touchableStyles }) {
    return (
        <TouchableOpacity onPress={onPress} style={touchableStyles ? touchableStyles : StyleSheet.button}>
            <Entypo name={icon} size={28} color={color ? color : '#f1f1f1'} />
            {/* <Entypo name={icon} size={28} /> */}
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        //color: '#f1f1f1',
        marginLeft: 10,
    }
})