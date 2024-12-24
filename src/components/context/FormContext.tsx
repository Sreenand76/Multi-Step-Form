import { toast } from "@/hooks/use-toast";
import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";

interface FormState {
  step1: {
    name: string;
    email: string;
  };
  step2: {
    streetAddress: string;
    city: string;
  };
  step3: {
    preferences: {
      updates: boolean;
      notifications: boolean;
      emails: boolean;
    };
  };
  step4: {
    confirmed: boolean;
  };
}

interface FormContextType {
  formData: FormState;
  updateFormData: (step: keyof FormState, data: Partial<FormState[keyof FormState]>) => void;
  handleSubmit: () => void;
  validateStep: (step: keyof FormState) => boolean;
}
// Default values for the form state
const defaultFormState: FormState = {
  step1: {
    name: "",
    email: "",
  },
  step2: {
    streetAddress: "",
    city: "",
  },
  step3: {
    preferences: {
      updates: false,
      notifications: false,
      emails: false,
    },
  },
  step4: {
    confirmed: false,
  },
};

// Create the context with the correct type
const FormContext = createContext<FormContextType | undefined>(undefined);

// Custom hook to use the context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

// Provider component
export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormState>(defaultFormState);


  // Update specific step data
  const updateFormData = (
    step: keyof FormState,
    data: Partial<FormState[keyof FormState]>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        ...data,
      },
    }));
  };

  // Common function to show validation error toasts
  const showValidationError = (description: string) => {
    toast({
      title: "Validation Error",
      description,
      variant: "destructive",
    });
  };

  // Step validator
  const validateStep = (step: keyof FormState) => {
    let isValid = false;
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    switch (step) {
      case "step1":
        if (formData.step1.name.trim() === "") {
          showValidationError("Name cannot be empty.");
        } else if (!gmailRegex.test(formData.step1.email)) {
          showValidationError("Email must be valid.");
        } else {
          isValid = true;
        }
        break;

      case "step2":
        if (formData.step2.streetAddress.trim() === "") {
          showValidationError("Street Address cannot be empty.");
        } else if (formData.step2.city.trim() === "") {
          showValidationError("City cannot be empty.");
        } else {
          isValid = true;
        }
        break;

      case "step3":
        if (
          !formData.step3.preferences.updates &&
          !formData.step3.preferences.notifications &&
          !formData.step3.preferences.emails
        ) {
          showValidationError("You must select at least one preference.");
        } else {
          isValid = true;
        }
        break;

      case "step4":
        if (!formData.step4.confirmed) {
          showValidationError("You must confirm to proceed.");
        } else {
          isValid = true;
        }
        break;

      default:
        showValidationError("Something went wrong with your request.");
    }
    return isValid;
  };

  // to fetch data
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetch("http://localhost:5000/formState");
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchFormData();
  }, []);



  const handleSubmit = () => {
    toast({
      title: "Submission successfull",
      description: "Form successfully submitted",
    });
  };


  return (
    <FormContext.Provider value={{ formData, updateFormData, handleSubmit, validateStep }}>
      {children}
    </FormContext.Provider>
  );
};
