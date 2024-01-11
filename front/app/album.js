import { FlatList, StyleSheet, Text, SafeAreaView, StatusBar, View, TextInput, Image, Button, PanResponder, Animated } from 'react-native';
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
                {/* <FlatList style={styles.row}
                        horizontal
                        data={appStore.images}
                        renderItem={({item}) => <Draggable url={{uri: item.uri}} id={item.id}/>}
                        keyExtractor={item => item.id}
                    /> */}
                 <View style={styles.row}>

                    {appStore.images.map((item) =>{
                        return <Draggable url={item.uri} key={item.id} id={item.id}/>
                    })}
                    
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
    },
    homeScreen: {
        flex: 1,
        //marginTop: StatusBar.currentHeight,
        alignItems: 'center', // --
        //justifyContent: 'center',
    },
    box_top: {
        backgroundColor: 'green',
        height: '600px',
        width: '100%',
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
    },
    text: {
        color: colors.taupe,
        margin: 20,
        fontSize: 20,
        fontFamily: 'sans-serif'
    },
    row: {
        flexDirection: "row",
        backgroundColor: "yellow",
        height: 100,
    },
})


