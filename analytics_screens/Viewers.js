import React from "react";
import { FlatList, TouchableOpacity } from "react-native";

import { Row, Separator } from "../components/Row";
import users from "../data/users";

import {
    View,
    Text,
    StyleSheet
} from 'react-native'

import { Ionicons } from "@expo/vector-icons";

const ViewersScreen = ({navigation}) => {
    return(
        <View style={{backgroundColor: "#ffffff"}}>
            <View style={styles.left}>
                <TouchableOpacity onPress={() => navigation.push("SettingsPopup")}>
                    <Ionicons name="ios-arrow-back" color="#666" size={40} />
                </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.titleContainer}>Recent Viewers</Text>
            </View>
            <FlatList
                data={users}
                keyExtractor={item => {
                return `${item.id.value}-${item.phone}`;
                }}
                renderItem={({ item }) => {
                const username = `@${item.login.username}`;

                return (
                    <Row
                    image={{ uri: item.picture.thumbnail }}
                    title={username}
                    onPress={() => navigation.push("UserDetails", {user: item})}
                    />
                );
                }}
                ItemSeparatorComponent={Separator}
                ListHeaderComponent={() => <Separator />}
                ListFooterComponent={() => <Separator />}
                contentContainerStyle={{ paddingVertical: 30 }}
                />
        </View>
    )
}
export default ViewersScreen;

const styles = StyleSheet.create({
    titleContainer: {
        flex: 1,
        padding: 60,
        marginTop: -60,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "#ffffff",
        fontWeight: 'bold',
        fontSize: 30
    },
    left: {
        alignItems: "flex-start",
        padding: 20,
    }
});