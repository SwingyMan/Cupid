//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, StatusBar, View, TextInput, Image, Pressable, Button, Alert } from 'react-native';
import { Link } from 'expo-router'
//import { SafeAreaView } from 'react-native-safe-area-context';

//import { styles, simpleStyles } from "./styles/style";
//const { View, Text, Button, TextInput, StyleSheet, SafeAreaView, StatusBar } = simpleStyles(styles);
import colors from '../styles/colors';

export default function Page() {
    return (
        <View style={styles.body}>
            <SafeAreaView style={styles.homeScreen}>
                <View style={styles.box_top}>
                    <Image style={styles.image}
                        source={require('../assets/cupid_icon.png')}
                    //source={{ uri: 'https://picsum.photos/300' }}
                    />
                </View>
                <View style={styles.box_bottom}>
                    <Text style={styles.text}>Wprowadź kod zaproszenia</Text>
                    <TextInput style={styles.input}
                        maxLength={10}
                    />
                    <Link style={styles.link} href="/photos">Photos&gt;</Link>
                    <Link style={styles.link} href="/album">Album&gt;</Link>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: colors.gray,
    },
    homeScreen: {
        flex: 1,
        backgroundColor: colors.lavender,
        //marginTop: StatusBar.currentHeight,
        alignItems: 'center', // --
        //justifyContent: 'center',
    },
    box_top: {
        flex: 0.5,
        alignItems: 'center', // --
        justifyContent: 'center', // |
    },
    box_bottom: {
        flex: 0.5,
        alignItems: 'center', // --
        justifyContent: 'center', // |
    },
    image: {
        width: 170,
        height: 170,
        borderRadius: 85,
    },
    input: {
        height: 70,
        width: 200,
        borderWidth: 1,
        padding: 12,
        margin: 20,
        borderRadius: 10,
        fontSize: 26,
        backgroundColor: colors.taupe,
        color: colors.white,
    },
    text: {
        color: colors.taupe,
        //marginTop: 40,
        fontSize: 20,
        fontFamily: 'sans-serif'
    },
    link: {
        margin: 20,
        fontSize: 20,
    }
})

