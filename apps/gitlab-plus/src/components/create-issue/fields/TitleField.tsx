import { clsx } from '@utils/clsx';

type Props = {
  error?: string;
  onChange: (value: string) => void;
  value: string;
};

export function TitleField({ error, onChange, value }: Props) {
  return (
    <input
      class={clsx(
        'gl-form-input form-control',
        error && 'gl-field-error-outline'
      )}
      onInput={(e) => onChange((e.target as HTMLInputElement).value)}
      placeholder={'Add a title'}
      value={value}
    />
  );
}
