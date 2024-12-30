
import type { ComponentChild } from 'preact';

import { clsx } from '@utils/clsx';

type Props = {
  children: ComponentChild;
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
