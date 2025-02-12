import { labelFragment } from './label';

export const epicQuery = `query namespaceWorkItem($fullPath: ID!, $iid: String!) {
  workspace: namespace(fullPath: $fullPath) {
    id
    workItem(iid: $iid) {
      ...WorkItem
      __typename
    }
    __typename
  }
}

fragment WorkItem on WorkItem {
  id
  iid
  archived
  title
  state
  description
  confidential
  createdAt
  closedAt
  webUrl
  reference(full: true)
  createNoteEmail
  project {
    id
    __typename
  }
  namespace {
    id
    fullPath
    name
    fullName
    __typename
  }
  author {
    ...Author
    __typename
  }

  workItemType {
    id
    name
    iconName
    __typename
  }
  userPermissions {
    deleteWorkItem
    updateWorkItem
    adminParentLink
    setWorkItemMetadata
    createNote
    adminWorkItemLink
    markNoteAsInternal
    reportSpam
    __typename
  }
  widgets {
    ...WorkItemWidgets
    __typename
  }
  __typename
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
      }
    }
  }
  ... on WorkItemWidgetAssignees {
    assignees {
      nodes {
        ...User
      }
    }
  }
  ... on WorkItemWidgetLabels {
    labels {
      nodes {
        ...Label
      }
    }
  }
  ... on WorkItemWidgetStartAndDueDate {
    dueDate
    startDate
    rollUp
    isFixed
    __typename
  }
  ... on WorkItemWidgetProgress {
    progress
    updatedAt
    __typename
  }
  ... on WorkItemWidgetIteration {
    iteration {
      id
      title
      startDate
      dueDate
      webUrl
      iterationCadence {
        id
        title
      }
      __typename
    }
    __typename
  }
  ... on WorkItemWidgetMilestone {
    milestone {
      ...MilestoneFragment
      __typename
    }
    __typename
  }
  ... on WorkItemWidgetNotes {
    discussionLocked
    __typename
  }
  ... on WorkItemWidgetHealthStatus {
    healthStatus
    rolledUpHealthStatus {
      count
      healthStatus
      __typename
    }
    __typename
  }
  ... on WorkItemWidgetNotifications {
    subscribed
    __typename
  }
  ... on WorkItemWidgetCurrentUserTodos {
    currentUserTodos(state: pending) {
      nodes {
        id
        __typename
      }
      __typename
    }
    __typename
  }
  ... on WorkItemWidgetColor {
    color
    textColor
    __typename
  }
  ... on WorkItemWidgetLinkedItems {
    linkedItems {
      nodes {
        linkId
        linkType
        __typename
      }
      __typename
    }
    __typename
  }
  ... on WorkItemWidgetCrmContacts {
    contacts {
      nodes {
        id
        email
        firstName
        lastName
        phone
        description
        organization {
          id
          name
          description
          defaultRate
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
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

fragment MilestoneFragment on Milestone {
  expired
  id
  title
  state
  startDate
  dueDate
  webPath
  __typename
}

fragment Author on User {
  id
  avatarUrl
  name
  username
  webUrl
  webPath
  __typename
}

${labelFragment}
`;

export const epicSetLabelsMutation = `
mutation workItemUpdate($input: WorkItemUpdateInput!) {
  workItemUpdate(input: $input) {
    workItem {
      __typename
    }
    errors
  }
}
`;
