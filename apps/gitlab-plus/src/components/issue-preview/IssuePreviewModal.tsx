import { clsx } from '@utils/clsx';

import { IssueModalContent } from './IssueModalContent';
import { useIssuePreviewModal } from './useIssuePreviewModal';

export function IssuePreviewModal() {
  const { issue, isVisible, ref, relatedIssues } = useIssuePreviewModal();

  return (
    <div
      class={clsx('glp-issue-preview-modal', isVisible && 'glp-modal-visible')}
      ref={ref}
    >
      <IssueModalContent
        issueLoading={issue.isLoading}
        relatedIssuesLoading={relatedIssues.isLoading}
        issue={issue.issue}
        relatedIssues={relatedIssues.issues}
      />
    </div>
  );
}
