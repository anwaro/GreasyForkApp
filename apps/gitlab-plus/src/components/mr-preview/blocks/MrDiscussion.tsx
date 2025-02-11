import { useMemo } from 'preact/hooks';

import { MergeRequest } from '../../../types/Mr';
import { InfoBlock } from '../../common/bolck/InfoBlock';
import { GitlabBadge } from '../../common/GitlabBadge';

type Props = {
  mr: MergeRequest;
};

export function MrDiscussion({ mr }: Props) {
  if (!mr.resolvableDiscussionsCount) {
    return null;
  }

  const { label, title } = useMemo(() => {
    const plural = mr.resolvableDiscussionsCount !== 1 ? 's' : '';

    return {
      label: `${mr.resolvedDiscussionsCount} of ${mr.resolvableDiscussionsCount}`,
      title: `${mr.resolvedDiscussionsCount} of ${mr.resolvableDiscussionsCount} thread${plural} resolved`,
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
          variant={'muted'}
        />
      }
    />
  );
}
