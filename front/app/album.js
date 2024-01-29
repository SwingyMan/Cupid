import { FlatList, StyleSheet, Text, SafeAreaView, StatusBar, View, TextInput, Image, Button, PanResponder, Animated, ScrollView, ImageBackground, Dimensions} from 'react-native';
import { Link, router } from 'expo-router'
import { observer } from 'mobx-react';
import { useStore } from '../mobx/store';
import * as appStore from '../mobx/AppStore.js';
import React, { Component, useRef, useState } from 'react';
import Draggable from '../assets/Draggable.js';
import ViewShot from 'react-native-view-shot';
import colors from '../styles/colors';
import {printToFileAsync} from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';

export default observer(function Album() {
    const { appStore } = useStore();
    const viewShotRef = useRef();
    const [uri2, setImage] = useState(null);
    const getAlbum = async () => {
        
    }
    const convertToPdf = async () => {
        try {
            let uri2;
            let uri3;
            if (viewShotRef.current) {
                uri2 = await viewShotRef.current.capture();
                //console.log(uri2);
            } else {
                throw new Error('Ref is not available');
            }
            const manipResult = await ImageManipulator.manipulateAsync(
                uri2,
                [{resize: { height:1000, width:563}}],{compress: 1,format: ImageManipulator.SaveFormat.JPEG}
                );
                console.log("Manipulacja dziala");
            const cropResult = await ImageManipulator.manipulateAsync(
                manipResult.uri,
                [{crop:  {originX: 0,
                    originY: 60,
                    width: 561,
                    height: 880,}}],{compress: 1,format: ImageManipulator.SaveFormat.JPEG}
                );
            await appStore.imgToBase64(cropResult.uri)
            .then(async (result) => {
                 // console.log(result, " = result")
                 // wysyłam do bazy
                console.log("wysyłam zrobione zdjęcie do bazy")
                await appStore.postPhoto(1, result)
                    .then((response) => {
                        //console.log("zapisuję je w lokalnym stanie aplikacji")
                        // this.addPhotoToLocalImages(response.id, response.url)
                        uri3=response.URL;
                    })
            })

            const htmlContent = `
                <html>
                    <body>
                        <img src="${uri3}"/>
                    </body>
                </html>
            `;
            console.log("tutaj");
            const { uri } = await printToFileAsync({ html: htmlContent });
            console.log('File has been saved to:', uri);
            
            router.replace('/loading')

            if (uri) {
                console.log("zapisuję w galerii urządzenia this.photo: ", uri) // zapisuje do galerii urzadzenia

                // console.log("zapisuje zdjecie w lokalnym stanie")
                // this.addPhotoToLocalImages(this.photo) // zapisuje w lokalnym stanie

                await appStore.imgToBase64(uri)
                    .then(async (result) => {
                        // console.log(result, " = result")
                        // wysyłam do bazy
                        console.log("wysyłam zrobione zdjęcie do bazy")
                        // await this.postPhoto(this.fullUser.id, result)
                        await appStore.putPDF(appStore.fullUser.UserID, result)
                            .then((response) => {
                                console.log("zapisuję je w lokalnym stanie aplikacji")
                                // this.addPhotoToLocalImages(response.id, response.url)
                                this.addPhotoToLocalImages(response.PhotoID, response.URL)
                                this.showMyLocalPhotos()
                                router.replace('/photos')
                            })
                    })
                return true
        }
        else {
            console.log("nie ma co zapisać [this.albums]")
            router.replace('/albums')
            return false
        }
    }
        catch (err) {
            console.error('Error:', err);
        }
    }
    return (
        <View style={styles.body}>
            <SafeAreaView style={styles.homeScreen}> 
            <View style={styles.box_toppest}>
                <Button
                    title='Zapisz'
                    color="red"
                    onPress={convertToPdf}
                    />
                    <Button
                    title='Pobierz wszystkie'
                    color="red"
                    onPress={getAlbum}
                    />
            </View>
            <ViewShot  style={styles.box_big}ref={viewShotRef} options={{ format: 'jpg', quality: 0.9}}>
            <View style={styles.box_cover}/>
            <View 
            style={styles.box_top}/>
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
                            return <Draggable style={styles.upIndex} id={item.id} path={{ uri: item.uri }} key={item.id} />
                        })}
                </View>
                <View style={styles.box_cover}/>
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
        backgroundColor: colors.lavender,
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
        backgroundColor: 'red',
        flex: 0.1,
        width: '100%',
        alignItems: 'center', // --
        justifyContent: 'center', // |
        // position: 'absolute',
        // zIndex: 1,
    },
    box_bottom: {
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
        },
    box_cover: {
        height: 20,
        width: '100%',
        backgroundColor: colors.lavender,
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