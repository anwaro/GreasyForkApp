import { SvgComponent } from '@ui/SvgComponent';

export type IconNames =
  | ''
  | 'mobile-issue-close'
  | 'close-xs'
  | 'merge'
  | 'merge-request-close'
  | 'merge-request'
  | 'empty'
  | 'chevron-lg-down'
  | 'search'
  | 'issue-type-issue'
  | 'issue-close'
  | 'issue-open-m';

export class IconComponent extends SvgComponent<'svg'> {
  constructor(icon: IconNames, size: string = 's12', ...cls: string[]) {
    super('svg', {
      classes: ['gl-icon gl-fill-current', size, ...cls].join(' '),
      children: {
        tag: 'use',
        attrs: {
          href: `/assets/icons-236e3b687d786d9dfe4709143a94d4c53b8d5a1f235775401e5825148297fa84.svg#${icon}`,
        },
      },
    });
  }
}
