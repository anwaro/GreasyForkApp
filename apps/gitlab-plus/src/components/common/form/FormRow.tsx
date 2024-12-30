import type { ComponentChild } from 'preact';

type Props = {
  children: ComponentChild;
};

export function FormRow({ children }: Props) {
  return <div class={'gl-flex gl-gap-x-3'}>{children}</div>;
}
