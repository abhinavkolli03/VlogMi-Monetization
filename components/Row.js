import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const Row = ({ image, title, subtitle, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <View>
      <Image source={image} style={styles.image} />
    </View>
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
    <View style={styles.right}>
      <Ionicons name="ios-arrow-forward" color="#666" size={20} />
    </View>
  </TouchableOpacity>
);

export const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff"
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 10
  },
  content: {
    alignItems: "flex-start",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    marginTop: 15,
    fontWeight: "600",
    color: "#3a3a3a"
  },
  subtitle: {
    color: "#666",
    fontSize: 16,
    marginTop: 2
  },
  separator: {
    backgroundColor: "#000000",
    height: 1
  },
  right: {
    alignItems: "flex-end",
    flex: 1
  }
});