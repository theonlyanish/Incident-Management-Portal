import { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createServiceRequest } from '../graphql/mutations';
import { TextField, Button, MenuItem, Grid, Box } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

interface ServiceRequestFormProps {
  onSubmitSuccess: () => void;
}

const ServiceRequestForm = ({ onSubmitSuccess }: ServiceRequestFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    severity: 'LOW',
    resolutionDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    reporterName: '',
    contactInformation: '',
    location: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const client = generateClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const caseNumber = `SR${Date.now()}`;
      const input = {
        caseNumber,
        name: formData.name,
        description: formData.description,
        creationDate: new Date().toISOString(),
        severity: formData.severity,
        resolutionDate: formData.resolutionDate.toISOString(),
        reporterName: formData.reporterName,
        contactInformation: formData.contactInformation,
        location: formData.location
      };

      await client.graphql({
        query: createServiceRequest,
        variables: { input }
      });

      setFormData({
        name: '',
        description: '',
        severity: 'LOW',
        resolutionDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        reporterName: '',
        contactInformation: '',
        location: ''
      });

      onSubmitSuccess();
    } catch (error) {
      console.error('Error creating service request:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Request Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Severity"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              required
            >
              <MenuItem value="LOW">Low</MenuItem>
              <MenuItem value="MEDIUM">Medium</MenuItem>
              <MenuItem value="HIGH">High</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Resolution Date"
              value={formData.resolutionDate}
              onChange={(newValue) => {
                if (newValue) {
                  setFormData(prev => ({ ...prev, resolutionDate: newValue }));
                }
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: true
                }
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Reporter Name"
              name="reporterName"
              value={formData.reporterName}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contact Information"
              name="contactInformation"
              value={formData.contactInformation}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                disabled={submitting}
                sx={{ minWidth: 120 }}
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </LocalizationProvider>
  );
};

export default ServiceRequestForm; 