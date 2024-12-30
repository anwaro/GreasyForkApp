import { clsx } from '@utils/clsx';

export type GitlabIconNames =
  | ''
  | 'chevron-lg-down'
  | 'chevron-lg-up'
  | 'close-xs'
  | 'empty'
  | 'issue-close'
  | 'issue-open-m'
  | 'issue-type-issue'
  | 'iteration'
  | 'merge'
  | 'merge-request'
  | 'merge-request-close'
  | 'milestone'
  | 'mobile-issue-close'
  | 'plus'
  | 'search';

const buildId =
  '236e3b687d786d9dfe4709143a94d4c53b8d5a1f235775401e5825148297fa84';

declare global {
  type Gonn = { sprite_icons: string };
  var unsafeWindow: { gon: Gonn };
}

type Props = {
  className?: string;
  icon: GitlabIconNames;
  size?: 12 | 14 | 16 | 24;
};

const iconUrl = (icon: GitlabIconNames) => {
  const svgSprite =
    unsafeWindow.gon?.sprite_icons || `/assets/icons-${buildId}.svg`;
  return `${svgSprite}#${icon}`;
};

export function GitlabIcon({ className, icon, size = 12 }: Props) {
  return (
    <svg className={clsx('gl-icon gl-fill-current', `s${size}`, className)}>
      <use href={iconUrl(icon)} />
    </svg>
  );
}
