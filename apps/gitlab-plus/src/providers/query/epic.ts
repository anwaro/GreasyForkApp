import { iterationFragment } from './iteration';
import { labelFragment } from './label';
import { milestoneFragment } from './milestone';
import { userFragment } from './user';

export const epicQuery = `query namespaceWorkItem($fullPath: ID!, $iid: String!) {
  workspace: namespace(fullPath: $fullPath) {
    id
    workItem(iid: $iid) {
      ...WorkItem
    }
  }
}

fragment WorkItem on WorkItem {
  id
  iid
  archived
  title
  state
  description
  createdAt
  closedAt
  webUrl
  project {
    id
  }
  namespace {
    id
    fullPath
    name
    fullName
  }
  author {
    ...UserFragment
  }
  widgets {
    ...WorkItemWidgets
  }
}

fragment WorkItemWidgets on WorkItemWidget {
  type
    ... on WorkItemWidgetHierarchy {
    hasChildren
    children(first: 100) {
      count
      nodes {
        id
        iid
        title
        state
        webUrl
        widgets {
          type
          ...LabelsWidget
        }
      }
    }
  }
  ... on WorkItemWidgetAssignees {
    assignees {
      nodes {
        ...UserFragment
      }
    }
  }
  ... on WorkItemWidgetLabels {
    labels {
      nodes {
        ...LabelFragment
      }
    }
  }
  ... on WorkItemWidgetIteration {
    iteration {
      ...IterationFragment
    }
  }
  ... on WorkItemWidgetMilestone {
    milestone {
      ...MilestoneFragment
    }
  }
  ... on WorkItemWidgetColor {
    color
    textColor
  }
  ... on WorkItemWidgetLinkedItems {
    linkedItems {
      nodes {
        linkId
        linkType
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
${milestoneFragment}
`;

export const epicSetLabelsMutation = `
mutation workItemUpdate($input: WorkItemUpdateInput!) {
  workItemUpdate(input: $input) {
    errors
  }
}
`;
