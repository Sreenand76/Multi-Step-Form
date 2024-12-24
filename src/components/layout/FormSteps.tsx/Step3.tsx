import { useFormContext } from "@/components/context/FormContext";

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
}
export default function Step3() {
  const { formData, updateFormData } = useFormContext();

  const handleCheckboxChange = (field: keyof FormState["step3"]["preferences"]) => {
    updateFormData("step3", {
      preferences: {
        ...formData.step3.preferences,
        [field]: !formData.step3.preferences[field],
      },
    });
  };

  return (
    <div className="sm:p-4 my-12">
      <h2 className="text-xl font-semibold mb-4">Preferences</h2>
      <form>
        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.step3.preferences.updates || false} // Ensure a boolean value
              onChange={() => handleCheckboxChange("updates")}
              className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-1 focus:ring-blue-400"
            />
            <span>Receive Updates</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.step3.preferences.notifications || false}
              onChange={() => handleCheckboxChange("notifications")}
              className="h-4 w-4 text-blue-500 dark:text-blue-700 border-gray-300 rounded focus:ring-1 focus:ring-blue-400"
            />
            <span>Enable Notifications</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.step3.preferences.emails || false}
              onChange={() => handleCheckboxChange("emails")}
              className="h-4 w-4 text-blue-500 dark:text-blue-700 border-gray-300 rounded focus:ring-1 focus:ring-blue-400"
            />
            <span>Subscribe to Emails</span>
          </label>
        </div>
      </form>
    </div>
  );
}
