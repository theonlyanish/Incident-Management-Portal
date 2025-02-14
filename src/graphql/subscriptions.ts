/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateServiceRequest = /* GraphQL */ `subscription OnCreateServiceRequest(
  $filter: ModelSubscriptionServiceRequestFilterInput
) {
  onCreateServiceRequest(filter: $filter) {
    id
    name
    description
    severity
    reporter
    contact
    location
    createdAt
    resolutionDate
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateServiceRequestSubscriptionVariables,
  APITypes.OnCreateServiceRequestSubscription
>;
export const onUpdateServiceRequest = /* GraphQL */ `subscription OnUpdateServiceRequest(
  $filter: ModelSubscriptionServiceRequestFilterInput
) {
  onUpdateServiceRequest(filter: $filter) {
    id
    name
    description
    severity
    reporter
    contact
    location
    createdAt
    resolutionDate
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateServiceRequestSubscriptionVariables,
  APITypes.OnUpdateServiceRequestSubscription
>;
export const onDeleteServiceRequest = /* GraphQL */ `subscription OnDeleteServiceRequest(
  $filter: ModelSubscriptionServiceRequestFilterInput
) {
  onDeleteServiceRequest(filter: $filter) {
    id
    name
    description
    severity
    reporter
    contact
    location
    createdAt
    resolutionDate
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteServiceRequestSubscriptionVariables,
  APITypes.OnDeleteServiceRequestSubscription
>;
