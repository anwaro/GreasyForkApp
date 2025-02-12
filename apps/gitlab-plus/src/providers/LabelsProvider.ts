import { LabelsResponse } from '../types/Label';
import { GitlabProvider } from './GitlabProvider';
import { projectLabelsQuery, workspaceLabelsQuery } from './query/label';

export class LabelsProvider extends GitlabProvider {
  async getProjectLabels(projectPath: string, search = '') {
    return this.queryCached<LabelsResponse>(
      `project-${projectPath}-labels-${search}`,
      projectLabelsQuery,
      {
        fullPath: projectPath,
        searchTerm: search,
      },
      search === '' ? 20 : 0.5
    );
  }

  async getWorkspaceLabels(workspacePath: string, search = '') {
    return this.queryCached<LabelsResponse>(
      `workspace-${workspacePath}-labels-${search}`,
      workspaceLabelsQuery,
      {
        fullPath: workspacePath,
        searchTerm: search,
      },
      search === '' ? 20 : 0.5
    );
  }
}
