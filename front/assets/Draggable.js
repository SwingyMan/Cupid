
import { StyleSheet, Text, SafeAreaView, StatusBar, View, TextInput, Image, Button, PanResponder, Animated } from 'react-native';
import { Link } from 'expo-router'
import { observer } from 'mobx-react';
import { useStore } from '../mobx/store';
import React, { Component, useRef, useState } from 'react';
import EButton from '../styles/EButton'
import colors from '../styles/colors';


const Draggable = ({id, url}) => {
    const pan = useRef(new Animated.ValueXY()).current;
    this.state = {
        showDraggable: true,
        dropAreaValues: null,
        pan: new Animated.ValueXY(),
        opacity: new Animated.Value(1)
    };
    const { appStore } = useStore();
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove:Animated.event([null, { dx: pan.x, dy: pan.y }]),
            onPanResponderRelease: (e, gesture) => {
                if (gesture.moveY < 600) {
                    pan.extractOffset();
                    console.log({...pan})
                } else {
                    pan.setOffset({x: 0, y: 0});
                    pan.resetAnimation();
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        friction: 10
                    }).start(); 
                }
            }
        })
    ).current;


    const panStyle = {
        transform: pan.getTranslateTransform(),
    };

    return (
    <Animated.View {...panResponder.panHandlers} style={[panStyle, styles.circle]} >
        <Image style={styles.image} source={url} key={id}></Image>
    </Animated.View>
    )
};

export default Draggable;
let CIRCLE_RADIUS = 30;
const styles = StyleSheet.create({
    circle: {
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        borderRadius: CIRCLE_RADIUS,
    },
    image: {
        width: "100%",
        height: "100%",
    }
});