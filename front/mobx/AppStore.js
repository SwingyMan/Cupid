import { action, makeAutoObservable, observable } from "mobx";
import { router } from 'expo-router'
import * as MediaLibrary from 'expo-media-library'
import { CameraType } from "expo-camera";
import * as SingleImagePicker from 'expo-image-picker'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
import { Alert, Keyboard, Platform, Share } from "react-native";
import * as FileSystem from 'expo-file-system';

export default class AppStore {

    constructor() {
        makeAutoObservable(this);
    }

    images = [
        //{ id: null, uri: null },
        //{ id: 1, uri: 'https://picsum.photos/301' },
        //{ id: 2, uri: 'https://via.placeholder.com/200/ffeeff' },
    ];

    appIsReady = false;

    apiFakePath = "https://jsonplaceholder.typicode.com";
    apiCupidPath = "https://cupidapp.azurewebsites.net/api";
    // apiCupidPath = "http://10.0.2.2:4444";
    // apiCupidPath = "http://localhost:4444";
    apiLocalCupidPath = "http://192.168.0.73:4444";
    // apiLocalCupidPath = "http://192.168.43.70:4444";

    code = "";
    newTitle = ""
    newCode = null;
    codeIsValid = false;
    username = "";
    userIsValid = false;
    albumID = "";

    hasCameraPermission = null;
    photo = null;
    camType = CameraType.back;



    // guzik for TESTING

    guzik = async () => {
        console.log("ALBUM : ")
        console.log(this.fullAlbum)
        console.log("USER : ")
        console.log(this.fullUser)

        // router.replace('/loading')
        // new Promise((res) => {
        //     setTimeout(res, 3000, "pWaiting")
        // })
        //     .then(() => {
        //         router.replace('/')
        //     })


        // console.log("wysyłam")
        // await this.imgToBase64("file:///storage/emulated/0/DCIM/Camera/VID_20240114_100112_exported_0.jpg")
        //     .then(async (result) => {
        //         // console.log(result, " = result")
        //         // wysyłam do bazy
        //         await this.postPhoto(2, result).then((response) => {
        //             console.log("postPhoto response: ", response)
        //         }) 
        //     })

        // this.postPhoto(1, this.imgToBase64("file:///storage/emulated/0/DCIM/Camera/IMG_20240118_145230.jpg")) // wysyłam do bazy

        // this.showMyLocalPhotos()
        // console.log((this.testPhotoPath).substring(this.testPhotoPath.length-4))
    }

    // @action setKeyboardVisibility = () => {
    //     this.keyboardIsVisible = Keyboard.isVisible();
    //     console.log("keyboardIsVisible: ", this.keyboardIsVisible)
    // }

    // APP IS READY

    prepare = async () => {
        // await SplashScreen.preventAutoHideAsync();
        console.log("Prepare()")
        try {
            console.log("Ładuje..")
            // Pre-load fonts, make any API calls you need to do here
            await this.loadFonts();
            // Artificially delay seconds to simulate a slow loading experience. If set >0
            await new Promise((resolve) => { setTimeout(resolve, 0) });
            console.log("OK")
        } catch (e) {
            console.warn(e);
        } finally {
            // Tell the application to render
            this.setAppIsReady(true);
        }
    }

