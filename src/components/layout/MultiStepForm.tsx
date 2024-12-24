"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Step1 from "./FormSteps.tsx/Step1";
import Step2 from "./FormSteps.tsx/Step2";
import Step3 from "./FormSteps.tsx/Step3";
import Step4 from "./FormSteps.tsx/Step4";
import TabsNavigation from "./FormSteps.tsx/TabNavigation";
import ProgressBar from "./FormSteps.tsx/ProgressBar";
import { useFormContext } from "../context/FormContext";

export default function MultiStepForm() {
  const [progress, setProgress] = useState(25); // Initial progress for Step 1
  type Step = "step1" | "step2" | "step3" | "step4";
  const [activeStep, setActiveStep] = useState<Step>("step1");
  const { validateStep, handleSubmit } = useFormContext();

  const handleProgress = (step: Step) => {
    const stepProgress = {
      step1: 25,
      step2: 50,
      step3: 75,
      step4: 100,
    };

    setProgress(stepProgress[step]);
    setActiveStep(step); // Update active step
  };

  // Different steps components
  const stepComponents = {

    step1: <Step1 />,
    step2: <Step2 />,
    step3: <Step3 />,
    step4: <Step4 />,
  };

  const handleProgressUpdate = (step: Step) => {
    const steps = ["step1", "step2", "step3", "step4"];
    const currentStepIndex = steps.indexOf(step);
    const progressValue = ((currentStepIndex + 1) / steps.length) * 100;
    setProgress(progressValue);
  };
  
  const handleNext = () => {
    const isStepValid = validateStep(activeStep);
    if (isStepValid) {
      if (activeStep === "step1") setActiveStep("step2");
      else if (activeStep === "step2") setActiveStep("step3");
      else if (activeStep === "step3") setActiveStep("step4");
  
      // Update progress dynamically
      handleProgressUpdate(activeStep === "step1" ? "step2" : activeStep === "step2" ? "step3" : "step4");
    }
  };
  
  const handlePrevious = () => {
    if (activeStep === "step4") setActiveStep("step3");
    else if (activeStep === "step3") setActiveStep("step2");
    else if (activeStep === "step2") setActiveStep("step1");
  
    // Update progress dynamically
    handleProgressUpdate(activeStep === "step4" ? "step3" : activeStep === "step3" ? "step2" : "step1");
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="max-w-[750px] mx-3 md:mx-auto p-6 bg-white shadow-lg rounded-lg mt-7 md:mt-10 card">
        <h1 className="text-3xl font-extrabold mb-6 text-center">Multi-Step Form</h1>

        <TabsNavigation activeStep={activeStep} handleProgress={(value) => handleProgress(value as Step)}>
          <ProgressBar progress={progress} />
        </TabsNavigation>

        <div className="mt-6">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            {stepComponents[activeStep]}

            {/* Navigation buttons at the bottom */}
            <div className="mt-6 flex justify-between sm:mx-4">
              {/* Previous button */}
              <button
                onClick={handlePrevious}
                className={`px-4 py-1 text-white rounded-md ${activeStep === "step1" ? "bg-gray-200 dark:bg-[#191919] dark:text-gray-700" : "previous-btn"
                  }`}
              >
                Previous
              </button>

              {/* Next/Submit button */}
              {activeStep === "step4" ? (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-1 submit-btn"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-1 next-btn"
                >
                  Next
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}


