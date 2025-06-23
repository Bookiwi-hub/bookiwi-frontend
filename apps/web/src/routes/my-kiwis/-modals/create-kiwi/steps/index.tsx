import { useAtomValue } from "@bookiwi/jotai";

import { stepAtom } from "../atom";
import { Step } from "../types";

import StepFour from "./four";
import StepOne from "./one";
import StepThree from "./three";
import StepTwo from "./two";

function Steps() {
  const step = useAtomValue(stepAtom);
  return (
    <>
      {step === Step.One && <StepOne />}
      {step === Step.Two && <StepTwo />}
      {step === Step.Three && <StepThree />}
      {step === Step.Four && <StepFour />}
    </>
  );
}

export default Steps;
