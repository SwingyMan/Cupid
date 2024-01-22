## Note 

app created with:
`npx create-expo-app cupid-app-test-3 -e with-router`

to start app run:
`npx expo start`

to build apk:\
`eas build --platform android`\
`eas build -p android --profile preview --message "Updating the app"`\
`eas update --branch preview --message "Updating the app"`

installed packages:
1. npm install mobx mobx-react
2. npm install -g eas-cli
3. npm i expo-image-multiple-picker react-native-svg expo-media-library

repair:
npm install\ 
npm audit fix --force\ 
npx expo install --fix\ 
expo update

## Links

- [Creating Expo project - docs.expo.dev/get-started/create-a-project](https://docs.expo.dev/get-started/create-a-project/)

- [Making build - docs.expo.dev/build/setup](https://docs.expo.dev/build/setup/)

- Use [`expo-router`](https://expo.github.io/router) to build native navigation using files in the `app/` directory.

- [Expo Router: Docs](https://expo.github.io/router)

- [Expo Router: Repo](https://github.com/expo/router)
