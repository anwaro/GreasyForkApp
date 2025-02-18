import { labelFragment } from './label';
import { userFragment } from './user';

export const mrQuery = `query MergeRequestQuery($fullPath: ID!, $iid: String!) {
  workspace: project(fullPath: $fullPath) {
    mergeRequest(iid: $iid) {
      id
      iid
      assignees {
        nodes {
          ...User
        }
      }
      approvedBy {
        nodes {
          ...User
        }
      }
      author {
        ...User
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
          ...Label
        }
      }
      mergeable
      resolvedDiscussionsCount
      resolvableDiscussionsCount
      reviewers {
        nodes {
          ...User
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
