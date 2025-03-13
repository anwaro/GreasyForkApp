export const projectsQuery = `query boardsGetGroupProjects($fullPath: ID!, $search: String, $after: String) {
  workspace: group(fullPath: $fullPath) {
    id
    projects(search: $search, after: $after, first: 100, includeSubgroups: true) {
      nodes {
        id
        name
        avatarUrl
        fullPath
        nameWithNamespace
        archived
      }
    }
  }
}
`;
