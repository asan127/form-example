/*
Examples:
https://dev.to/deboragaleano/how-to-handle-multiple-inputs-in-react-55el
https://reactjs.org/docs/lifting-state-up.html
https://reactjs.org/docs/handling-events.html
https://www.geeksforgeeks.org/how-to-handle-multiple-input-field-in-react-form-with-a-single-function/
https://medium.com/@jlangkammer/how-to-properly-log-state-change-in-react-588931f708f3
*/

import React, { useEffect, useState } from 'react';
import { Button, FormGroup, Slider } from '@mui/material';

const sliderMin = 0;
const sliderMax = 5;

const CustomSlider = ({id, onChange}) => {
  const { value } = useState();
  return (<div>
    <h1> {questions[id].label} </h1>
    <p> {questions[id].text} </p>
    <Slider 
      id={id}
      name={id}
      min={sliderMin}
      max={sliderMax}
      marks={true}
      valueLabelDisplay={"auto"}
      value={value}
      onChange={onChange}
    />
  </div>)
};


function ProgressIndicator({completedQuestionCount, availableQuestionCount}) {
  return <p>{completedQuestionCount} out of {availableQuestionCount}</p>;
};


const questions = {
  q1: { 
    initialValue: 0, 
    label: "Question 1",
    text: "Is this question 1?"
  },
  q2: { 
    initialValue: 0, 
    label: "Question 2",
    text: "Is this question 2?"
  },
  q3: { 
    initialValue: 0, 
    label: "Question 3",
    text: "Is this question 3?"
  },
  q4: { 
    initialValue: 0, 
    label: "Question 4",
    text: "Is this question 4?"
  },
  q5: { 
    initialValue: 0, 
    label: "Question 5",
    text: "Is this question 5?"
  },
}


// function getInitialValues() {
//   let initialValues = {};
//   for(let questionKey in questions) {
//     initialValues[questionKey] = questions[questionKey].initialValue;
//   }
//   return initialValues;
// }

export default function App() {
  const [answeredQuestions, setValues] = useState({}); // could use getInitialValue instead of {}

  // NOTE!!: the MaterialUI slider does not pass the ID value to the event 
  // for some stupid fucking reason, it didn't seem to be listed in the api docs
  // https://stackoverflow.com/questions/53611848/how-do-i-identify-a-material-ui-slider-in-react

  const handleInputChange = event => {
    const { name, value } = event.target;
    setValues({...answeredQuestions, [name]: value});
  };

  

  // log output
  // useEffect(() => {
  //   console.log(values);
  // }, [values]);

  let completedQuestionCount = Object.keys(answeredQuestions).length || 0;
  const availableQuestionCount = Object.keys(questions).length || 0;

  return (
    <form style={{width:600, marginLeft:'20%'}}>
      <ProgressIndicator
        completedQuestionCount={completedQuestionCount}
        availableQuestionCount={availableQuestionCount}
      />
      <FormGroup >
        <CustomSlider 
          id='q1'
          value={answeredQuestions?.q1 || 0}
          onChange={handleInputChange}
        />
        <CustomSlider
          id='q2'
          value={answeredQuestions?.q2 || 0}
          onChange={handleInputChange}
        />
        <CustomSlider
          id='q3'
          value={answeredQuestions?.q3 || 0}
          onChange={handleInputChange}
        />
        <CustomSlider
          id='q4'
          value={answeredQuestions?.q4 || 0}
          onChange={handleInputChange}
        />
      </FormGroup>
      <Button onClick={()=>(console.log(answeredQuestions))}> Debug </Button>

      <Button type="primary" onClick={()=>(console.log(answeredQuestions))}> Submit </Button>
      
    </form>
  );
}