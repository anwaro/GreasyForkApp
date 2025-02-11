import { GitlabIcon, GitlabIconNames } from './GitlabIcon';

export type BadgeVariant = 'danger' | 'info' | 'muted' | 'success' | 'warning';

type Props = {
  icon?: GitlabIconNames;
  label?: string;
  title?: string;
  variant: BadgeVariant;
};

export function GitlabBadge({ icon, label, title, variant }: Props) {
  return (
    <span
      className={`gl-badge badge badge-pill badge-${variant}`}
      title={title}
    >
      {icon && <GitlabIcon icon={icon} />}
      {label && <span className="gl-badge-content">{label}</span>}
    </span>
  );
}
