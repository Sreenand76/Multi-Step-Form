import { useFormContext } from "@/components/context/FormContext";
import TooltipWrapper from "./ToolTipWrapper";

export default function Step1() {
  
  const { formData, updateFormData } = useFormContext();

  return (
    <div className="sm:p-4">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <TooltipWrapper tooltip="Enter your full name.">
            <input
              type="text"
              value={formData.step1.name}
              className="mt-1 p-3 w-full border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 shadow-sm"
              placeholder="Enter your name"
              onChange={(e) => updateFormData("step1", { name: e.target.value })}
            />
          </TooltipWrapper>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <TooltipWrapper tooltip="Enter your email, e.g., harry123@gmail.com.">
            <input
              type="email"
              value={formData.step1.email}
              className="mt-1 p-3 w-full border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 shadow-sm"
              placeholder="Enter your email"
              onChange={(e) => updateFormData("step1", { email: e.target.value })}
            />
          </TooltipWrapper>
        </div>
      </form>
    </div>
  );
}
