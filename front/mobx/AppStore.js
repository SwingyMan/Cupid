import { action, makeAutoObservable } from "mobx";
import { useRef } from "react";
import { Camera } from 'expo-camera'
import { router } from 'expo-router'
import axios from "axios";
import * as MediaLibrary from 'expo-media-library'
import { CameraType } from "expo-camera";
import * as SingleImagePicker from 'expo-image-picker'
import { ImagePicker } from "expo-image-multiple-picker";

export default class AppStore {

    constructor() {
        makeAutoObservable(this);
    }

    apiPath = "https://jsonplaceholder.typicode.com/";
    code = "";
    images = ([
        { id: 1, uri: 'https://picsum.photos/300' },
        { id: 2, uri: 'https://picsum.photos/300' },
        { id: 3, uri: 'https://picsum.photos/300' },
        { id: 4, uri: 'https://picsum.photos/300' },
        { id: 5, uri: 'https://picsum.photos/300' },
        { id: 6, uri: 'https://picsum.photos/300' },
        { id: 7, uri: 'https://picsum.photos/300' },
        { id: 8, uri: 'https://picsum.photos/300' },
        { id: 9, uri: 'https://picsum.photos/300' },
    ]);
    hasCameraPermission = null;
    photo = null;
    type = CameraType.back;

    // INVITE CODE

    @action setCode = (txt) => {
        this.code = txt;
        console.log("code: " + this.code);
    }

    checkCode = () => {
        if (this.code != "") {
            // console.log("code: " + this.code + " : " + typeof (this.code))
            axios.get(this.apiPath + "users/" + this.code)
                .then(function (response) {
                    if (response.status == 200) {
                        alert("Access granted, username: " + response.data.username);
                        // router.replace('/photos')
                        router.push('/photos')
                    }
                })
                .catch(function (error) {
                    alert("Error: " + error);
                });
        } else {
            alert("Podaj kod [1-10]")
        }
    }

    // TAKING PHOTO

    @action clearPhoto = () => {
        this.photo = null
    }

    @action setPhoto = (data) => {
        this.photo = data;
    }

    @action toggleCamType = () => {
        this.type = (this.type === CameraType.back ? CameraType.front : CameraType.back)
    }

    takePicture = async (cameraRef) => {
        if (cameraRef.current) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                console.log(data);
                this.setPhoto(data.uri);
            } catch (err) {
                console.log(err);
            }
        }
    }

    savePhoto = async () => {
        if (this.photo) {
            try {
                await MediaLibrary.createAssetAsync(this.photo);
                alert("Zapisano");
                this.clearPhoto();
            } catch (err) {
                console.log(err);
            }
        }
    }

    // IMAGE PICKER

    pickImageAsync = async () => {
        let result = await SingleImagePicker.launchImageLibraryAsync({
            //allowsEditing: true,
            allowsMultipleSelection: true,
            orderedSelection: true,
            selectionLimit: 10,
            quality: 1,
        });
        if (!result.canceled) {
            console.log(result.assets[0].uri);
            this.images = [...this.images, { id: (this.images.length + 1), uri: result.assets[0].uri }]
        }
        else {
            console.log("Images not selected.")
        }
    }
    
    pickMultipleImages = async (assets) => {
        console.log("Saving mulitple pictures: ")
        {assets.map((asset) => {
            console.log(asset.uri)
            this.images = [...this.images, { id: (this.images.length + 1), uri: asset.uri }]
        })}
        router.replace('/photos')
        console.log("Saved pictures: ", this.images)
    }


}