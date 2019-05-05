import { AsyncStorage } from "react-native";

export const DECKS_STORAGE_KEY = "FlashCards:decksstorage";

export async function setDummyData() {
  let dummyData = {};
  getDecksFromDB().then(val => {
    if (val && val !== null) {
      await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.parse(val));
    } else {
      await AsyncStorage.setItem(DECKS_STORAGE_KEY, dummyData);
    }
  });
}

export async function getDecksFromDB() {
  return await AsyncStorage.getItem(DECKS_STORAGE_KEY).then(val => val);
}

export async function addDeckToDB(deck) {
  return await  AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [deck.title]: deck
    })
  )
    .then(() => {
      console.log("It was saved successfully");
    })
    .catch(() => {
      console.log("There was an error saving the product");
    });
}

export async function addCardToDB(deck, deckKey) {
  return await AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [deckKey]: deck
    })
  );
}
