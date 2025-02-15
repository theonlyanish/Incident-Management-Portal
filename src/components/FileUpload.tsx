import { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';

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
      const result = await uploadData({
        key: `uploads/${Date.now()}-${file.name}`,
        data: file,
        options: {
          contentType: file.type,
        }
      }).result;
      onUploadSuccess(`uploads/${Date.now()}-${file.name}`);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">Upload File</label>
      <input
        type="file"
        onChange={handleFileChange}
        disabled={uploading}
        className="mt-1 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-indigo-50 file:text-indigo-700
          hover:file:bg-indigo-100"
      />
      {uploading && <p className="mt-2 text-sm text-gray-500">Uploading...</p>}
    </div>
  );
};

export default FileUpload; 