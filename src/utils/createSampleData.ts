import { generateClient } from 'aws-amplify/api';
import { createServiceRequest } from '../graphql/mutations';
import { Severity } from '../API';
import { v4 as uuidv4 } from 'uuid';

const sampleData = [
  {
    name: 'Unable to upload data',
    description: 'When user tries to upload specific files, they are getting a timeout error',
    severity: Severity.HIGH,
    reporterName: 'Alex Morgan',
    contactInformation: 'alex.morgan@newapplication.com',
    location: 'Melbourne'
  },
  {
    name: 'Dashboard not loading',
    description: 'Users experiencing slow loading times on the main dashboard, sometimes timing out completely',
    severity: Severity.HIGH,
    reporterName: 'Sarah Wilson',
    contactInformation: 'sarah.wilson@newapplication.com',
    location: 'Sydney'
  },
  {
    name: 'Login issues after password reset',
    description: 'Users unable to login after requesting password reset, error message unclear',
    severity: Severity.MEDIUM,
    reporterName: 'James Chen',
    contactInformation: 'james.chen@newapplication.com',
    location: 'Brisbane'
  },
  {
    name: 'Report generation slow',
    description: 'Monthly report generation taking longer than usual, affecting end-of-month processes',
    severity: Severity.MEDIUM,
    reporterName: 'Emily Brown',
    contactInformation: 'emily.brown@newapplication.com',
    location: 'Perth'
  },
  {
    name: 'Minor UI glitch in settings',
    description: 'Settings menu dropdown occasionally displays behind other elements',
    severity: Severity.LOW,
    reporterName: 'Michael Lee',
    contactInformation: 'michael.lee@newapplication.com',
    location: 'Adelaide'
  }
];

export const createSampleRequests = async () => {
  const client = generateClient();
  const creationDate = new Date().toISOString().split('T')[0];

  for (const data of sampleData) {
    const resolutionDate = new Date();
    const daysToAdd = data.severity === Severity.HIGH ? 1 : data.severity === Severity.MEDIUM ? 3 : 5;
    resolutionDate.setDate(resolutionDate.getDate() + daysToAdd);

    const input = {
      ...data,
      caseNumber: `CASE-${uuidv4().slice(0, 8)}`,
      creationDate,
      resolutionDate: resolutionDate.toISOString().split('T')[0],
      attachments: []
    };

    try {
      await client.graphql({
        query: createServiceRequest,
        variables: { input }
      });
      console.log(`Created sample request: ${input.name}`);
    } catch (error) {
      console.error(`Error creating sample request ${input.name}:`, error);
    }
  }
}; 