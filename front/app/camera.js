import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, SafeAreaView, StatusBar, View, TextInput, Image, Button, ScrollView, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { Link, router } from 'expo-router'
import { Camera, CameraType } from 'expo-camera'
import { observer } from 'mobx-react';

import { useStore } from '../mobx/store';
import EButton from '../assets/EButton'
import colors from '../styles/colors';

export default observer(function CameraRoll() {

    const { appStore } = useStore();
    const cameraRef = useRef();

    return (
        <View style={styles.body}>
            <SafeAreaView style={styles.homeScreen}>

                <StatusBar
                    backgroundColor={colors.black}
                    barStyle={'dark-content'}
                // backgroundColor={colors.black}
                // barStyle={'light-content'}
                />

                <View style={styles.box_top}>
                    <View style={styles.cameraBox}>
                        {!appStore.photo ?
                            <Camera style={styles.camera}
                                type={appStore.camType}
                                ref={cameraRef}
                                onMountError={(err) => {
                                    console.log(err)
                                }}
                            >
                                <View style={styles.ebutton}>
                                    <EButton style={styles.ebutton}
                                        icon='retweet'
                                        onPress={() => { appStore.toggleCamType() }}
                                    />
                                </View>
                            </Camera>
                            :
                            <Image style={styles.camera}
                                source={{ uri: appStore.photo }}
                            />
                        }
                    </View>
                </View>
                <View style={styles.box_bottom}>
                    {appStore.photo ?
                        <View style={styles.buttons}>
                            {/* <View style={styles.viewButton}>
                                <Button
                                    title='Wyczyść'
                                    color={colors.black}
                                    onPress={() => { appStore.clearPhoto() }}
                                />
                            </View> */}
                            <View style={styles.viewButton}>
                                <EButton
                                    touchableStyles={{ height: 28 }}
                                    icon='arrow-with-circle-left'
                                    color={colors.white}
                                    onPress={() => { appStore.clearPhoto() }}
                                />
                            </View>
                            <View style={styles.viewButton}>
                                {/* <Button
                                    title='Zapisz'
                                    color={colors.black}
                                    onPress={() => { appStore.savePhoto() }}
                                /> */}
                                <TouchableOpacity onPress={() => appStore.savePhoto()} style={{backgroundColor: colors.darkGrey}}>
                                    <Text style={styles.text}>Zapisz</Text>
                                </TouchableOpacity>
                                {/* <EButton
                                    title={"Zapisz"}
                                    // icon={"folder-images"}
                                    // touchableStyles={{ height: 32 }}
                                    color={colors.white}
                                    onPress={() => { appStore.savePhoto() }}
                                /> */}
                            </View>
                        </View>
                        :
                        <View style={styles.buttons}>
                            <View style={styles.viewButton}>
                                <EButton
                                    touchableStyles={{ height: 32 }}
                                    icon='arrow-with-circle-left'
                                    color={colors.white}
                                    onPress={() => { router.replace('/photos') }}
                                />
                            </View>
                            <View style={styles.viewButton}>
                                <EButton
                                    iconSize={60}
                                    touchableStyles={{ height: 60 }}
                                    icon='picasa'
                                    color={colors.white}
                                    onPress={() => { appStore.takePicture(cameraRef) }}
                                />
                            </View>
                            <View style={styles.viewButton}>
                                <EButton
                                    touchableStyles={{ height: 32 }}
                                    icon='picasa'
                                    color={colors.darkGrey}
                                    onPress={() => { }}
                                />
                            </View>
                            {/* <View style={styles.viewButton}>
                                <Button
                                    title='Zrób zdjęcie'
                                    color={colors.black}
                                    onPress={() => { appStore.takePicture(cameraRef) }}
                                />
                            </View> */}
                        </View>
                    }
                    {/* <Link style={styles.link} href="/photos">&lt;Wróć</Link> */}
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
        flex: 0.85,
        width: '100%',
        alignItems: 'center', // --
        justifyContent: 'center', // |
        backgroundColor: colors.darkGrey,
    },
    box_bottom: {
        flex: 0.15,
        alignItems: 'center', // --
        // justifyContent: 'center', // |
        backgroundColor: colors.darkGrey,
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
        color: colors.white,
        padding: 2,
        fontSize: 40,
        fontFamily: 'Coolvetica'
    },
    link: {
        margin: 10,
        fontSize: 20,
        textDecorationLine: 'underline',
    },
    // buttons: {
    //     //backgroundColor: colors.pink,
    //     flex: 0.65,
    //     justifyContent: 'space-between'
    // },
    buttons: {
        // backgroundColor: colors.mint,
        width: '100%',
        height: 50,
        // display: 'flex',
        // flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-evenly',
        // justifyContent: 'center'
    },
    viewButton: {
        height: "100%",
        alignContent: "center",
        justifyContent: 'center',
        // backgroundColor: 'red'
    },
    ebutton: {
        alignItems: 'flex-end',
        //backgroundColor: '#999',
        height: 30,
        margin: 20,
    },
    camera: {
        // width: '90%',
        // height: '90%',
        width: (Dimensions.get('window').width - 20),
        height: ((Dimensions.get('window').width - 20) / 3 * 4),
        borderColor: colors.white,
        backgroundColor: colors.red,
    },
    cameraBox: {
        // flex: 1
        borderWidth: 2,
        borderColor: colors.white
    }
})

