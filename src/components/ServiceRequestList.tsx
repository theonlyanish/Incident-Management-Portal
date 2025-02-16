import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listServiceRequests } from '../graphql/queries';
import { onCreateServiceRequest } from '../graphql/subscriptions';
import { Card, CardContent, Typography, Chip, Grid, Box, Paper } from '@mui/material';

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

  const getSeverityColor = (severity: string): "error" | "warning" | "success" | "default" => {
    switch (severity) {
      case 'HIGH':
        return 'error';
      case 'MEDIUM':
        return 'warning';
      case 'LOW':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusChip = (resolutionDate: string) => {
    const now = new Date();
    const resolution = new Date(resolutionDate);
    const isOverdue = now > resolution;
    
    return (
      <Chip
        label={isOverdue ? 'Overdue' : 'Active'}
        color={isOverdue ? 'error' : 'primary'}
        size="small"
      />
    );
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Service Requests
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {requests.map((request) => (
          <Card key={request.id} sx={{ width: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="h6" component="h3">
                  {request.name}
                </Typography>
                <Chip
                  label={request.severity}
                  color={getSeverityColor(request.severity)}
                  size="small"
                />
                {getStatusChip(request.resolutionDate)}
              </Box>
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Case #{request.caseNumber}
              </Typography>
              
              <Typography variant="body1" paragraph>
                {request.description}
              </Typography>

              <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box>
                      <Typography variant="overline" display="block">
                        Reporter
                      </Typography>
                      <Typography variant="body2">
                        {request.reporterName}
                      </Typography>
                      <Typography variant="overline" display="block" sx={{ mt: 2 }}>
                        Contact
                      </Typography>
                      <Typography variant="body2">
                        {request.contactInformation}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Box>
                      <Typography variant="overline" display="block">
                        Location
                      </Typography>
                      <Typography variant="body2">
                        {request.location}
                      </Typography>
                      <Typography variant="overline" display="block" sx={{ mt: 2 }}>
                        Created
                      </Typography>
                      <Typography variant="body2">
                        {new Date(request.creationDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Box>
                      <Typography variant="overline" display="block">
                        Resolution Due
                      </Typography>
                      <Typography variant="body2">
                        {new Date(request.resolutionDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ServiceRequestList;