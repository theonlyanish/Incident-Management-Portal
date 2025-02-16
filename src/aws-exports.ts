const awsConfig = {
  "aws_project_region": import.meta.env.VITE_AWS_REGION,
  "aws_cognito_region": import.meta.env.VITE_AWS_COGNITO_REGION,
  "aws_user_pools_id": import.meta.env.VITE_AWS_USER_POOLS_ID,
  "aws_user_pools_web_client_id": import.meta.env.VITE_AWS_USER_POOLS_WEB_CLIENT_ID,
  "aws_appsync_graphqlEndpoint": import.meta.env.VITE_AWS_APPSYNC_GRAPHQL_ENDPOINT,
  "aws_appsync_region": import.meta.env.VITE_AWS_APPSYNC_REGION,
  "aws_appsync_authenticationType": import.meta.env.VITE_AWS_APPSYNC_AUTHENTICATION_TYPE,
  "aws_appsync_apiKey": import.meta.env.VITE_AWS_APPSYNC_API_KEY,
  "aws_cognito_username_attributes": [],
  "aws_cognito_social_providers": [],
  "aws_cognito_signup_attributes": [
    "EMAIL"
  ],
  "aws_cognito_mfa_configuration": "OFF",
  "aws_cognito_mfa_types": [
    "SMS"
  ],
  "aws_cognito_password_protection_settings": {
    "passwordPolicyMinLength": 8,
    "passwordPolicyCharacters": []
  },
  "aws_cognito_verification_mechanisms": [
    "EMAIL"
  ]
} as const;

export default awsConfig; 