import {AsyncStorage} from "react-native";

export const DECKS_STORAGE_KEY="FlashCards:decksstorage";

export function setDummyData(){
  let dummyData= {};
  getDecksFromDB().then((val) => {
    if(val && val !== null){
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.parse(val));
    }else{
AsyncStorage.setItem(DECKS_STORAGE_KEY, dummyData);
    }
    });
  
}

export function  getDecksFromDB() {
   return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((val) => (val));
}

export function addDeckToDB(deck) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY,JSON.stringify({
      [deck.title]: deck
    })).then( ()=>{
  console.log('It was saved successfully')
  } )
  .catch( ()=>{
  console.log('There was an error saving the product')
  });
}

export function addCardToDB(deck,deckKey) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deckKey]: deck
  }))
}