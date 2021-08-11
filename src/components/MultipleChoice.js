import { Button, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@material-ui/core'
import arrayShuffle from 'array-shuffle'
import { Field, Form, Formik } from 'formik'
import React, { useState, useCallback, useEffect } from 'react'

const MultipleChoice = ({currentQuestion, handleQuestions}) => {
    const [value, setValue] = useState('')
    const [shuffle, setShuffle] = useState(true)
    const [answers, setAnswers] = useState([])
    const [submitting, setSubmitting] = useState(false)
    const { question, incorrect_answers, correct_answer } = currentQuestion
    
    useEffect(() => {
        if(shuffle){
            setAnswers(arrayShuffle([...incorrect_answers, correct_answer]))
            setShuffle(false)
        }
    // eslint-disable-next-line
    }, [answers])
   

    const handleMutipleQuestions = useCallback((submitting) => {
        const radioButtions = answers.map((ques, index)=>{
            return <FormControlLabel key={`answer-${index}`}  value={ques} control={<Radio name="answer" disabled={submitting}/>} label={ques}/>
        })
        return radioButtions
    }, [answers])

    const handleChange = e => {
        setValue(e.target.value)
    }

    const submit = ()=>{
        setSubmitting(true)
        handleQuestions(value)
        setShuffle(true)
        setAnswers([])
        setSubmitting(false)
    }

    return (
        <Formik
            initialValues={{answer:''}}
            onSubmit={submit}
        >
            {
                ()=>(
                    <Form>
                        <Grid container spacing={3}>
                            <Grid item>
                                <Typography variant="h4">
                                    {question}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Field component={RadioGroup} name="answer" onChange={handleChange}>
                                    {handleMutipleQuestions(submitting)}
                                </Field>
                            </Grid>
                            <Grid item>
                                <Button type="submit" variant="contained" color="primary">Submit</Button>
                            </Grid>
                        </Grid>
                    </Form>
                )
            }
        </Formik>
    )
}

export default MultipleChoice