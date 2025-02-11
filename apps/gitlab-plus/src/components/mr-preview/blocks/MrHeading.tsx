import { MergeRequest } from '../../../types/Mr';
import { Row } from '../../common/base/Row';
import { HeadingBlock } from '../../common/bolck/HeadingBlock';
import { GitlabBadge } from '../../common/GitlabBadge';
import { GitlabIcon } from '../../common/GitlabIcon';
import { MrStatus } from '../../common/MrStatus';

type Props = {
  mr: MergeRequest;
};

export function MrHeader({ mr }: Props) {
  return (
    <HeadingBlock
      author={mr.author}
      createdAt={mr.createdAt}
      entityId={`!${mr.iid}`}
      icon={'merge-request'}
      title={mr.titleHtml}
      badge={
        <Row className={'gl-gap-2'} items={'center'}>
          <MrStatus state={mr.state} withIcon withLabel />
          {Boolean(mr.approvedBy.nodes.length) && (
            <GitlabBadge
              icon={'check-circle'}
              label={'Approved'}
              variant={'success'}
            />
          )}
          {mr.conflicts && (
            <GitlabIcon
              icon={'warning-solid'}
              size={16}
              title={'Merge request can not be merged'}
            />
          )}
        </Row>
      }
    />
  );
}
