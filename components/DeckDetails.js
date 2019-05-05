import React from 'react'
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';
import TextButton from './TextButton';
import { connect } from 'react-redux';
import {white,purple,gray} from '../Utils/colors';
import { HeaderBackButton } from 'react-navigation';

class DeckDetails extends React.Component{
  static navigationOptions = ({ navigation }) => {
    const { deckKey } = navigation.state.params
    return {
      title:  deckKey,
      headerLeft:(<HeaderBackButton title="Home" onPress={()=>{navigation.navigate('Home')}}/>)
    }
  }

  render() {
    const {deck,goAddCard,goQuiz,navigation} = this.props;
    return (
      <View style={styles.mainEle}>
      <View  >
        <Text style={[styles.paragraph, {fontWeight:'bold'}]}>
        {deck.title}
        </Text>
        <Text style={[styles.paragraph,{color:gray}]}>
          {deck.questions && deck.questions.length}
          {!deck.questions  && 0 }
                   {" "} Cards
        </Text>
    <TouchableOpacity style={styles.buttonEle} onPress={goAddCard}>
          <Text style={styles.submitBtnText}>
            Add card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.buttonEle}  onPress={goQuiz}>
          <Text style={styles.submitBtnText}>
            Start Quiz
            </Text>
          </TouchableOpacity>
      </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  mainEle: {
    flex:1,
    fontFamily: 'Cochin',
    fontSize: 20,
    backgroundColor:white,
    borderRadius :10,
    alignContent: 'center',
  justifyContent: 'flex-start',
    padding:20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10, 
    marginBottom: 10,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  }, 
  paragraph: {
    fontSize: 20,
    textAlign: 'center',

  },
  buttonEle : {
    backgroundColor: purple,
    padding: 10,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop:20,
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },

});

function mapStateToProps(state, { navigation }){
 const { deckKey } = navigation.state.params
  console.log("deckKey=",deckKey);
  console.log("decks[deckKey] ==",state[deckKey].title);
  return ({
    deck:state[deckKey],
    navigation
    })
}

function mapDispatchToProps (dispatch, { navigation }) {
  const { deckKey } = navigation.state.params

  return {
    goAddCard: () => navigation.navigate(
              'AddCard',
              { deckKey :deckKey }
            ),
    goQuiz :() => navigation.navigate(
              'Quiz',
              { deckKey:deckKey }
            ),
  }
}
export default connect(mapStateToProps,
  mapDispatchToProps,)(DeckDetails);

