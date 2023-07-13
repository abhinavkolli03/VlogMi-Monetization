import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import { Video, AVPlaybackStatus } from 'expo-av';
import * as React from "react";
import { useCallback, useMemo, useRef, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, Button, Pressable, View, Modal, TouchableOpacity } from "react-native";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop, } from '@gorhom/bottom-sheet';
import { createDrawerNavigator } from "@react-navigation/drawer";
// import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Navy from "./config/navigation.js";

function JeffsScreen({ navigation }) {  
  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  let sampleCreator = "@saragarner";

  const [modalVisible, setModalVisible] = useState(false);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');

  function setModalDetails(fail) {
    if (!fail) {
      setModalTitle(`Supported ${sampleCreator}!`);
      setModalText(`${sampleCreator} thanks you for supporting their content!`);
    } else {
      setModalTitle(`Video Incomplete`);
      setModalText(`The video unfortunately did not finish. Try again to support ${sampleCreator}!`);
    }
  }

  _onPlaybackStatusUpdate = playbackStatus => {
    if (playbackStatus.didJustFinish) {
      setVideoModalVisible(false);
      if (playbackStatus.durationMillis == playbackStatus.positionMillis) { 
        setModalDetails(false);
        setModalVisible(true);
      } else {
        setModalDetails(true);
        setModalVisible(true);
      }
    }    
  };

  return (
    
      <ImageBackground source={require('./assets/mockups/profile_support_cropped.png')} resizeMode="contain" style={imageBackground_styles.image}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={[styles.contentCenter, {marginTop: 22, flex: 1,}]}>
            <View style={styles.modalView}>
              <Text style={styles.h1}>{modalTitle}</Text>
              <Text style={[styles.p, {paddingBottom: 20}]}>{modalText}</Text>

              <Pressable
                style={[supportButton_styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={supportButton_styles.text}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={videoModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!videoModalVisible);
          }}
        >
          <View style={[styles.contentCenter, {marginTop: 22, flex: 1,}]}>
            <View style={styles.modalView}>
              <Video
                style={styles.video}
                // source={{uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",}}
                source={require('./assets/big_buck_bunny.mp4')}
                resizeMode="contain"
                shouldPlay="true"
                useNativeControls
                onPlaybackStatusUpdate = {(playbackStatus) => _onPlaybackStatusUpdate(playbackStatus)}
              />

              <Pressable
                style={[supportButton_styles.button, styles.buttonClose]}
                onPress={() => {
                  setVideoModalVisible(!videoModalVisible);
                  setModalDetails(true);
                  setModalVisible(true);
                }}
              >
                <Text style={supportButton_styles.text}>Close Video</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        
        <BottomSheetModalProvider>
            <Pressable style={[supportButton_styles.button, {borderRadius: 30, width: '35%', marginBottom: 10, }]} onPress={handlePresentModalPress}>
              <Text style={supportButton_styles.text}>Support</Text>
            </Pressable>

            <Pressable
              style={[supportButton_styles.button, {borderRadius: 30, width: '35%', marginBottom: 10,}]}
              onPress={() => {
                  setModalVisible(true);
                  setModalDetails(false);
                }
              }
            >
              <Text style={supportButton_styles.text}>afterSupport</Text>
            </Pressable>

            <Pressable
              style={[supportButton_styles.button, {borderRadius: 30, width: '35%', marginBottom: 10,}]}
              onPress={() => {
                  setModalVisible(true);
                  setModalDetails(true);
                }
              }
            >
              <Text style={supportButton_styles.text}>failedSupport</Text>
            </Pressable>

            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
              backdropComponent={BottomSheetBackdrop}
            >

              <View style={[styles.contentContainer, styles.contentCenter, {marginLeft: 20, marginRight: 20}]}>
                <Text style={styles.h1}>Support {sampleCreator}</Text>
                <Text style={[styles.p, {paddingBottom: 20}]}>Support {sampleCreator} here! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae libero ante. Vestibulum dignissim tincidunt nisl, id auctor nisl varius eget. Suspendisse ligula ligula, volutpat sodales mattis eget, tempor sed sem. Maecenas sit amet lorem sit amet sapien pretium ullamcorper vitae at risus. Suspendisse potenti. Pellentesque dignissim laoreet tellus id interdum. Maecenas sed quam ultricies, euismod felis eu, pretium magna.</Text>

                <Pressable style={[supportButton_styles.button, {borderRadius: 10, width: '100%',}]}
                  onPress={() => {
                    setVideoModalVisible(true);
                    bottomSheetModalRef.current?.dismiss();
                  }
              }>
                  <Text style={supportButton_styles.text}>Support</Text>
                </Pressable>
              </View>

            </BottomSheetModal>
          {/* <Text styles={imageBackground_styles.text}>Jefferson's app</Text> */}
        </BottomSheetModalProvider>
      </View>
    </ImageBackground> 
  );
}

