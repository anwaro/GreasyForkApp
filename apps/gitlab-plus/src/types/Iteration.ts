import { ApiResponse, Nodes } from './response';

export type IterationsResponse = ApiResponse<{ attributes: Nodes<Iteration> }>;

export interface Iteration {
  id: string;
  title: string | null;
  startDate: string;
  dueDate: string;
  webUrl: string;
  iterationCadence: IterationCadence;
  state: string;
  __typename: string;
}

export interface IterationCadence {
  id: string;
  title: string;
  __typename: string;
}
