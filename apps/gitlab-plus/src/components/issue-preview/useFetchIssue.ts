import { useState } from 'preact/hooks';

import { GitlabIssueLink } from '../../helpers/LinkParser';
import { IssueProvider } from '../../providers/IssueProvider';
import { Issue, RelatedIssue } from '../../types/Issue';

type IssueData = {
  isLoading: boolean;
  issue: Issue | null;
};

type RelatedIssuesData = {
  isLoading: boolean;
  issues: RelatedIssue[];
};

const initialIssueData: IssueData = {
  isLoading: false,
  issue: null,
};

const initialRelatedIssuesData: RelatedIssuesData = {
  isLoading: false,
  issues: [],
};

const issueProvider = new IssueProvider();

export function useFetchIssue() {
  const [issue, setIssue] = useState(initialIssueData);
  const [relatedIssues, setRelatedIssues] = useState(initialRelatedIssuesData);

  const fetch = async (link: GitlabIssueLink) => {
    setIssue({ ...initialIssueData, isLoading: true });
    setRelatedIssues({ ...initialRelatedIssuesData, isLoading: true });

    const response = await issueProvider.getIssue(link.projectPath, link.issue);
    setIssue({
      isLoading: false,
      issue: response.data.project.issue,
    });

    const relatedIssues = await issueProvider.getIssueLinks(
      response.data.project.id.replace(/\D/g, ''),
      response.data.project.issue.iid
    );
    setRelatedIssues({
      isLoading: false,
      issues: relatedIssues,
    });
  };

  const reset = () => {
    setIssue(initialIssueData);
    setRelatedIssues(initialRelatedIssuesData);
  };

  return {
    fetch,
    issue,
    relatedIssues,
    reset,
  };
}
