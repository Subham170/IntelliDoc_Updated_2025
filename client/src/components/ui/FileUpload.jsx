import { FileImage, Upload, Users, X } from "lucide-react";
import React from "react";
import { useFloatingChat } from "./FloatingChatContext";

const FileUpload = ({
  title,
  onFileChange,
  onSubmit,
  loading = false,
  selectedFile = null,
  accept = "image/*",
  submitButtonText = "Predict",
  className = "",
  showPreview = true,
}) => {
  const { openChat } = useFloatingChat();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onFileChange(file);
  };

  const clearFile = () => {
    onFileChange(null);
    // Reset the file input
    const fileInput = document.getElementById("file-upload");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          {/* <button
            onClick={openChat}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
          >
            <Users className="w-4 h-4 mr-2" />
            Try MediBuddy
          </button> */}
        </div>

        {/* Upload Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* File Upload Area */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Image
              </label>

              {/* File Input */}
              <div className="relative">
                <input
                  id="file-upload"
                  type="file"
                  accept={accept}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      {accept === "image/*"
                        ? "PNG, JPG, JPEG"
                        : "Any file type"}
                    </p>
                  </div>
                </label>
              </div>

              {/* Selected File Display */}
              {selectedFile && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileImage className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-blue-600">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={clearFile}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Image Preview */}
              {selectedFile &&
                showPreview &&
                selectedFile.type.startsWith("image/") && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Preview:
                    </p>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading || !selectedFile}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 min-w-[120px]"
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

export default FileUpload;
