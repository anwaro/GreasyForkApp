import { BadgeVariant, GitlabBadge } from './GitlabBadge';
import { GitlabIconNames } from './GitlabIcon';

export type MrState = 'closed' | 'locked' | 'merged' | 'opened';

const iconMap: Record<MrState, GitlabIconNames> = {
  closed: 'merge-request-close',
  locked: 'search',
  merged: 'merge',
  opened: 'merge-request',
};

const classMap: Record<MrState, BadgeVariant> = {
  closed: 'danger',
  locked: 'warning',
  merged: 'info',
  opened: 'success',
};

const labelMap: Record<MrState, string> = {
  closed: 'Closed',
  locked: 'Locked',
  merged: 'Merged',
  opened: 'Opened',
};

type Props = {
  state: MrState;
  withIcon?: boolean;
  withLabel?: boolean;
};

export function MrStatus({ state, withIcon, withLabel }: Props) {
  return (
    <GitlabBadge
      icon={withIcon ? iconMap[state] : undefined}
      label={withLabel ? labelMap[state] : undefined}
      variant={classMap[state]}
    />
  );
}
