import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewersScreen from '../analytics_screens/Viewers';
import UserScreen from '../analytics_screens/UserScreen';
import SettingsPopup from '../components/SettingsPopup';
import MoneyScreen from '../analytics_screens/Money';

const ViewersStack = createNativeStackNavigator();
function ViewersStackScreen() {
    return (
        <ViewersStack.Navigator screenOptions={{headerShown: false}}>
            <ViewersStack.Screen name="SettingsPopup" component={SettingsPopup} />
            <ViewersStack.Screen name="ViewersScreen" component={ViewersScreen} />
            <ViewersStack.Screen name="UserDetails" component={UserScreen} />
            <ViewersStack.Screen name="MoneyDetails" component={MoneyScreen} />
        </ViewersStack.Navigator>
    )
}

const Navy = () => {
    return(
        <NavigationContainer independent={true}>
            <ViewersStackScreen />
        </NavigationContainer>
    );
}

export default Navy;