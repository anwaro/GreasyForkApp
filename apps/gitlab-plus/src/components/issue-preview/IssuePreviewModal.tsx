import { GitlabIssueLink, LinkParser } from '../../helpers/LinkParser';
import { PreviewModal } from '../common/PreviewModal';
import { IssueAssignee } from './blocks/IssueAssignee';
import { IssueEpic } from './blocks/IssueEpic';
import { IssueHeader } from './blocks/IssueHeading';
import { IssueIteration } from './blocks/IssueIteration';
import { IssueLabels } from './blocks/IssueLabels';
import { IssueMergeRequests } from './blocks/IssueMergeRequests';
import { IssueMilestone } from './blocks/IssueMilestone';
import { IssueRelatedIssue } from './blocks/IssueRelatedIssue';
import { useFetchIssue } from './useFetchIssue';

export function IssuePreviewModal() {
  const { fetch, issue, refetch, relatedIssues, reset } = useFetchIssue();

  return (
    <PreviewModal<GitlabIssueLink>
      validator={LinkParser.validateIssueLink}
      fetch={fetch}
      isError={!issue}
      isLoading={issue.isLoading}
      parser={LinkParser.parseIssueLink}
      reset={reset}
    >
      {issue.issue && (
        <>
          <IssueHeader issue={issue.issue} />
          <IssueAssignee issue={issue.issue} />
          <IssueLabels
            issue={issue.issue}
            projectPath={issue.link?.projectPath}
            refetch={refetch}
          />
          <IssueEpic issue={issue.issue} />
          <IssueMilestone issue={issue.issue} />
          <IssueIteration issue={issue.issue} />
          <IssueMergeRequests issue={issue.issue} />
        </>
      )}
      <IssueRelatedIssue
        isLoading={relatedIssues.isLoading}
        relatedIssues={relatedIssues.issues}
      />
    </PreviewModal>
  );
}
