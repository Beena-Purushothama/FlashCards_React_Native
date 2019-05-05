import * as React from "react";
import { Text, View, StyleSheet, Platform, StatusBar } from "react-native";
import { Constants } from "expo";
import { TabNavigator, StackNavigator } from "react-navigation";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";

// You can import from local files
import AllDecks from "./components/AllDecks";
import AddDeck from "./components/AddDeck";
import { purple, white } from "./Utils/colors";
import { setDummyData } from "./Utils/api";
import DeckDetails from "./components/DeckDetails";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import { setLocalNotification } from "./Utils/helper";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const Tabs = TabNavigator(
  {
    AllDecks: {
      screen: AllDecks,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
        )
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: "Add Deck",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? white : purple,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  }
});

const DecksStatusBar = ({ backgroundColor }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar
        translucent
        backgroundColor={backgroundColor}
        barStyle="light-content"
      />
    </View>
  );
};

export default class App extends React.Component {
  componentDidMount = () => {
    setDummyData();
    setLocalNotification();
  };

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <DecksStatusBar backgroundColor={purple} />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});
