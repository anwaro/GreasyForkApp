import { MergeRequest } from '../../types/Issue';
import { GitlabIcon, GitlabIconNames } from './GitlabIcon';
import { GitlabUser } from './GitlabUser';

const iconMap: Record<MergeRequest['state'], GitlabIconNames> = {
  closed: 'merge-request-close',
  locked: 'search',
  merged: 'merge',
  opened: 'merge-request',
};

type Props = {
  mr: MergeRequest;
};

export function GitlabMergeRequest({ mr }: Props) {
  return (
    <div style={{ marginTop: 10 }}>
      <div class={'item-title gl-flex gl-min-w-0 gl-gap-3'}>
        <GitlabIcon
          icon={iconMap[mr.state] || ''}
          className={'merge-request-status'}
          size={16}
        />
        <span class={'gl-text-gray-500'}>!{mr.iid}</span>
        <GitlabUser withLink size={16} user={mr.author} />
      </div>
      <a
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        class={'gl-block gl-link sortable-link'}
        href={mr.webUrl}
      >
        {mr.title}
      </a>
    </div>
  );
}
