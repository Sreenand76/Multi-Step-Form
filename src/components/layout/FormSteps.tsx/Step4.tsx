import { useFormContext } from "@/components/context/FormContext";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function Step4() {
  const { formData } = useFormContext();

  return (
    <div className="p-6 card dark:bg-[#090909] text-gray-800 dark:text-gray-300 shadow-lg rounded-lg md:p-10 xl:px-14">
      <h2 className="text-2xl font-semibold mb-6 text-center ">Review & Submit</h2>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between">
          <p className="font-medium ">
            <strong>Name:</strong> <span className="font-normal">{formData.step1.name}</span>
          </p>
          <p className="font-medium ">
            <strong>Email:</strong> <span className="font-normal">{formData.step1.email}</span>
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-medium ">
            <strong>Address:</strong>{" "}
            <span className="font-normal">
              {formData.step2.streetAddress + " " + formData.step2.city}
            </span>
          </p>
        </div>

        <div className="space-y-2 mb-3">
          <strong className="font-medium ">Preferences:</strong>
          <ul className="list-inside space-y-1">
            <li className="flex items-center ">
              Receive Updates
              <span className="ml-2">
                {formData.step3.preferences.updates ? (
                  <FaCheck color="green" />
                ) : (
                  <FaTimes color="red"/>
                )}
              </span>

            </li>
            <li className="flex items-center ">
              Enable Notifications
              <span className="ml-1">
                {formData.step3.preferences.notifications ? (
                  <FaCheck color="green" />
                ) : (
                  <FaTimes color="red"/>
                )}
              </span>

            </li>
            <li className="flex items-center ">
              Subscribe to Emails
              <span className="ml-2">
                {formData.step3.preferences.emails ? (
                  <FaCheck color="green" />
                ) : (
                  <FaTimes color="red"/>
                )}
              </span>

            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