function AbhisScreen({ navigation }) {
  let popupRef = React.createRef()
  const onShowPopup = () => {
    popupRef.show()
  }
  const onClosePopup = () => {
    popupRef.close()
  }
  const popupList = [
    {
      id: 1, 
      name: 'Money Analytics'
    },
    {
      id: 2,
      name: 'Viewer Analytics'
    },
    {
      id: 3,
      name: 'Advanced Settings'
    }
  ]
  //this is for first screen navigator
  /*
  return (
        <ImageBackground source={require('./assets/AbhisImages/settings-page.png')} resizeMode="contain"
          style={styles.container} onPress={onShowPopup}>
            <TouchableWithoutFeedback onPress={onShowPopup}>
              <Text style={{fontSize: 20}}>PopupBar</Text>
            </TouchableWithoutFeedback>
            <AnalyticsPopup 
              title="Creator Tools"
              ref = {(target) => popupRef = target}
              onTouchOutside={onClosePopup}
              data={popupList}
            />
        </ImageBackground>      
  );
  */
  //second screen viewer analytics navigator
  return(
    <Navy />
  );
}

function TushsScreen({ navigation }) {
  return (
    <View style={ styles.container }>
      <ImageBackground source={require('./assets/filter.png')} resizeMode="contain" style={imageBackground_styles.image}>
        <Button onPress={() => navigation.goBack()} title="Go back to Customer$POC" />
        <Text>Tushar's app</Text>
      </ImageBackground>
    </View>
  )
}

function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Feed Screen</Text>
    </View>
  );
}

function Article() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Article Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    //   <View style={styles.container}>
    //     <Text>Team Convergent App: VlogMi!</Text>
    //     <StatusBar style="auto" />
    //   </View>
    <NavigationContainer>
      <Drawer.Navigator drawerType="front"
          initialRouteName="Home"
          screenOptions={{
            activeTintColor: '#e91e63',
            itemStyle: { marginVertical: 10 },
            color: "red"
          }}>
        <Drawer.Screen name="Creator$POC" component={AbhisScreen} />        
        <Drawer.Screen name="Customer$POC" component={JeffsScreen} />
        <Drawer.Screen name="iOS filter" component={TushsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'flex-end',
    marginTop: -1
  },
  title: {
    fontSize: 25,
    padding: 15,
    color: 'white',
    fontWeight: 'bold',    
    textAlign: 'center',    
  },
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    padding: 10,
  },
  h1: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10, 
  },
  p: {
    textAlign: "center",
    fontSize: 15,
    padding: 10,
  }, 
  modalView: {
    width: '75%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  video: {
    alignSelf: 'center',
    width: 270,
    height: 150,
    marginBottom: 10,
  },
});

const imageBackground_styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
    alignSelf: 'stretch',
    width: null,
    height: null
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
  },
  contentCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
});

const supportButton_styles = StyleSheet.create({ 
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    elevation: 3,
    backgroundColor: '#4DE16E',
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
