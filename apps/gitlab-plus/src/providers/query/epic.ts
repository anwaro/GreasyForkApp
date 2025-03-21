import { iterationFragment } from './iteration';
import { labelFragment } from './label';
import { milestoneFragment } from './milestone';
import { userFragment } from './user';
import { hierarchyWidgetFragment, labelsWidgetFragment } from './widget';

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
    type
  ...LabelsWidgetFragment
  ...HierarchyWidgetFragment
  }
}

${labelsWidgetFragment}
${hierarchyWidgetFragment}
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
