import { UsersResponse } from '../types/User';
import { GitlabProvider } from './GitlabProvider';
import { userQuery } from './query/user';

export class UsersProvider extends GitlabProvider {
  async getUsers(projectId: string, search = '') {
    return this.queryCached<UsersResponse>(
      `users-${projectId}-${search}`,
      userQuery,
      {
        fullPath: projectId,
        search,
      },
      search === '' ? 20 : 0.5
    );
  }
}
