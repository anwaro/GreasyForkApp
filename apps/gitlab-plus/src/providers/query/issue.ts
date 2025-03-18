import { iterationFragment } from './iteration';
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
      dueDate
      projectId
      milestone {
        id
        title
        startDate
        dueDate
      }
      epic {
        id
        iid
        title
        webUrl
        labels {
          nodes {
            ...LabelFragment
          }
        }
      }
      iteration {
        ...IterationFragment
      }
      labels {
        nodes {
          ...LabelFragment
        }
      }
      relatedMergeRequests {
        nodes {
          iid
          title
          state
          webUrl
          author {
            ...UserFragment
          }
        }
      }
      assignees {
        nodes {
          ...UserFragment
        }
      }
      author {
        ...UserFragment
      }
      weight
      type
      linkedWorkItems {
        nodes {
          linkType
          workItemState
          workItem {
            id
            iid
            webUrl
            title
            widgets {
              type
              ...LabelsWidget
            }
          }
        }
      }
    }
  }
}

fragment LabelsWidget on WorkItemWidgetLabels {
  labels {
    nodes {
      ...LabelFragment
    }
  }
}

${labelFragment}
${userFragment}
${iterationFragment}
`;

export const issueWithRelatedIssuesLabelsQuery = `query issueEE($projectPath: ID!, $iid: String!) {
  project(fullPath: $projectPath) {
    issue(iid: $iid) {
      linkedWorkItems {
        nodes {
          workItem {
            id
            iid
            widgets {
              type
              ...LabelsWidget
            }
          }
        }
      }
    }
  }
}

fragment LabelsWidget on WorkItemWidgetLabels {
  labels {
    nodes {
      ...LabelFragment
    }
  }
}

${labelFragment}
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
        ...WorkItemSearchFragment
      }
    }
    workItemsByIid: workItems(
      iid: $iid
      types: $types
      includeAncestors: $includeAncestors
      includeDescendants: $includeDescendants
    ) @include(if: $searchByIid) {
      nodes {
        ...WorkItemSearchFragment
      }
    }
    workItemsEmpty: workItems(
      types: $types
      includeAncestors: $includeAncestors
      includeDescendants: $includeDescendants
    ) @include(if: $searchEmpty) {
      nodes {
        ...WorkItemSearchFragment
      }
    }
  }
}

fragment WorkItemSearchFragment on WorkItem {
  id
  iid
  title
  project {
    fullPath
  }
}
`;

export const issueMutation = `
mutation CreateIssue($input: CreateIssueInput!) {
  createIssue(input: $input) {
    issue {
      ...CreatedIssue
    }
    errors
  }
}

fragment CreatedIssue on Issue {
  id
  iid
  projectId
}
`;

export const issueSetEpicMutation = `
mutation projectIssueUpdateParent($input: WorkItemUpdateInput!) {
  issuableSetAttribute: workItemUpdate(input: $input) {
    errors
  }
}
`;

export const issueSetLabelsMutation = `
mutation issueSetLabels($input: UpdateIssueInput!) {
  updateIssuableLabels: updateIssue(input: $input) {
    errors
  }
}
`;
