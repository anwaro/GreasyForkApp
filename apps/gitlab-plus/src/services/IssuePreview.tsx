import { IssuePreviewModal } from '../components/issue-preview/IssuePreviewModal';
import { ServiceName } from '../consts/ServiceName';
import { RendererHelper } from '../helpers/RendererHelper';
import { BaseService } from './BaseService';

export class IssuePreview extends BaseService {
  public name = ServiceName.IssuePreview;

  public init() {
    RendererHelper.renderInBody(
      'glp-issue-preview-root',
      <IssuePreviewModal />
    );
  }
}
