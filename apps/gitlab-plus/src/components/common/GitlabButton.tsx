import { useMemo } from 'preact/hooks';

import type { ComponentChild } from 'preact';

import { clsx } from '@utils/clsx';

import { GitlabIcon, GitlabIconNames, GitlabIconSize } from './GitlabIcon';
import { GitlabLoader } from './GitlabLoader';

type ButtonVariant = 'default' | 'info' | 'tertiary';

const buttonVariantClass: Record<ButtonVariant, string> = {
  default: 'btn-default',
  info: 'btn-confirm',
  tertiary: 'btn-default-tertiary',
};

type Props = {
  children?: ComponentChild;
  className?: string;
  disabled?: boolean;
  icon?: GitlabIconNames;
  iconSize?: GitlabIconSize;
  isLoading?: boolean;
  onClick?: (e: Event) => void;
  size?: 'md' | 'sm';
  title?: string;
  variant?: ButtonVariant;
};

export function GitlabButton({
  children,
  className,
  icon,
  iconSize = 12,
  isLoading,
  onClick,
  size = 'sm',
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
      onClick={onClick}
      title={title}
      type={'button'}
      class={clsx(
        `btn btn-${size} gl-button`,
        buttonVariantClass[variant],
        className
      )}
    >
      {children && <span class={'gl-button-text'}>{children}</span>}
      {IconComponent}
    </button>
  );
}
