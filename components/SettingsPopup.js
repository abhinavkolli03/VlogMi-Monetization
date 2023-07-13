import React, {useState} from 'react';
import { useRef } from 'react';
import Hamburger from 'react-native-hamburger';
import 'react-native-gesture-handler';
import {
    View,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
    Button,
    Text,
    Image
} from 'react-native';
import ViewersScreen from '../analytics_screens/Viewers';
import { LogBox } from "react-native";

LogBox.ignoreLogs([
"Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`"
]);

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

const SettingsPopup = ({navigation}) => {
  const bs = useRef();
  const [fall, setFall] = useState(new Animated.Value(1));
  const [state, setState] = useState({
    active: false,
  });

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const text = "Money"

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems:'center'}}>
          <Text style={styles.panelTitle}>Creator Tools</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={() => navigation.push("MoneyDetails")}>
          <Text style={styles.panelButtonTitle}>Money Analytics</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton}  onPress={() => navigation.push("ViewersScreen")}>
          <Text style={styles.panelButtonTitle}>Viewer Analytics</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton}>
          <Text style={styles.panelButtonTitle}>More Settings</Text>
      </TouchableOpacity>
    </View>
  );

  const altercate = () => {
    if(state.active == true) {
      bs.current.snapTo(1)
    } else {
      bs.current.snapTo(0)
    }
    setState({active: !state.active})
  };

  return (
    <View style={styles.container}>
        <BottomSheet 
          ref={bs}
          snapPoints={[320, 0]}
          renderContent={renderInner}
          renderHeader={renderHeader}
          initialSnap={1}
          callbackNode={fall}
          enabledContentGestureInteraction={true}
          enabledHeaderGestureInteraction={true}
        />
        <Animated.View style={{margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0))
        }}>
          <View style={{alignSelf: 'flex-end'}}>
            <TouchableOpacity onPress={() => {bs.current.snapTo(0), altercate}}>
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 15,
                  justifyContent: 'right',
                  alignItems: 'right',
                }}>
                  <Hamburger active={state.active}
                    type="cross"
                    onPress={altercate}>
                  </Hamburger>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
    </View>
  );
}


export default SettingsPopup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    marginTop: -15,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 25,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    marginBottom: 30,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#989898',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'light',
    color: 'black',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
  },
});