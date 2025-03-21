import { render } from 'preact';

import { GitlabLabel } from '../components/common/GitlabLabel';
import { LabelHelper } from '../helpers/LabelHelper';
import { GitlabIssueLink, LinkParser } from '../helpers/LinkParser';
import { IssueProvider } from '../providers/IssueProvider';
import { Label } from '../types/Label';
import { BaseService } from './BaseService';
import { ServiceName } from './ServiceName';

export class RelatedIssuesLabelStatus extends BaseService {
  public name = ServiceName.RelatedIssuesLabelStatus;
  private ready = false;

  public init() {
    this.runInit(this.initIssuesList.bind(this));
  }

  private initIssuesList() {
    if (this.ready) {
      return;
    }
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
        render(
          <GitlabLabel label={statusLabel} />,
          this.root('glp-status-label', infoArea, true)
        );
      }
    });
  }
}
