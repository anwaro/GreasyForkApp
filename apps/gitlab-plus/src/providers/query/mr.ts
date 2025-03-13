import { labelFragment } from './label';
import { userFragment } from './user';

export const mrQuery = `query MergeRequestQuery($fullPath: ID!, $iid: String!) {
  workspace: project(fullPath: $fullPath) {
    mergeRequest(iid: $iid) {
      id
      iid
      assignees {
        nodes {
          ...UserFragment
        }
      }
      approvedBy {
        nodes {
          ...UserFragment
        }
      }
      author {
        ...UserFragment
      }
      project {
        webUrl
        path
        fullPath
      }
      commitCount
      conflicts
      createdAt
      title
      titleHtml
      diffStatsSummary {
        additions
        changes
        deletions
        fileCount
      }
      draft
      labels {
        nodes {
          ...LabelFragment
        }
      }
      mergeable
      resolvedDiscussionsCount
      resolvableDiscussionsCount
      reviewers {
        nodes {
          ...UserFragment
        }
      }
      shouldBeRebased
      sourceBranch
      targetBranch
      state
      webUrl
    }
  }
}

${userFragment}
${labelFragment}
`;
