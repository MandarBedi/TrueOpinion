import React, { useState } from 'react';
import {
  DocumentIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Modal from './Modal';
import Button from './Button';

/**
 * File viewer component for PDFs and other documents
 * @param {Object} props - Component props
 */
const FileViewer = ({
  files = [],
  onView,
  onDownload,
  showPreview = true,
  maxFiles = 5,
  className = ''
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleView = (file) => {
    setSelectedFile(file);
    setPreviewOpen(true);
    
    if (onView) {
      onView(file);
    }
  };

  const handleDownload = (file) => {
    if (onDownload) {
      onDownload(file);
    } else {
      // Default download behavior
      const link = document.createElement('a');
      link.href = file.url || file.path;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      case 'ppt':
      case 'pptx':
        return '📋';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return '🖼️';
      default:
        return '📎';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!files || files.length === 0) {
    return (
      <div className={`text-center py-8 text-gray-500 ${className}`}>
        <DocumentIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
        <p>No files available</p>
      </div>
    );
  }

  const displayFiles = files.slice(0, maxFiles);
  const remainingCount = files.length - maxFiles;

  return (
    <div className={className}>
      <div className="space-y-3">
        {displayFiles.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <span className="text-2xl flex-shrink-0">
                {getFileIcon(file.name)}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </p>
                {file.size && (
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 flex-shrink-0">
              {showPreview && (
                <button
                  onClick={() => handleView(file)}
                  className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                  title="View file"
                >
                  <EyeIcon className="w-4 h-4" />
                </button>
              )}
              
              <button
                onClick={() => handleDownload(file)}
                className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                title="Download file"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        
        {remainingCount > 0 && (
          <div className="text-center py-2">
            <span className="text-sm text-gray-500">
              and {remainingCount} more file{remainingCount > 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {/* File Preview Modal */}
      <Modal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title={selectedFile?.name}
        size="lg"
      >
        {selectedFile && (
          <div className="text-center">
            {selectedFile.name.toLowerCase().endsWith('.pdf') ? (
              <div className="bg-gray-100 rounded-lg p-8">
                <DocumentIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-4">
                  PDF Preview
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  In a real application, this would show the PDF content using react-pdf
                </p>
                <Button
                  onClick={() => handleDownload(selectedFile)}
                  leftIcon={<ArrowDownTrayIcon className="w-4 h-4" />}
                >
                  Download PDF
                </Button>
              </div>
            ) : (
              <div className="bg-gray-100 rounded-lg p-8">
                <span className="text-6xl mb-4 block">
                  {getFileIcon(selectedFile.name)}
                </span>
                <p className="text-gray-600 mb-4">
                  {selectedFile.name}
                </p>
                <Button
                  onClick={() => handleDownload(selectedFile)}
                  leftIcon={<ArrowDownTrayIcon className="w-4 h-4" />}
                >
                  Download File
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FileViewer;