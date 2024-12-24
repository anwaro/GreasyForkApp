import { Issue } from '../../../types/Issue';
import { _GitlabMR, GitlabMergeRequest } from '../../common/GitlabMergeRequest';
import { _IssueBlock, IssueBlock } from './IssueBlock';

export class _IssueMergeRequests extends _IssueBlock {
  constructor(issue: Issue) {
    super(
      'Merge requests',
      issue.relatedMergeRequests.nodes.map((mr) =>
        new _GitlabMR(mr).getElement()
      ),
      '',
      !!issue.relatedMergeRequests.nodes.length
    );
  }
}

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
