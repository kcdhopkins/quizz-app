import { Grid, Typography, Button } from "@material-ui/core"
import { useState, useEffect } from "react"

const TestOver = ({answeredQuestions, restart, testOver, setAnsweredQuestions})=>{
    const [correct, setCorrect] = useState(0)
    const [incorrect, setIncorrect] = useState(0)
    const [calculate, setCalculate] = useState(true)

    useEffect(()=>{
        if(answeredQuestions.length && calculate){ 
            const corr = answeredQuestions.filter( qobj => qobj.correct_answer.toLowerCase().trim() === qobj.chosenAnswer.toLowerCase().trim())
            const inco = answeredQuestions.filter( qobj => qobj.correct_answer.toLowerCase().trim() !== qobj.chosenAnswer.toLowerCase().trim())
            setCorrect(corr.length)
            setIncorrect(inco.length)
            setCalculate(false)
        }
        // eslint-disable-next-line
    }, [])

    const handleClick = ()=>{
        restart(true)
        testOver(false)
        setAnsweredQuestions([])
    }

    return <Grid container justify="center">
        <Grid item >
            <Typography variant="h2">
                SUMMARY
            </Typography>
            <Typography variant="h5">
                Corret: {correct}
            </Typography>
            <Typography variant="h5">
                Wrong: {incorrect}
            </Typography>
            <Typography variant="h5">
                Questions answered: {answeredQuestions.length}
            </Typography>
            {<Typography variant="h5">
                Final Score: {`${answeredQuestions.length ? Number.parseFloat(correct / answeredQuestions.length).toFixed(2) * 100 : 0}%`}
            </Typography>}
            <Button variant="contained" color="primary" onClick={handleClick}>Restart Quiz</Button>
        </Grid>
    </Grid>
}

export default TestOver