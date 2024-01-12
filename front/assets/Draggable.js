
import { StyleSheet, Text, SafeAreaView, StatusBar, View, TextInput, Image, Button, PanResponder, Animated, Dimensions } from 'react-native';
import { Link } from 'expo-router'
import { observer } from 'mobx-react';
import { useStore } from '../mobx/store';
import React, { Component, useRef, useState } from 'react';

import EButton from '../styles/EButton'
import colors from '../styles/colors';

const Draggable = ({ id, path }) => {

    const pan = useRef(new Animated.ValueXY()).current;
    const { appStore } = useStore();
    
    this.state = {
        showDraggable: true,
        dropAreaValues: null,
        pan: new Animated.ValueXY(),
        opacity: new Animated.Value(1)
    };
    
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [null, { dx: pan.x, dy: pan.y }], 
                {useNativeDriver: false}
            ),
            onPanResponderRelease: (e, gesture) => {
                if (gesture.moveY < 600) {
                    pan.extractOffset();
                    console.log({ ...pan })
                } else {
                    pan.setOffset({ x: 0, y: 0 });
                    pan.resetAnimation();
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        friction: 10,
                        // useNativeDriver: false
                    }).start();
                }
            }
        })
    ).current;

    const panStyle = {
        transform: pan.getTranslateTransform(),
    };

    return (
        <Animated.View {...panResponder.panHandlers} style={[panStyle, styles.rectangle]} >
            <Image style={styles.image} source={path} key={id}></Image>
        </Animated.View>
    )
};

export default Draggable;
let CIRCLE_RADIUS = 50;
let x = 40;
const styles = StyleSheet.create({
    circle: {
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        borderRadius: CIRCLE_RADIUS,
        backgroundColor: colors.taupe
    },
    rectangle: {
        backgroundColor: colors.taupe,
        marginRight: 2,
        marginTop: 2,
        width: (Dimensions.get('window').width / 4) - 15,
        height: ((Dimensions.get('window').width / 4) - 15) / 3 * 4,
        maxWidth: x*3,
        maxHeight: x*4,
        // position: 'absolute',
        zIndex: 3,
        // elevation: 1,
    },
    image: {
        backgroundColor: 'red',
        width: "100%",
        height: "100%",
        // position: 'absolute',
        zIndex: 4,
        // elevation: 1
    }
});