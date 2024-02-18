import React, { useState } from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SignUp1 from "../Components/Signup1/Signup1";
import SignUp2 from "../Components/Signup2/Signup2";
import SignUp3 from "../Components/Signup3/Signup3";

const SignUp = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const stepOneDone = (data) => {
    setEmail(data);
    setActiveStep(1);
  };

  const stepTwoDone = () => {
    setActiveStep(2);
  };

  const stepThreeDone = () => {
    navigate("/dashboard");
  };

  console.log("Email : ", email);

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
          <SignUp1 stepOneDone={(data) => stepOneDone(data)} />
        ) : activeStep === 1 ? (
          <SignUp2 email={email} stepTwoDone={() => stepTwoDone()} />
        ) : (
          <SignUp3 email={email} stepThreeDone={() => stepThreeDone()} />
        )}
      </div>
    </div>
  );
};

export default SignUp;
