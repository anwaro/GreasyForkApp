import { render } from 'preact';

import { IssuePreviewModal } from '../components/issue-preview/IssuePreviewModal';
import { BaseService } from './BaseService';
import { ServiceName } from './ServiceName';

export class IssuePreview extends BaseService {
  public name = ServiceName.IssuePreview;

  public init() {
    render(<IssuePreviewModal />, this.rootBody('glp-issue-preview-root'));
  }
}
