import { Issue } from '../../../types/Issue';
import { ListBlock } from '../../common/block/ListBlock';
import { GitlabMergeRequest } from '../../common/GitlabMergeRequest';

type Props = {
  issue: Issue;
};

export function IssueMergeRequests({ issue }: Props) {
  return (
    <ListBlock
      icon={'merge-request'}
      itemId={(mr) => mr.iid}
      items={issue.relatedMergeRequests.nodes}
      renderItem={(mr) => <GitlabMergeRequest mr={mr} />}
      title={'Merge requests'}
    />
  );
}
