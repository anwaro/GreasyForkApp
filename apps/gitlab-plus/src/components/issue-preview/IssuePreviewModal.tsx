import { GitlabIssueLink, LinkParser } from '../../helpers/LinkParser';
import { PreviewModal } from '../common/modal/PreviewModal';
import { IssueAssignees } from './blocks/IssueAssignees';
import { IssueEpic } from './blocks/IssueEpic';
import { IssueHeader } from './blocks/IssueHeading';
import { IssueIteration } from './blocks/IssueIteration';
import { IssueLabels } from './blocks/IssueLabels';
import { IssueMergeRequests } from './blocks/IssueMergeRequests';
import { IssueMilestone } from './blocks/IssueMilestone';
import { IssueRelatedIssue } from './blocks/IssueRelatedIssue';
import { useFetchIssue } from './useFetchIssue';

export function IssuePreviewModal() {
  const { entityData, fetch, isLoading, isRefreshing, onRefresh, reset } =
    useFetchIssue();

  return (
    <PreviewModal<GitlabIssueLink>
      validator={LinkParser.validateIssueLink}
      fetch={fetch}
      isError={!entityData}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      parser={LinkParser.parseIssueLink}
      reset={reset}
    >
      {entityData && (
        <>
          <IssueHeader issue={entityData.entity} onRefresh={onRefresh} />
          <IssueAssignees
            issue={entityData.entity}
            link={entityData.link}
            refetch={onRefresh}
          />
          <IssueLabels
            issue={entityData.entity}
            link={entityData.link}
            refetch={onRefresh}
          />
          <IssueEpic issue={entityData.entity} />
          <IssueMilestone issue={entityData.entity} />
          <IssueIteration issue={entityData.entity} />
          <IssueMergeRequests issue={entityData.entity} />
          <IssueRelatedIssue issue={entityData.entity} />
        </>
      )}
    </PreviewModal>
  );
}
