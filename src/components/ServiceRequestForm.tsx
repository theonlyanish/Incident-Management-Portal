import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createServiceRequest } from '../graphql/mutations';
import { Severity } from '../API';
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
    severity: Severity.LOW,
    resolutionDate: null as Date | null,
    reporterName: '',
    contactInformation: '',
    location: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const client = generateClient();

  const calculateResolutionDate = (severity: Severity): Date => {
    const now = new Date();
    const daysToAdd = severity === Severity.HIGH ? 1 : severity === Severity.MEDIUM ? 3 : 5;
    const date = new Date(now);
    date.setDate(date.getDate() + daysToAdd);
    return date;
  };

  useEffect(() => {
    // Update resolution date when severity changes
    const calculatedDate = calculateResolutionDate(formData.severity);
    setFormData(prev => ({
      ...prev,
      resolutionDate: prev.resolutionDate || calculatedDate
    }));
  }, [formData.severity]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const caseNumber = `SR${Date.now()}`;
      const resolutionDate = formData.resolutionDate || calculateResolutionDate(formData.severity);
      
      const input = {
        caseNumber,
        name: formData.name,
        description: formData.description,
        creationDate: new Date().toISOString(),
        severity: formData.severity,
        resolutionDate: resolutionDate.toISOString(),
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
        severity: Severity.LOW,
        resolutionDate: null,
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
              helperText="Resolution date will be automatically set based on severity"
            >
              <MenuItem value={Severity.LOW}>Low (5 days)</MenuItem>
              <MenuItem value={Severity.MEDIUM}>Medium (3 days)</MenuItem>
              <MenuItem value={Severity.HIGH}>High (1 day)</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Resolution Date (Optional)"
              value={formData.resolutionDate}
              onChange={(newValue) => {
                setFormData(prev => ({ ...prev, resolutionDate: newValue }));
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  helperText: "Leave empty for automatic calculation"
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