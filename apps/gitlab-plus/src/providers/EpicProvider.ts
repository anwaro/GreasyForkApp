import { EpicResponse } from '../types/Epic';
import { GitlabProvider } from './GitlabProvider';
import { epicQuery } from './query/epic';

export class EpicProvider extends GitlabProvider {
  async getEpic(workspacePath: string, epicId: string) {
    return this.queryCached<EpicResponse>(
      `epic-${workspacePath}-${epicId}`,
      epicQuery,
      {
        iid: epicId,
        fullPath: workspacePath,
      },
      2
    );
  }
}
