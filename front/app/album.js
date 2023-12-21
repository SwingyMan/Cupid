import { StyleSheet, Text, SafeAreaView, StatusBar, View, TextInput, Image, Button, PanResponder, Animated } from 'react-native';
import { Link } from 'expo-router'
import { observer } from 'mobx-react';
import { useStore } from '../mobx/store';
import React, { Component } from 'react';
import Draggable from '../assets/Draggable.js';

import colors from '../styles/colors';

export default observer(function Album() {

    const { appStore } = useStore();

    return (
        <View style={styles.body}>
            <SafeAreaView style={styles.homeScreen}>
                <View style={styles.box_top} />
                <View style={styles.row}>
                    <Draggable/>
                    <Draggable/>
                    <Draggable/>
                    <Draggable/>
                    <Draggable/>
                </View>
             {/*   <View style={styles.box_bottom}>
                    <Text style={styles.text}>Album Album Album</Text>
                    <Link style={styles.link} href="/photos">&lt;Wróć</Link>
                </View>
    */}
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
        backgroundColor: 'green',
        height: 200,
        alignItems: 'center', // --
        justifyContent: 'center', // |
    },
    box_bottom: {
        flex: 0.1,
        backgroundColor: 'red',
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
    row: {
        flexDirection: "row",
        height: 100,
    },
})


