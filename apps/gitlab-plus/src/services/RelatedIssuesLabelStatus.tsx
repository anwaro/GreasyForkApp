import { GitlabLabel } from '../components/common/GitlabLabel';
import { ServiceName } from '../consts/ServiceName';
import { LabelHelper } from '../helpers/LabelHelper';
import { GitlabIssueLink, LinkParser } from '../helpers/LinkParser';
import { RendererHelper } from '../helpers/RendererHelper';
import { IssueProvider } from '../providers/IssueProvider';
import { Label } from '../types/Label';
import { BaseService } from './BaseService';

export class RelatedIssuesLabelStatus extends BaseService {
  public name = ServiceName.RelatedIssuesLabelStatus;

  public init() {
    this.setup(this.initIssuesList.bind(this), LinkParser.validateIssueLink);
  }

  private initIssuesList() {
    const lists = document.querySelectorAll<HTMLUListElement>(
      '#related-issues .related-items-list'
    );
    const link = LinkParser.parseIssueLink(window.location.href);

    if (!lists.length || !link) {
      return;
    }
    this.ready = true;

    const items = [...lists].flatMap((list) => [
      ...list.querySelectorAll<HTMLLIElement>('li'),
    ]);

    this.updateIssuesItem(link, items);
  }

  private async updateIssuesItem(
    link: GitlabIssueLink,
    items: HTMLLIElement[]
  ) {
    const response = await new IssueProvider().getIssueWithRelatedIssuesLabels(
      link.projectPath,
      link.issue
    );

    const issueStatusMap =
      response.data.project.issue.linkedWorkItems.nodes.reduce((acc, value) => {
        return {
          ...acc,
          [value.workItem.id.replace(/\D/g, '')]:
            LabelHelper.getStatusLabelFromWidgets(value.workItem.widgets),
        };
      }, {} as Record<string, Label | undefined>);

    items.forEach((item) => {
      if (!item.dataset.key || !issueStatusMap[item.dataset.key]) {
        return;
      }
      const statusLabel = issueStatusMap[item.dataset.key];

      const infoArea = item.querySelector<HTMLDivElement>(
        '.item-attributes-area'
      );

      if (infoArea && statusLabel) {
        RendererHelper.render(
          'glp-status-label',
          infoArea,
          <GitlabLabel label={statusLabel} />,
          'prepend'
        );
      }
    });
  }
}
