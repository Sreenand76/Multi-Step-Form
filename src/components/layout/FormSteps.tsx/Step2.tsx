import { useFormContext } from "@/components/context/FormContext";
import TooltipWrapper from "./ToolTipWrapper";

export default function Step2() {
  const { formData, updateFormData } = useFormContext();
  return (
    <div className="sm:p-4">
      <h2 className="text-xl font-semibold mb-4">Address Details</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Street Address</label>
          <TooltipWrapper tooltip="Enter your full street address, including house number and street name.">
            <input
              type="text"
              value={formData.step2.streetAddress}
              className="mt-1 p-3 w-full border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 shadow-sm"
              placeholder="Enter your street address"
              onChange={(e) => updateFormData("step2", { streetAddress: e.target.value })}
            />
          </TooltipWrapper>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">City</label>
          <TooltipWrapper tooltip="Enter your city for location identification.">
            <input
              type="text"
              value={formData.step2.city}
              className="mt-1 p-3 w-full border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 shadow-sm"
              placeholder="Enter your city"
              onChange={(e) => updateFormData("step2", { city: e.target.value })}
            />
          </TooltipWrapper>
        </div>
      </form>
    </div>
  );
}
