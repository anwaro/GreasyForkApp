export interface ApiResponse<D> {
  data: ResponseData<D>;
}

export interface ResponseData<D> {
  workspace: Workspace<D>;
}

export type Workspace<D> = {
  id: string;
  __typename: string;
} & D;

export interface Nodes<Node> {
  nodes: Node[];
  __typename: string;
}
