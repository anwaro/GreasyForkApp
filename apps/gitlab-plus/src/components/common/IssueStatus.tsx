import { clsx } from '@utils/clsx';

import { GitlabIcon } from './GitlabIcon';

type Props = {
  isOpen: boolean;
};

export function IssueStatus({ isOpen }: Props) {
  return (
    <span
      class={clsx(
        'gl-badge badge badge-pill',
        isOpen ? 'badge-success' : 'badge-info'
      )}
    >
      <GitlabIcon icon={isOpen ? 'issue-open-m' : 'issue-close'} size={16} />
      <span class={'gl-badge-content'}>{isOpen ? 'Open' : 'Closed'}</span>
    </span>
  );
}
