export const labelsWidgetFragment = `
fragment LabelsWidgetFragment on WorkItemWidgetLabels {
  labels {
    nodes {
      ...LabelFragment
    }
  }
}
`;

export const hierarchyWidgetFragment = `
fragment HierarchyWidgetFragment on WorkItemWidgetHierarchy {
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
          ...LabelsWidgetFragment
        }
      }
    }
  }
`;
