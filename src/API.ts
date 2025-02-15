/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateServiceRequestInput = {
  id?: string | null,
  caseNumber: string,
  name: string,
  description: string,
  creationDate: string,
  severity: Severity,
  resolutionDate: string,
  reporterName: string,
  contactInformation: string,
  location: string,
  attachments?: Array< string | null > | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export enum Severity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}


export type ModelServiceRequestConditionInput = {
  caseNumber?: ModelStringInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  creationDate?: ModelStringInput | null,
  severity?: ModelSeverityInput | null,
  resolutionDate?: ModelStringInput | null,
  reporterName?: ModelStringInput | null,
  contactInformation?: ModelStringInput | null,
  location?: ModelStringInput | null,
  attachments?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelServiceRequestConditionInput | null > | null,
  or?: Array< ModelServiceRequestConditionInput | null > | null,
  not?: ModelServiceRequestConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelSeverityInput = {
  eq?: Severity | null,
  ne?: Severity | null,
};

export type ServiceRequest = {
  __typename: "ServiceRequest",
  id: string,
  caseNumber: string,
  name: string,
  description: string,
  creationDate: string,
  severity: Severity,
  resolutionDate: string,
  reporterName: string,
  contactInformation: string,
  location: string,
  attachments?: Array< string | null > | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type UpdateServiceRequestInput = {
  id: string,
  caseNumber?: string | null,
  name?: string | null,
  description?: string | null,
  creationDate?: string | null,
  severity?: Severity | null,
  resolutionDate?: string | null,
  reporterName?: string | null,
  contactInformation?: string | null,
  location?: string | null,
  attachments?: Array< string | null > | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteServiceRequestInput = {
  id: string,
};

export type ModelServiceRequestFilterInput = {
  id?: ModelIDInput | null,
  caseNumber?: ModelStringInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  creationDate?: ModelStringInput | null,
  severity?: ModelSeverityInput | null,
  resolutionDate?: ModelStringInput | null,
  reporterName?: ModelStringInput | null,
  contactInformation?: ModelStringInput | null,
  location?: ModelStringInput | null,
  attachments?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelServiceRequestFilterInput | null > | null,
  or?: Array< ModelServiceRequestFilterInput | null > | null,
  not?: ModelServiceRequestFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelServiceRequestConnection = {
  __typename: "ModelServiceRequestConnection",
  items:  Array<ServiceRequest | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionServiceRequestFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  caseNumber?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  creationDate?: ModelSubscriptionStringInput | null,
  severity?: ModelSubscriptionStringInput | null,
  resolutionDate?: ModelSubscriptionStringInput | null,
  reporterName?: ModelSubscriptionStringInput | null,
  contactInformation?: ModelSubscriptionStringInput | null,
  location?: ModelSubscriptionStringInput | null,
  attachments?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionServiceRequestFilterInput | null > | null,
  or?: Array< ModelSubscriptionServiceRequestFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type CreateServiceRequestMutationVariables = {
  input: CreateServiceRequestInput,
  condition?: ModelServiceRequestConditionInput | null,
};

export type CreateServiceRequestMutation = {
  createServiceRequest?:  {
    __typename: "ServiceRequest",
    id: string,
    caseNumber: string,
    name: string,
    description: string,
    creationDate: string,
    severity: Severity,
    resolutionDate: string,
    reporterName: string,
    contactInformation: string,
    location: string,
    attachments?: Array< string | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type UpdateServiceRequestMutationVariables = {
  input: UpdateServiceRequestInput,
  condition?: ModelServiceRequestConditionInput | null,
};

export type UpdateServiceRequestMutation = {
  updateServiceRequest?:  {
    __typename: "ServiceRequest",
    id: string,
    caseNumber: string,
    name: string,
    description: string,
    creationDate: string,
    severity: Severity,
    resolutionDate: string,
    reporterName: string,
    contactInformation: string,
    location: string,
    attachments?: Array< string | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type DeleteServiceRequestMutationVariables = {
  input: DeleteServiceRequestInput,
  condition?: ModelServiceRequestConditionInput | null,
};

export type DeleteServiceRequestMutation = {
  deleteServiceRequest?:  {
    __typename: "ServiceRequest",
    id: string,
    caseNumber: string,
    name: string,
    description: string,
    creationDate: string,
    severity: Severity,
    resolutionDate: string,
    reporterName: string,
    contactInformation: string,
    location: string,
    attachments?: Array< string | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type GetServiceRequestQueryVariables = {
  id: string,
};

export type GetServiceRequestQuery = {
  getServiceRequest?:  {
    __typename: "ServiceRequest",
    id: string,
    caseNumber: string,
    name: string,
    description: string,
    creationDate: string,
    severity: Severity,
    resolutionDate: string,
    reporterName: string,
    contactInformation: string,
    location: string,
    attachments?: Array< string | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type ListServiceRequestsQueryVariables = {
  filter?: ModelServiceRequestFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListServiceRequestsQuery = {
  listServiceRequests?:  {
    __typename: "ModelServiceRequestConnection",
    items:  Array< {
      __typename: "ServiceRequest",
      id: string,
      caseNumber: string,
      name: string,
      description: string,
      creationDate: string,
      severity: Severity,
      resolutionDate: string,
      reporterName: string,
      contactInformation: string,
      location: string,
      attachments?: Array< string | null > | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateServiceRequestSubscriptionVariables = {
  filter?: ModelSubscriptionServiceRequestFilterInput | null,
};

export type OnCreateServiceRequestSubscription = {
  onCreateServiceRequest?:  {
    __typename: "ServiceRequest",
    id: string,
    caseNumber: string,
    name: string,
    description: string,
    creationDate: string,
    severity: Severity,
    resolutionDate: string,
    reporterName: string,
    contactInformation: string,
    location: string,
    attachments?: Array< string | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateServiceRequestSubscriptionVariables = {
  filter?: ModelSubscriptionServiceRequestFilterInput | null,
};

export type OnUpdateServiceRequestSubscription = {
  onUpdateServiceRequest?:  {
    __typename: "ServiceRequest",
    id: string,
    caseNumber: string,
    name: string,
    description: string,
    creationDate: string,
    severity: Severity,
    resolutionDate: string,
    reporterName: string,
    contactInformation: string,
    location: string,
    attachments?: Array< string | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteServiceRequestSubscriptionVariables = {
  filter?: ModelSubscriptionServiceRequestFilterInput | null,
};

export type OnDeleteServiceRequestSubscription = {
  onDeleteServiceRequest?:  {
    __typename: "ServiceRequest",
    id: string,
    caseNumber: string,
    name: string,
    description: string,
    creationDate: string,
    severity: Severity,
    resolutionDate: string,
    reporterName: string,
    contactInformation: string,
    location: string,
    attachments?: Array< string | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};
