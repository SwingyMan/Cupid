import { StyleSheet, Text, SafeAreaView, StatusBar, View, TextInput, Image, Button } from 'react-native';
import { Link, router } from 'expo-router'
import { observer } from 'mobx-react';
import { useStore } from '../mobx/store';

import colors from '../styles/colors';
import EButton from '../assets/EButton';

export default observer(function Album() {

    const { appStore } = useStore();

    return (
        <View style={styles.body}>
            <SafeAreaView style={styles.homeScreen}>

                <StatusBar
                    backgroundColor={colors.taupe}
                    barStyle={'light-content'}
                />

                <View style={styles.box_top}>
                    <Text style={styles.text}>"{appStore.fullAlbum.title}"</Text>
                    <Text>{appStore.fullAlbum.id}.</Text>
                    <Text>"{appStore.fullAlbum.title}"</Text>
                    <Text>kod: {appStore.fullAlbum.code}</Text>
                    <Text>admin: {appStore.fullAlbum.adminID}</Text>
                    <Text>stron: {appStore.fullAlbum.num_pages}</Text>
                    {appStore.fullAlbum.userIDs.map((uId) => { return (<Text key={uId}>uID: {uId}</Text>) })}
                    <Text>{appStore.fullAlbum.photoIDs}</Text>
                </View>

                <View style={styles.box_bottom}>
                    {/* <Link style={styles.link} href="/photos">&lt;Wróć</Link> */}
                    <View>
                        <EButton
                            icon='arrow-with-circle-left'
                            color={colors.taupe}
                            onPress={() => { router.push('/photos') }}
                        />
                    </View>
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
        flex: 0.9,
        width: "100%",
        alignItems: 'center', // --
        // justifyContent: 'center', // |
        // backgroundColor: colors.white,
    },
    box_bottom: {
        flex: 0.1,
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
        // backgroundColor: colors.white,
        color: colors.taupe,
        // margin: 20,
        padding: 20,
        // width: "100%",
        fontSize: 28,
        fontFamily: 'Coolvetica'
    },
    link: {
        display: "flex",
        textDecorationLine: 'underline',
        margin: 8,
        fontSize: 18,
        // width: 125,
    },
})

