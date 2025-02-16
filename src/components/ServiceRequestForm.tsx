import { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createServiceRequest } from '../graphql/mutations';
import { v4 as uuidv4 } from 'uuid';
import FileUpload from './FileUpload';
import { Severity } from '../API';
import { getCurrentUser } from 'aws-amplify/auth';

interface ServiceRequestFormProps {
  onSubmitSuccess: () => void;
}

const ServiceRequestForm = ({ onSubmitSuccess }: ServiceRequestFormProps) => {
  const client = generateClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    creationDate: new Date().toISOString().split('T')[0],
    severity: Severity.LOW,
    reporterName: '',
    contactInformation: '',
    location: '',
    attachments: [] as string[]
  });

  const calculateResolutionDate = (creationDate: string, severity: Severity) => {
    const date = new Date(creationDate);
    const daysToAdd = severity === Severity.HIGH ? 1 : severity === Severity.MEDIUM ? 3 : 5;
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split('T')[0];
  };

  const handleFileUpload = (fileKey: string) => {
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, fileKey]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const resolutionDate = calculateResolutionDate(formData.creationDate, formData.severity);
      const caseNumber = `CASE-${uuidv4().slice(0, 8)}`;

      const input = {
        caseNumber,
        name: formData.name,
        description: formData.description,
        creationDate: formData.creationDate,
        severity: formData.severity,
        resolutionDate,
        reporterName: formData.reporterName,
        contactInformation: formData.contactInformation,
        location: formData.location,
        attachments: formData.attachments
      };

      await client.graphql({
        query: createServiceRequest,
        variables: { input }
      });

      setFormData({
        name: '',
        description: '',
        creationDate: new Date().toISOString().split('T')[0],
        severity: Severity.LOW,
        reporterName: '',
        contactInformation: '',
        location: '',
        attachments: []
      });

      setSubmitStatus({
        type: 'success',
        message: 'Service request submitted successfully!'
      });
      onSubmitSuccess();
    } catch (error) {
      console.error('Error creating service request:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Error submitting service request. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      {submitStatus.type && (
        <div
          className={`p-4 rounded-md ${
            submitStatus.type === 'success'
              ? 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100'
              : 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-100'
          } mb-4 transition-all duration-300 ease-in-out animate-fadeIn`}
        >
          {submitStatus.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Service Request Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm 
                     focus:border-indigo-500 focus:ring-indigo-500 
                     dark:bg-gray-800 dark:border-gray-600 dark:text-white
                     hover:border-indigo-400 dark:hover:border-indigo-400
                     transition-all duration-200"
            placeholder="Enter service request name"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="block w-full rounded-md border-gray-300 shadow-sm 
                     focus:border-indigo-500 focus:ring-indigo-500
                     dark:bg-gray-800 dark:border-gray-600 dark:text-white
                     hover:border-indigo-400 dark:hover:border-indigo-400
                     transition-all duration-200 resize-y"
            placeholder="Describe the service request"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Creation Date
          </label>
          <input
            type="date"
            name="creationDate"
            value={formData.creationDate}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm 
                     focus:border-indigo-500 focus:ring-indigo-500
                     dark:bg-gray-800 dark:border-gray-600 dark:text-white
                     hover:border-indigo-400 dark:hover:border-indigo-400
                     transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Severity
          </label>
          <select
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm 
                     focus:border-indigo-500 focus:ring-indigo-500
                     dark:bg-gray-800 dark:border-gray-600 dark:text-white
                     hover:border-indigo-400 dark:hover:border-indigo-400
                     transition-all duration-200"
          >
            <option value={Severity.LOW}>Low</option>
            <option value={Severity.MEDIUM}>Medium</option>
            <option value={Severity.HIGH}>High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Reporter Name
          </label>
          <input
            type="text"
            name="reporterName"
            value={formData.reporterName}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm 
                     focus:border-indigo-500 focus:ring-indigo-500
                     dark:bg-gray-800 dark:border-gray-600 dark:text-white
                     hover:border-indigo-400 dark:hover:border-indigo-400
                     transition-all duration-200"
            placeholder="Enter reporter name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Contact Information
          </label>
          <input
            type="email"
            name="contactInformation"
            value={formData.contactInformation}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm 
                     focus:border-indigo-500 focus:ring-indigo-500
                     dark:bg-gray-800 dark:border-gray-600 dark:text-white
                     hover:border-indigo-400 dark:hover:border-indigo-400
                     transition-all duration-200"
            placeholder="Enter email address"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm 
                     focus:border-indigo-500 focus:ring-indigo-500
                     dark:bg-gray-800 dark:border-gray-600 dark:text-white
                     hover:border-indigo-400 dark:hover:border-indigo-400
                     transition-all duration-200"
            placeholder="Enter location"
          />
        </div>

        <div className="md:col-span-2">
          <FileUpload onUploadSuccess={handleFileUpload} />
        </div>

        {formData.attachments.length > 0 && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Attached Files
            </label>
            <ul className="space-y-2">
              {formData.attachments.map((fileKey, index) => (
                <li 
                  key={index} 
                  className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 
                           p-2 rounded-md flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  {fileKey.split('/').pop()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-6 flex justify-center py-2 px-4 border border-transparent rounded-md 
                 shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                 dark:bg-indigo-500 dark:hover:bg-indigo-600
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                 dark:focus:ring-offset-gray-900 transform hover:scale-105
                 disabled:opacity-50 transition-all duration-200"
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Submitting...
          </div>
        ) : (
          'Submit Service Request'
        )}
      </button>
    </form>
  );
};

export default ServiceRequestForm; 