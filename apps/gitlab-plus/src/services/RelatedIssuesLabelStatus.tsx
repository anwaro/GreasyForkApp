import { render } from 'preact';

import { GitlabLabel } from '../components/common/GitlabLabel';
import { GitlabIssueLink, LinkParser } from '../helpers/LinkParser';
import { IssueProvider } from '../providers/IssueProvider';
import { LabelWidget } from '../types/Epic';
import { RelatedIssueWithLabels } from '../types/Issue';
import { Label } from '../types/Label';
import { Service } from '../types/Service';

export class RelatedIssuesLabelStatus extends Service {
  private ready = false;

  constructor() {
    super();
  }

  public init() {
    this.initIssuesList();
    window.setTimeout(this.initIssuesList.bind(this), 1000);
    window.setTimeout(this.initIssuesList.bind(this), 3000);
    window.setTimeout(this.initIssuesList.bind(this), 5000);
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

    const getStatusLabel = (item: RelatedIssueWithLabels) => {
      const labelsWidget = item.workItem.widgets.find(
        (w): w is LabelWidget => w.type === 'LABELS'
      );
      return labelsWidget?.labels.nodes.find(
        (l) =>
          l.title.toLowerCase().startsWith('status::') ||
          l.title.toLowerCase().startsWith('workflow::')
      );
    };

    const issueStatusMap =
      response.data.project.issue.linkedWorkItems.nodes.reduce((acc, value) => {
        return {
          ...acc,
          [value.workItem.id.replace(/\D/g, '')]: getStatusLabel(value),
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
