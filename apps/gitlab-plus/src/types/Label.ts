import { ApiResponseWorkspace } from './response';

export type LabelsResponse = ApiResponseWorkspace<{ labels: Labels }>;

export interface Labels {
  nodes: Label[];
}

export interface Label {
  id: string;
  color: string;
  description?: string;
  textColor: string;
  title: string;
}
