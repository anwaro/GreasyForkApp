import type { ComponentChild } from 'preact';

type Props = {
  children: ComponentChild;
  className?: string;
  tile: string;
};

export function IssueBlock({ children, className, tile }: Props) {
  return (
    <div class={'glp-block'}>
      <div
        class={
          'gl-flex gl-items-center gl-font-bold gl-leading-20 gl-text-gray-900'
        }
      >
        {tile}
      </div>
      <div class={className}>{children}</div>
    </div>
  );
}
