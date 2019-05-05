import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { getDecksFromDB } from "../Utils/api";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { receiveDecks } from "../actions";
import { white, gray } from "../Utils/colors";

class AllDecks extends React.Component {
  componentDidMount = () => {
    const { dispatch } = this.props;
    getDecksFromDB().then(value => {
      dispatch(receiveDecks(JSON.parse(value)));
    });
  };

  render() {
    const { decks } = this.props;
    return (
      <ScrollView>
        {decks &&
          Object.keys(decks).map(key => {
            return (
              <TouchableOpacity
                key={key}
                onPress={() =>
                  this.props.navigation.navigate("DeckDetails", {
                    deckKey: key
                  })
                }
              >
                <View style={styles.deckItem} key={key}>
                  <Text style={[styles.paragraph, { fontWeight: "bold" }]}>
                    {decks[key].title}
                  </Text>
                  <Text style={[styles.paragraph, { color: gray }]}>
                    {decks[key].questions && decks[key].questions.length}
                    {!decks[key].questions && 0} Cards
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  deckItem: {
    fontFamily: "Cochin",
    fontSize: 20,
    backgroundColor: white,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
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
  }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(AllDecks);
