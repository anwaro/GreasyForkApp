import { Dom } from '@ui/Dom';
import {
  IssueRelation,
  IssueWithRelated,
  RelatedIssue,
} from '../../types/Issue';
import { IssueBlock } from './IssueBlock';

const relationMap: Record<IssueRelation, string> = {
  relates_to: 'Related to:',
  blocks: 'Blocks:',
  is_blocked_by: 'Is blocked by:',
};

type Groups = Record<IssueRelation, RelatedIssue[]>;

export class IssueRelatedIssue extends IssueBlock {
  constructor(issue: IssueWithRelated) {
    super(
      '',
      IssueRelatedIssue.content(issue.relatedIssues),
      '',
      !!issue.relatedIssues.length
    );
  }

  static content(issues: RelatedIssue[]) {
    const groups: Groups = issues.reduce(
      (acc, issue) => ({
        ...acc,
        [issue.linkType]: [...acc[issue.linkType], issue],
      }),
      {
        relates_to: [],
        blocks: [],
        is_blocked_by: [],
      } satisfies Groups
    );

    return Object.entries(groups)
      .filter(([_, issues]) => issues.length)
      .map(([key, issues]) =>
        IssueRelatedIssue.group(relationMap[key as IssueRelation], issues)
      );
  }

  static group(title: string, issues: RelatedIssue[]) {
    return Dom.create({
      tag: 'div',
      styles: {
        marginTop: '10px',
      },
      classes: `item-body `,
      children: [
        {
          tag: 'div',
          classes: 'item-title gl-flex gl-min-w-0 gl-gap-3',
          children: {
            tag: 'span',
            children: title,
          },
        },
        ...issues.map((issue) =>
          Dom.create({
            tag: 'div',
            classes: 'item-title sortable-link',
            styles: {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            children: `#${issue.iid} ${issue.title}`,
          })
        ),
      ],
    });
  }
}
