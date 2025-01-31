import { IterationsResponse } from '../types/Iteration';
import { GitlabProvider } from './GitlabProvider';
import { iterationQuery } from './query/iteration';

export class IterationsProvider extends GitlabProvider {
  async getIterations(projectId: string, title = '') {
    return this.queryCached<IterationsResponse>(
      `iterations-${projectId}-search-${title}`,
      iterationQuery,
      {
        fullPath: projectId,
        state: 'opened',
        title,
      },
      title !== '' ? 0.5 : 20
    );
  }
}
