import { SvgComponent } from '@ui/SvgComponent';

export type IconNames =
  | ''
  | 'mobile-issue-close'
  | 'close-xs'
  | 'merge'
  | 'merge-request-close'
  | 'merge-request'
  | 'empty'
  | 'milestone'
  | 'iteration'
  | 'chevron-lg-down'
  | 'search'
  | 'issue-type-issue'
  | 'issue-close'
  | 'issue-open-m';

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
      classes: ['gl-icon gl-fill-current', size, ...cls].join(' '),
      children: {
        tag: 'use',
        attrs: {
          href: `${svgSprite}#${icon}`,
        },
      },
    });
  }
}
