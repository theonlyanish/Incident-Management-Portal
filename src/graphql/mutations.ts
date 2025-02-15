/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createServiceRequest = /* GraphQL */ `mutation CreateServiceRequest(
  $input: CreateServiceRequestInput!
  $condition: ModelServiceRequestConditionInput
) {
  createServiceRequest(input: $input, condition: $condition) {
    id
    caseNumber
    name
    description
    creationDate
    severity
    resolutionDate
    reporterName
    contactInformation
    location
    attachments
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateServiceRequestMutationVariables,
  APITypes.CreateServiceRequestMutation
>;
export const updateServiceRequest = /* GraphQL */ `mutation UpdateServiceRequest(
  $input: UpdateServiceRequestInput!
  $condition: ModelServiceRequestConditionInput
) {
  updateServiceRequest(input: $input, condition: $condition) {
    id
    caseNumber
    name
    description
    creationDate
    severity
    resolutionDate
    reporterName
    contactInformation
    location
    attachments
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateServiceRequestMutationVariables,
  APITypes.UpdateServiceRequestMutation
>;
export const deleteServiceRequest = /* GraphQL */ `mutation DeleteServiceRequest(
  $input: DeleteServiceRequestInput!
  $condition: ModelServiceRequestConditionInput
) {
  deleteServiceRequest(input: $input, condition: $condition) {
    id
    caseNumber
    name
    description
    creationDate
    severity
    resolutionDate
    reporterName
    contactInformation
    location
    attachments
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteServiceRequestMutationVariables,
  APITypes.DeleteServiceRequestMutation
>;
