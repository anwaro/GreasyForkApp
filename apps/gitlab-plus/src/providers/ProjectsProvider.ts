import { ProjectsResponse } from '../types/Project';
import { GitlabProvider } from './GitlabProvider';
import { projectsQuery } from './query/project';

export class ProjectsProvider extends GitlabProvider {
  async getProjects(workspacePath: string, search = '') {
    return this.queryCached<ProjectsResponse>(
      `projects-${workspacePath}-${search}`,
      projectsQuery,
      {
        fullPath: workspacePath,
        search,
      },
      search === '' ? 20 : 0.5
    );
  }
}
