import { GitlabBadge } from './GitlabBadge';

type Props = {
  isOpen: boolean;
};

export function IssueStatus({ isOpen }: Props) {
  return (
    <GitlabBadge
      icon={isOpen ? 'issue-open-m' : 'issue-close'}
      label={isOpen ? 'Open' : 'Closed'}
      variant={isOpen ? 'success' : 'info'}
    />
  );
}
