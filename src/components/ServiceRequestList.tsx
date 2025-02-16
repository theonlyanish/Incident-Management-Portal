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

interface ServiceRequestListProps {
  refreshTrigger?: boolean;
}

const ServiceRequestList = ({ refreshTrigger }: ServiceRequestListProps) => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const client = generateClient();

  useEffect(() => {
    fetchRequests();
    const sub = subscribeToNewRequests();
    return () => {
      sub.unsubscribe();
    };
  }, [refreshTrigger]);

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
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'LOW':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const getStatusBadge = (creationDate: string, resolutionDate: string) => {
    const now = new Date();
    const resolution = new Date(resolutionDate);
    const isOverdue = now > resolution;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        isOverdue 
          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' 
          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
      }`}>
        {isOverdue ? 'Overdue' : 'Active'}
      </span>
    );
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Service Requests</h2>
      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden 
                     border border-gray-200 dark:border-gray-700 hover:shadow-xl 
                     transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {request.name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(request.severity)}`}>
                      {request.severity}
                    </span>
                    {getStatusBadge(request.creationDate, request.resolutionDate)}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Case #{request.caseNumber}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {request.description}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-medium">
                        Reporter
                      </p>
                      <p className="text-gray-900 dark:text-white mt-1">{request.reporterName}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-medium">
                        Contact
                      </p>
                      <p className="text-gray-900 dark:text-white mt-1">{request.contactInformation}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-medium">
                        Location
                      </p>
                      <p className="text-gray-900 dark:text-white mt-1">{request.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-medium">
                        Created
                      </p>
                      <p className="text-gray-900 dark:text-white mt-1">
                        {new Date(request.creationDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-medium">
                      Resolution Due
                    </p>
                    <p className="text-gray-900 dark:text-white mt-1">
                      {new Date(request.resolutionDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceRequestList;