export interface ApiResponseWorkspace<D> {
  data: ResponseWorkspace<D>;
}

export interface ApiResponseProject<D> {
  data: ResponseProject<D>;
}

export interface ResponseWorkspace<D> {
  workspace: ResponseData<D>;
}

export interface ResponseProject<D> {
  project: ResponseData<D>;
}

export type ResponseData<D> = {
  id: string;
} & D;

export interface Nodes<Node> {
  nodes: Node[];
}
