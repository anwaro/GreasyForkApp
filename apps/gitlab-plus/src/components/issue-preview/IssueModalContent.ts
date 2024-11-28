import { IssueWithRelated } from '../../types/Issue';
import { IssueTitle } from './IssueTitle';
import { IssueAssignee } from './IssueAssignee';
import { IssueLabels } from './IssueLabels';
import { IssueMilestone } from './IssueMilestone';
import { IssueIteration } from './IssueIteration';
import { IssueMergeRequests } from './IssueMergeRequests';
import { Component } from '@ui/Component';
import { IssueRelatedIssue } from './IssueRelatedIssue';

export class IssueModalContent extends Component<'div'> {
  constructor() {
    super('div', { classes: 'glp-issue-modal-inner' });
  }

  update(issue: IssueWithRelated) {
    const components = [
      IssueTitle,
      IssueAssignee,
      IssueLabels,
      IssueMilestone,
      IssueIteration,
      IssueMergeRequests,
      IssueRelatedIssue,
    ];

    this.element.replaceChildren(
      ...components
        .map((IssueComponent) => new IssueComponent(issue))
        .filter((block) => block.shouldRender)
        .map((block) => block.getElement())
    );
  }
}
