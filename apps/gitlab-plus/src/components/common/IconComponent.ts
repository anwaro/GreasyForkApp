import { SvgComponent } from '@ui/SvgComponent';

export type IconNames =
  | ''
  | 'chevron-lg-down'
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
  | 'search';

const buildId =
  '236e3b687d786d9dfe4709143a94d4c53b8d5a1f235775401e5825148297fa84';

declare global {
  type Gon = { sprite_icons: string };
  var unsafeWindow: { gon: Gon };
}

export class IconComponent extends SvgComponent<'svg'> {
  constructor(icon: IconNames, size = 's12', ...cls: string[]) {
    const svgSprite =
      unsafeWindow.gon?.sprite_icons || `/assets/icons-${buildId}.svg`;
    super('svg', {
      children: {
        tag: 'use',
        attrs: {
          href: `${svgSprite}#${icon}`,
        },
      },
      classes: ['gl-icon gl-fill-current', size, ...cls].join(' '),
    });
  }
}
