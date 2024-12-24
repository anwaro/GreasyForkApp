import { useMemo } from 'preact/hooks';

import { Dom } from '@ui/Dom';

import {
  IssueRelation,
  IssueWithRelated,
  RelatedIssue,
} from '../../../types/Issue';
import { GitlabLoader } from '../../common/GitlabLoader';
import { _IssueBlock, IssueBlock } from './IssueBlock';

const relationMap: Record<IssueRelation, string> = {
  blocks: 'Blocks:',
  is_blocked_by: 'Is blocked by:',
  relates_to: 'Related to:',
};

type Groups = Record<IssueRelation, RelatedIssue[]>;

export class _IssueRelatedIssue extends _IssueBlock {
  constructor(issue: IssueWithRelated) {
    super(
      '',
      _IssueRelatedIssue.content(issue.relatedIssues),
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
        blocks: [],
        is_blocked_by: [],
        relates_to: [],
      } satisfies Groups
    );

    return Object.entries(groups)
      .filter(([_, issues]) => issues.length)
      .map(([key, issues]) =>
        _IssueRelatedIssue.group(relationMap[key as IssueRelation], issues)
      );
  }

  static group(title: string, issues: RelatedIssue[]) {
    return Dom.create({
      tag: 'div',
      children: [
        {
          tag: 'div',
          children: {
            tag: 'span',
            children: title,
          },
          classes: 'item-title gl-flex gl-min-w-0 gl-gap-3',
        },
        ...issues.map((issue) =>
          Dom.create({
            tag: 'div',
            children: `#${issue.iid} ${issue.title}`,
            classes: 'item-title sortable-link',
            styles: {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          })
        ),
      ],
      classes: `item-body `,
      styles: {
        marginTop: '10px',
      },
    });
  }
}

type Props = {
  isLoading: boolean;
  relatedIssues: RelatedIssue[];
};

export function IssueRelatedIssue({ isLoading, relatedIssues }: Props) {
  const groups = useMemo(() => {
    const initValue: Groups = {
      blocks: [],
      is_blocked_by: [],
      relates_to: [],
    };
    return Object.entries(
      relatedIssues.reduce(
        (acc, issue) => ({
          ...acc,
          [issue.linkType]: [...acc[issue.linkType], issue],
        }),
        initValue
      )
    ).filter(([_, issues]) => issues.length);
  }, [relatedIssues]);

  if (isLoading) {
    return (
      <div className={'gl-flex gl-items-center gl-justify-center'}>
        <GitlabLoader />
      </div>
    );
  }

  if (!relatedIssues.length) {
    return null;
  }

  return (
    <IssueBlock tile={''}>
      {groups.map(([key, issues]) => (
        <div key={key} class={'item-body'} style={{ marginTop: 10 }}>
          <div class={'item-title gl-flex gl-min-w-0 gl-gap-3'}>
            <span>{relationMap[key as IssueRelation]}</span>
          </div>
          {issues.map((issue) => (
            <div
              key={issue.iid}
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              class={'item-title sortable-link'}
            >
              #{issue.iid} {issue.title}
            </div>
          ))}
        </div>
      ))}
    </IssueBlock>
  );
}
