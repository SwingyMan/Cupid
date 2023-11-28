import { StyleSheet, Text, SafeAreaView, StatusBar, View, TextInput, Image, Button, ScrollView, FlatList } from 'react-native';
import { Link } from 'expo-router'
import { useState } from 'react';

import colors from '../styles/colors';

export default function Gallery() {

    return (
        <View style={styles.body}>
            <SafeAreaView style={styles.homeScreen}>
                <View style={styles.box_top}>
                    {/* {images.map((img) => (
                        <Image style={styles.image} source={img.uri} key={img.id}></Image>
                    ))} */}
                </View>
                <View style={styles.box_bottom}>
                    <Link style={styles.link} href="/photos">&lt;Wróć</Link>
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
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        //alignItems: 'space-evenly', // |
        //justifyContent: 'space-evenly', // --
        backgroundColor: colors.taupe,
    },
    box_bottom: {
        flex: 0.5,
        alignItems: 'center', // --
        justifyContent: 'center', // |
    },
    image: {
        margin: 5,
        width: 60,
        height: 100,
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
        //marginTop: 40,
        fontSize: 20,
        fontFamily: 'sans-serif'
    },
    link: {
        margin: 40,
        fontSize: 20,
    },
})

