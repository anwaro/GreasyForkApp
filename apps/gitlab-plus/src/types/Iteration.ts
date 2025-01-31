import { ApiResponse, Nodes } from './response';

export type IterationsResponse = ApiResponse<{ attributes: Nodes<Iteration> }>;

export interface Iteration {
  id: string;
  dueDate: string;
  iterationCadence: IterationCadence;
  startDate: string;
  state: string;
  title: null | string;
  webUrl: string;
  __typename: string;
}

export interface IterationCadence {
  id: string;
  title: string;
  __typename: string;
}
