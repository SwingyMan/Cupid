import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, SafeAreaView, StatusBar, View, TextInput, Image, Button, ScrollView } from 'react-native';
import { Link } from 'expo-router'
import { Camera, CameraType } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'

import EButton from '../styles/EButton'
import colors from '../styles/colors';

export default function CameraRoll() {

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const cameraRef = useRef();

    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, [])

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                console.log(data);
                setImage(data.uri);
            } catch (err) {
                console.log(err);
            }
        }
    }

    const saveImage = async () => {
        if (image) {
            try {
                await MediaLibrary.createAssetAsync(image);
                alert("Zapisano")
                setImage(null);
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <View style={styles.body}>
            <SafeAreaView style={styles.homeScreen}>
                <View style={styles.box_top}>
                    {!image ?
                        <Camera style={styles.camera}
                            type={type}
                            ref={cameraRef}
                            onMountError={(err) => {
                                console.log(err)
                            }}
                            >
                            <View style={styles.ebutton}>
                                <EButton style={styles.ebutton}
                                    icon='retweet'
                                    onPress={() => {
                                        setType(type === CameraType.back ? CameraType.front : CameraType.back)
                                    }}
                                />
                            </View>
                        </Camera>
                        :
                        <Image style={styles.camera}
                            source={{ uri: image }}
                        />
                    }
                </View>
                <View style={styles.box_bottom}>
                    {image ?
                        <View style={styles.buttons}>
                            <Button
                                title='Wyczyść'
                                color={colors.taupe}
                                onPress={() => { setImage(null) }}
                            />
                            <Button
                                title='Zapisz'
                                color={colors.taupe}
                                onPress={saveImage}
                            />
                        </View>
                        :
                        <Button
                            title='Zrób zdjęcie'
                            color={colors.taupe}
                            onPress={takePicture}
                        />
                    }
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
        flex: 0.75,
        width: '100%',
        alignItems: 'center', // --
        justifyContent: 'center', // |
        backgroundColor: colors.taupe,
    },
    box_bottom: {
        flex: 0.25,
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
        //marginTop: 40,
        fontSize: 20,
        fontFamily: 'sans-serif'
    },
    link: {
        margin: 10,
        fontSize: 20,
    },
    buttons: {
        //backgroundColor: colors.pink,
        flex: 0.65,
        justifyContent: 'space-between'
    },
    ebutton: {
        alignItems: 'flex-end',
        //backgroundColor: '#999',
        height: 30,
        margin: 20,
    },
    camera: {
        backgroundColor: colors.taupe,
        width: '90%',
        height: '90%',
    }
})

