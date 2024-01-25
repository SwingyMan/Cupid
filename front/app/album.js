import { FlatList, StyleSheet, Text, SafeAreaView, StatusBar, View, TextInput, Image, Button, PanResponder, Animated, ScrollView, ScrollView } from 'react-native';
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

                <View style={styles.box_top}>
                    <Text style={styles.text}>// album //</Text>
                </View>

                <View style={styles.box_bottom}>
                    <FlatList style={styles.flat_list}
                        // numColumns={4}
                        horizontal
                        data={appStore.images}
                        renderItem={({ item }) =>
                            <Draggable style={styles.upIndex} id={item.id} path={{ uri: item.uri }} key={item.id} />
                        }
                        keyExtractor={item => item.id}
                        removeClippedSubviews={false}
                        CellRendererComponent={({ children }) => children}
                    >
                    </FlatList>
                    {/* <View style={styles.section}>
                        <Text>// &gt; scrollable &gt; //</Text>
                    </View> */}
                </View>

                {/* <View style={styles.box_bottom}>
                    <ScrollView horizontal style={styles.scroll_view}>
                        {appStore.images.map((item) => {
                            return <Draggable style={styles.upIndex} id={item.id} path={{ uri: item.uri }} key={item.id} />
                        })}
                    </ScrollView>
                </View> */}

            </SafeAreaView>
        </View>
    );
})

const styles = StyleSheet.create({
    body: {
        // position: 'absolute',
        flex: 1,
    },
    homeScreen: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        alignItems: 'center', // --
        //justifyContent: 'center',
        // backgroundColor: 'red',
    },
    box_top: {
        // height: "75%",
        backgroundColor: 'green',
        flex: 0.75,
        width: '100%',
        alignItems: 'center', // --
        justifyContent: 'center', // |
        // position: 'absolute',
        // zIndex: 1,
    },
    box_bottom: {
        flex: 0.25,
        alignItems: 'center', // --
        justifyContent: 'center', // |
        backgroundColor: "yellow",
        width: '100%',
        // flexWrap: 'wrap',
        // overflowY: 'visible',
        // zIndex: 3,
    },
    text: {
        // flex: 1,
        color: colors.white,
        margin: 20,
        fontSize: 20,
        fontFamily: 'sans-serif'
    },
    row_view: {
        flexDirection: "row",
        width: '100vw',
        backgroundColor: 'rgb(248, 218, 48)',
    },
    scroll_view: {
        height: 200,
        width: '100vw',
        backgroundColor: 'yellow',
    },
    section: {
        flex: 1,
        alignItems: 'center', // --
        justifyContent: 'center', // |
        width: '100vw',
        // zIndex: 3,
    },
    flat_list: {
        // flex: 1,
        // justifyContent: 'center', // |
        // alignItems: 'center', // --
        // backgroundColor: "yellow",
        // height: 50,
        overflowX: 'visible',
        width: '100%',
        backgroundColor: 'rgb(248, 218, 48)',
        zIndex: 3,
    },
    upIndex: {
        zIndex: 3,
    }
})


