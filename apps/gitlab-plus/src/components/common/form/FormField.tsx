import type { ReactNode } from 'preact/compat';

import { Component } from '@ui/Component';
import { clsx } from '@utils/clsx';

export class _FormField extends Component<'fieldset'> {
  constructor(title: string, input: HTMLElement, hint = '') {
    super('fieldset', {
      children: [
        {
          tag: 'legend',
          children: title,
          classes: 'bv-no-focus-ring col-form-label pt-0 col-form-label',
        },
        input,
        {
          tag: 'small',
          children: hint,
        },
      ],
      classes: 'form-group gl-form-group gl-w-full is-valid',
    });
  }
}

type Props = {
  children: ReactNode;
  error?: string;
  hint?: string;
  title: string;
};

export function FormField({ children, error, hint, title }: Props) {
  return (
    <fieldset
      class={clsx(
        'form-group gl-form-group gl-w-full',
        error && 'gl-show-field-errors'
      )}
    >
      <legend class={'bv-no-focus-ring col-form-label pt-0 col-form-label'}>
        {title}
      </legend>
      {children}
      {Boolean(!error && hint) && <small>{hint}</small>}
      {Boolean(error) && <small class={'gl-field-error'}>{error}</small>}
    </fieldset>
  );
}
