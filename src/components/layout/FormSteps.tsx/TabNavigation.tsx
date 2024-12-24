import { useFormContext } from "@/components/context/FormContext";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface Props {
  activeStep: string;
  handleProgress: (step: string) => void;
  children: React.ReactNode;
}

export default function TabsNavigation({ activeStep, handleProgress, children }: Props) {
  const { validateStep } = useFormContext();
  type Step = "step1" | "step2" | "step3" | "step4";

  const stepOrder: Step[] = ["step1", "step2", "step3", "step4"];
  const [validatedSteps, setValidatedSteps] = useState<Record<Step, boolean>>({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
  });

  const handleTabChange = (value: string) => {
    const targetStepIndex = stepOrder.indexOf(value as Step);
    const currentStepIndex = stepOrder.indexOf(activeStep as Step);

    // Allow moving back or to already validated steps
    if (targetStepIndex <= currentStepIndex || validatedSteps[value as Step]) {
      handleProgress(value as Step);
      return;
    }

    // Validate and move forward if valid
    if (validateStep(activeStep as Step)) {
      setValidatedSteps((prev) => ({
        ...prev,
        [activeStep]: true,
      }));
      handleProgress(value as Step);
    }
  };

  return (
    <Tabs
      value={activeStep}
      className="w-full"
      onValueChange={handleTabChange}
    >
      <TabsList className="flex justify-around rounded-lg sm:mx-2">
        <TabsTrigger value="step1" className="text-sm font-medium hover:text-blue-600">
          Step 1: Personal Info
        </TabsTrigger>
        <TabsTrigger value="step2" className="text-sm font-medium hover:text-blue-600">
          Step 2: Address
        </TabsTrigger>
        <TabsTrigger value="step3" className="text-sm font-medium hover:text-blue-600">
          Step 3: Preferences
        </TabsTrigger>
        <TabsTrigger value="step4" className="text-sm font-medium hover:text-blue-600">
          Step 4: Review & Submit
        </TabsTrigger>
      </TabsList>

      {/* ProgressBar or any additional children */}
      {children}
    </Tabs>
  );
}

