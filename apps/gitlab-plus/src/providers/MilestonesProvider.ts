import { MilestonesResponse } from '../types/Milestone';
import { GitlabProvider } from './GitlabProvider';
import { milestoneQuery } from './query/milestone';

export class MilestonesProvider extends GitlabProvider {
  async getMilestones(projectId: string, title = '') {
    return this.queryCached<MilestonesResponse>(
      `milestones-${projectId}-${title}`,
      milestoneQuery,
      {
        fullPath: projectId,
        state: 'active',
        title,
      },
      title === '' ? 20 : 0.5
    );
  }
}
