import { StyleSheet, Text, SafeAreaView, StatusBar, View, TextInput, Image, Button } from 'react-native';
import { Link, router } from 'expo-router'
import { observer } from 'mobx-react';
import { useStore } from '../mobx/store';

import colors from '../styles/colors';
import EButton from '../assets/EButton';

export default observer(function Album() {

    const { appStore } = useStore();

    return (
        <View style={styles.body}>
            <SafeAreaView style={styles.homeScreen}>

                <StatusBar
                    backgroundColor={colors.gray}
                    barStyle={'light-content'}
                />

                <View style={styles.box_top}>
                    <Text style={styles.text}>ALBUM</Text>
                </View>

                <View style={styles.box_bottom}>
                    {/* <Link style={styles.link} href="/photos">&lt;Wróć</Link> */}
                    <View>
                        <EButton
                            icon='arrow-with-circle-left'
                            color={colors.black}
                            onPress={() => { router.push('/photos') }}
                        />
                    </View>
                </View>

            </SafeAreaView>
        </View>
    );
})

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
        flex: 0.8,
        alignItems: 'center', // --
        justifyContent: 'center', // |
    },
    box_bottom: {
        flex: 0.2,
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
    link: {
        display: "flex",
        textDecorationLine: 'underline',
        margin: 8,
        fontSize: 18,
        // width: 125,
    },
})

