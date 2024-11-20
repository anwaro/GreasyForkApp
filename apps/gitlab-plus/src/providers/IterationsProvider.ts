import { GitlabProvider } from './GitlabProvider';
import { iterationQuery } from './query/iteration';
import { IterationsResponse } from '../types/Iteration';

export class IterationsProvider extends GitlabProvider {
  async getIterations(projectId: string, title = '') {
    return this.queryCached<IterationsResponse>(
      `iterations-${projectId} `,
      iterationQuery,
      {
        fullPath: projectId,
        title,
        state: 'opened',
      },
      title !== '' ? 0.5 : 20
    );
  }
}
