import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SignUp1 from "../Components/Signup1/Signup1";
import SignUp2 from "../Components/Signup2/Signup2";
import SignUp3 from "../Components/Signup3/Signup3";

const SignUp = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Sign Up Page</h1>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step key={0}>
          <StepLabel>Step 1</StepLabel>
        </Step>
        <Step key={1}>
          <StepLabel>Step 2</StepLabel>
        </Step>
        <Step key={2}>
          <StepLabel>Step 3</StepLabel>
        </Step>
      </Stepper>
      <div>
        {activeStep === 0 ? (
          <SignUp1 />
        ) : activeStep === 1 ? (
          <SignUp2 />
        ) : (
          <SignUp3 />
        )}
      </div>
      <div>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {activeStep === 2 ? (
          <Button onClick={handleFinish}>Finish</Button>
        ) : (
          <Button onClick={handleNext}>Next</Button>
        )}
      </div>
    </div>
  );
};

export default SignUp;
