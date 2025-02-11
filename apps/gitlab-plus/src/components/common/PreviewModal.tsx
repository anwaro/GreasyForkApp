import { useMemo } from 'preact/hooks';

import type { ComponentChild } from 'preact';

import { clsx } from '@utils/clsx';

import { GitlabLoader } from './GitlabLoader';
import {
  LinkParserFunction,
  LinkValidatorFunction,
  useOnLinkHover,
} from './useOnLinkHover';
import { FetchFunction, usePreviewModal } from './usePreviewModal';

export type Position = {
  x: number;
  y: number;
};

type Props<LinkType> = {
  validator: LinkValidatorFunction;
  children: ComponentChild;
  fetch: FetchFunction<LinkType>;
  isError?: boolean;
  isLoading?: boolean;
  parser: LinkParserFunction<LinkType>;
  reset: () => void;
};

export function PreviewModal<LinkType>({
  validator,
  children,
  fetch,
  isError,
  isLoading = false,
  parser,
  reset,
}: Props<LinkType>) {
  const { hoverLink, hoverPosition, onLinkEnter, onLinkLeave } =
    useOnLinkHover<LinkType>(parser, validator);
  const { isVisible, offset, ref } = usePreviewModal<LinkType>(
    hoverLink,
    fetch,
    reset,
    isLoading
  );

  const content = useMemo(() => {
    if (isLoading || !isVisible) {
      return (
        <div class={'gl-flex gl-flex-1 gl-items-center gl-justify-center'}>
          <GitlabLoader size={'3em'} />
        </div>
      );
    }
    if (isError) {
      return (
        <div class={'gl-flex gl-flex-1 gl-items-center gl-justify-center'}>
          <span>Error</span>
        </div>
      );
    }
    return <div className={'gl-flex gl-w-full gl-flex-col'}>{children}</div>;
  }, [isLoading, isError, isVisible, children]);

  return (
    <div
      onMouseEnter={onLinkEnter}
      onMouseLeave={onLinkLeave}
      ref={ref}
      className={clsx(
        'glp-issue-preview-modal',
        isVisible && 'glp-modal-visible'
      )}
      style={{
        left: hoverPosition.x,
        top: hoverPosition.y,
        transform: `translate(-${offset.x}px, -${offset.y}px )`,
      }}
    >
      {content}
    </div>
  );
}
