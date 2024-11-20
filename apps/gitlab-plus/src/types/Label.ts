import { ApiResponse } from './response';

export type LabelsResponse = ApiResponse<{ labels: Labels }>;

export interface Labels {
  nodes: Label[];
  __typename: string;
}

export interface Label {
  id: string;
  title: string;
  description?: string;
  color: string;
  textColor: string;
  __typename: string;
}
