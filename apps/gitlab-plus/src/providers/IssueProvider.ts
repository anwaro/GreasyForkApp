import {
  CreateIssueInput,
  CreateIssueLinkInput,
  CreateIssueResponse,
  IssueResponse,
  IssueSetEpicInput,
  IssuesResponse,
  RelatedIssue,
} from '../types/Issue';
import { GitlabProvider } from './GitlabProvider';
import {
  issueMutation,
  issueQuery,
  issueSetEpicMutation,
  issuesQuery,
} from './query/issue';

export class IssueProvider extends GitlabProvider {
  async createIssue(input: CreateIssueInput) {
    return await this.query<CreateIssueResponse>(issueMutation, { input });
  }

  async createIssueRelation(input: CreateIssueLinkInput) {
    const path = [
      'projects/:PROJECT_ID',
      '/issues/:ISSUE_ID/links',
      '?target_project_id=:TARGET_PROJECT_ID',
      '&target_issue_iid=:TARGET_ISSUE_IID',
      '&link_type=:LINK_TYPE',
    ]
      .join('')
      .replace(':PROJECT_ID', `${input.projectId}`)
      .replace(':ISSUE_ID', `${input.issueId}`)
      .replace(':TARGET_PROJECT_ID', input.targetProjectId)
      .replace(':TARGET_ISSUE_IID', input.targetIssueIid)
      .replace(':LINK_TYPE', input.linkType);

    return await this.post(path, {});
  }

  async getIssue(projectId: string, issueId: string) {
    return this.queryCached<IssueResponse>(
      `issue-${projectId}-${issueId}`,
      issueQuery,
      {
        iid: issueId,
        projectPath: projectId,
      },
      2
    );
  }

  async getIssueLinks(projectId: string, issueId: string) {
    const path = 'projects/:PROJECT_ID/issues/:ISSUE_ID/links'
      .replace(':PROJECT_ID', `${projectId}`)
      .replace(':ISSUE_ID', `${issueId}`);

    return await this.getCached<RelatedIssue[]>(
      `issue-${projectId}-${issueId}-links`,
      path,
      2
    );
  }

  async getIssues(projectId: string, search: string) {
    const searchById = !!search.match(/^\d+$/);

    return await this.query<IssuesResponse>(issuesQuery, {
      iid: searchById ? search : null,
      searchByIid: searchById,
      fullPath: projectId,
      in: 'TITLE',
      includeAncestors: true,
      includeDescendants: true,
      searchByText: Boolean(search),
      searchEmpty: !search,
      searchTerm: search,
      types: ['ISSUE'],
    });
  }

  async issueSetEpic(issueId: string, epicId: string) {
    return await this.query(issueSetEpicMutation, {
      input: {
        hierarchyWidget: {
          parentId: epicId,
        },
        id: issueId,
      },
    } satisfies IssueSetEpicInput);
  }
}
