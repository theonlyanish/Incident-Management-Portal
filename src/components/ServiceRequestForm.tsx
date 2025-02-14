import { useState } from 'react';
import { API } from 'aws-amplify';
import { createServiceRequest } from '../graphql/mutations';
import { v4 as uuidv4 } from 'uuid';

interface ServiceRequestFormProps {
  onSubmitSuccess: () => void;
}

const ServiceRequestForm = ({ onSubmitSuccess }: ServiceRequestFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    creationDate: new Date().toISOString().split('T')[0],
    severity: 'LOW',
    reporterName: '',
    contactInformation: '',
    location: ''
  });

  const calculateResolutionDate = (creationDate: string, severity: string) => {
    const date = new Date(creationDate);
    const daysToAdd = severity === 'HIGH' ? 1 : severity === 'MEDIUM' ? 3 : 5;
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split('T')[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const resolutionDate = calculateResolutionDate(formData.creationDate, formData.severity);
      const caseNumber = `CASE-${uuidv4().slice(0, 8)}`;

      const input = {
        caseNumber,
        ...formData,
        resolutionDate
      };

      await API.graphql({
        query: createServiceRequest,
        variables: { input }
      });

      setFormData({
        name: '',
        description: '',
        creationDate: new Date().toISOString().split('T')[0],
        severity: 'LOW',
        reporterName: '',
        contactInformation: '',
        location: ''
      });

      onSubmitSuccess();
    } catch (error) {
      console.error('Error creating service request:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Service Request Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Creation Date</label>
        <input
          type="date"
          name="creationDate"
          value={formData.creationDate}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Severity</label>
        <select
          name="severity"
          value={formData.severity}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Reporter Name</label>
        <input
          type="text"
          name="reporterName"
          value={formData.reporterName}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Contact Information</label>
        <input
          type="email"
          name="contactInformation"
          value={formData.contactInformation}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit Service Request
      </button>
    </form>
  );
};

export default ServiceRequestForm; 