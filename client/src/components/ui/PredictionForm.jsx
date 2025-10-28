import { Users } from "lucide-react";
import React from "react";
import { useFloatingChat } from "./FloatingChatContext";

const PredictionForm = ({
  title,
  formData,
  onInputChange,
  onSubmit,
  loading = false,
  fields = [],
  submitButtonText = "Predict",
  className = "",
}) => {
  const { openChat } = useFloatingChat();

  return (
    <div
      className={`min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          <button
            onClick={openChat}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
          >
            <Users className="w-4 h-4 mr-2" />
            Try MediBuddy
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-semibold text-gray-700 uppercase tracking-wide"
                  >
                    {field.label}
                  </label>

                  {field.type === "select" ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={onInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50"
                      required={field.required}
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="relative">
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type || "text"}
                        value={formData[field.name] || ""}
                        onChange={onInputChange}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50"
                        required={field.required}
                        min={field.min}
                        max={field.max}
                        step={field.step}
                      />
                      {field.tooltip && (
                        <div className="absolute -bottom-6 left-0 text-xs text-gray-500">
                          {field.tooltip}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 min-w-[120px]"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Loading...
                  </div>
                ) : (
                  submitButtonText
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PredictionForm;
