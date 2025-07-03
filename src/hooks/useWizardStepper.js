import { useState } from "react";

const useWizardStepper = (initialStep = 0, steps = []) => {
  const [activeStep, setStep] = useState(initialStep);

  const nextStep = () =>
    setStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 0));
  const isLast = activeStep === steps.length - 1;

  return { activeStep, nextStep, prevStep, isLast, setStep };
};

export default useWizardStepper;
