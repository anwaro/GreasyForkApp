import { EpicStatusSelect } from '../components/epic-status-select/EpicStatusSelect';
import { ServiceName } from '../consts/ServiceName';
import { LinkParser } from '../helpers/LinkParser';
import { RendererHelper } from '../helpers/RendererHelper';
import { BaseService } from './BaseService';
import { DrawerWorkItemStatus } from './DrawerWorkItemStatus';

export class EpicStatus extends BaseService {
  public name = ServiceName.EpicStatus;

  public init() {
    this.setup(
      this.initEpicStatusSelect.bind(this),
      LinkParser.validateEpicLink
    );

    new DrawerWorkItemStatus('epic', LinkParser.parseEpicLink, (link) => (
      <EpicStatusSelect link={link} />
    ));
  }

  private initEpicStatusSelect() {
    this.ready = RendererHelper.renderWithLink(
      'glp-epic-status-select',
      '[data-testid="work-item-labels"] [data-testid="edit-button"]',
      LinkParser.parseEpicLink,
      (link) => <EpicStatusSelect link={link} />,
      'after'
    );
  }
}
