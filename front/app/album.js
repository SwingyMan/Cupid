import { FlatList, StyleSheet, Text, SafeAreaView, StatusBar, View, TextInput, Image, Button, PanResponder, Animated, ScrollView, ImageBackground} from 'react-native';
import { Link, router } from 'expo-router'
import { observer } from 'mobx-react';
import { useStore } from '../mobx/store';
import React, { Component, useRef } from 'react';
import Draggable from '../assets/Draggable.js';
import ViewShot from 'react-native-view-shot';
import colors from '../styles/colors';
import {printToFileAsync} from 'expo-print';
import { shareAsync } from 'expo-sharing';

export default observer(function Album() {
    const { appStore } = useStore();
    const viewShotRef = useRef();
    const convertToPdf = async () => {
        try {
            let path = appStore.images[0].uri;
            let uri2;
            if (viewShotRef.current) {
                uri2 = await viewShotRef.current.capture();
                console.log(uri2);
            } else {
                throw new Error('Ref is not available');
            }
            const htmlContent = `
                <html>
                    <body>
                    aaaaa TEST TESTTEST TESTTEST
                        <img src="${path}"/>
                    </body>
                </html>
            `;
            console.log('dupa1')
            
            // const printToFile = async () => {
                // On iOS/android prints the given html. On web prints the HTML from the current page.
            const { uri } = await printToFileAsync({ html: htmlContent });
            console.log('File has been saved to:', uri);
            await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
            // };
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
            </View>
            <ViewShot  style={styles.box_big}ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
            <ViewShot 
            style={styles.box_top}
            options={{ format: 'jpg', quality: 0.9 }}/>
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