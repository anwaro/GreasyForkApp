import {
  CreateIssueInput,
  CreateIssueLinkInput,
  CreateIssueResponse,
  IssueResponse,
  IssueSetEpicInput,
  IssueSetLabelsInput,
  IssuesResponse,
  IssueWithIssuesLabelsResponse,
} from '../types/Issue';
import { GitlabProvider } from './GitlabProvider';
import {
  issueMutation,
  issueQuery,
  issueSetEpicMutation,
  issueSetLabelsMutation,
  issuesQuery,
  issueWithRelatedIssuesLabelsQuery,
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

  async getIssue(projectPath: string, iid: string) {
    return this.queryCached<IssueResponse>(
      `issue-${projectPath}-${iid}`,
      issueQuery,
      {
        iid,
        projectPath,
      },
      2
    );
  }

  async getIssues(projectPath: string, search: string) {
    const searchById = !!search.match(/^\d+$/);

    return await this.query<IssuesResponse>(issuesQuery, {
      iid: searchById ? search : null,
      searchByIid: searchById,
      fullPath: projectPath,
      in: 'TITLE',
      includeAncestors: true,
      includeDescendants: true,
      searchByText: Boolean(search),
      searchEmpty: !search,
      searchTerm: search,
      types: ['ISSUE'],
    });
  }

  async getIssueWithRelatedIssuesLabels(projectPath: string, iid: string) {
    return this.queryCached<IssueWithIssuesLabelsResponse>(
      `issue-related-issues-${projectPath}-${iid}`,
      issueWithRelatedIssuesLabelsQuery,
      {
        iid,
        projectPath,
      },
      0.02
    );
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

  async issueSetLabels(input: IssueSetLabelsInput['input']) {
    return await this.query(issueSetLabelsMutation, {
      input,
    } satisfies IssueSetLabelsInput);
  }
}
