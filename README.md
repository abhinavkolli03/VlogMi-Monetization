# TXConvergent
POC implementations for app components

## Expo Setup
* Install / Use **Node 16.17.0** or **16.17.1** (npm **8.6.0**)
* (Just for the first time, create app with `npx create-expo-app TXConvergent`)
* Run `npm install` to install dependencies

### Windows, Mac
* Run `expo start --tunnel`

### Linux / WSL
* Configure WSLHostPatcher using [the instructions here](https://blog.expo.dev/running-expo-in-windows-subsystem-for-linux-wsl2-425f6fd7838e)
    * Path may be `./wsl/WSLHostPatcher.exe` or `~/wsl/WSLHostPatcher.exe`
    * Run `chmod +x` on `WSLHostPatcher.exe` and `WSLHostPatcher.dll` for increasing permissions
* Run `npm install -g eas-cli` and `npm install -g expo-cli`
* Run `expo-cli start --tunnel` 

## Drawer/menu setup
* npm install @react-navigation/native
* npx expo install react-native-screens react-native-safe-area-context
* npm install @react-navigation/drawer
* npx expo install react-native-gesture-handler react-native-reanimated
