import { useMemo } from 'preact/hooks';

import type { ComponentChild } from 'preact';

import { clsx } from '@utils/clsx';

import { Row } from './base/Row';
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
  isRefreshing?: boolean;
  parser: LinkParserFunction<LinkType>;
  reset: () => void;
};

export function PreviewModal<LinkType>({
  validator,
  children,
  fetch,
  isError,
  isLoading = false,
  isRefreshing = false,
  parser,
  reset,
}: Props<LinkType>) {
  const { hoverLink, hoverPosition, onLinkEnter, onLinkLeave, zIndex } =
    useOnLinkHover<LinkType>(parser, validator);
  const { isVisible, offset, ref } = usePreviewModal<LinkType>(
    hoverLink,
    fetch,
    reset,
    isLoading
  );

  const content = useMemo(() => {
    if (isLoading || !isVisible) {
      return <GitlabLoader size={'3em'} asOverlay />;
    }

    if (isError) {
      return (
        <Row className={'gl-flex-1'} items={'center'} justify={'center'}>
          Error
        </Row>
      );
    }

    return (
      <div className={'gl-flex gl-w-full gl-flex-col'}>
        {children}
        {isRefreshing && <GitlabLoader size={'3em'} asOverlay />}
      </div>
    );
  }, [isLoading, isRefreshing, isError, isVisible, children]);

  return (
    <div
      onMouseEnter={onLinkEnter}
      onMouseLeave={onLinkLeave}
      ref={ref}
      className={clsx(
        'popover gl-popover glp-preview-modal',
        isVisible && 'glp-modal-visible'
      )}
      style={{
        left: hoverPosition.x,
        top: hoverPosition.y,
        transform: `translate(-${offset.x}px, -${offset.y}px )`,
        zIndex,
      }}
    >
      {content}
    </div>
  );
}
