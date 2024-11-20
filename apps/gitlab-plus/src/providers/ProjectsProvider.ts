import { GitlabProvider } from './GitlabProvider';
import { projectsQuery } from './query/project';
import { ProjectsResponse } from '../types/Project';

export class ProjectsProvider extends GitlabProvider {
  async getProjects(projectId: string, search: string = '') {
    return this.queryCached<ProjectsResponse>(
      `projects-${projectId}-${search}`,
      projectsQuery,
      {
        fullPath: projectId,
        search,
      },
      search === '' ? 20 : 0.5
    );
  }
}
