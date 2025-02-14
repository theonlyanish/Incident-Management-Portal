import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listServiceRequests } from '../graphql/queries';
import { onCreateServiceRequest } from '../graphql/subscriptions';

interface ServiceRequest {
  id: string;
  caseNumber: string;
  name: string;
  description: string;
  creationDate: string;
  severity: string;
  resolutionDate: string;
  reporterName: string;
  contactInformation: string;
  location: string;
}

const ServiceRequestList = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const client = generateClient();

  useEffect(() => {
    fetchRequests();
    const sub = subscribeToNewRequests();
    return () => {
      sub.unsubscribe();
    };
  }, []);

  const fetchRequests = async () => {
    try {
      const result = await client.graphql({
        query: listServiceRequests
      });
      // Transform the data to match our interface
      const data = result.data.listServiceRequests.items.map((item: any) => ({
        id: item.id,
        caseNumber: item.caseNumber,
        name: item.name,
        description: item.description,
        creationDate: item.creationDate,
        severity: item.severity,
        resolutionDate: item.resolutionDate,
        reporterName: item.reporterName,
        contactInformation: item.contactInformation,
        location: item.location
      }));
      setRequests(data);
    } catch (error) {
      console.error('Error fetching service requests:', error);
    }
  };

  const subscribeToNewRequests = () => {
    return client.graphql({
      query: onCreateServiceRequest
    }).subscribe({
      next: ({ data }: any) => {
        const item = data.onCreateServiceRequest;
        const newRequest = {
          id: item.id,
          caseNumber: item.caseNumber,
          name: item.name,
          description: item.description,
          creationDate: item.creationDate,
          severity: item.severity,
          resolutionDate: item.resolutionDate,
          reporterName: item.reporterName,
          contactInformation: item.contactInformation,
          location: item.location
        };
        setRequests(prev => [newRequest, ...prev]);
      },
      error: (error: Error) => console.error('Subscription error:', error)
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'HIGH':
        return 'bg-red-100 text-red-800';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800';
      case 'LOW':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Service Requests</h2>
      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="bg-white shadow rounded-lg p-6 border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{request.name}</h3>
                <p className="text-sm text-gray-500">Case #{request.caseNumber}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-sm font-medium ${getSeverityColor(
                  request.severity
                )}`}
              >
                {request.severity}
              </span>
            </div>
            
            <p className="mt-2 text-gray-600">{request.description}</p>
            
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Reporter</p>
                <p>{request.reporterName}</p>
              </div>
              <div>
                <p className="text-gray-500">Contact</p>
                <p>{request.contactInformation}</p>
              </div>
              <div>
                <p className="text-gray-500">Location</p>
                <p>{request.location}</p>
              </div>
              <div>
                <p className="text-gray-500">Created</p>
                <p>{new Date(request.creationDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-500">Resolution Due</p>
                <p>{new Date(request.resolutionDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceRequestList;