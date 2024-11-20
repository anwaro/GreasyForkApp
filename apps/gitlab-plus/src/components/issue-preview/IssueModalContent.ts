import { Issue } from '../../types/Issue';
import IssueTitle from './IssueTitle';
import IssueAssignee from './IssueAssignee';
import IssueLabels from './IssueLabels';
import IssueMilestone from './IssueMilestone';
import IssueIteration from './IssueIteration';
import IssueMergeRequests from './IssueMergeRequests';
import { Component } from '@ui/Component';

export class IssueModalContent extends Component<'div'> {
  constructor() {
    super('div', { classes: 'glp-issue-modal-inner' });
  }

  update(issue: Issue) {
    const components = [
      IssueTitle,
      IssueAssignee,
      IssueLabels,
      IssueMilestone,
      IssueIteration,
      IssueMergeRequests,
    ];

    this.element.replaceChildren(
      ...components.map((Component) => new Component(issue).getElement())
    );
  }
}
