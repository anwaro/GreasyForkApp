import { MrResponse } from '../types/Mr';
import { GitlabProvider } from './GitlabProvider';
import { mrQuery } from './query/mr';

export class MrProvider extends GitlabProvider {
  async getMr(projectPath: string, mrId: string) {
    return this.queryCached<MrResponse>(
      `mr-${projectPath}-${mrId}`,
      mrQuery,
      {
        iid: mrId,
        fullPath: projectPath,
      },
      2
    );
  }
}
