import { GitlabProvider } from './GitlabProvider';
import { LabelsResponse } from '../types/Label';
import { labelsQuery } from './query/label';

export class LabelsProvider extends GitlabProvider {
  async getLabels(projectId: string, search = '') {
    return this.queryCached<LabelsResponse>(
      `labels-${projectId}-${search}`,
      labelsQuery,
      {
        fullPath: projectId,
        searchTerm: search,
      },
      search === '' ? 20 : 0.5
    );
  }
}
