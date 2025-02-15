import { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { getCurrentUser } from 'aws-amplify/auth';

interface FileUploadProps {
  onUploadSuccess: (fileKey: string) => void;
}

const FileUpload = ({ onUploadSuccess }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileKey = `uploads/${Date.now()}-${file.name}`;
      
      await uploadData({
        key: fileKey,
        data: file,
        options: {
          contentType: file.type,
          accessLevel: 'private'
        }
      }).result;
      
      onUploadSuccess(fileKey);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload File</label>
      <input
        type="file"
        onChange={handleFileChange}
        disabled={uploading}
        className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-indigo-50 file:text-indigo-700
          hover:file:bg-indigo-100
          dark:file:bg-gray-700 dark:file:text-gray-300
          dark:hover:file:bg-gray-600"
      />
      {uploading && <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Uploading...</p>}
    </div>
  );
};

export default FileUpload; 