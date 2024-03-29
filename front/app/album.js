import { FlatList, StyleSheet, Text, SafeAreaView, StatusBar, View, TextInput, Image, Button, PanResponder, Animated, ScrollView, ImageBackground } from 'react-native';
import { Link, router } from 'expo-router'
import { observer } from 'mobx-react';
import { useStore } from '../mobx/store.js';
import * as appStore from '../mobx/AppStore.js';
import React, { Component, useRef } from 'react';
import Draggable from '../assets/Draggable.js';
import ViewShot from 'react-native-view-shot';
import colors from '../styles/colors.js';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';
import EButton from '../assets/EButton.js';
import { Dimensions } from 'react-native';

export default observer(function Album() {
    const { appStore } = useStore();
    const viewShotRef = useRef();

    const convertToPdf = async () => {
        try {

            // router.replace('/loading')

            let uri2;
            let uri3;

            if (viewShotRef.current) {
                uri2 = await viewShotRef.current.capture();
                console.log(uri2);
            } else {
                throw new Error('Ref is not available');
            }

            const manipResult = await ImageManipulator.manipulateAsync(
                uri2,
                [{ resize: { height: 1000, width: 563 } }], { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
            );
            console.log("Manipulacja dziala");
            const cropResult = await ImageManipulator.manipulateAsync(
                manipResult.uri,
                [{
                    crop: {
                        originX: 0,
                        originY: 60,
                        width: 561,
                        height: 880,
                    }
                }], { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
            );

            await appStore.imgToBase64(cropResult.uri)
                .then(async (result) => {
                    // console.log(result, " = result")
                    // wysyłam do bazy
                    console.log("wysyłam zrobione zdjęcie do bazy")
                    //await appStore.postPhoto(1, result)
                    await appStore.postPhoto(1, result)
                        .then((response) => {
                            console.log("zapisuję je w lokalnym stanie aplikacji")
                            // this.addPhotoToLocalImages(response.id, response.url)
                            uri3 = response.URL;
                        })
                })
            const htmlContentOld = `
                <html>
                    <body>
                        <img src="${uri3}"/>
                    </body>
                </html>
                    `;
            // <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=yes" />
            const htmlContent = `
                <html>
                    <body>
                        <center>
                            <img src="${uri3}"/>
                        </center>
                    </body>
                </html>
            `;
            console.log('dupa1')

            // const printToFile = async () => {
            // On iOS/android prints the given html. On web prints the HTML from the current page.
            const { uri } = await printToFileAsync({
                html: htmlContent,
                // width: 2480,
                // height: 3508,
                // margins: {
                //     top: 0,
                //     bottom: 0,
                //     left: 0,
                //     right: 0
                // }
            });
            console.log('File has been saved to:', uri);
            await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
            // };
            // router.replace('/album')
        }
        catch (err) {
            // router.replace('/album')
            console.error('Error:', err);
        }
    }

    return (
        <View style={styles.body}>
            <SafeAreaView style={styles.homeScreen}>

                <StatusBar
                    backgroundColor={colors.taupe}
                    barStyle={'light-content'}
                />

                <View style={styles.box_toppest}>
                    <View>
                        <EButton
                            icon='arrow-with-circle-left'
                            color={colors.white}
                            touchableStyles={{ height: 32 }}
                            onPress={() => { router.push('/photos') }}
                        />
                    </View>
                    <View style={{
                        // backgroundColor: 'black',
                        justifyContent: 'center',
                        paddingBottom: 22
                    }}>
                        <EButton
                            // icon='arrow-with-circle-left'
                            // color={colors.white}
                            title={"Zapisz"}
                            touchableStyles={{ alignItems: 'center' }}
                            textStyle={{
                                fontSize: 32,
                                fontFamily: 'Coolvetica',
                                color: colors.white,
                                // backgroundColor: 'red'
                            }}
                            onPress={convertToPdf}
                        />
                        {/* <Button
                            title='Zapisz'
                            color="red"
                            onPress={convertToPdf}
                        /> */}
                    </View>
                </View>
                <ViewShot style={styles.box_big} ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
                    <ViewShot
                        style={styles.box_top}
                        options={{ format: 'jpg', quality: 0.9 }} />
                    {/* <FlatList style={styles.flat_list}
                        // numColumns={4}
                        horizontal
                        data={appStore.images}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <Draggable style={styles.upIndex} id={item.id} path={{ uri: item.uri }} key={item.id} />
                        }
                        removeClippedSubviews={false}
                        CellRendererComponent={({ children }) => children}
                    >
                    </FlatList> */}
                    {/* <View style={styles.section}>
                        <Text>// &gt; scrollable &gt; //</Text>
                    </View> */}

                    <View style={styles.flat_list}>
                        {appStore.images.map((item) => {
                            if (item.id != null) {
                                return <Draggable style={styles.upIndex} id={item.id} path={{ uri: item.uri }} key={item.id} />
                            }
                        })}
                    </View>
                </ViewShot>
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
        backgroundColor: 'white',
        flex: 0.8,
        width: '100%',
        alignItems: 'center', // --
        justifyContent: 'center', // |
        // position: 'absolute',
        // zIndex: 1,
    },
    box_toppest: {
        // height: "75%",
        backgroundColor: colors.taupe,
        flex: 0.1,
        width: '100%',
        justifyContent: 'space-evenly', // --
        alignItems: 'center',
        // position: 'absolute',
        // zIndex: 1,
        flexDirection: 'row',
    },
    box_bottom: {
        flex: 0.1,
        flex: 0.1,
        alignItems: 'center', // --
        justifyContent: 'center', // |
        backgroundColor: "white",
        width: '100%',
        // flexWrap: 'wrap',
        // overflowY: 'visible',
        // zIndex: 3,
    },
    box_big: {
        flex: 0.9,
        alignItems: 'center', // --
        justifyContent: 'center', // |
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
        backgroundColor: 'white',
    },
    section: {
        flex: 1,
        alignItems: 'center', // --
        justifyContent: 'center', // |
        width: '100vw',
        // zIndex: 3,
    },
    flat_list: {
        flex: 0.15,
        justifyContent: 'center', // |
        alignItems: 'center', // --
        // height: 50,
        overflowX: 'visible',
        width: '100%',
        backgroundColor: 'white',
        zIndex: 3,
        flexDirection: "row",
        columnGap: 10,
    },
    upIndex: {
        zIndex: 3,
    },
    background: {
        flex: 1,
        backgroundColor: 'rgb(255, 255, 255)',
    }
})









// const viewShotRef = useRef(null);

// const saveAsJpg = async () => {
//     try {
//     if (viewShotRef.current) {
//         const uri = await viewShotRef.current.capture();
//         console.log("dupa");
//         return uri;
//     } else {
//         throw new Error('Ref is not available');
//     }
//     } catch (error) {
//     console.error('Error capturing view as JPG:', error);
//     throw error;
//     }
//     };
// const convertToPdf = async () => {
//     try {
//         const jpgUri = await saveAsJpg();
//         const page = PDFPage.create();
//         page.drawImage(jpgUri, 'jpg', {
//             x: 0,
//             y: 0,
//             width: 200,
//             height: 100,
//         });
//         // const docsDir = await PDFLib.getDocumentsDirectory();
//         // const pdfPath = `${docsDir}/sample.pdf`;
//         PDFDocument.create('sample.pdf').addPages(page).write();

//         return console.log("Utworzono PDFa");
//     } catch (error) {
//         console.error('Error converting to PDF:', error);
//         throw error;
//     }
// };