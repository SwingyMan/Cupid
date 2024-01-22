import { StyleSheet, Text, SafeAreaView, StatusBar, View, TextInput, Image, Button, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router'
import { observer } from 'mobx-react';
import * as MediaLibrary from 'expo-media-library'
import { useEffect } from 'react';
import { Camera } from 'expo-camera'
import { Dimensions } from 'react-native';

import { useStore } from '../mobx/store';
import EButton from '../assets/EButton'
import colors from '../styles/colors';
import AddFrom from '../assets/AddFrom';

export default observer(function Photos() {

    const { appStore } = useStore();

    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            appStore.hasCameraPermission = (cameraStatus.status === 'granted');
        })();
    }, [])

    return (
        <View style={styles.body}>

            <SafeAreaView style={styles.homeScreen}>

                <StatusBar
                    backgroundColor={colors.taupe}
                    barStyle={'light-content'}
                />

                <View style={styles.box_top}>
                    {/* <Text>albumID = {appStore.albumID}</Text>
                    <Text>username = {appStore.username}</Text> */}
                    <EButton
                        touchableStyles={styles.button}
                        icon='help-with-circle'
                        onPress={() => { appStore.customAlert("Podpowiedź", "Możesz przytrzymać na zdjęciu, by usunąć je z wybranych.") }}
                    />
                    <FlatList
                        // horizontal
                        numColumns={2}
                        data={appStore.images}
                        renderItem={({ item }) =>
                            item.id ?
                                <TouchableOpacity onLongPress={() => appStore.confirmDeleteThisImage(item.id)}>
                                    <Image style={styles.image} source={{ uri: item.uri }} key={item.id}></Image>
                                </TouchableOpacity>
                                :
                                <AddFrom />
                        }
                        keyExtractor={item => item.id}
                    />
                </View>

                <View style={styles.box_bottom}>
                    <Link style={styles.link} href="/album"><Text style={styles.text}>Przejdź do albumu</Text></Link>
                </View>
                {/* <View style={styles.box_bottom}>
                    <Link style={styles.link} href="/camera">Camera&gt;</Link>
                    <Link style={styles.link} href="/gallery">Gallery&gt;</Link>
                    <Link style={styles.link} href="/album">Album&gt;</Link>
                    <Button
                        title='TEST GUZIK'
                        onPress={() => { appStore.guzik() }}
                        color={colors.black}
                    />
                </View> */}
            </SafeAreaView>
        </View>
    );
})

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: colors.gray,
        // maxHeight: '635px',
    },
    homeScreen: {
        flex: 1,
        backgroundColor: colors.lavender,
        //marginTop: StatusBar.currentHeight,
        alignItems: 'center', // --
        //justifyContent: 'center',
    },
    box_top: {
        flex: 0.90,
        width: '100%',
        // flexDirection: 'row',
        //flexWrap: 'wrap',
        alignItems: 'center', // |
        //justifyContent: 'space-evenly', // --
        backgroundColor: colors.taupe,
        // backgroundColor: colors.mint,
        paddingTop: 10,
    },
    box_bottom: {
        flex: 0.10,
        alignItems: 'center', // |
        flexDirection: "row",
        // flexWrap: "wrap",
        justifyContent: 'center', // --
        // borderTopWidth: 2,
        width: "100%",
    },
    image: {
        margin: 5,
        width: (Dimensions.get('window').width / 2) - 15,
        height: ((Dimensions.get('window').width / 2) - 15) / 3 * 4,
        maxWidth: 300,
        maxHeight: 500,
        borderWidth: 2,
        borderColor: colors.lavender,
        // backgroundColor: colors.thistle
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
        color: colors.black,
        //marginTop: 40,
        fontSize: 24,
        fontFamily: 'Coolvetica',
    },
    link: {
        padding: 10,
        fontSize: 16,
    },
    button: {
        // paddingTop: 20,
        height: 32,
        // backgroundColor: colors.black
    }
})

