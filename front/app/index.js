import { StyleSheet, Text, SafeAreaView, View, StatusBar, TextInput, Image, Button } from 'react-native';
import { Link, router } from 'expo-router'
import axios from 'axios';
import { observer, action } from 'mobx-react';
//import { StatusBar } from 'expo-status-bar';

import colors from '../styles/colors';
import { useStore } from '../mobx/store';

export default observer(function Page() {

    const { appStore } = useStore();

    return (
        <View style={styles.body}>
            <SafeAreaView style={styles.homeScreen}>
                
                <StatusBar
                    backgroundColor={colors.taupe}
                    barStyle={'light-content'}
                />

                <View style={styles.box_top}>
                    <Image style={styles.image}
                        source={require('../assets/cupid_icon.png')}
                    />
                </View>
                <View style={styles.box_bottom}>
                    <Text style={styles.text}>v.0.0.59</Text>
                    <Text style={styles.text}>Wprowadź kod zaproszenia</Text>
                    <TextInput style={styles.input}
                        defaultValue={appStore.code}
                        onChangeText={(txt) => appStore.setCode(txt)}
                        maxLength={10}
                        onSubmitEditing={() => appStore.checkCode()}
                    />
                    <Button
                        title='Wejdź'
                        onPress={() => appStore.checkCode()}
                        color={colors.taupe}
                    />
                    <Link style={styles.link} href="/photos">//Photos&gt;</Link>
                    <Link style={styles.link} href="/album">//Album&gt;</Link>
                </View>
            </SafeAreaView>
        </View>
    );
})

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: colors.taupe,
    },
    homeScreen: {
        flex: 1,
        backgroundColor: colors.lavender,
        //marginTop: StatusBar.currentHeight,
        alignItems: 'center', // --
        //justifyContent: 'center',
    },
    box_top: {
        flex: 0.5,
        alignItems: 'center', // --
        justifyContent: 'center', // |
    },
    box_bottom: {
        flex: 0.5,
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
        margin: 20,
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
        margin: 20,
        fontSize: 20,
    }
})

