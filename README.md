# Incident Service Request Portal

A modern, responsive web application for managing service requests and incidents. Built with React, TypeScript, Material UI, and AWS Amplify for a scalable serverless backend.

## Features

- 🔐 Secure authentication using AWS Cognito
- 🌓 Dark/Light mode support
- 📱 Responsive design for all devices
- ⚡ Real-time updates using GraphQL subscriptions
- 🎯 Automatic resolution date calculation based on severity
- 📊 Clean and intuitive interface for managing service requests

## Live Demo

The application is deployed and accessible at: https://incident-management-portal-j91im0vog-anish-ks-projects.vercel.app/

### Demo Credentials (can create own account or use the following)
- Username: anka
- Password: refer to email or approach document

## Technology Stack

- **Frontend:**
  - React with TypeScript
  - Material UI for components
  - AWS Amplify UI components
  - Date-fns for date handling

- **Backend:**
  - AWS AppSync (GraphQL API)
  - AWS DynamoDB
  - AWS Cognito (Authentication)
  - AWS Amplify (Hosting & CI/CD)

## Local Development Setup

1. **Prerequisites:**
   ```bash
   node.js >= 16.x
   npm >= 8.x
   AWS Amplify CLI
   ```

2. **Clone the repository:**
   ```bash
   git clone [your-repo-url]
   cd incident-portal
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Configure Amplify:**
   ```bash
   amplify configure
   amplify init
   amplify push
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

## Project Structure

```
incident-portal/
├── src/
│   ├── components/           # React components
│   ├── graphql/             # GraphQL queries and mutations
│   ├── API.ts               # Generated TypeScript types
│   └── App.tsx              # Main application component
├── amplify/
│   └── backend/             # Amplify backend configuration
└── public/                  # Static assets
```

## Key Features Explained

### Automatic Resolution Date Calculation
- Low Severity: 5 days from creation
- Medium Severity: 3 days from creation
- High Severity: 1 day from creation
- Manual override available if needed

### Real-time Updates
The application uses GraphQL subscriptions to provide real-time updates when new service requests are created.

## Deployment

The application is deployed using AWS Amplify's CI/CD pipeline. Any push to the main branch triggers automatic deployment.

To deploy your own instance:

1. Fork this repository
2. Set up an AWS Amplify project
3. Connect your repository to Amplify
4. Configure environment variables
5. Deploy

## Assumptions and Design Decisions

1. **Authentication:** All users need to authenticate before accessing the system
2. **Resolution Dates:** 
   - Automatically calculated based on severity
   - Can be manually overridden if needed
3. **Data Persistence:** All data is stored in DynamoDB with proper indexing
4. **Real-time Updates:** Important for collaborative environments

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. See the LICENSE file for details.
