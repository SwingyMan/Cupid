import { StyleSheet, Text, SafeAreaView, View, StatusBar, TextInput, Image, Button, Pressable } from 'react-native';
import { Link, router } from 'expo-router'
import { observer, action } from 'mobx-react';
import * as SplashScreen from 'expo-splash-screen';

import colors from '../styles/colors';
import { useStore } from '../mobx/store';
import EButton from '../assets/EButton';

// Keep the splash screen visible while we fetch resources
// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync()
    .then((result) => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
    .catch(console.warn); // it's good to explicitly catch and inspect any error

export default observer(function Page() {

    const { appStore } = useStore();

    console.log(">Page render");

    if (!appStore.appIsReady) {
        appStore.prepare();
        console.log("Returnuje pustą");
        return (
            null
            // <View style={styles.body}>
            //     <SafeAreaView style={styles.loadingScreen}>
            //         <View style={styles.box_top}>
            //             <Image style={styles.imageLoading}
            //                 source={require('../assets/icon.png')}
            //             />
            //         </View>
            //         <View style={styles.box_bottom}></View>
            //     </SafeAreaView>
            // </View>
        );
    } else {
        return (
            <View style={styles.body} onLayout={() => appStore.onLayoutRootView()}>
                <SafeAreaView style={styles.homeScreen}>

                    <StatusBar
                        backgroundColor={colors.taupe}
                        barStyle={'light-content'}
                    />

                    <View style={styles.box_top}>
                        <View style={styles.fullWidth}>
                            <Pressable style={styles.adminButton}
                                onPress={() => { router.push('/admin') }}>
                                <EButton
                                    icon='squared-plus'
                                    color={colors.taupe}
                                    onPress={() => { router.push('/admin') }}
                                />
                                <View>
                                    <Text style={styles.adminText}>nowy</Text>
                                </View>
                            </Pressable>
                        </View>
                        <View style={styles.imageBox}>
                            <Image style={styles.image}
                                source={require('../assets/icons/icon18.png')}
                            />
                        </View>
                    </View>
                    <View style={styles.box_bottom}>
                        <View style={styles.textAndInput}>
                            <Text style={styles.text}>Wprowadź kod zaproszenia</Text>
                            <TextInput style={[styles.input, styles.inputCode]}
                                defaultValue={appStore.code}
                                onChangeText={(txt) => appStore.setCode(txt)}
                                maxLength={10}
                            // onSubmitEditing={() => appStore.checkCode()}
                            />
                            <Text style={styles.text}>Wprowadź swoje imie i nazwisko</Text>
                            <TextInput style={[styles.input, styles.inputName]}
                                defaultValue={appStore.username}
                                onChangeText={(txt) => appStore.setUsername(txt)}
                                maxLength={30}
                                onSubmitEditing={() => appStore.checkEntering()}
                            />
                        </View>
                        <Button
                            title='Wejdź'
                            onPress={() => appStore.checkEntering()}
                            color={colors.taupe}
                        />
                        <View style={styles.version}>
                            {/* <View style={styles.skroty}>
                                <Link style={styles.link} href="/photos">//Photos&gt;</Link>
                                <Link style={styles.link} href="/album">//Album&gt;</Link>
                                <Link style={styles.link} href="/admin">//Admin&gt;</Link>
                                </View>*/}
                            <Text>v.0.8.1</Text>
                            <Text>ONLINE</Text>
                            {/* <Button
                                title='TEST GUZIK'
                                onPress={() => { appStore.guzik() }}
                                color={colors.black}
                            /> */}
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        );

    }

})

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: colors.taupe,
    },
    // loadingScreen: {
    //     flex: 1,
    //     marginTop: -(StatusBar.currentHeight),
    //     backgroundColor: '#dedede',
    //     alignItems: 'center', // --
    //     justifyContent: 'center',
    // },
    // imageLoading: {
    //     width: 170,
    //     height: 170,
    //     borderRadius: 85,
    //     marginTop: StatusBar.currentHeight,
    // },
    homeScreen: {
        flex: 1,
        backgroundColor: colors.lavender,
        //marginTop: StatusBar.currentHeight,
        alignItems: 'center', // --
        //justifyContent: 'center',
    },
    box_top: {
        flex: 0.45,
        alignItems: 'center', // --
        // justifyContent: 'center', // |
        paddingTop: 10,
        // backgroundColor: 'yellow'
    },
    box_bottom: {
        flex: 0.55,
        alignItems: 'center', // --
        justifyContent: 'center', // |
        // backgroundColor: colors.black
    },
    textAndInput: {
        alignItems: 'center', // --
        justifyContent: 'center', // |
        // height: '100%',
        marginTop: -75,
        backgroundColor: colors.lavender,
    },
    // imageBox: {
    //     flex: 1,
    //     justifyContent: 'flex-end',
    //     backgroundColor: 'red'
    // },
    image: {
        width: 170,
        height: 170,
        borderRadius: 50,
        // backgroundColor: colors.taupe
    },
    input: {
        height: 55,
        width: 200,
        // borderWidth: 3,
        paddingLeft: 12,
        borderRadius: 10,
        // borderColor: colors.lavender,
        // borderWidth: 5,
        fontSize: 26,
        // backgroundColor: colors.taupe,
        backgroundColor: colors.taupe,
        color: colors.white,
        margin: 10,
        marginBottom: 45
    },
    inputName: {
        width: 270,
    },
    inputCode: {
        width: 200,
    },
    text: {
        color: colors.taupe,
        // fontWeight: '900',
        // letterSpacing: 0.4,
        //marginTop: 40,
        fontSize: 24,
        //fontFamily: 'sans-serif',
        fontFamily: 'Coolvetica',
        backgroundColor: colors.lavender
    },
    link: {
        display: "flex",
        textDecorationLine: 'underline',
        margin: 8,
        fontSize: 18,
        // width: 125,
    },
    skroty: {
        display: "flex",
        flexDirection: "row",
        // width: 250,
    },
    fullWidth: {
        // marginTop: -10,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
        // backgroundColor: 'red',
        // height: 30,
    },
    adminButton: {
        // display: "flex",
        // flex: 1,
        // width: '100%',
        flexDirection: "row",
        // paddingTop: 5,
        paddingRight: 15,
        // alignContent: 'space-between', // |
        justifyContent: 'flex-end',
        // backgroundColor: colors.gray,
    },
    adminText: {
        paddingLeft: 1,
        paddingTop: 3,
        fontFamily: 'Coolvetica',
        fontSize: 16,
        color: colors.taupe,
        // backgroundColor: 'red',
        alignContent: 'center'
    },
    version: {
        display: 'flex',
        // flex: 0.7,
        // backgroundColor: colors.gray,
        paddingTop: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    }
})

