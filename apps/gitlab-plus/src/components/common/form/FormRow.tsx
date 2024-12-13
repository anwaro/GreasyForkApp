import type { ReactNode } from 'preact/compat';

type Props = {
  children: ReactNode;
};

export function FormRow({ children }: Props) {
  return <div class={'gl-flex gl-gap-x-3'}>{children}</div>;
}
