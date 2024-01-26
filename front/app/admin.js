import { StyleSheet, Text, SafeAreaView, StatusBar, View, TextInput, Image, Button, Keyboard, Pressable, Share } from 'react-native';
import { Link, router } from 'expo-router'
import { observer } from 'mobx-react';
import { useStore } from '../mobx/store';

import colors from '../styles/colors';
import EButton from '../assets/EButton';

export default observer(function Admin() {

    const { appStore } = useStore();

    return (
        <View style={styles.body}>
            <SafeAreaView style={styles.homeScreen}>

                <StatusBar
                    backgroundColor={colors.taupe}
                    barStyle={'light-content'}
                />

                <View style={styles.box_header}>
                    <Text style={[styles.text, styles.title]}>Tworzenie nowego albumu</Text>
                </View>

                <View style={styles.box_top}>

                    <View style={styles.textAndInput}>
                        <View style={styles.center}>
                            <Text style={styles.text}>Wprowadź tytuł</Text>
                            <Text style={styles.text}>dla swojego nowego albumu</Text>
                            <TextInput style={styles.input}
                                defaultValue={appStore.newTitle}
                                onChangeText={(txt) => { appStore.setNewTitle(txt) }}
                                maxLength={20}
                            />
                        </View>

                        <View>
                            <Text style={styles.text}>Wprowadź swoje</Text>
                            <Text style={styles.text}>imie i nazwisko</Text>

                            <TextInput style={styles.input}
                                defaultValue={appStore.username}
                                onChangeText={(txt) => appStore.setUsername(txt)}
                                maxLength={30}
                                onSubmitEditing={() => appStore.checkAlbumCreating()}
                            />
                        </View>
                    </View>

                    {appStore.newCode &&
                        <View style={styles.sectionNewCode}>
                            <Text style={styles.codeText}>Twój kod zaproszenia</Text>
                            <View style={styles.codePanel}>
                                <TextInput style={styles.codeInput}
                                    value={appStore.newCode}
                                    maxLength={10}
                                    editable={false}
                                />
                                <Pressable style={styles.sectionShareButton}
                                    onPress={() => appStore.shareNewCode()}>
                                    <EButton touchableStyles={styles.shareButton}
                                        icon='share'
                                        color={colors.black}
                                        onPress={() => appStore.shareNewCode()}
                                    />
                                    <View>
                                        {/* <Text style={styles.shareText}>Udostępnij</Text> */}
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    }

                </View>
                <View style={styles.box_bottom}>

                    <View style={styles.buttons}>
                        <View style={{ justifyContent: 'center' }}>
                            <EButton touchableStyles={{ height: 30 }}
                                icon='arrow-with-circle-left'
                                color={colors.taupe}
                                onPress={() => { router.replace('/') }}
                            />
                        </View>
                        <View>
                            {!appStore.newCode &&
                                <Button
                                    title='Stwórz'
                                    color={colors.taupe}
                                    onPress={() => { appStore.checkAlbumCreating() }}
                                />
                            }
                        </View>
                    </View>

                    {/* <Link style={styles.link} href="/">&lt;//Wróć</Link> */}
                </View>

            </SafeAreaView>
        </View>
    );
})

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: colors.lavender,
    },
    homeScreen: {
        flex: 1,
        backgroundColor: colors.lavender,
        //marginTop: StatusBar.currentHeight,
        alignItems: 'center', // --
        //justifyContent: 'center',
    },
    box_header: {
        flex: 0.09,
        // margin: 0,
        paddingTop: 50,
        // justifyContent: 'center',
        // backgroundColor: 'yellow',  
        width: '100%',
    },
    box_top: {
        flex: 0.76,
        // alignItems: 'center', // --
        // justifyContent: 'space-around', // |
        justifyContent: 'center', // |
        // backgroundColor: colors.gray,
        width: "100%"
    },
    box_bottom: {
        // backgroundColor: colors.gray,
        flex: 0.15,
        // flexDirection: 'column',
        alignItems: 'center', // --
        justifyContent: 'center', // |
    },
    center: {
        alignItems: 'center', // --
        justifyContent: 'center', // |
        backgroundColor: colors.lavender,
        width: '100%'
    },
    image: {
        width: 170,
        height: 170,
        borderRadius: 85,
    },
    input: {
        height: 55,
        width: 260,
        // borderWidth: 3,
        paddingLeft: 12,
        borderRadius: 10,
        fontSize: 26,
        // backgroundColor: colors.taupe,
        backgroundColor: colors.taupe,
        color: colors.white,
        margin: 10,
        marginBottom: 45
    },
    codeInput: {
        height: 55,
        width: 180,
        borderWidth: 3,
        padding: 12,
        marginBottom: 20,
        borderRadius: 10,
        fontSize: 26,
        textAlign: 'center',
        // backgroundColor: colors.pink,
        color: colors.black,
    },
    text: {
        textAlign: 'center',
        color: colors.taupe,
        // marginBottom: 3,
        fontSize: 24,
        fontFamily: 'Coolvetica'
    },
    textAndInput: {
        alignItems: 'center', // --
        justifyContent: 'center', // |
        // height: '100%',
        width: "100%",
        // paddingTop: 15,
        // marginTop: -5,
        backgroundColor: colors.lavender,
    },
    title: {
        color: colors.taupe,
        // backgroundColor: colors.gray,
        padding: 10,
        fontSize: 30
    },
    codeText: {
        textAlign: 'center',
        color: colors.black,
        marginBottom: 8,
        fontSize: 20,
        fontFamily: 'Coolvetica'
    },
    link: {
        // display: "flex",
        margin: 8,
        fontSize: 28,
        // width: 125,
        textDecorationLine: 'underline',
    },
    buttons: {
        // backgroundColor: colors.black,
        width: '100%',
        // height: 50,
        // display: 'flex',
        // flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-evenly',
        // justifyContent: 'center'
    },
    sectionNewCode: {
        // backgroundColor: 'yellow',
        width: '100%',
        // flexDirection: 'column'
    },
    codePanel: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    sectionShareButton: {
        // backgroundColor: 'red',
        color: colors.black,
        // paddingLeft: 15,
        marginTop: 15,
        marginLeft: 15,
        // justifyContent: 'center',
        // alignContent: 'center'
    },
    shareButton: {
        // backgroundColor: 'white',
        // alignContent: 'center',
        height: 30,
        width: '100%'
    },
    shareText: {
        color: colors.black,
    }
})

