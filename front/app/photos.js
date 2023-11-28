import { StyleSheet, Text, SafeAreaView, StatusBar, View, TextInput, Image, Button, ScrollView, FlatList } from 'react-native';
import { Link } from 'expo-router'
import { useState } from 'react';

import colors from '../styles/colors';

export default function Photos() {

    const [images, setImages] = useState([
        { id: "1", uri: 'https://picsum.photos/300' },
        { id: "2", uri: 'https://picsum.photos/300' },
        { id: "3", uri: 'https://picsum.photos/300' },
        { id: "4", uri: 'https://picsum.photos/300' },
        { id: "5", uri: 'https://picsum.photos/300' },
        { id: "6", uri: 'https://picsum.photos/300' },
        { id: "7", uri: 'https://picsum.photos/300' },
    ]);


    return (
        <View style={styles.body}>
            <SafeAreaView style={styles.homeScreen}>
                <View style={styles.box_top}>
                    <FlatList 
                        horizontal
                        data={images}
                        renderItem={({item}) => <Image style={styles.image} source={{uri: item.uri}} key={item.id}></Image>}
                        keyExtractor={item => item.id}
                    />
                </View>
                <View style={styles.box_bottom}>
                    <Link style={styles.link} href="/camera">Camera&gt;</Link>
                    <Link style={styles.link} href="/gallery">Gallery&gt;</Link>
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
        flex: 0.7,
        width: '100%',
        flexDirection: 'row',
        //flexWrap: 'wrap',
        alignItems: 'center', // |
        //justifyContent: 'space-evenly', // --
        backgroundColor: colors.taupe,
    },
    box_bottom: {
        flex: 0.3,
        alignItems: 'center', // --
        justifyContent: 'center', // |
    },
    image: {
        margin: 5,
        width: 170,
        height: 250,
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
        margin: 10,
        fontSize: 20,
    },
    camera: {
        backgroundColor: colors.taupe,
        width: '50%',
        height: '100%',
    }
})

