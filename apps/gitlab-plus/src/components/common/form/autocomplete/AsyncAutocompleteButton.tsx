import { useMemo } from 'preact/hooks';

import type { ReactNode } from 'preact/compat';

import { Component } from '@ui/Component';
import { Dom } from '@ui/Dom';

import { GitlabIcon, GitlabIconNames } from '../../GitlabIcon';
import { IconComponent } from '../../IconComponent';
import { OptionItem } from './types';
import { useAsyncAutocompleteButton } from './useAsyncAutocompleteButton';

export class _AsyncAutocompleteInput<
  D extends OptionItem
> extends Component<'button'> {
  private readonly buttonLabel = Dom.element(
    'span',
    'gl-new-dropdown-button-text'
  );
  private icon = Dom.create({
    tag: 'span',
    children: [new IconComponent('chevron-lg-down', 's16').getElement()],
  });

  constructor(
    private renderLabel: (items: D[]) => HTMLElement,
    setVisible: (visible: boolean) => void,
    private reset: () => void
  ) {
    super('button', {
      attrs: {
        type: 'button',
      },
      classes:
        'btn btn-default btn-md btn-block gl-button gl-new-dropdown-toggle',
      events: {
        click: () => setVisible(true),
      },
    });

    document.body.addEventListener('click', (e) => {
      if (
        e.target !== this.element &&
        !this.element.contains(e.target as Node)
      ) {
        setVisible(false);
      }
    });

    this.element.append(this.buttonInner());
  }

  render(items: D[]) {
    this.buttonLabel.replaceChildren(this.renderLabel(items));
    const icon = new IconComponent(
      items.length ? 'close-xs' : 'chevron-lg-down',
      's16'
    ).getElement();
    if (items.length) {
      icon.addEventListener('click', (e: Event) => {
        e.preventDefault();
        this.reset();
      });
    }
    this.icon.replaceChildren(icon);
  }

  private buttonInner() {
    return Dom.create({
      tag: 'span',
      children: [this.buttonLabel, this.icon],
      classes: 'gl-button-text gl-w-full',
    });
  }
}

type Props<D extends OptionItem> = {
  isOpen: boolean;
  renderLabel: (value: D[]) => ReactNode;
  reset: () => void;
  setIsOpen: (isOpen: boolean) => void;
  value: D[];
};

export function AsyncAutocompleteButton<D extends OptionItem>({
  isOpen,
  renderLabel,
  reset,
  setIsOpen,
  value,
}: Props<D>) {
  const ref = useAsyncAutocompleteButton(() => setIsOpen(false));

  const icon = useMemo((): GitlabIconNames => {
    if (value.length) {
      return 'close-xs';
    }

    return isOpen ? 'chevron-lg-up' : 'chevron-lg-down';
  }, [isOpen, value]);

  return (
    <button
      class={
        'btn btn-default btn-md btn-block gl-button gl-new-dropdown-toggle'
      }
      onClick={(e) => {
        e.preventDefault();
        setIsOpen(true);
      }}
      ref={ref}
      type={'button'}
    >
      <span class={'gl-button-text gl-w-full'}>
        <span class={'gl-new-dropdown-button-text'}>{renderLabel(value)}</span>
        <span
          onClick={(e) => {
            if (value.length) {
              e.preventDefault();
              reset();
            }
          }}
        >
          <GitlabIcon icon={icon} size={16} />
        </span>
      </span>
    </button>
  );
}
