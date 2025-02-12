export const labelFragment = `
  fragment Label on Label {
    id
    title
    description
    color
    textColor
    __typename
  }
`;

export const projectLabelsQuery = `query projectLabels($fullPath: ID!, $searchTerm: String) {
  workspace: project(fullPath: $fullPath) {
    id
    labels(
      searchTerm: $searchTerm
      includeAncestorGroups: true
    ) {
      nodes {
        ...Label
        __typename
      }
      __typename
    }
    __typename
  }
}
${labelFragment}
`;

export const workspaceLabelsQuery = `query groupLabels($fullPath: ID!, $searchTerm: String) {
  workspace: group(fullPath: $fullPath) {
    id
    labels(
      searchTerm: $searchTerm
      onlyGroupLabels: true
      includeAncestorGroups: true
    ) {
      nodes {
        ...Label
        __typename
      }
      __typename
    }
    __typename
  }
}

${labelFragment}
`;
