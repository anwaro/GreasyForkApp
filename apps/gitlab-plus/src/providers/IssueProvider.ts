import { GitlabProvider } from './GitlabProvider';
import { issueMutation, issueQuery, issuesQuery } from './query/issue';
import {
  CreateIssueInput,
  CreateIssueLinkInput,
  CreateIssueResponse,
  IssueResponse,
  IssuesResponse,
  RelatedIssue,
} from '../types/Issue';

export class IssueProvider extends GitlabProvider {
  async getIssue(projectId: string, issueId: string) {
    return this.queryCached<IssueResponse>(
      `issue-${projectId}-${issueId}`,
      issueQuery,
      {
        projectPath: projectId,
        iid: issueId,
      },
      2
    );
  }

  async getIssues(projectId: string, search: string) {
    const searchById = !!search.match(/^\d+$/);

    return await this.query<IssuesResponse>(issuesQuery, {
      iid: searchById ? search : null,
      searchByIid: searchById,
      searchEmpty: !search,
      searchByText: Boolean(search),
      fullPath: projectId,
      searchTerm: search,
      includeAncestors: true,
      includeDescendants: true,
      types: ['ISSUE'],
      in: 'TITLE',
    });
  }

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
}
