import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Question from './Question';
import QuizButtons from './QuizButtons';
import { connect } from 'react-redux';
import { setLocalNotification ,clearLocalNotification} from '../Utils/helper';
import {white,gray,purple,red,green} from '../Utils/colors'

class Quiz extends React.Component{
  state = {
    currentQue :1,
    correct :0,
    wrong:0,
    isQue:true
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz'
    }
  }

  handleQueAnsView = (val) => {
    this.setState((state)=>({isQue :val}));
  }

  handleCorrectAnswer = (e) => {
    this.setState((prevState) => {
        return {correct: prevState.correct + 1,
                currentQue : prevState.currentQue +1,
                isQue:true
                };
    }); 
  }

  handleWrongAnswer = (e) => {
  this.setState((prevState) => {
      return {wrong: prevState.wrong + 1,
              currentQue : prevState.currentQue +1,
              isQue:true
              };
  }); 
  }

  render(){
    const {deck,questions,goDeckDetails,goHome} = this.props;
    const {currentQue,correct,wrong} = this.state;
    let displayQue;
    let buttons;
    if (questions && questions.length > 0) { 
      if((correct+wrong) === questions.length){
        displayQue = <View style={styles.boxEle}><Text style={styles.paragraph}> Your have answered {correct} questions correctly </Text></View>;
        buttons = <QuizButtons button1='Restart Quiz' button2='Back to Deck' bgcolor1={purple} bgcolor2={purple} onPress1={goDeckDetails} onPress2={goHome}/>  
      }else {
        displayQue = (
          <View>
          <Text style={styles.paragraph}>
            {currentQue} / {questions.length}
          </Text> 
          <Question isQue={this.state.isQue} handleQueAnsView={this.handleQueAnsView} quizQuestion={questions[currentQue-1]} />
          </View>);
          buttons = <QuizButtons button1='Correct' name1='correct' bgcolor1={green} bgcolor2={red} name2='wrong' button2='Wrong' onPress1={this.handleCorrectAnswer} onPress2={this.handleWrongAnswer}/> 
      }
    } else {
      displayQue = <View style={styles.boxEle}><Text style={styles.paragraph}>Sorry you cannot take quiz as there are no cards in this deck</Text></View>;
    }
    return (
      <View style={styles.mainEle}>
        {displayQue}
        {buttons}
      </View>
    )
  }
}
const mapDispatchToProps = (dispatch,{navigation}) => {
    const {deckKey} = navigation.state.params;
  return ({
    goDeckDetails : () => {
              clearLocalNotification()
            .then(setLocalNotification);
              return navigation.navigate(
              'DeckDetails',
              { deckKey :deckKey }
            )},
    goHome : () => {
             clearLocalNotification()
            .then(setLocalNotification);
      return navigation.navigate(
              'Home',
            )}
  })

}

const styles = StyleSheet.create({
  mainEle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  boxEle : {
  textAlign: 'center',
  fontFamily: 'Cochin',
  fontSize: 20,
  backgroundColor:white,
  borderRadius :10,
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
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state,{navigation}) => {
  const {deckKey} = navigation.state.params;
  return ({
    deck:state[deckKey],
    questions:state[deckKey].questions,
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(Quiz);