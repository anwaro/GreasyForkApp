import { render } from 'preact';

import { IssuePreviewModal } from '../components/issue-preview/IssuePreviewModal';
import { ServiceName } from '../consts/ServiceName';
import { BaseService } from './BaseService';

export class IssuePreview extends BaseService {
  public name = ServiceName.IssuePreview;

  public init() {
    render(<IssuePreviewModal />, this.rootBody('glp-issue-preview-root'));
  }
}
