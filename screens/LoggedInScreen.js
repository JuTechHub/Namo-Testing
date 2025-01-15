// LoggedInScreen.js
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function LoggedInScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>You are logged in!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  message: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});
