import { Issue, RelatedIssue } from '../../types/Issue';
import { GitlabLoader } from '../common/GitlabLoader';
import { IssueAssignee } from './blocks/IssueAssignee';
import { IssueHeader } from './blocks/IssueHeading';
import { IssueIteration } from './blocks/IssueIteration';
import { IssueLabels } from './blocks/IssueLabels';
import { IssueMergeRequests } from './blocks/IssueMergeRequests';
import { IssueMilestone } from './blocks/IssueMilestone';
import { IssueRelatedIssue } from './blocks/IssueRelatedIssue';

type Props = {
  issue: Issue | null;
  issueLoading: boolean;
  relatedIssues: RelatedIssue[];
  relatedIssuesLoading: boolean;
};

export function IssueModalContent({
  issue,
  issueLoading,
  relatedIssues,
  relatedIssuesLoading,
}: Props) {
  if (issueLoading) {
    return (
      <div class={'gl-flex gl-flex-1 gl-items-center gl-justify-center'}>
        <GitlabLoader size={'3em'} />
      </div>
    );
  }
  if (!issue) {
    return (
      <div class={'gl-flex gl-flex-1 gl-items-center gl-justify-center'}>
        <span>Error</span>
      </div>
    );
  }

  return (
    <div class={'gl-flex gl-flex-col'}>
      <IssueHeader issue={issue} />
      <IssueAssignee issue={issue} />
      <IssueLabels issue={issue} />
      <IssueMilestone issue={issue} />
      <IssueIteration issue={issue} />
      <IssueMergeRequests issue={issue} />
      <IssueRelatedIssue
        isLoading={relatedIssuesLoading}
        relatedIssues={relatedIssues}
      />
    </div>
  );
}
