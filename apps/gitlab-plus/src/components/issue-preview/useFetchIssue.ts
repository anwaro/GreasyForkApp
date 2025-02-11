import { useState } from 'preact/hooks';

import { GitlabIssueLink } from '../../helpers/LinkParser';
import { IssueProvider } from '../../providers/IssueProvider';
import { Issue, RelatedIssue } from '../../types/Issue';

type IssueData = {
  isLoading: boolean;
  issue: Issue | null;
  link: GitlabIssueLink | null;
};

type RelatedIssuesData = {
  isLoading: boolean;
  issues: RelatedIssue[];
};

const initialIssueData: IssueData = {
  isLoading: false,
  issue: null,
  link: null,
};

const initialRelatedIssuesData: RelatedIssuesData = {
  isLoading: false,
  issues: [],
};

export function useFetchIssue() {
  const [issue, setIssue] = useState(initialIssueData);
  const [relatedIssues, setRelatedIssues] = useState(initialRelatedIssuesData);

  const fetchIssue = async (link: GitlabIssueLink, force = false) => {
    setIssue({ ...initialIssueData, isLoading: true });

    const response = await new IssueProvider(force).getIssue(
      link.projectPath,
      link.issue
    );
    setIssue({
      isLoading: false,
      issue: response.data.project.issue,
      link,
    });
  };

  const fetchRelatedIssues = async (link: GitlabIssueLink, force = false) => {
    const relatedIssues = await new IssueProvider(force).getIssueLinks(
      link.projectPath,
      link.issue
    );
    setRelatedIssues({
      isLoading: false,
      issues: relatedIssues,
    });
  };

  const fetch = async (link: GitlabIssueLink, force = false) => {
    fetchIssue(link, force);
    fetchRelatedIssues(link, force);
  };

  const refetch = async () => {
    if (issue.link) {
      fetch(issue.link, true);
    }
  };

  const reset = () => {
    setIssue(initialIssueData);
    setRelatedIssues(initialRelatedIssuesData);
  };

  return {
    fetch,
    issue,
    refetch,
    relatedIssues,
    reset,
  };
}
