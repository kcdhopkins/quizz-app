import { decode } from 'html-entities'
import axios from 'axios'
import arrayShuffle from 'array-shuffle'

export const getQuestions = async (setQuestions, setLoading) =>{
    try{
        setLoading(true)
        const result = await axios.get("http://localhost:4000/api/questions")
        const {results} = result.data
        const formattedQuestions = results.map( obj => ({...obj, question:decode(obj.question)}))
        const formattedAnswers = formattedQuestions.map( obj => {
            if(obj.type === 'text'){
                return {...obj, question: decode(obj.question), correct_answer:decode(obj.correct_answer)}
            }
            const iquestions = obj.incorrect_answers.map( a => decode(a) )
            return {...obj, incorrect_answers: iquestions, correct_answer: decode(obj.correct_answer)}
        })
        setQuestions(arrayShuffle(formattedAnswers))
        setLoading(false)
    } catch (err){
        console.log({customMessage:"An error occured in the questionsServices at getQuestions", err})
    }
}