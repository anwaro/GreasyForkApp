export const milestoneFragment = `
fragment MilestoneFragment on Milestone {
  id
  iid
  title
  webUrl: webPath
  dueDate
  expired
  state
}

`;

export const milestoneQuery = `query projectMilestones($fullPath: ID!, $title: String, $state: MilestoneStateEnum) {
  workspace: project(fullPath: $fullPath) {
    id
    attributes: milestones(
      searchTitle: $title
      state: $state
      sort: EXPIRED_LAST_DUE_DATE_ASC
      first: 40
      includeAncestors: true
    ) {
      nodes {
        ...MilestoneFragment
      }
    }
  }
}

${milestoneFragment}
`;
