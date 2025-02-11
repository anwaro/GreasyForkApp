import { Issue } from '../../../types/Issue';
import { InfoBlock } from '../../common/bolck/InfoBlock';
import { GitlabMergeRequest } from '../../common/GitlabMergeRequest';

type Props = {
  issue: Issue;
};

export function IssueMergeRequests({ issue }: Props) {
  if (!issue.relatedMergeRequests.nodes.length) {
    return null;
  }

  return (
    <InfoBlock title={'Merge requests'}>
      {issue.relatedMergeRequests.nodes.map((mr) => (
        <GitlabMergeRequest key={mr.iid} mr={mr} />
      ))}
    </InfoBlock>
  );
}
