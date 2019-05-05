import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import TextButton from './TextButton';
import {white,purple,gray} from '../Utils/colors';

class Question extends React.Component{
  render(){
    const {quizQuestion,handleQueAnsView,isQue} = this.props;
    return (
        <View  style={styles.mainEle}>
         {isQue && 
         <View style={{justifyContent:'center',alignItems:'center'}}>
          <Text style={styles.paragraph}>
            {quizQuestion.question}
          </Text>
          <TouchableOpacity  style={styles.buttonEle} onPress={(e) =>handleQueAnsView(false)}>
          <Text style={styles.submitBtnText}>Answer</Text>
          </TouchableOpacity>
        </View>
        }

        {!isQue && 
         <View style={{justifyContent:'center',alignItems:'center'}}>
          <Text style={styles.paragraph}>
            {quizQuestion.answer}
          </Text>
          <TouchableOpacity style={styles.buttonEle}  onPress={(e) =>handleQueAnsView(true)}>
            <Text style={styles.submitBtnText}>Question</Text>
          </TouchableOpacity>
        </View>
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainEle: {
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
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonEle : {
    backgroundColor: purple,
    height: 45,
    width:100,
    marginLeft: 5,
    marginRight: 5,
    marginTop:20,
  },
  submitBtnText: {
    color: white,
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
  },
});
export default Question;
