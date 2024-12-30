import { ApiResponse } from './response';

export type LabelsResponse = ApiResponse<{ labels: Labels }>;

export interface Labels {
  __typename: string;
  nodes: Label[];
}

export interface Label {
  id: string;
  __typename: string;
  color: string;
  description?: string;
  textColor: string;
  title: string;
}
