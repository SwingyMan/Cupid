import { StyleSheet, Text, SafeAreaView, StatusBar, View, TextInput, Image, Button } from 'react-native';

import colors from '../styles/colors';
import { useRouter } from 'expo-router';

export default function Album() {

    const router = useRouter();

    return (
        <View style={styles.body}>
            <SafeAreaView style={styles.homeScreen}>
                <View style={styles.box_top}>
                    <Image style={styles.image}
                        source={{ uri: 'https://picsum.photos/300' }}
                    />
                </View>
                <View style={styles.box_bottom}>
                    <Text style={styles.text}>Album Album Album</Text>
                    <Button
                        title="Wróć"
                        onPress={() => router.back()}
                        color={colors.taupe}
                    />
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
        marginTop: 20,
        borderRadius: 10,
        fontSize: 26,
        backgroundColor: colors.taupe,
        color: colors.white,
    },
    text: {
        color: colors.taupe,
        margin: 20,
        fontSize: 20,
        fontFamily: 'sans-serif'
    },
})

