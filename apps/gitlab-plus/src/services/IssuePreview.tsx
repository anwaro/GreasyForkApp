import { render } from 'preact';

import { IssuePreviewModal } from '../components/issue-preview/IssuePreviewModal';
import { Service } from '../types/Service';

export class IssuePreview extends Service {
  public init() {
    render(<IssuePreviewModal />, this.rootBody('glp-issue-preview-root'));
  }
}
