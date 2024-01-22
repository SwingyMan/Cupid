import { View, StyleSheet, Dimensions, Image, Pressable, Text } from "react-native";
import { Link, router } from "expo-router";

import { useStore } from '../mobx/store';
import EButton from '../assets/EButton'
import colors from '../styles/colors';

export default function AddFrom() {

    const { appStore } = useStore();

    return (
        <View style={styles.fakeImage}>
            <View style={styles.half}>
                <Pressable style={styles.pressable}
                    onPress={() => { appStore.addFromCamera() }}>
                    <EButton
                        icon='camera'
                        onPress={() => { appStore.addFromCamera() }}
                        color={colors.black}
                    />
                    <Text style={styles.text}>
                        Dodaj z aparatu
                    </Text>
                </Pressable>
                {/* <Link style={styles.link} href="/camera">
                    <EButton
                    icon='camera'
                    />
                    <br></br>
                    Dodaj z aparatu
                </Link> */}
            </View>
            <View style={styles.half}>
                <Pressable style={styles.pressable}
                    onPress={() => { appStore.addFromGallery() }}>
                    <EButton
                        icon='images'
                        onPress={() => { appStore.addFromGallery() }}
                        color={colors.black}
                    />
                    <Text style={styles.text}>
                        Dodaj z galerii
                    </Text>
                </Pressable>
                {/* <Link style={styles.link} href="/gallery_page">
                    <EButton
                        icon='images'
                    />
                    <br></br>
                    Dodaj z galerii
                </Link> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    link: {
        // flex: 0.5,
        fontWeight: "bold",
        color: colors.black,
        backgroundColor: colors.white,
        alignItems: 'center', // --
        justifyContent: 'center',
    },
    pressable: {
        color: colors.black,
        // backgroundColor: colors.white,
        alignItems: 'center', // --
        justifyContent: 'center',
        // borderColor: colors.black,
        // borderWidth: 4,
        borderRadius: 10,
        // padding: 5,
        margin: 5,
        flex: 1,
        width: (Dimensions.get('window').width / 2) - 15,
        backgroundColor: colors.gray,
        borderWidth: 2,
        // borderColor: colors.lavender
    },
    text: {
        fontSize: 20,
        fontFamily: 'Coolvetica',
    },
    half: {
        alignItems: 'center', // --
        justifyContent: 'center',
        // backgroundColor: colors.mint,
        width: "100%",
        flex: 0.5,
    },
    fakeImage: {
        // flex: 1,
        margin: 5,
        width: (Dimensions.get('window').width / 2) - 15,
        height: ((Dimensions.get('window').width / 2) - 15) / 3 * 4,
        // backgroundColor: colors.mint,
        // alignItems: 'flex-start', // --
        // alignContent: 'flex-end', // --
        maxWidth: 300,
        maxHeight: 500,
    },
})