    onLayoutRootView = async () => {
        console.log("onLayoutRootView()")
        if (this.appIsReady) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            console.log("Chowam SplashScreen")
            // to nie wiedzieć czemu nei działa
            await SplashScreen.hideAsync();
        }
        else {
            console.log("Layout jeszcze nie gotowy");
        }
    }

    loadFonts = async () => {
        await Font.loadAsync({
            'Coolvetica': require('../assets/fonts/Coolvetica.otf'),
            'AL_Nevrada': require('../assets/fonts/AL_Nevrada.otf')
        });
    }

    @action setAppIsReady = (bool) => {
        this.appIsReady = bool;
        // console.log("appIsReady = " + this.appIsReady);
    }

    // USER

    fullUser = null

    @action setUsername = (txt) => {
        this.username = txt;
        // console.log("username: " + this.username);
    }

    @action setUserIsValid = (bool) => {
        this.userIsValid = bool;
        // console.log("user is valid: " + this.userIsValid);
    }

    @action setFullUser = (data) => {
        this.fullUser = data;
    }

    addUserToAlbum = async (userID, album) => {
        // dodajemy userID do listy userów w Albumie
        // lista userów to np. {... userIDs = [3, 2, 5, 6] ...}

        let updatedAlbum = album
        // updatedAlbum.userIDs.push(userID)

        if (updatedAlbum.userIDs) {
            updatedAlbum.userIDs.push(userID)
        }
        else {
            updatedAlbum.userIDs = []
            updatedAlbum.userIDs.push(userID)
        }

        updatedAlbum.num_pages = updatedAlbum.num_pages + 1

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedAlbum)
        };
        console.log("adding user to album, sending ", updatedAlbum, " via PUT")
        // return fetch(this.apiLocalCupidPath + "/albums/" + album.id, requestOptions)
        return fetch(this.apiCupidPath + "/albums/" + album.id, requestOptions)                 // <<< SPRAWDŹ
            .then(function (response) {
                if (!response.ok) {
                    console.log("response addUserToAlbum not ok: ", response.status)
                    throw Error(response.statusText);
                }
                console.log("response addUserToAlbum status: ", response.status);
                return response.json();     // zwraca zupdateowany album
            })
            .catch(function (error) {
                console.log("addUserToAlbum not ok")
                return false;
            })
    }

    addUser = async (username) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "username": username })
        };
        console.log("adding user, sending ", requestOptions)
        // return fetch(this.apiLocalCupidPath + "/users", requestOptions)
        return fetch(this.apiCupidPath + "/users", requestOptions)                              // <<< OK
            .then(function (response) {
                if (!response.ok) {
                    console.log("response addUser not ok: ", response.status)
                    throw Error(response.statusText);
                }
                console.log("response addUser status: ", response.status);
                return response.json();
            })
            .catch(function (error) {
                console.log("addUser not ok, error: ", error)
                return false;
            })
    }

    // INVITE CODE

    @action setCode = (txt) => {
        this.code = txt;
        // console.log("code: " + this.code);
    }

    @action setNewCode = (txt) => {
        this.newCode = txt;
        // console.log("newCode: " + this.newCode);
    }

    shareNewCode = async () => {
        console.log("SHARING newCode!")
        let txt = `Zapraszam Cię do dołączenia do mojego albumu zdjęć weselnych!

Kod zaproszenia: ${this.newCode}
        
Pobierz aplikacje Cupid, jeśli jeszcze jej nie masz.`

        try {
            await Share.share({
                message: txt
            });
        } catch (error) {
            console.error('Sharing error: ', error);
        }
    }

    @action setCodeIsValid = (bool) => {
        this.codeIsValid = bool;
        // console.log("code is valid: " + this.codeIsValid);
    }

    // ALBUM

    fullAlbum = null

    @action setAlbumID = (txt) => {
        this.albumID = txt;
        // console.log("albumID: " + this.albumID);
    }

    @action setFullAlbum = (data) => {
        this.fullAlbum = data;
        // console.log("setting fullAlbum: " + this.fullAlbum);
    }

    @action setNewTitle = (txt) => {
        this.newTitle = txt;
    }

    createNewAlbum = async (title, adminID) => {

        kodzik = Math.floor(Math.random() * 8999 + 1000);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ "title": title, "userID": adminID })
            body: JSON.stringify({
                "title": title,
                "adminID": adminID,
                // "code": kodzik,
                "num_pages": 0,
                "userIDs": [],  // tu dodaje potem osobno
                "photoIDs": [
                    []
                ]
            })
        };

        console.log("tytul i adminID: ", title, adminID)
        console.log("creating album, sending ", requestOptions)

        // return fetch(this.apiLocalCupidPath + "/albums", requestOptions)
        return fetch(this.apiCupidPath + "/albums", requestOptions)                         // <<< OK
            .then(function (response) {
                if (!response.ok) {
                    console.log("response createAlbum not ok: ", response.status)
                    throw Error(response.statusText);
                }
                console.log("response createAlbum status: ", response.status);
                return response.json();
            })
            .catch(function (error) {
                console.log("createAlbum not ok")
                return false;
            })
    }

    createAlbumWithAdmin = async () => {

        // sprawdź czy jest taki user (jak podany w 'username')
        //    jak jest 
        //       to bierzemy jego ID jako adminID i tworzymy album na bazie 'username' i 'adminID'
        //    jak nie ma
        //       to tworzymy nowego usera
        //          bierzemy jego ID jako adminID i tworzymy album na bazie 'username' i 'adminID'

        let adminID = 999 // safetyXD

        const userResponse = await this.checkUserExist();
        // console.log("user response data: ", userResponse)
        // console.log("user response bool1: ", Boolean(userResponse[0]))
        // console.log("user response data.username: ", userResponse[0].username)
        // console.log("user response bool2: ", Boolean(userResponse[0].username))
        // [0] bo zwraca mi liste z obiektem jednego gościa !!! (na lokalnym)
        // if (userResponse.length > 0 && userResponse[0].username) { // czy lista jest pusta i czy pierwszy obiekt ma pole 'username'
        if (userResponse && userResponse.Username != "") { // czy jest obiekt i czy 'username' nie jest pusty
            // jak już jest to spoko
            console.log("user już jest, robie album ")
            console.log("curr user: ", userResponse)
            // this.setFullUser(userResponse[0])
            this.setFullUser(userResponse)

            // adminID = userResponse[0].id
            adminID = userResponse.UserID

            // próbujemy stworzyć album
            const albumCreateResponse = await this.createNewAlbum(this.newTitle, adminID);

            console.log("czy album utworzony? ", albumCreateResponse)
            // if (albumCreateResponse && albumCreateResponse.InviteCode != "") {
            if (albumCreateResponse && albumCreateResponse.code) {
                this.setFullAlbum(albumCreateResponse)
                return true
            }
            else {
                console.log("nie idzie utworzyć albumu, abo nie ma kodu")
                return false
            }
        }
        else { // jak nie ma to stwórz usera
            console.log("usera nie ma, tworzę go")
            const createdUserResponse = await this.addUser(this.username.trim())

            // .then(async (result) => {
            console.log("got from addUser: ", createdUserResponse)
            // console.log("jego ID", createdUserResponse.ID)
            // console.log("jego Username", createdUserResponse.Username)
            // if (createdUserResponse && createdUserResponse.username) {
            if (createdUserResponse && createdUserResponse.Username != "") {

                console.log("nowy user utworzony")
                // adminID = createdUserResponse.ID
                // po CREATE zwraca ino jeden obiekt (więc bez [0]) !!!
                adminID = createdUserResponse.UserID
                this.setFullUser(createdUserResponse)

                // próbujemy stworzyć album
                const albumCreateResponse = await this.createNewAlbum(this.newTitle, adminID);

                console.log("czy album utworzony? ", albumCreateResponse)
                // if (albumCreateResponse && albumCreateResponse.InviteCode != "") {
                if (albumCreateResponse && albumCreateResponse.code != "") {
                    this.setFullAlbum(albumCreateResponse)
                    return true
                }
                else {
                    this.customAlert("Uwaga", "Wystąpił błąd podczas tworzenia albumu.\nPrzepraszamy. Skontaktuj się z działem wsparcia.")
                    console.log("nie idzie utworzyć albumu")
                    return false
                }
            }
            else {
                // jak nie udało się stwórzyć
                this.customAlert("Uwaga", "Wystąpił błąd podczas tworzenia użytkownika.\nPrzepraszamy. Skontaktuj się z działem wsparcia.")
                console.log("nie idzie utworzyć usera")
                return false
            }
            // })
        }
    }

    checkAlbumCreating = async () => {

        if (this.newTitle.trim() == "") {
            return
        }
        console.log("username: ", this.username.trim())
        if (this.username.trim() == "" || this.username.trim() == undefined || this.username.trim() == null) {
            return
        }

        router.replace('/loading')
        console.log("waiting for fetch.. [albumCreate]")
        Keyboard.dismiss()

        const checkingAlbum = await this.createAlbumWithAdmin() // title i adminID
        Promise.all([
            checkingAlbum
        ])
            .then((async result => {
                console.log("WAIT_FOR ENDED - RESPONSE CHECKED")

                if (checkingAlbum) { // jak utworzono
                    // const albumResponse = await this.addUserToAlbum(this.fullUser.id, this.fullAlbum) // dodajemy go do userIDs w albumie
                    const albumResponse = await this.addUserToAlbum(this.fullUser.UserID, this.fullAlbum) // dodajemy go do userIDs w albumie
                    // this.setNewCode(this.fullAlbum.InviteCode) // pojawia się kod
                    // this.setCode(this.fullAlbum.InviteCode)
                    console.log("i dodano usera do albumu: ", albumResponse)
                    this.setFullAlbum(albumResponse)
                    this.setNewCode(String(this.fullAlbum.code)) // pojawia się kod
                    this.setCode(String(this.fullAlbum.code))
                }
                else {
                    this.setNewCode(null)
                    alert("Oj, nie mogę utworzyć")
                }
            }))
        
        router.replace('/admin')
    }

    // CHECK ENTERING

    checkCodeExist = async () => {

        // return fetch(this.apiFakePath + "/users/" + this.code)
        //     .then(response => 
        //         response.json())
        //     .catch(err =>
        //         console.log(err)
        //     )

        // return fetch(this.apiLocalCupidPath + "/albums?code=" + this.code)
        return fetch(this.apiCupidPath + "/albums?code=" + String(this.code))                               // <<< OK? (zwraca jednego nie liste) [naprawione]
            .then(function (response) {
                if (!response.ok) {
                    console.log("response code not ok: ", response.status)
                    throw Error(response.statusText);
                }
                console.log("code response status: ", response.status);
                return response.json();
            })
            .catch(function (error) {
                console.log("code not ok")
                //console.log("error: ", error)
                return false;
            })
    }

    checkUserExist = async () => {
        // return fetch(this.apiLocalCupidPath + "/users?username=" + this.username.trim())
        return fetch(this.apiCupidPath + "/users?username=" + this.username.trim())                 // <<< OK? (zwraca jednego nie liste) [naprawione]
            .then(function (response) {
                if (!response.ok) {
                    console.log("response user not ok: ", response.status)
                    throw Error(response.statusText);
                }
                console.log("user response status: ", response.status);
                return response.json();
                //return true;
            })
            .catch(function (error) {
                console.log("user not ok")
                // console.log("error: ", error)
                return false;
            })
    }

    waitForUserAndAlbumCheck = async () => {

        if (String(this.code) == "") {
            this.setCodeIsValid(false)
            return
        }
        console.log("username: ", this.username.trim())
        if (this.username.trim() == "" || this.username.trim() == undefined || this.username.trim() == null) {
            this.setUserIsValid(false)
            return
        }

        const albumResponse = await this.checkCodeExist();
        const userResponse = await this.checkUserExist();
        // this.setFullAlbum(albumResponse[0])
        // this.setFullUser(userResponse[0])
        this.setFullAlbum(albumResponse)
        this.setFullUser(userResponse)

        console.log("response 1: ", albumResponse)
        console.log("response 2: ", userResponse)

        // if (albumResponse.length > 0 && albumResponse[0].code != "") { // jest taki album
        if (albumResponse && albumResponse.code != "") { // jest taki album
            // console.log("code in response: ", albumResponse[0].code)
            console.log("code in response: ", albumResponse.code)
            console.log("setting code true")
            // this.setAlbumID(albumResponse[0].code)
            this.setAlbumID(albumResponse.code)
            this.setCodeIsValid(true);
        }
        else {
            console.log("setting code false")
            this.setCodeIsValid(false);
        }

        // if (userResponse.length > 0 && userResponse[0].username != "") { // jest taki user
        if (userResponse && userResponse.Username != "") { // jest taki user
            // console.log("user in response: ", userResponse[0].username)
            console.log("user in response: ", userResponse.Username)
            console.log("setting user true")
            // this.setUsername(userResponse[0].username)
            this.setUsername(userResponse.Username)
            this.setUserIsValid(true);

            if (this.codeIsValid) { // jeśli album jest git, to sprawdzamy czy jest tam user
                // if (albumResponse[0].userIDs.includes(userResponse[0].id)) {
                if (albumResponse.userIDs.includes(userResponse.UserID)) {
                    console.log("nie, nie cza dodać do albumu")
                }
                else {
                    console.log("tak, cza dodać do albumu")
                    // const dodany = await this.addUserToAlbum(userResponse[0].id, albumResponse[0])
                    const dodany = await this.addUserToAlbum(userResponse.UserID, albumResponse)
                    console.log("dodany: ", dodany)
                }
            }
        }
        else {
            console.log("setting user false")
            this.setUserIsValid(false);
        }
    }

    checkEntering = async () => {

        console.log("waiting for fetch.. [entering]")
        router.replace('/loading')

        await this.waitForUserAndAlbumCheck()
        console.log("WAIT_FOR ENDED - RESPONSE CHECKED")

        console.log("entering with code = ", this.code)
        console.log("entering with username = ", this.username)
        console.log("is code valid? ", this.codeIsValid)
        console.log("is user valid? ", this.userIsValid)

        if (this.codeIsValid) { // jest taki album
            if (this.userIsValid) { // jest taki user
                this.loadMyPhotos() // ładujemy jego zdjęcia
                    .then(() => {
                        console.log("przechodze do albumu")
                        // przechodzimy dalej
                        // router.push('/photos') 
                        router.replace('/photos')
                    })
            }
            else {
                console.log("Oj, trzeba dodać usera")

                const responseAddUser = await this.addUser(this.username.trim())
                console.log("responseAddUser: ", responseAddUser)
                this.setFullUser(responseAddUser)

                const responseAddUserToAlbum = await this.addUserToAlbum(responseAddUser.UserID, this.fullAlbum)
                console.log("responseAddUserToAlbum: ", responseAddUserToAlbum)
                this.setFullAlbum(responseAddUserToAlbum)

                router.replace('/photos')
            }
        } else {
            router.replace('/')
            this.customAlert("Uwaga","Niepoprawny kod lub brak nazwy użytkownika.\nSprawdź wprowadzone dane oraz połączenie z internetem.")
        }

    }

    // GETTING PHOTOS

    getMyPhotos = async () => {
        // return fetch(this.apiLocalCupidPath + "/photos?userId=" + this.fullUser.id)
        return fetch(this.apiCupidPath + "/photos?userId=" + this.fullUser.UserID)                      // <<< OK
            .then(function (response) {
                if (!response.ok) {
                    console.log("response getMyPhotos not ok: ", response.status)
                    throw Error(response.statusText);
                }
                console.log("response getMyPhotos status: ", response.status);
                return response.json();
            })
            .catch(function (error) {
                console.log("getMyPhotos not ok")
                return false;
            })
    }

    loadMyPhotos = async () => {

        this.clearMyLocalPhotos()

        console.log("waiting for fetch.. [gettingPhotos]")
        const photosResponse = await this.getMyPhotos()
        console.log("WAIT_FOR ENDED - RESPONSE CHECKED")
        // console.log("photosResponse: ", photosResponse)

        if (photosResponse) {
            photosResponse.map((photoObj) => {
                // this.images.push({ id: this.images.length, uri: photoObj.url })
                // this.addPhotoToLocalImages(photoObj.id, photoObj.url)
                this.addPhotoToLocalImages(photoObj.PhotoID, photoObj.URL)
            })
        }
    }

    // TAKING PHOTO | CAMERA

    @action clearPhoto = () => {
        this.photo = null
    }

    @action setPhoto = (data) => {
        this.photo = data;
    }

    @action toggleCamType = () => {
        this.camType = (this.camType === CameraType.back ? CameraType.front : CameraType.back)
    }

    takePicture = async (cameraRef) => {
        if (cameraRef.current) {
            try {
                const data = await cameraRef.current.takePictureAsync({
                    // quality: 0.5
                });
                console.log("photo taken, data: ", data);
                this.setPhoto(data.uri);
            } catch (err) {
                console.log(err);
            }
        }
    }

    // SAVING PHOTO/s

    savePhoto = async () => {

        router.replace('/loading')

        if (this.photo) {
            try {
                console.log("zapisuję w galerii urządzenia this.photo: ", this.photo)
                await MediaLibrary.createAssetAsync(this.photo); // zapisuje do galerii urzadzenia

                // console.log("zapisuje zdjecie w lokalnym stanie")
                // this.addPhotoToLocalImages(this.photo) // zapisuje w lokalnym stanie

                await this.imgToBase64(this.photo)
                    .then(async (result) => {
                        // console.log(result, " = result")
                        // wysyłam do bazy
                        console.log("wysyłam zrobione zdjęcie do bazy")
                        // await this.postPhoto(this.fullUser.id, result)
                        await this.postPhoto(this.fullUser.UserID, result)
                            .then((response) => {
                                console.log("zapisuję je w lokalnym stanie aplikacji")
                                // this.addPhotoToLocalImages(response.id, response.url)
                                this.addPhotoToLocalImages(response.PhotoID, response.URL)
                                this.showMyLocalPhotos()
                                router.replace('/photos')
                            })
                    })

                this.clearPhoto()
                return true

            } catch (err) {
                console.log("error: ")
                console.log(err)
                router.replace('/photos')
                return false
            }
        }
        else {
            console.log("nie ma co zapisać [this.photo]")
            router.replace('/photos')
            return false
        }
    }

    imgToBase64 = async (imagePath) => {
        return await FileSystem.readAsStringAsync(imagePath, { encoding: 'base64' })
            .then((result) => {
                console.log("image to base64 ok")
                // console.log("based image: ", result)
                return result
            })
    }

    postPhoto = async (userId, b64data) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // headers: { 'Content-Type': 'multipart/form-data' },
            body: JSON.stringify({ "url": b64data, "userId": userId })                                  // ONLINE
            // body: JSON.stringify({ "url": 'data:image/jpg;base64,' + b64data, "userId": userId })    // LOCAL
        };
        console.log("sending photo to db")
        // console.log("sending ", requestOptions)
        // return fetch(this.apiLocalCupidPath + "/photos", requestOptions)         // LOCAL
        return fetch(this.apiCupidPath + "/photos", requestOptions)                 // ONLINE                   // << OK? (hope so)
            .then(function (response) {
                if (!response.ok) {
                    console.log("response postPhoto not ok: ", response.status)
                    throw Error(response.statusText);
                }
                console.log("response postPhoto status: ", response.status);
                return response.json();
            })
            .catch(function (error) {
                console.log("postPhoto not ok")
                return false;
            })
    }

    showMyLocalPhotos = () => {
        console.log("IMAGES [local]: ")
        this.images.map((img) => {
            if (img.id == null) {
                console.log(" " + img.id + " : " + img.uri)
            }
            else {
                console.log(" " + img.id + " : " + (img.uri).substring(0, 70) + (((img.uri).substring(0, 50) == (img.uri)) ? " " : "..." + (img.uri).substring((img.uri.length - 30))))
            }
        })
    }

    @action clearMyLocalPhotos = () => {
        this.images = [
            { id: null, uri: null }
        ]
    }

    @action addPhotoToLocalImages = (id, path) => {
        this.images = [...this.images, { id: id, uri: path }]
    }

    // IMAGE PICKER | GALLERY

    // waitForSendingPhotos = async (wybrane) => {

    //     await wybrane.map(async (photo) => {

    //         // console.log("zapisuje wybrane photo:", photo.uri)
    //         // this.addPhotoToLocalImages(photo.uri) // zapisuje w lokalnym stanie
    //         // pWysylanie.push(new Promise((res) => {
    //         //     setTimeout(res, 1000, "pWaiting")
    //         // }))

    //         console.log("wysyłam do bazy wybrane zdjęcie:", photo.uri)

    //         await this.imgToBase64(photo.uri)
    //             .then(async (result) => {
    //                 // console.log(result, " = result")
    //                 console.log("postPhoto then 1")
    //                 // wysyłam do bazy
    //                 // await this.postPhoto(this.fullUser.id, result)
    //                 await this.postPhoto(this.fullUser.USerID, result)
    //                     .then((response) => {
    //                         // zapisuje w lokalnym stanie jak dostanę responsa
    //                         // this.addPhotoToLocalImages(response.id, response.url)
    //                         this.addPhotoToLocalImages(response.PhotoID, response.URL)
    //                         console.log("postPhoto then")
    //                     })
    //                 console.log("imgToBase64 then 2")
    //             })
    //         console.log("imgToBase64")
    //     })

    // }

    pickMultipleImages = async (wybrane) => {
        console.log("dodaję zdjęcie/zdjęcia wybrane z galerii")
        // alert("Czekaj..")
        router.replace('/loading')

        // console.log("waiting for fetch.. [sendingPhotos]")
        // const pWysylanie = await this.waitForSendingPhotos(wybrane)
        // console.log("WAIT_FOR ENDED - RESPONSE CHECKED")

        // if (pWysylanie) {
        //     console.log("Zapisywanie zakończone ", result)
        //     this.showMyLocalPhotos()
        //     router.replace('/photos')
        // }

        // map(x,y,z) https://stackoverflow.com/questions/38176352/javascript-map-array-last-item
        await wybrane.map(async (photo, i, array) => {

            console.log("wysyłam do bazy wybrane zdjęcie:", photo.uri)

            await this.imgToBase64(photo.uri)
                .then(async (result) => {
                    // console.log(result, " = result")
                    console.log("postPhoto then 1")
                    // wysyłam do bazy
                    // await this.postPhoto(this.fullUser.id, result)
                    await this.postPhoto(this.fullUser.UserID, result)
                        .then((response) => {
                            // zapisuje w lokalnym stanie jak dostanę responsa
                            // this.addPhotoToLocalImages(response.id, response.url)
                            this.addPhotoToLocalImages(response.PhotoID, response.URL)
                            console.log("postPhoto then")
                            if (i == 0) {
                                console.log("Zapisywanie zakończone")
                                router.replace('/photos')
                            }
                            if (i == array.length - 1) {
                                this.showMyLocalPhotos()
                            }
                        })
                    console.log("imgToBase64 then 2")

                })
            console.log("imgToBase64")
        })

    }

    addFromGallery = () => {
        console.log("adding from gallery")
        router.push('/gallery')
    }

    addFromCamera = () => {
        console.log("adding from camera")
        router.push('/camera')
    }

    // DELETE IMAGE

    deletePhoto = async (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        console.log("deleting photo from db")
        // return fetch(this.apiLocalCupidPath + "/photos/" + id, requestOptions)
        return fetch(this.apiCupidPath + "/photos/" + id, requestOptions)                   // <<< SPRAWDŹ
            .then(function (response) {
                if (!response.ok) {
                    console.log("response deletePhoto not ok: ", response.status)
                    throw Error(response.statusText);
                }
                console.log("response deletePhoto status: ", response.status);
                return true;
            })
            .catch(function (error) {
                console.log("deletePhoto not ok")
                return false;
            })
    }

    deleteImage = async (id) => {
        this.images = this.images.filter((img) => { return img.id !== id })
        await this.deletePhoto(id)
    }

    confirmDeleteThisImage = (id) => {

        console.log("pressed on ", id)
        if (Platform.OS === 'web') {
            result = window.confirm("Usunąć zdjęcie?")
            if (result) {
                console.log("usuwam")
                this.deleteImage(id)
            }
            else {
                console.log("nie usuwam")
            }
        }
        else {
            Alert.alert('Potwierdź', 'Usunąć zdjęcie?', [
                {
                    text: 'Nie',
                    onPress: () => console.log('nie usuwam'),
                    style: 'cancel',
                },
                {
                    text: 'TAK',
                    onPress: () => { console.log('usuwam'); this.deleteImage(id) }
                },
            ]);
        }
    }

    customAlert = (title, msg) => {
        if (Platform.OS === 'web') {
            window.confirm(msg)
        }
        else {
            Alert.alert(title, msg)
        }
    }

    putPDF = async (userId, b64data) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            // headers: { 'Content-Type': 'multipart/form-data' },
            body: JSON.stringify({ "url": b64data, "userId": userId })                                  // ONLINE
            // body: JSON.stringify({ "url": 'data:image/jpg;base64,' + b64data, "userId": userId })    // LOCAL
        };
        console.log("sending pdf to db")
        // console.log("sending ", requestOptions)
        // return fetch(this.apiLocalCupidPath + "/photos", requestOptions)         // LOCAL
        return fetch(this.apiCupidPath + "/albums/"+this.fullAlbum.id, requestOptions)                 // ONLINE                   // << OK? (hope so)
            .then(function (response) {
                if (!response.ok) {
                    console.log("response putPdf not ok: ", response.status)
                    throw Error(response.statusText);
                }
                console.log("response postPdf status: ", response.status);
                return response.json();
            })
            .catch(function (error) {
                console.log("putPdf not ok")
                return false;
            })
    }
}