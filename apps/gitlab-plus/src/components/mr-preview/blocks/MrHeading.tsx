import { useMemo } from 'preact/hooks';

import { textWithChild } from '@utils/textWithChild';

import { MergeRequest } from '../../../types/Mr';
import { Link } from '../../common/base/Link';
import { Row } from '../../common/base/Row';
import { HeadingBlock } from '../../common/block/HeadingBlock';
import { GitlabBadge } from '../../common/GitlabBadge';
import { GitlabIcon } from '../../common/GitlabIcon';
import { MrStatus } from '../../common/MrStatus';

type Props = {
  mr: MergeRequest;
  onRefresh: () => void;
};

export function MrHeader({ mr, onRefresh }: Props) {
  const title = useMemo(() => {
    const issueLink = (id: string) =>
      `${mr.project.webUrl}/-/issues/${id.replace(/\D+/g, '')}`;

    return textWithChild(mr.title, /#\d+/, (id) => (
      <Link href={issueLink(id)} inline>
        {id}
      </Link>
    ));
  }, [mr]);

  return (
    <HeadingBlock
      author={mr.author}
      createdAt={mr.createdAt}
      entityId={`!${mr.iid}`}
      icon={'merge-request'}
      link={mr.webUrl}
      onRefresh={onRefresh}
      title={title}
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
