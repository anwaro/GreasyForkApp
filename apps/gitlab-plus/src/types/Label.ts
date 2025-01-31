import { ApiResponse } from './response';

export type LabelsResponse = ApiResponse<{ labels: Labels }>;

export interface Labels {
  nodes: Label[];
  __typename: string;
}

export interface Label {
  id: string;
  color: string;
  description?: string;
  textColor: string;
  title: string;
  __typename: string;
}
