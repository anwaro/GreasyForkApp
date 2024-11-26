import { Label } from '../../types/Label';
import { IconComponent } from './IconComponent';
import { Component } from '@ui/Component';
import { Dom, HtmlData } from '@ui/Dom';

export class LabelComponent extends Component<'span'> {
  constructor(label: Label, onRemove?: () => void) {
    super('span');
    this.setClasses(label);
    this.element.append(...this.html(label, onRemove));
  }

  html(label: Label, onRemove?: () => void) {
    const [scope, text] = label.title.split('::');
    const items: HtmlData[] = [
      {
        tag: 'span',
        classes: 'gl-label-text',
        children: scope,
      },
    ];

    if (text) {
      items.push({
        tag: 'span',
        classes: 'gl-label-text-scoped',
        children: text,
      });
    }

    const elements = [
      Dom.create({
        tag: 'span',
        classes: 'gl-link gl-label-link gl-label-link-underline',
        children: items,
      }),
    ];

    if (onRemove) {
      elements.push(
        Dom.create({
          tag: 'button',
          classes:
            'btn gl-label-close !gl-p-0 btn-reset btn-sm gl-button btn-reset-tertiary',
          attrs: {
            type: 'button',
          },
          events: { click: onRemove },
          children: {
            tag: 'span',
            classes: 'gl-button-text',
            children: new IconComponent('close-xs'),
          },
        })
      );
    }

    return elements;
  }

  private setClasses(label: Label) {
    this.addClassName(
      'gl-label',
      'hide-collapsed',
      label.textColor === '#FFFFFF'
        ? 'gl-label-text-light'
        : 'gl-label-text-dark'
    );

    if (label.title.includes('::')) {
      this.addClassName('gl-label-scoped');
    }

    this.element.style.setProperty('--label-background-color', label.color);
    this.element.style.setProperty(
      '--label-inset-border',
      `inset 0 0 0 2px ${label.color}`
    );
  }
}
