import { Issue } from '../../../types/Issue';
import { GitlabMergeRequest } from '../../common/GitlabMergeRequest';
import { IssueBlock } from './IssueBlock';

type Props = {
  issue: Issue;
};

export function IssueMergeRequests({ issue }: Props) {
  if (!issue.relatedMergeRequests.nodes.length) {
    return null;
  }

  return (
    <IssueBlock tile={'Merge requests'}>
      {issue.relatedMergeRequests.nodes.map((mr) => (
        <GitlabMergeRequest key={mr.iid} mr={mr} />
      ))}
    </IssueBlock>
  );
}
