
import { StyleSheet, Text, SafeAreaView, StatusBar, View, TextInput, Image, Button, PanResponder, Animated } from 'react-native';
import { Link } from 'expo-router'
import { observer } from 'mobx-react';
import { useStore } from '../mobx/store';
import React, { Component, useRef, useState } from 'react';

const Draggable = () => {
    const pan = useRef(new Animated.ValueXY()).current;
    this.state = {
        showDraggable: true,
        dropAreaValues: null,
        pan: new Animated.ValueXY(),
        opacity: new Animated.Value(1)
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
            onPanResponderRelease: () => {
                pan.extractOffset();
            },
            onPanResponderRelease: (e, gesture) => {
                if (gesture.moveY < 200) {
                    pan.extractOffset();
                    
                } else {
                    Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    friction: 5
                }).start();
                } 
            }
        })
    ).current;


    const panStyle = {
        transform: pan.getTranslateTransform(),
    };

    return <Animated.View {...panResponder.panHandlers} style={[panStyle, styles.circle]} />;
};

export default Draggable;
let CIRCLE_RADIUS = 30;
const styles = StyleSheet.create({
    circle: {
        backgroundColor: "skyblue",
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        borderRadius: CIRCLE_RADIUS
    }
});