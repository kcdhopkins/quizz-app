import { Box, Button, CircularProgress, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MultipleChoice from './components/MultipleChoice';
import Text from './components/Text';
import TestOver from './components/TestOver'
import { getQuestions } from './services/questionService'

const useStyles = makeStyles( theme =>{
  return {
    boxContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '600px',
      height: '400px'
    }
  }
})

export const App = () => {
    const [questions, setQuestions] = useState([])
    const [question, setQuestion] = useState({})
    const [loading, setLoading] = useState(true)
    const [answeredQuestions, setAnsweredQuestions] = useState([])
    const [unansweredQuestions, setUnansweredQuestions] = useState([]) 
    const [testOver, setTestOver] = useState(false)
    const [restart, setRestart] = useState(false)
    
    const classes = useStyles();

    useEffect(()=>{
      if(restart){
        setRestart(false)
      }
    })

    useEffect(()=>{
       getQuestions(setQuestions, setLoading);
    }, [restart])

    useEffect(()=>{
      if(questions.length){
        setQuestion(questions[0])
      } 
     }, [questions])

     const handleQuestions=(value)=>{
       if(value){
        const newQuestionObj = {...question, chosenAnswer: value}
        setAnsweredQuestions([...answeredQuestions, newQuestionObj])
       } else {
        setUnansweredQuestions([...unansweredQuestions, question])
       }

      const [first, ...rest] = questions
     
      if(rest.length){
        setQuestions(rest)
      }else {
        setQuestion({})
        setTestOver(true)
      }
     }
    
    return (
      
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" >
          {loading && <CircularProgress /> }
          {!loading && <Box component="div" className = {classes.boxContainer}>
              {question?.type === 'text' && <Text currentQuestion={question} handleQuestions={handleQuestions}/>}
              {(question?.type === 'multiple' || question?.type === 'boolean') && <MultipleChoice currentQuestion={question} handleQuestions={handleQuestions}/>}
              {testOver && <TestOver answeredQuestions={answeredQuestions} restart={setRestart} testOver={setTestOver} setAnsweredQuestions={setAnsweredQuestions}/>}
            </Box>}
        </Box>
      )
}

export default App;
