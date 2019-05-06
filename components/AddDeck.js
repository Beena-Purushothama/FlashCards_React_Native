import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import TextButton from "./TextButton";
import { connect } from "react-redux";
import { addDeckToDB } from "../Utils/api";
import { addDeck } from "../actions";
import { white, purple } from "../Utils/colors";

class AddDeck extends React.Component {
  state = {
    deckTitle: ""
  };

  handleAddDeck = () => {
    const title = this.state.deckTitle;
    let deck = { title: title };
    const { dispatch } = this.props;
    if (!title) {
      return alert("Add the Deck Name");
    }
    addDeckToDB(deck)
      .then(() => {
        dispatch(addDeck(deck));
      })
      .then(() => {
        this.props.navigation.navigate("DeckDetails", { deckKey: deckKey });
      });
  };

  onChangeText = deckTitle => {
    this.setState({ deckTitle });
  };
  render() {
    return (
      <View style={styles.mainEle}>
        <Text style={[styles.paragraph, { fontWeight: "bold" }]}>
          What is the title of your new deck
        </Text>
        <TextInput
          maxLength={40}
          mode="flat"
          style={styles.textInputField}
          onChangeText={deckTitle => this.onChangeText(deckTitle)}
          value={this.state.deckTitle}
          placeholder="Deck Title"
        />
        <TextButton
          style={styles.buttonEle}
          onPress={this.handleAddDeck}
          disabled={this.state.deckTitle === ""}
        >
          <Text style={styles.submitBtnText}>Submit</Text>
        </TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainEle: {
    flex: 1,
    fontFamily: "Cochin",
    fontSize: 20,
    backgroundColor: white,
    borderRadius: 10,
    alignContent: "center",
    justifyContent: "flex-start",
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  paragraph: {
    fontSize: 20,
    textAlign: "center"
  },
  textInputField: {
    borderRadius: 3,
    borderStyle: "solid",
    borderWidth: 1,
    fontSize: 20,
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 20
  },
  buttonEle: {
    backgroundColor: purple,
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

export default connect()(AddDeck);
