import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  CloudArrowUpIcon, 
  DocumentIcon, 
  XMarkIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

const FileUpload = ({
  onFilesChange,
  acceptedFiles = [],
  maxSize = 5242880, // 5MB
  multiple = true,
  className = ''
}) => {
  const onDrop = useCallback(
    (newAcceptedFiles, rejectedFiles) => {
      // Handle rejected files
      if (rejectedFiles.length > 0) {
        const errors = rejectedFiles.map((fileRejection) => {
          const { file, errors } = fileRejection;
          const errorMessages = errors.map(error => {
            switch (error.code) {
              case 'file-too-large':
                return `${file.name}: File too large (max 5MB)`;
              case 'file-invalid-type':
                return `${file.name}: Only PDF files allowed`;
              default:
                return `${file.name}: ${error.message}`;
            }
          });
          return errorMessages.join(', ');
        });      
        // Show error toast or alert
        alert('Upload errors:\n' + errors.join('\n'));
      }

      // Handle accepted files
      if (newAcceptedFiles.length > 0) {
        const updatedFiles = multiple 
          ? [...acceptedFiles, ...newAcceptedFiles]
          : newAcceptedFiles;
        onFilesChange(updatedFiles);
      }
    },
    [onFilesChange, maxSize, multiple, acceptedFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, maxSize, multiple,
    accept: {
      'application/pdf': ['.pdf'],
    },
  });

  const removeFile = (index) => {
    const newFiles = acceptedFiles.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
          ${isDragActive 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <CloudArrowUpIcon className={`w-12 h-12 mb-4 ${
            isDragActive ? 'text-primary-600' : 'text-gray-400'
          }`} />
          
          <div className="mb-2">
            {isDragActive ? (
              <p className="text-lg font-medium text-primary-600">
                Drop the files here...
              </p>
            ) : (
              <p className="text-lg font-medium text-gray-900">
                Drag & drop PDF files here
              </p>
            )}
          </div>
          
          <p className="text-sm text-gray-500 mb-4">
            or click to select files from your computer
          </p>
          
          <div className="flex items-center space-x-4 text-xs text-gray-400">
            <span>• PDF only</span>
            <span>• Max 5MB per file</span>
            {multiple && <span>• Multiple files allowed</span>}
          </div>
        </div>
      </div>

      {/* Uploaded Files List */}
      {acceptedFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900 flex items-center">
              <DocumentIcon className="w-4 h-4 mr-2" />
              Uploaded Files ({acceptedFiles.length})
            </h4>
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
          </div>
          
          <div className="space-y-2">
            {acceptedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <DocumentIcon className="w-8 h-8 text-red-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                  title="Remove file"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h5 className="text-sm font-medium text-blue-900 mb-2">Upload Guidelines:</h5>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Ensure documents are clear and readable</li>
          <li>• Include all relevant test results and reports</li>
          <li>• Remove any personal information you don't want to share</li>
          <li>• Organize files chronologically if possible</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;