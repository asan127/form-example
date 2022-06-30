/*
Examples:
https://dev.to/deboragaleano/how-to-handle-multiple-inputs-in-react-55el

*/

import React, { useState } from 'react';
import { Button, FormGroup, Slider, TextField } from '@mui/material';

const availableQuestionCount = 33;
// let completedQuestionCount = 0;
const sliderMin = 0;
const sliderMax = 5;

const CustomSlider = ({id, onChangeCommitted, value, defaultValue}) => (
  <p> {questions[id].label}
    <Slider 
    id={id}
    min={sliderMin}
    max={sliderMax}
    marks={true}
    valueLabelDisplay={"auto"}
    onChangeCommitted={onChangeCommitted}
    value={value}
    defaultValue={defaultValue}
  />
  </p>
   
  
    
);


function ProgressIndicator({completedQuestionCount, updateProgress}) {
  // const [completedQuestionCount] = useState(0);
  return <p>{completedQuestionCount} out of {availableQuestionCount}</p>;
};

// function onSliderChange(event, newValue) {
//   // event.preventDefault();
//   // if(newValue === 0) {
//   //   updateProgress(currentCompletedQuestionCount - 1);
//   // } else {
//   //   updateProgress(currentCompletedQuestionCount + 1);
//   // }
//   console.log()
// }

// const initialValues = {
//   q1: "",
//   q2: "",
//   q3: "",
//   q4: "",
//   q5: "",
// };

/*
NOTE: Value cannot be set on first render or else this error shows up:

MUI: A component is changing the controlled value state of Slider to be uncontrolled.
Elements should not switch from uncontrolled to controlled (or vice versa).
Decide between using a controlled or uncontrolled Slider element for the lifetime of the component.
The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.
*/
const questions = {
  q1: { initialValue: undefined, label: "Question 1" },
  q2: { initialValue: undefined, label: "Question 2" },
  q3: { initialValue: undefined, label: "Question 3" },
  q4: { initialValue: undefined, label: "Question 4" },
  q5: { initialValue: undefined, label: "Question 5" },
}

function getInitialValues() {
  let initialValues = {};
  for(let questionKey in questions) {
    initialValues[questionKey] = questions[questionKey].initialValue;
  }
  return initialValues;
}

export default function App() {
  const [currentCompletedQuestionCount, updateProgress] = useState(0);

  const [values, setValues] = useState(getInitialValues);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setValues({
      ...values,
      [id]: value,
    });
    console.log(values)
  };

  return (
    <form style={{width:600, marginLeft:'20%'}}>
      <ProgressIndicator
        completedQuestionCount={currentCompletedQuestionCount}
        updateProgress={updateProgress}
      />
      <FormGroup >
        <CustomSlider id='q1' defaultValue={5} value={values.q1} onChangeCommitted={handleInputChange} />
        <CustomSlider id='q2' value={values.q2} onChangeCommitted={handleInputChange} />
        <CustomSlider id='q3' value={values.q3} onChangeCommitted={handleInputChange} />
        <CustomSlider id='q4' value={values.q4} onChangeCommitted={handleInputChange} />
      </FormGroup>
      <Button type="submit"> Submit </Button>
      
    </form>
  );
}