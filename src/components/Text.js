import { Button, Grid, Input, Typography } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import React, {useState} from 'react'

const Text = ({currentQuestion, handleQuestions}) => {
    const [submitting, setSubmitting] = useState(false)
    const { question } = currentQuestion

    const handleSubmit = (values)=>{
        setSubmitting(true)
        handleQuestions(values.answer)
        setSubmitting(false)
    }

    const MyInput = ({ field, form, ...props }) => {
        return <Input {...field} {...props} />;
    };

    return (
            <Formik 
                initialValues={{answer:''}}
                onSubmit={handleSubmit} 
            >
                {
                    ()=>(
                        <Form>
                            <Grid container spacing={4}>
                                <Grid item xs={12} mb="2">
                                    <Typography variant="h4">
                                        {question}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field name="answer" component={MyInput} />
                                </Grid>
                                <Grid item>
                                    <Button disabled={submitting} type ="submit" variant="contained" color="primary">Submit</Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )
                }
            </Formik>
    )
}

export default Text
