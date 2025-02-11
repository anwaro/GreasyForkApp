import { useMemo } from 'preact/hooks';

import type { ComponentChild } from 'preact';

import { clsx } from '@utils/clsx';

import { GitlabIcon, GitlabIconNames, GitlabIconSize } from './GitlabIcon';
import { GitlabLoader } from './GitlabLoader';

type ButtonVariant = 'default' | 'info';

const buttonVariantClass: Record<ButtonVariant, string> = {
  default: '',
  info: 'btn-confirm',
};

type Props = {
  children?: ComponentChild;
  disabled?: boolean;
  icon?: GitlabIconNames;
  iconSize?: GitlabIconSize;
  isLoading?: boolean;
  onClick?: (e: Event) => void;
  title?: string;
  variant?: ButtonVariant;
};

export function GitlabButton({
  children,
  icon,
  iconSize = 12,
  isLoading,
  onClick,
  title,
  variant = 'default',
}: Props) {
  const IconComponent = useMemo(() => {
    if (isLoading) {
      return <GitlabLoader size={iconSize} />;
    }
    if (icon) {
      return <GitlabIcon icon={icon} size={iconSize} />;
    }
    return null;
  }, [icon, isLoading]);

  return (
    <button
      class={clsx('btn btn-sm gl-button', buttonVariantClass[variant])}
      onClick={onClick}
      title={title}
      type={'button'}
    >
      {children && <span class={'gl-button-text'}>{children}</span>}
      {IconComponent}
    </button>
  );
}
