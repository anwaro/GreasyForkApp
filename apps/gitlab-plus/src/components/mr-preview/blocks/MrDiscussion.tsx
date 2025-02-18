import { useMemo } from 'preact/hooks';

import { MergeRequest } from '../../../types/Mr';
import { InfoBlock } from '../../common/block/InfoBlock';
import { GitlabBadge } from '../../common/GitlabBadge';

type Props = {
  mr: MergeRequest;
};

export function MrDiscussion({ mr }: Props) {
  const [resolved, total] = [
    mr.resolvedDiscussionsCount,
    mr.resolvableDiscussionsCount,
  ];
  if (!total) {
    return null;
  }

  const { label, title } = useMemo(() => {
    const plural = total !== 1 ? 's' : '';

    return {
      label: `${resolved} of ${total}`,
      title: `${resolved} of ${total} thread${plural} resolved`,
    };
  }, [mr]);

  return (
    <InfoBlock
      title={'Discussion'}
      rightTitle={
        <GitlabBadge
          icon={'comments'}
          label={label}
          title={title}
          variant={resolved === total ? 'success' : 'muted'}
        />
      }
    />
  );
}
