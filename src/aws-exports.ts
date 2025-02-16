const awsConfig = {
  Auth: {
    region: import.meta.env.VITE_AWS_REGION,
    userPoolId: import.meta.env.VITE_AWS_USER_POOLS_ID,
    userPoolWebClientId: import.meta.env.VITE_AWS_USER_POOLS_WEB_CLIENT_ID,
  },
  aws_appsync_graphqlEndpoint: import.meta.env.VITE_AWS_APPSYNC_GRAPHQL_ENDPOINT,
  aws_appsync_region: import.meta.env.VITE_AWS_APPSYNC_REGION,
  aws_appsync_authenticationType: import.meta.env.VITE_AWS_APPSYNC_AUTHENTICATION_TYPE,
};

export default awsConfig; 