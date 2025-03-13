export const labelFragment = `
  fragment LabelFragment on Label {
    id
    title
    description
    color
    textColor
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
        ...LabelFragment
      }
    }
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
        ...LabelFragment
      }
    }
  }
}

${labelFragment}
`;
