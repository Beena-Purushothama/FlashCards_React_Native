import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { white, purple, red, green } from "../Utils/colors";
import TextButton from "./TextButton";

export default function QuizButtons({
  button1,
  button2,
  onPress1,
  onPress2,
  bgcolor1,
  bgcolor2
}) {
  return (
    <View style={{ justifyContent: "center", flexDirection: "row" }}>
      <TextButton
        style={[styles.buttonEle, { backgroundColor: bgcolor1 }]}
        onPress={onPress1}
        name="correct"
      >
        <Text style={styles.submitBtnText}>{button1}</Text>
      </TextButton>
      <TextButton
        style={[styles.buttonEle, { backgroundColor: bgcolor2 }]}
        onPress={onPress2}
        name="wrong"
      >
        <Text style={styles.submitBtnText}>{button2}</Text>
      </TextButton>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonEle: {
    padding: 10,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center"
  }
});
