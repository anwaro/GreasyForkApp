import { CurrentUsersResponse, UsersResponse } from '../types/User';
import { GitlabProvider } from './GitlabProvider';
import { currentUserQuery, userQuery } from './query/user';

export class UsersProvider extends GitlabProvider {
  async getCurrentUser() {
    return this.queryCached<CurrentUsersResponse>(
      'gitlab-current-user',
      currentUserQuery,
      {},
      60
    );
  }

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
