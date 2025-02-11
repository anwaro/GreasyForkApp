import { labelFragment } from './label';
import { userFragment } from './user';

export const issueQuery = `query issueEE($projectPath: ID!, $iid: String!) {
  project(fullPath: $projectPath) {
    id
    issue(iid: $iid) {
      id
      iid
      title
      description
      createdAt
      state
      confidential
      dueDate
      milestone {
        id
        title
        startDate
        dueDate
        __typename
      }
      epic {
        iid
        title
      }
      iteration {
        id
        title
        startDate
        dueDate
        iterationCadence {
          id
          title
          __typename
        }
        __typename
      }
      labels {
        nodes {
          ...Label
        }
      }
      relatedMergeRequests {
        nodes {
          iid
          title
          state
          webUrl
          author {
            ...User
          }
        }
      }
      assignees {
        nodes {
          ...User
        }
      }
      author {
        ...User
      }
      weight
      type
      __typename
    }
    __typename
  }
}

${labelFragment}
${userFragment}
`;

export const issuesQuery = `query groupWorkItems($searchTerm: String, $fullPath: ID!, $types: [IssueType!], $in: [IssuableSearchableField!], $includeAncestors: Boolean = false, $includeDescendants: Boolean = false, $iid: String = null, $searchByIid: Boolean = false, $searchByText: Boolean = true, $searchEmpty: Boolean = true) {
  workspace: group(fullPath: $fullPath) {
    id
    workItems(
      search: $searchTerm
      types: $types
      in: $in
      includeAncestors: $includeAncestors
      includeDescendants: $includeDescendants
    ) @include(if: $searchByText) {
      nodes {
        id
        iid
        title
        confidential
        project {
          fullPath
        }
        __typename
      }
      __typename
    }
    workItemsByIid: workItems(
      iid: $iid
      types: $types
      includeAncestors: $includeAncestors
      includeDescendants: $includeDescendants
    ) @include(if: $searchByIid) {
      nodes {
        id
        iid
        title
        confidential
        project {
          fullPath
        }
        __typename
      }
      __typename
    }
    workItemsEmpty: workItems(
      types: $types
      includeAncestors: $includeAncestors
      includeDescendants: $includeDescendants
    ) @include(if: $searchEmpty) {
      nodes {
        id
        iid
        title
        confidential
        project {
          fullPath
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
`;

export const issueMutation = `
mutation CreateIssue($input: CreateIssueInput!) {
  createIssuable: createIssue(input: $input) {
    issuable: issue {
      ...Issue
      __typename
    }
    errors
    __typename
  }
}

fragment Issue on Issue {
  ...IssueNode
  id
  weight
  blocked
  blockedByCount
  epic {
    id
    __typename
  }
  iteration {
    id
    title
    startDate
    dueDate
    iterationCadence {
      id
      title
      __typename
    }
    __typename
  }
  healthStatus
  __typename
}

fragment IssueNode on Issue {
  id
  iid
  title
  referencePath: reference(full: true)
  closedAt
  dueDate
  timeEstimate
  totalTimeSpent
  humanTimeEstimate
  humanTotalTimeSpent
  emailsDisabled
  confidential
  hidden
  webUrl
  relativePosition
  projectId
  type
  severity
  milestone {
    ...MilestoneFragment
    __typename
  }
  assignees {
    nodes {
      ...User
      __typename
    }
    __typename
  }
  labels {
    nodes {
      id
      title
      color
      description
      __typename
    }
    __typename
  }
  __typename
}

fragment MilestoneFragment on Milestone {
  expired
  id
  state
  title
  __typename
}

fragment User on User {
  id
  avatarUrl
  name
  username
  webUrl
  webPath
  __typename
}
`;

export const issueSetEpicMutation = `
mutation projectIssueUpdateParent($input: WorkItemUpdateInput!) {
  issuableSetAttribute: workItemUpdate(input: $input) {
    workItem {
      id
      widgets {
        ... on WorkItemWidgetHierarchy {
          type
          parent {
            id
            title
            webUrl
          }
        }
      }
    }
    errors
  }
}
`;

export const issueSetLabelsMutation = `
mutation issueSetLabels($input: UpdateIssueInput!) {
  updateIssuableLabels: updateIssue(input: $input) {
    issuable: issue {
      id
      labels {
        nodes {
          ...Label
          __typename
        }
        __typename
      }
      __typename
    }
    errors
    __typename
  }
}

${labelFragment}
`;
